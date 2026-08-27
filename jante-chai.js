(function() {
  let questionsData = [];
  let currentFilter = 'সব';
  let currentSort = 'latest';
  let searchQuery = '';
  let activeTab = 'home';
  let selectedQuestionId = null;
  const categories = ['সব', 'রাজনীতি', 'শিক্ষা', 'সমাজ', 'অর্থনীতি', 'সংগঠন', 'আন্দোলন', 'ইতিহাস', 'আন্তর্জাতিক', 'অন্যান্য'];

  async function fetchQuestions() {
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        questionsData = await res.json();
        renderView();
      }
    } catch (e) { console.error('Failed to fetch questions', e); }
  }

  function getUserEmail() {
    return localStorage.getItem('ssf_user_email') || localStorage.getItem('userEmail') || '';
  }

  function injectStyles() {
    if (document.getElementById('jante-chai-styles')) return;
    const style = document.createElement('style');
    style.id = 'jante-chai-styles';
    style.innerHTML = `
      .jc-container { font-family: inherit; }
      .jc-card { transition: all 0.2s ease; }
      .jc-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05); }
    `;
    document.head.appendChild(style);
  }

  function filterQuestions() {
    let filtered = questionsData;
    if (currentFilter !== 'সব') {
      filtered = filtered.filter(q => q.category === currentFilter);
    }
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(q => q.title.toLowerCase().includes(lower) || q.content.toLowerCase().includes(lower));
    }
    if (currentSort === 'popular') {
      filtered.sort((a, b) => (b.answerCount || 0) - (a.answerCount || 0));
    }
    return filtered;
  }

    function renderView() {
    try {
      _renderViewInternal();
    } catch (err) {
      const debug = document.createElement('div');
      debug.style.color = 'red';
      debug.style.padding = '20px';
      debug.style.fontSize = '20px';
      debug.innerText = 'Error in renderView: ' + err.stack;
      document.body.prepend(debug);
    }
  }
  function _renderViewInternal() {

    console.log("renderView called", { activeTab, qaRoot: !!document.getElementById('qa-react-root'), homeRoot: !!document.getElementById('jante-chai-app-root') });
    injectStyles();
    
    let reactQaRoot = document.getElementById('qa-react-root');
    let homeRoot = document.getElementById('jante-chai-app-root');
    
    if (reactQaRoot) {
      if (activeTab === 'home') activeTab = 'qa-list';
      
      let html = '';
      if (activeTab === 'qa-list') html = getListHtml();
      else if (activeTab === 'qa-detail') html = getDetailHtml();
      
      reactQaRoot.innerHTML = html;
      
      if (homeRoot) homeRoot.innerHTML = ''; // Clear home preview if on QA page
      return;
    }

    if (homeRoot) {
      if (activeTab === 'home') {
        homeRoot.innerHTML = getHomePreviewHtml();
      } else {
        homeRoot.innerHTML = '';
      }
    }
  }

  function getHomePreviewHtml() {
    const recentQs = questionsData.slice(0, 3);
    return `
      <div class="jc-container max-w-7xl mx-auto px-4 py-8">
        <div class="my-12 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-1 block">গণতান্ত্রিক আলোচনা ও জিজ্ঞাসা</span>
              <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">জানতে চাই</h2>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1">শিক্ষা, সমাজ, রাজনীতি ও সমসাময়িক বিষয় নিয়ে সাম্প্রতিক প্রশ্নগুলো দেখুন।</p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="window.JC_openAskModal()" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-2 cursor-pointer">
                <span>➕</span> প্রশ্ন করুন
              </button>
              <button onclick="document.querySelector('#qa-nav-btn') ? document.querySelector('#qa-nav-btn').click() : window.JC_setTab('qa-list')" class="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-lg transition cursor-pointer">
                সব প্রশ্ন দেখুন →
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${recentQs.map(q => `
              <div onclick="window.JC_openDetail('${q.id}')" class="jc-card bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-1 text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-md">${q.category}</span>
                    <span class="text-xs text-zinc-500">${q.createdAt}</span>
                  </div>
                  <h3 class="font-bold text-base text-zinc-900 dark:text-white mb-2 line-clamp-2">${q.title}</h3>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4">${q.content}</p>
                </div>
                <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <span class="font-medium text-zinc-700 dark:text-zinc-300">👤 ${q.author}</span>
                  <span class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">💬 ${q.answerCount || 0}টি উত্তর</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  }

  function getListHtml() {
    return `
      <div class="py-6 space-y-8 animate-fadeIn">
        <div class="bg-gradient-to-r from-rose-900 via-rose-800 to-zinc-900 text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="relative z-10 max-w-3xl">
            <span class="px-3 py-1 bg-rose-700/80 text-rose-100 text-xs font-bold rounded-full uppercase tracking-wider">সমাজতান্ত্রিক ছাত্র ফ্রন্ট কমিউনিটি</span>
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4">জানতে চাই</h1>
            <p class="text-base md:text-lg text-rose-100 font-normal leading-relaxed mb-6">রাজনীতি, সমাজ, শিক্ষা ও সমসাময়িক বিষয় নিয়ে প্রশ্ন করুন, মতামত জানুন এবং গঠনমূলক আলোচনায় অংশ নিন।</p>
            <button onclick="window.JC_openAskModal()" class="px-6 py-3 bg-white text-rose-900 hover:bg-rose-50 font-bold rounded-xl shadow-lg transition flex items-center gap-2 text-sm cursor-pointer">
              <span>➕</span> আপনার প্রশ্ন করুন
            </button>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div class="w-full md:w-96 relative">
            <input type="text" id="jc-search-input" value="${searchQuery}" oninput="window.JC_setSearch(this.value)" placeholder="প্রশ্ন খুঁজুন..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600">
            <span class="absolute left-3.5 top-3 text-zinc-400">🔍</span>
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <span class="text-xs font-semibold text-zinc-500 whitespace-nowrap">সর্ট করুন:</span>
            <select id="jc-sort-select" onchange="window.JC_setSort(this.value)" class="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
              <option value="latest" ${currentSort==='latest'?'selected':''}>সর্বশেষ</option>
              <option value="popular" ${currentSort==='popular'?'selected':''}>জনপ্রিয়</option>
            </select>
          </div>
        </div>
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${categories.map(cat => `<button onclick="window.JC_setFilter('${cat}')" class="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${currentFilter === cat ? 'bg-rose-600 text-white shadow-md' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-rose-400'}">${cat}</button>`).join('')}
        </div>
        <div class="space-y-4">
          ${filterQuestions().length === 0 ? `
            <div class="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div class="text-4xl mb-3">📭</div>
              <h3 class="text-lg font-bold text-zinc-800 dark:text-zinc-200">এখনও কোনো প্রশ্ন করা হয়নি</h3>
              <button onclick="window.JC_openAskModal()" class="mt-4 px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition">প্রশ্ন করুন</button>
            </div>
          ` : filterQuestions().map(q => `
            <div onclick="window.JC_openDetail('${q.id}')" class="jc-card bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="space-y-2 flex-1">
                <div class="flex items-center gap-3">
                  <span class="px-2.5 py-1 text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-md">${q.category}</span>
                  <span class="text-xs text-zinc-500">📅 ${q.createdAt}</span>
                  <span class="text-xs text-zinc-500">👤 ${q.author}</span>
                </div>
                <h2 class="text-lg md:text-xl font-bold text-zinc-900 dark:text-white hover:text-rose-600 transition">${q.title}</h2>
                <p class="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">${q.content}</p>
              </div>
              <div class="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
                <div class="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold">
                  <span>💬</span> ${q.answerCount || 0}টি উত্তর
                </div>
                <span class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline">বিস্তারিত দেখুন →</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function getDetailHtml() {
    const q = questionsData.find(item => item.id === selectedQuestionId);
    if (!q) return `<div class="p-8 text-center"><p>প্রশ্ন পাওয়া যায়নি।</p><button onclick="window.JC_setTab('qa-list')" class="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold">তালিকায় ফিরে যান</button></div>`;
    const userEmail = getUserEmail();
    const isSuper = userEmail === 'chitronbhattacharjee@gmail.com';
    return `
      <div class="py-6 space-y-8 animate-fadeIn max-w-4xl mx-auto">
        <button onclick="window.JC_setTab('qa-list')" class="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-2">
          <span>←</span> সব প্রশ্নে ফিরে যান
        </button>
        <div class="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-lg">${q.category}</span>
            <div class="flex items-center gap-3 text-xs text-zinc-500">
              <span>📅 ${q.createdAt}</span>
              ${(isSuper || q.authorEmail === userEmail) ? `<button onclick="window.JC_deleteQuestion('${q.id}')" class="text-rose-600 hover:underline font-bold">ডিলিট</button>` : ''}
            </div>
          </div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">${q.title}</h1>
          <div class="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span>👤 প্রশ্নকর্তা: ${q.author}</span>
          </div>
          <div class="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap pt-2">${q.content}</div>
          ${q.tags && q.tags.length ? `<div class="flex flex-wrap gap-1.5 pt-4">${q.tags.map(t => `<span class="px-2.5 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg">#${t}</span>`).join('')}</div>` : ''}
        </div>
        <div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white mb-4">${q.answers ? q.answers.length : 0}টি উত্তর</h3>
          <div class="space-y-4">
            ${(q.answers || []).map(a => `
              <div class="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div class="flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-3">
                  <div class="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    <span>${a.author}</span>
                    <span class="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span class="text-zinc-500 font-normal">${a.createdAt}</span>
                  </div>
                  ${(isSuper || a.authorEmail === userEmail) ? `<button onclick="window.JC_deleteAnswer('${q.id}', '${a.id}')" class="text-xs text-rose-600 font-bold hover:underline">ডিলিট</button>` : ''}
                </div>
                <div class="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">${a.content}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mt-8">
          <h3 class="font-bold text-zinc-900 dark:text-white mb-4">আপনার উত্তর দিন</h3>
          <form onsubmit="window.JC_submitAnswer(event, '${q.id}')">
            <textarea id="jc-answer-content" rows="4" placeholder="আপনার গঠনমূলক উত্তর লিখুন..." class="w-full p-4 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600 mb-4" required></textarea>
            <div class="flex justify-end">
              <button type="submit" class="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow transition">উত্তর প্রকাশ করুন</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // Bind globals
  window.JC_setTab = function(tab) { activeTab = tab; renderView(); };
  window.JC_setFilter = function(filter) { currentFilter = filter; renderView(); };
  window.JC_setSort = function(sort) { currentSort = sort; renderView(); };
  window.JC_setSearch = function(query) { searchQuery = query; renderView(); };
  window.JC_openDetail = function(id) { selectedQuestionId = id; activeTab = 'qa-detail'; renderView(); };

  window.JC_promptLogin = function() {
    const loginBtn = document.querySelector('button[title="গুগল দিয়ে লগইন"]') || document.querySelector('.login-button') || document.querySelector('button');
    if (loginBtn) loginBtn.click();
  };

  window.JC_openAskModal = function() {
    const userEmail = getUserEmail();
    if (!userEmail) {
      alert('প্রশ্ন করার জন্য আপনাকে প্রথমে লগইন করতে হবে।');
      window.JC_promptLogin();
      return;
    }
    const existing = document.getElementById('jc-ask-modal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.id = 'jc-ask-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
    modal.innerHTML = `
      <div class="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 class="text-xl font-extrabold text-zinc-900 dark:text-white">নতুন প্রশ্ন করুন</h3>
          <button onclick="document.getElementById('jc-ask-modal').remove()" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-white text-lg font-bold cursor-pointer">✕</button>
        </div>
        <form onsubmit="window.JC_submitQuestion(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">প্রশ্নের শিরোনাম *</label>
            <input type="text" id="jc-q-title" placeholder="সংক্ষিপ্ত ও স্পষ্ট শিরোনাম দিন..." class="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600" required>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">বিভাগ নির্বাচন করুন *</label>
            <select id="jc-q-cat" class="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600">
              ${categories.filter(c => c !== 'সব').map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">প্রশ্নের বিস্তারিত বিবরণ *</label>
            <textarea id="jc-q-content" rows="5" placeholder="আপনার প্রশ্নটি বিস্তারিতভাবে লিখুন..." class="w-full p-3.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600" required></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)</label>
            <input type="text" id="jc-q-tags" placeholder="যেমন: শিক্ষা, রাজনীতি, ছাত্র আন্দোলন" class="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600">
          </div>
          <div class="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onclick="document.getElementById('jc-ask-modal').remove()" class="px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl hover:bg-zinc-300 transition cursor-pointer">বাতিল</button>
            <button type="submit" class="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer">প্রশ্ন প্রকাশ করুন</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  };

  window.JC_submitQuestion = async function(e) {
    e.preventDefault();
    const title = document.getElementById('jc-q-title').value.trim();
    const category = document.getElementById('jc-q-cat').value;
    const content = document.getElementById('jc-q-content').value.trim();
    const tagsRaw = document.getElementById('jc-q-tags').value;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    const userEmail = getUserEmail();
    if (!title || !content) { alert('দয়া করে শিরোনাম এবং বিস্তারিত বিবরণ পূরণ করুন।'); return; }
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: { title, content, category, tags, author: userEmail.split('@')[0] }, userEmail })
      });
      if (res.ok) {
        alert('আপনার প্রশ্নটি সফলভাবে প্রকাশ করা হয়েছে!');
        document.getElementById('jc-ask-modal').remove();
        fetchQuestions();
        activeTab = 'qa-list';
      } else {
        const err = await res.json();
        alert(err.error || 'প্রশ্ন প্রকাশ করতে ব্যর্থ হয়েছে।');
      }
    } catch (err) { alert('নেটওয়ার্ক ত্রুটি ঘটেছে।'); }
  };

  window.JC_submitAnswer = async function(e, qId) {
    e.preventDefault();
    const content = document.getElementById('jc-answer-content').value.trim();
    const userEmail = getUserEmail();
    if (!content) return;
    try {
      const res = await fetch(`/api/questions/${qId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: { content }, userEmail, authorName: userEmail.split('@')[0] })
      });
      if (res.ok) {
        alert('আপনার উত্তর সফলভাবে যুক্ত হয়েছে!');
        fetchQuestions();
      } else {
        const err = await res.json();
        alert(err.error || 'উত্তর দিতে ব্যর্থ হয়েছে।');
      }
    } catch (err) { alert('নেটওয়ার্ক ত্রুটি ঘটেছে।'); }
  };

  window.JC_deleteQuestion = async function(qId) {
    if (!confirm('আপনি কি নিশ্চিত যে এই প্রশ্নটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/questions/${qId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userEmail: getUserEmail() }) });
      if (res.ok) { alert('প্রশ্নটি সফলভাবে ডিলিট করা হয়েছে।'); activeTab = 'qa-list'; fetchQuestions(); }
      else alert('ডিলিট করার অনুমতি নেই।');
    } catch (e) { alert('ত্রুটি ঘটেছে।'); }
  };

  window.JC_deleteAnswer = async function(qId, aId) {
    if (!confirm('আপনি কি এই উত্তরটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/questions/${qId}/answers/${aId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userEmail: getUserEmail() }) });
      if (res.ok) { alert('উত্তরটি ডিলিট করা হয়েছে।'); fetchQuestions(); }
      else alert('ডিলিট করার অনুমতি নেই।');
    } catch (e) { alert('ত্রুটি ঘটেছে।'); }
  };

  // Force a re-render when DOM changes so QA root is detected
  const observer = new MutationObserver(() => {
    const qaRoot = document.getElementById('qa-react-root');
    const homeRoot = document.getElementById('jante-chai-app-root');
    
    if (qaRoot && !qaRoot.hasChildNodes()) {
      renderView();
    } else if (!qaRoot && activeTab !== 'home') {
      activeTab = 'home';
      renderView();
    } else if (homeRoot && !homeRoot.hasChildNodes() && activeTab === 'home') {
      renderView();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  fetchQuestions();
  setInterval(fetchQuestions, 15000);
})();
