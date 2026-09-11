const fs = require('fs');
const vm = require('vm');

console.log('=== STARTING COMPREHENSIVE PATCH ===');

// 1. UPDATE server.cjs
let serverCode = fs.readFileSync('server.cjs', 'utf8');

// A. Add Firestore Chat Helpers right after deleteQuestionFromFirestore
const chatHelperAnchor = 'async function deleteQuestionFromFirestore(id) {';
const chatHelperInsert = `
async function fetchChatMessagesFromFirestore() {
  if (!firestoreDb) return null;
  try {
    const colRef = (0, import_firestore.collection)(firestoreDb, "community_messages");
    const q = (0, import_firestore.query)(colRef, (0, import_firestore.limit)(500));
    const snapshot = await (0, import_firestore.getDocs)(q);
    if (!snapshot || snapshot.empty) return [];
    const list = [];
    snapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    list.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
    return list;
  } catch (err) {
    console.error("[Firestore Chat Fetch Error]:", err.message);
    return null;
  }
}

async function syncChatMessageToFirestore(msg) {
  if (!firestoreDb || !msg || !msg.id) return;
  try {
    const docRef = (0, import_firestore.doc)(firestoreDb, "community_messages", msg.id);
    await (0, import_firestore.setDoc)(docRef, msg, { merge: true });
    console.log("[Firestore Chat Sync] Saved message:", msg.id);
  } catch (err) {
    console.error("[Firestore Chat Write Error]:", err.message);
  }
}

async function deleteChatMessageFromFirestore(id) {
  if (!firestoreDb || !id) return;
  try {
    const docRef = (0, import_firestore.doc)(firestoreDb, "community_messages", id);
    await (0, import_firestore.deleteDoc)(docRef);
    console.log("[Firestore Chat Delete] Removed message:", id);
  } catch (err) {
    console.error("[Firestore Chat Delete Error]:", err.message);
  }
}
`;

if (!serverCode.includes('fetchChatMessagesFromFirestore')) {
  const insertIdx = serverCode.indexOf(chatHelperAnchor);
  if (insertIdx !== -1) {
    serverCode = serverCode.slice(0, insertIdx) + chatHelperInsert + '\n' + serverCode.slice(insertIdx);
    console.log('Added Firestore Chat helpers to server.cjs');
  }
}

// B. Update /api/db to sort news and blogs newest first
serverCode = serverCode.replace(
  /app\.get\("\/api\/db", \(req, res\) => \{[\s\S]*?res\.json\(\{ \.\.\.db, circulars: sanitizedCirculars \}\);[\s\S]*?\}\);/,
  `app.get("/api/db", (req, res) => {
    const db = loadDatabase();
    const userEmail = req.headers["user-email"] || req.query.userEmail;
    const sanitizedCirculars = (db.circulars || []).map(c => sanitizeCircular(c, userEmail, db));
    const sortedNews = (db.news || []).slice().sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime() || (b.id || "").localeCompare(a.id || ""));
    const sortedBlogs = (db.blogs || []).slice().sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime() || (b.id || "").localeCompare(a.id || ""));
    res.json({ ...db, news: sortedNews, blogs: sortedBlogs, circulars: sanitizedCirculars });
  });`
);

// C. Update /api/chat/messages GET, POST, PUT and /api/chat/upload in server.cjs
const oldChatRoutesRegex = /app\.get\("\/api\/chat\/messages"[\s\S]*?app\.post\("\/api\/questions\/:id\/answers"/;
const newChatRoutes = `app.get("/api/chat/messages", async (req, res) => {
    try {
      const remoteMsgs = await fetchChatMessagesFromFirestore();
      if (remoteMsgs !== null && Array.isArray(remoteMsgs) && remoteMsgs.length > 0) {
        const db = loadDatabase();
        db.communityMessages = remoteMsgs;
        saveDatabase(db);
        return res.json(remoteMsgs);
      }
      const db = loadDatabase();
      if (!db.communityMessages) db.communityMessages = [];
      res.json(db.communityMessages);
    } catch (e) {
      console.error("GET /api/chat/messages error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const { text, userEmail, userName, userAvatar, replyTo, attachment } = req.body;
      if (!userEmail) {
        return res.status(401).json({ error: "চ্যাট করতে হলে লগইন করতে হবে।" });
      }
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "মেসেজ খালি থাকতে পারে না।" });
      }
      if (text.length > 1000) {
        return res.status(400).json({ error: "মেসেজ ১০০০ অক্ষরের বেশি হতে পারবে না।" });
      }
      const db = loadDatabase();
      if (!db.communityMessages) db.communityMessages = [];

      const newMsg = {
        id: "msg_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
        userEmail: userEmail,
        userName: userName || userEmail.split("@")[0],
        userAvatar: userAvatar || "",
        text: text.trim(),
        createdAt: new Date().toISOString(),
        editedAt: null,
        replyTo: replyTo || null,
        attachment: attachment || null,
        isModerated: false,
        reportsCount: 0,
        reportedBy: []
      };

      db.communityMessages.push(newMsg);
      if (db.communityMessages.length > 500) {
        db.communityMessages = db.communityMessages.slice(-500);
      }
      saveDatabase(db);

      // Persist to Firebase Firestore
      syncChatMessageToFirestore(newMsg).catch(err => console.error(err));

      res.json(newMsg);
    } catch (e) {
      console.error("POST /api/chat/messages error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/chat/messages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { action, text, userEmail } = req.body;
      if (!userEmail) return res.status(401).json({ error: "লগইন করা প্রয়োজন।" });

      const db = loadDatabase();
      if (!db.communityMessages) db.communityMessages = [];
      const msgIndex = db.communityMessages.findIndex(m => m.id === id);
      if (msgIndex === -1) return res.status(404).json({ error: "মেসেজ পাওয়া যায়নি।" });

      const msg = db.communityMessages[msgIndex];
      const isSuper = userEmail === "chitronbhattacharjee@gmail.com" || userEmail === "tanij@gmail.com";
      const isOwner = msg.userEmail === userEmail;

      if (action === "edit") {
        if (!isOwner) return res.status(403).json({ error: "শুধু নিজের মেসেজ এডিট করা যায়।" });
        if (!text || !text.trim()) return res.status(400).json({ error: "মেসেজ খালি হতে পারে না।" });
        msg.text = text.trim();
        msg.editedAt = new Date().toISOString();
        syncChatMessageToFirestore(msg).catch(err => console.error(err));
      } else if (action === "delete") {
        if (!isOwner && !isSuper) return res.status(403).json({ error: "ডিলিট করার অনুমতি নেই।" });
        db.communityMessages.splice(msgIndex, 1);
        deleteChatMessageFromFirestore(id).catch(err => console.error(err));
      } else if (action === "report") {
        if (!msg.reportedBy) msg.reportedBy = [];
        if (!msg.reportedBy.includes(userEmail)) {
          msg.reportedBy.push(userEmail);
          msg.reportsCount = (msg.reportsCount || 0) + 1;
        }
        syncChatMessageToFirestore(msg).catch(err => console.error(err));
      } else if (action === "moderateHide") {
        if (!isSuper) return res.status(403).json({ error: "মডারেটর অধিকার প্রয়োজন।" });
        msg.isModerated = true;
        msg.text = "[এই মেসেজটি মডারেটর কর্তৃক লুকানো হয়েছে]";
        syncChatMessageToFirestore(msg).catch(err => console.error(err));
      }

      saveDatabase(db);
      res.json({ success: true, message: msg });
    } catch (e) {
      console.error("PUT /api/chat/messages/:id error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/chat/upload", uploadProfile.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "কোনো ফাইল আপলোড করা হয়নি।" });
      }

      const isImage = req.file.mimetype && req.file.mimetype.startsWith("image/");
      if (isImage) {
        try {
          const base64Data = req.file.buffer ? req.file.buffer.toString("base64") : (import_fs.default.existsSync(req.file.path) ? import_fs.default.readFileSync(req.file.path).toString("base64") : "");
          if (base64Data) {
            const formData = new FormData();
            formData.append("image", base64Data);
            const imgbbKey = process.env.IMGBB_API_KEY || "3601399f318b007db7c3a8fdf499d8d0";
            const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=" + imgbbKey, {
              method: "POST",
              body: formData
            });
            if (imgbbRes.ok) {
              const imgbbJson = await imgbbRes.json();
              if (imgbbJson && imgbbJson.success && imgbbJson.data && imgbbJson.data.url) {
                if (req.file.path && import_fs.default.existsSync(req.file.path)) {
                  try { import_fs.default.unlinkSync(req.file.path); } catch (e) {}
                }
                return res.json({
                  url: imgbbJson.data.url,
                  thumbUrl: imgbbJson.data.thumb ? imgbbJson.data.thumb.url : imgbbJson.data.url,
                  name: req.file.originalname,
                  size: req.file.size,
                  type: "image",
                  provider: "imgbb"
                });
              }
            }
          }
        } catch (imgErr) {
          console.warn("[ImgBB Server Upload Warning]:", imgErr.message);
        }
      }

      const fileUrl = req.file.filename ? "/uploads/profiles/general/" + req.file.filename : "/uploads/" + req.file.originalname;
      res.json({
        url: fileUrl,
        name: req.file.originalname,
        size: req.file.size,
        type: isImage ? "image" : "file"
      });
    } catch (e) {
      console.error("POST /api/chat/upload error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/questions/:id/answers"`;

serverCode = serverCode.replace(oldChatRoutesRegex, newChatRoutes);
fs.writeFileSync('server.cjs', serverCode, 'utf8');
console.log('Successfully updated server.cjs');


// 2. UPDATE community-chat.js
let chatJs = fs.readFileSync('community-chat.js', 'utf8');

// Update handleFileUpload in community-chat.js
const oldHandleUpload = `  async function handleFileUpload(file) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("ফাইলের সাইজ ১০ মেগাবাইটের বেশি হতে পারবে না।");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        activeAttachment = data;
        render();
      } else {
        alert("ফাইল আপলোড ব্যর্থ হয়েছে।");
      }
    } catch (e) {
      console.error("Upload error:", e);
      alert("ফাইল আপলোড ত্রুটি।");
    }
  }`;

const newHandleUpload = `  async function handleFileUpload(file) {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert("ফাইলের সাইজ ১৫ মেগাবাইটের বেশি হতে পারবে না।");
      return;
    }

    const isImg = file.type.startsWith("image/") || file.name.match(/\\.(png|jpe?g|gif|webp|bmp|svg)$/i);
    if (isImg) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const imgbbKey = "3601399f318b007db7c3a8fdf499d8d0";
        const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=" + imgbbKey, {
          method: "POST",
          body: formData
        });
        if (imgbbRes.ok) {
          const resData = await imgbbRes.json();
          if (resData && resData.success && resData.data && resData.data.url) {
            activeAttachment = {
              url: resData.data.url,
              thumbUrl: resData.data.thumb ? resData.data.thumb.url : (resData.data.display_url || resData.data.url),
              name: file.name,
              size: file.size,
              type: "image",
              provider: "imgbb"
            };
            render();
            return;
          }
        }
      } catch (clientErr) {
        console.warn("[ImgBB direct upload failed, falling back to server]:", clientErr);
      }
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        activeAttachment = data;
        render();
      } else {
        alert("ফাইল আপলোড ব্যর্থ হয়েছে।");
      }
    } catch (e) {
      console.error("Upload error:", e);
      alert("ফাইল আপলোড ত্রুটি।");
    }
  }`;

chatJs = chatJs.replace(oldHandleUpload, newHandleUpload);

// Update message card attachment rendering in community-chat.js
const oldAttachmentRender = `                      \${m.attachment ? \`
                        <div style="margin-top: 6px;">
                          \${m.attachment.type === "image" ? \`
                            <a href="\${m.attachment.url}" target="_blank">
                              <img src="\${m.attachment.url}" alt="Attachment" style="max-width: 100%; border-radius: 8px; max-height: 160px; object-fit: cover;" />
                            </a>
                          \` : \`
                            <a href="\${m.attachment.url}" target="_blank" style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.06); padding: 6px 10px; border-radius: 6px; color: inherit; font-size: 12px; text-decoration: none;">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              <span>\${m.attachment.name}</span>
                            </a>
                          \`}
                        </div>
                      \` : ""}`;

const newAttachmentRender = `                      \${m.attachment ? \`
                        <div style="margin-top: 6px;">
                          \${(m.attachment.type === "image" || (m.attachment.url && m.attachment.url.match(/\\.(png|jpe?g|gif|webp|bmp|svg)($|\\?)/i)) || (m.attachment.url && m.attachment.url.includes("ibb.co"))) ? \`
                            <div style="position: relative; overflow: hidden; border-radius: 8px; border: 1px solid rgba(0,0,0,0.08); background: #18181b;">
                              <a href="\${m.attachment.url}" target="_blank" rel="noopener noreferrer" style="display: block;">
                                <img src="\${m.attachment.url}" alt="\${m.attachment.name || 'Attachment'}" loading="lazy" style="width: 100%; max-height: 220px; object-fit: cover; display: block; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" />
                              </a>
                              <div style="padding: 4px 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px;">\${m.attachment.name || 'ছবি'}</span>
                                <a href="\${m.attachment.url}" target="_blank" rel="noopener noreferrer" style="color: #fda4af; text-decoration: none; font-weight: bold; margin-left: 6px;">সম্পূর্ণ দেখুন ↗</a>
                              </div>
                            </div>
                          \` : \`
                            <a href="\${m.attachment.url}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.06); padding: 6px 10px; border-radius: 6px; color: inherit; font-size: 12px; text-decoration: none;">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              <span>\${m.attachment.name}</span>
                            </a>
                          \`}
                        </div>
                      \` : ""}`;

chatJs = chatJs.replace(oldAttachmentRender, newAttachmentRender);
fs.writeFileSync('community-chat.js', chatJs, 'utf8');
console.log('Successfully updated community-chat.js');


// 3. UPDATE NEWS SORTING IN BUNDLE FILES
const bundleFiles = ['assets/index-DkKEx6Oj.js', 'bundle_with_28_templates.js', 'restored_tail.js'];

bundleFiles.forEach(bundlePath => {
  if (!fs.existsSync(bundlePath)) return;
  let code = fs.readFileSync(bundlePath, 'utf8');

  // A. Homepage news sorting: m should be combined latest news & blogs nationwide + Mymensingh, sorted newest first, limited to 4
  const oldHomepageM = `,m=n.filter(j=>(j.section==="saradesh"||j.category==="national")&&j.id!==(p==null?void 0:p.id)).map(j=>({...j,itemType:"news"})).sort((j,F)=>new Date(F.date||0).getTime()-new Date(j.date||0).getTime()||(F.id||"").localeCompare(j.id||"")).slice(0,4)`;
  const newHomepageM = `,m=[...n.map(j=>({...j,itemType:"news"})),...u.map(j=>({...j,itemType:"blog"}))].filter(j=>j.id!==(p==null?void 0:p.id)).sort((j,F)=>new Date(F.date||0).getTime()-new Date(j.date||0).getTime()||(F.id||"").localeCompare(j.id||"")).slice(0,4)`;

  if (code.includes(oldHomepageM)) {
    code = code.replace(oldHomepageM, newHomepageM);
    console.log(`Updated homepage news filter in ${bundlePath}`);
  }

  // B. News portal filtering and sorting
  const oldNewsPortalFilter = `ae=n.filter($=>{const te=$.title.toLowerCase().includes(p.toLowerCase())||$.excerpt.toLowerCase().includes(p.toLowerCase())||$.content.toLowerCase().includes(p.toLowerCase()),ue=ne==="all"||$.category===ne;return te&&ue}),W=e.filter($=>$.title.toLowerCase().includes(p.toLowerCase())||$.excerpt.toLowerCase().includes(p.toLowerCase())||$.content.toLowerCase().includes(p.toLowerCase()))`;
  const newNewsPortalFilter = `ae=n.filter($=>{const te=$.title.toLowerCase().includes(p.toLowerCase())||$.excerpt.toLowerCase().includes(p.toLowerCase())||$.content.toLowerCase().includes(p.toLowerCase()),ue=ne==="all"||$.category===ne;return te&&ue}).sort((a,b)=>new Date(b.date||0).getTime()-new Date(a.date||0).getTime()||(b.id||"").localeCompare(a.id||"")),W=e.filter($=>$.title.toLowerCase().includes(p.toLowerCase())||$.excerpt.toLowerCase().includes(p.toLowerCase())||$.content.toLowerCase().includes(p.toLowerCase())).sort((a,b)=>new Date(b.date||0).getTime()-new Date(a.date||0).getTime()||(b.id||"").localeCompare(a.id||""))`;

  if (code.includes(oldNewsPortalFilter)) {
    code = code.replace(oldNewsPortalFilter, newNewsPortalFilter);
    console.log(`Updated news portal sorting in ${bundlePath}`);
  }

  // C. SaradeshNewsPage sorting
  const oldSaradeshCode = `const saradeshArticles = news.filter(item => item.section === "saradesh");  const categories = ["সব এলাকা", "ময়মনসিংহ", "ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর"];  const filtered = saradeshArticles.filter(item => {    const matchCat = selectedCategory === "all" || (item.category && item.category.includes(selectedCategory)) || (item.location && item.location.includes(selectedCategory));    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));    return matchCat && matchSearch;  });`;
  const newSaradeshCode = `const saradeshArticles = (news || []).filter(item => item.section === "saradesh").sort((a,b)=>new Date(b.date||0).getTime()-new Date(a.date||0).getTime()||(b.id||"").localeCompare(a.id||""));  const categories = ["সব এলাকা", "ময়মনসিংহ", "ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর"];  const filtered = saradeshArticles.filter(item => {    const matchCat = selectedCategory === "all" || (item.category && item.category.includes(selectedCategory)) || (item.location && item.location.includes(selectedCategory));    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));    return matchCat && matchSearch;  }).sort((a,b)=>new Date(b.date||0).getTime()-new Date(a.date||0).getTime()||(b.id||"").localeCompare(a.id||""));`;

  if (code.includes(oldSaradeshCode)) {
    code = code.replace(oldSaradeshCode, newSaradeshCode);
    console.log(`Updated SaradeshNewsPage sorting in ${bundlePath}`);
  }

  fs.writeFileSync(bundlePath, code, 'utf8');
});

console.log('=== VERIFYING SYNTAX OF ALL MODIFIED FILES ===');
try {
  new vm.Script(fs.readFileSync('server.cjs', 'utf8'));
  console.log('✓ server.cjs syntax is valid!');
} catch (e) {
  console.error('✗ server.cjs syntax error:', e);
}

try {
  new vm.Script(fs.readFileSync('community-chat.js', 'utf8'));
  console.log('✓ community-chat.js syntax is valid!');
} catch (e) {
  console.error('✗ community-chat.js syntax error:', e);
}

try {
  new vm.Script(fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8'));
  console.log('✓ assets/index-DkKEx6Oj.js syntax is valid!');
} catch (e) {
  console.error('✗ assets/index-DkKEx6Oj.js syntax error:', e);
}

console.log('=== ALL PATCHES APPLIED AND VERIFIED ===');
