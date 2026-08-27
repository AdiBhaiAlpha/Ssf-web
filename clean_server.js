const fs = require('fs');
let content = fs.readFileSync('server.cjs', 'utf8');

// 1. Remove any existing /api/questions definitions
content = content.replace(/app\.get\("\/api\/questions"[\s\S]*?res\.json\(\{ success: true \}\);\s*\}\);\s*\})/g, '');
content = content.replace(/app\.get\("\/api\/questions"[\s\S]*?\}\);\s*\})/g, '');

// Let's also ensure questions init in getInitialDBState and loadDatabase is clean
// Let's add questions to getInitialDBState if not present
if (!content.includes('questions: [')) {
  content = content.replace('memberLogins: []', 'memberLogins: [], questions: [\n    {\n      id: "q_1",\n      title: "বর্তমান শিক্ষানীতিতে বৈজ্ঞানিক ও গণতান্ত্রিক ব্যবস্থার গুরুত্ব কতটুকু?",\n      content: "আমাদের বর্তমান শিক্ষা ব্যবস্থায় বাণিজ্যিকীকরণ বৃদ্ধি পাচ্ছে। এই প্রেক্ষাপটে সর্বজনীন ও গণতান্ত্রিক শিক্ষার দাবিতে ছাত্র সমাজের ভূমিকা কী হওয়া উচিত?",\n      category: "শিক্ষা",\n      tags: ["শিক্ষা", "গণতন্ত্র", "ছাত্র আন্দোলন"],\n      author: "চিত্রণ ভট্টাচার্য",\n      authorEmail: "chitronbhattacharjee@gmail.com",\n      createdAt: "২০২৬-০৮-২৫ ১০:৩০",\n      answerCount: 1,\n      answers: [\n        {\n          id: "a_1",\n          content: "শিক্ষার বাণিজ্যিকীকরণ রোধে সকল ছাত্র সংগঠনকে ঐক্যবদ্ধ হয়ে আন্দোলন গড়ে তুলতে হবে।",\n          author: "তানিজ হোসেন মুনিম",\n          authorEmail: "tanij@gmail.com",\n          createdAt: "২০২৬-০৮-২৫ ১১:১৫"\n        }\n      ]\n    }\n  ]');
}

if (!content.includes('db.questions =')) {
  content = content.replace('if (!db.memberLogins) {', 'if (!db.questions) {\n        db.questions = initialState.questions || [];\n      }\n      if (!db.memberLogins) {');
}

// 2. Insert clean Q&A API routes right after app.get("/api/db", ...)
const qaRoutes = `
  app.get("/api/questions", (req, res) => {
    const db = loadDatabase();
    res.json(db.questions || []);
  });

  app.post("/api/questions", (req, res) => {
    const { question, userEmail } = req.body;
    if (!userEmail) {
      return res.status(401).json({ error: "লগইন করা ছাড়া প্রশ্ন করা যাবে না।" });
    }
    const db = loadDatabase();
    const newQ = {
      id: "q_" + Date.now(),
      title: question.title,
      content: question.content,
      category: question.category || "অন্যান্য",
      tags: question.tags || [],
      author: question.author || "সদস্য",
      authorEmail: userEmail,
      createdAt: new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" }),
      answerCount: 0,
      answers: []
    };
    if (!db.questions) db.questions = [];
    db.questions.unshift(newQ);
    saveDatabase(db);
    res.json(newQ);
  });

  app.delete("/api/questions/:id", (req, res) => {
    const { id } = req.params;
    const { userEmail } = req.body;
    const db = loadDatabase();
    const qIndex = db.questions.findIndex(q => q.id === id);
    if (qIndex === -1) return res.status(404).json({ error: "প্রশ্ন পাওয়া যায়নি" });
    const q = db.questions[qIndex];
    const isSuper = userEmail === "chitronbhattacharjee@gmail.com";
    if (!isSuper && q.authorEmail !== userEmail) {
      return res.status(403).json({ error: "অনুমতি নেই" });
    }
    db.questions.splice(qIndex, 1);
    saveDatabase(db);
    res.json({ success: true });
  });

  app.post("/api/questions/:id/answers", (req, res) => {
    const { id } = req.params;
    const { answer, userEmail, authorName } = req.body;
    if (!userEmail) {
      return res.status(401).json({ error: "লগইন করা ছাড়া উত্তর দেওয়া যাবে না।" });
    }
    const db = loadDatabase();
    const q = db.questions.find(item => item.id === id);
    if (!q) return res.status(404).json({ error: "প্রশ্ন পাওয়া যায়নি" });
    const newAns = {
      id: "a_" + Date.now(),
      content: answer.content,
      author: authorName || "সদস্য",
      authorEmail: userEmail,
      createdAt: new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" })
    };
    if (!q.answers) q.answers = [];
    q.answers.push(newAns);
    q.answerCount = q.answers.length;
    saveDatabase(db);
    res.json(newAns);
  });

  app.delete("/api/questions/:id/answers/:answerId", (req, res) => {
    const { id, answerId } = req.params;
    const { userEmail } = req.body;
    const db = loadDatabase();
    const q = db.questions.find(item => item.id === id);
    if (!q) return res.status(404).json({ error: "প্রশ্ন পাওয়া যায়নি" });
    const aIndex = q.answers.findIndex(a => a.id === answerId);
    if (aIndex === -1) return res.status(404).json({ error: "উত্তর পাওয়া যায়নি" });
    const a = q.answers[aIndex];
    const isSuper = userEmail === "chitronbhattacharjee@gmail.com";
    if (!isSuper && a.authorEmail !== userEmail) {
      return res.status(403).json({ error: "অনুমতি নেই" });
    }
    q.answers.splice(aIndex, 1);
    q.answerCount = q.answers.length;
    saveDatabase(db);
    res.json({ success: true });
  });
`;

const targetDb = 'app.get("/api/db", (req, res) => {\n    const db = loadDatabase();\n    res.json(db);\n  });';

if (content.includes(targetDb)) {
  // Only insert if not already present
  if (!content.includes('app.get("/api/questions"')) {
    content = content.replace(targetDb, targetDb + '\n\n' + qaRoutes);
  }
  fs.writeFileSync('server.cjs', content, 'utf8');
  console.log('server.cjs successfully cleaned and updated!');
} else {
  console.log('targetDb not found');
}
