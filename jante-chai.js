(function() {
  'use strict';

  let questionsData = [];
  let currentFilter = 'সব';
  let currentSort = 'latest';
  let searchQuery = '';
  let activeTab = 'qa-list';
  let selectedQuestionId = null;
  let isSubmitting = false;

  const categories = ['সব', 'রাজনীতি', 'শিক্ষা', 'সমাজ', 'অর্থনীতি', 'সংগঠন', 'আন্দোলন', 'ইতিহাস', 'আন্তর্জাতিক', 'অন্যান্য'];

  // ==========================================
  // PROFESSIONAL THEME-AWARE SVG ICONS (Lucide/Heroicons Style)
  // ==========================================
  const JC_ICONS = {
    plus: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/><path d="M12 5v14"/>
      </svg>
    `,
    search: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    `,
    user: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    `,
    calendar: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
      </svg>
    `,
    messageSquare: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `,
    arrowUp: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    `,
    flame: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    `,
    logIn: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>
      </svg>
    `,
    lock: (cls = 'w-6 h-6') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    `,
    trash: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
    `,
    penLine: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/>
      </svg>
    `,
    inbox: (cls = 'w-6 h-6') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    `,
    close: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    `,
    arrowLeft: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
      </svg>
    `,
    arrowRight: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    `,
    send: (cls = 'w-3.5 h-3.5') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
      </svg>
    `,
    helpCircle: (cls = 'w-4 h-4') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    `,
    tag: (cls = 'w-3 h-3') => `
      <svg xmlns="http://www.w3.org/2000/svg" class="${cls} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>
      </svg>
    `
  };

  // ==========================================
  // UNIFIED AUTHENTICATION HELPER
  // ==========================================
  function getCurrentUser() {
    let email = '';
    
    // 1. Check window global auth sync
    if (window.ssf_current_user_email && typeof window.ssf_current_user_email === 'string') {
      email = window.ssf_current_user_email.trim();
    }
    
    // 2. Check localStorage keys used across the app
    if (!email) {
      try {
        email = localStorage.getItem('admin-email') || 
                localStorage.getItem('ssf_user_email') || 
                localStorage.getItem('userEmail') || 
                sessionStorage.getItem('admin-email') || '';
        email = email ? email.trim() : '';
      } catch (e) {}
    }

    // 3. Fallback: Check Firebase Auth cached user in localStorage
    if (!email) {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('firebase:authUser:')) {
            const parsed = JSON.parse(localStorage.getItem(key));
            if (parsed && parsed.email) {
              email = parsed.email.trim();
              break;
            }
          }
        }
      } catch (e) {}
    }

    if (!email) return null;

    const lowerEmail = email.toLowerCase();
    let name = email.split('@')[0];
    let role = 'member';
    let roleName = 'সদস্য';
    let photo = '';
    let isSuperAdmin = false;

    // Check if Super Admin
    if (lowerEmail === 'chitronbhattacharjee@gmail.com') {
      name = 'চিত্রণ ভট্টাচার্য';
      role = 'super_admin';
      roleName = 'সুপার এডমিন';
      isSuperAdmin = true;
    } else {
      // Check members cache to find authentic comrade profile
      try {
        const cacheStr = localStorage.getItem('scf_database_cache');
        if (cacheStr) {
          const cache = JSON.parse(cacheStr);
          if (cache && Array.isArray(cache.memberships)) {
            const member = cache.memberships.find(m => m.email && m.email.toLowerCase() === lowerEmail);
            if (member) {
              if (member.name) name = member.name;
              if (member.role) {
                role = member.role;
                roleName = member.role === 'super_admin' ? 'সুপার এডমিন' : member.role === 'admin' ? 'সমন্বয়ক এডমিন' : 'সদস্য';
              }
              if (member.photo || member.googlePhoto) {
                photo = member.photo || member.googlePhoto;
              }
            }
          }
          if (cache && Array.isArray(cache.invitations)) {
            const inv = cache.invitations.find(i => i.email && i.email.toLowerCase() === lowerEmail && i.status === 'accepted');
            if (inv && inv.role) {
              role = inv.role;
              roleName = inv.role === 'super_admin' ? 'সুপার এডমিন' : 'সমন্বয়ক এডমিন';
              if (inv.role === 'super_admin') isSuperAdmin = true;
            }
          }
        }
      } catch (e) {}
    }

    return {
      email,
      name,
      role,
      roleName,
      photo,
      isSuperAdmin
    };
  }

  function getUserEmail() {
    const user = getCurrentUser();
    return user ? user.email : '';
  }

  // Export to window for instant access
  window.JC_getUser = getCurrentUser;
  window.JC_getUserEmail = getUserEmail;

  // ==========================================
  // API CALLS
  // ==========================================
  async function fetchQuestions() {
    try {
      const res = await fetch('/api/questions');
      if (res.ok) {
        questionsData = await res.json();
        renderView();
      }
    } catch (e) {
      console.warn('Failed to fetch questions:', e);
    }
  }

  function getMaxUpvotes() {
    if (!questionsData || !questionsData.length) return 0;
    let max = 0;
    for (let i = 0; i < questionsData.length; i++) {
      const v = questionsData[i].upvotes || 0;
      if (v > max) max = v;
    }
    return max;
  }

  function filterQuestions() {
    let filtered = [...questionsData];
    if (currentFilter !== 'সব') {
      filtered = filtered.filter(q => q.category === currentFilter);
    }
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        (q.title && q.title.toLowerCase().includes(lower)) || 
        (q.content && q.content.toLowerCase().includes(lower)) ||
        (q.tags && Array.isArray(q.tags) && q.tags.some(t => t.toLowerCase().includes(lower)))
      );
    }
    if (currentSort === 'popular') {
      // Sort by upvotes descending
      filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (currentSort === 'discussed') {
      // Sort by answer count descending
      filtered.sort((a, b) => (b.answerCount || (b.answers ? b.answers.length : 0)) - (a.answerCount || (a.answers ? a.answers.length : 0)));
    } else {
      // Sort by newest
      filtered.sort((a, b) => {
        const idA = String(a.id || '');
        const idB = String(b.id || '');
        return idB.localeCompare(idA);
      });
    }
    return filtered;
  }

  // ==========================================
  // UPVOTE HANDLER (OPTIMISTIC & PERSISTENT)
  // ==========================================
  window.JC_toggleUpvote = async function(qId, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const user = getCurrentUser();
    const userEmail = user ? user.email : '';

    // Find question locally for optimistic update
    const qIndex = questionsData.findIndex(q => q.id === qId);
    if (qIndex !== -1) {
      const q = questionsData[qIndex];
      if (typeof q.upvotes !== 'number') q.upvotes = 0;
      if (!Array.isArray(q.upvotedBy)) q.upvotedBy = [];

      const normalizedEmail = userEmail.toLowerCase().trim();
      const hasUpvoted = userEmail ? q.upvotedBy.some(em => em.toLowerCase() === normalizedEmail) : false;

      if (userEmail) {
        if (hasUpvoted) {
          q.upvotedBy = q.upvotedBy.filter(em => em.toLowerCase() !== normalizedEmail);
          q.upvotes = Math.max(0, q.upvotes - 1);
        } else {
          q.upvotedBy.push(normalizedEmail);
          q.upvotes += 1;
        }
      } else {
        q.upvotes += 1;
      }
      renderView();
    }

    try {
      const res = await fetch('/api/questions/' + encodeURIComponent(qId) + '/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail })
      });

      if (res.ok) {
        const data = await res.json();
        if (qIndex !== -1 && data) {
          questionsData[qIndex].upvotes = data.upvotes;
          questionsData[qIndex].upvotedBy = data.upvotedBy || [];
          renderView();
        }
      }
    } catch (err) {
      console.error('Failed to toggle upvote:', err);
      await fetchQuestions();
    }
  };

  // ==========================================
  // INJECT STYLES
  // ==========================================
  function injectStyles() {
    if (document.getElementById('jante-chai-styles')) return;
    const style = document.createElement('style');
    style.id = 'jante-chai-styles';
    style.innerHTML = `
      .jc-card { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease; }
      .jc-card:hover { transform: translateY(-2px); }
      .jc-modal-animate { animation: jcModalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      @keyframes jcModalIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .jc-fade-in { animation: jcFadeIn 0.3s ease-out forwards; }
      @keyframes jcFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .jc-upvote-btn { transition: all 0.15s ease; }
      .jc-upvote-btn:active { transform: scale(0.92); }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // UI RENDERERS
  // ==========================================
  function renderView() {
    injectStyles();

    const reactQaRoot = document.getElementById('qa-react-root');
    const homeRoot = document.getElementById('jante-chai-app-root');

    if (reactQaRoot) {
      if (activeTab === 'home') activeTab = 'qa-list';

      let html = '';
      if (activeTab === 'qa-list') {
        html = getListHtml();
      } else if (activeTab === 'qa-detail') {
        html = getDetailHtml();
      }
      reactQaRoot.innerHTML = html;

      if (homeRoot) homeRoot.innerHTML = '';
      return;
    }

    if (homeRoot) {
      homeRoot.innerHTML = getHomePreviewHtml();
    }
  }

  // ==========================================
  // HOME PREVIEW HTML (One UI Inspired, Theme-Aware)
  // ==========================================
  function getHomePreviewHtml() {
    const recentQs = questionsData.slice(0, 3);
    const user = getCurrentUser();
    const userEmail = user ? user.email.toLowerCase() : '';
    const maxUpvotes = getMaxUpvotes();

    return `
      <div class="max-w-7xl mx-auto px-4 py-6 jc-fade-in">
        <div class="bg-zinc-50/70 dark:bg-zinc-900/60 rounded-3xl p-6 md:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 text-xs font-bold mb-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-600 dark:text-rose-400 animate-pulse"></span>
                <span>গণতান্ত্রিক জিজ্ঞাসা ও মতবিনিময়</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">জানতে চাই</h2>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1">শিক্ষা, সমাজ, রাজনীতি ও সমসাময়িক বিষয় নিয়ে কমরেডদের সাম্প্রতিক আলোচনা ও প্রশ্নোত্তর।</p>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.JC_openAskModal()" class="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer">
                ${JC_ICONS.plus('w-4 h-4')}
                <span>প্রশ্ন করুন</span>
              </button>
              <button onclick="window.JC_navigateToQaTab()" class="px-4 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5">
                <span>সব প্রশ্ন (${questionsData.length})</span>
                ${JC_ICONS.arrowRight('w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500')}
              </button>
            </div>
          </div>

          ${recentQs.length === 0 ? `
            <div class="text-center py-10 bg-white dark:bg-zinc-900/80 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
              <div class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mx-auto flex items-center justify-center mb-2">
                ${JC_ICONS.inbox('w-5 h-5')}
              </div>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">এখনও কোনো প্রশ্ন করা হয়নি। আপনিই প্রথম প্রশ্নটি করুন!</p>
              <button onclick="window.JC_openAskModal()" class="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition cursor-pointer inline-flex items-center gap-1.5">
                ${JC_ICONS.plus('w-3.5 h-3.5')}
                <span>প্রশ্ন করুন</span>
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${recentQs.map(q => {
                const count = q.answerCount || (q.answers ? q.answers.length : 0);
                const upvotes = q.upvotes || 0;
                const isUpvoted = userEmail && Array.isArray(q.upvotedBy) && q.upvotedBy.some(em => em.toLowerCase() === userEmail);
                const isPopular = upvotes >= 3 && upvotes >= maxUpvotes - 1;

                return `
                  <div onclick="window.JC_openDetail('${q.id}')" class="jc-card ${isPopular ? 'bg-gradient-to-br from-amber-50/30 via-white to-white dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 border-amber-200/90 dark:border-amber-900/50' : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/90'} p-5 rounded-2xl border shadow-xs cursor-pointer flex flex-col justify-between hover:border-rose-300 dark:hover:border-zinc-700">
                    <div>
                      <div class="flex items-center justify-between mb-2.5">
                        <div class="flex items-center gap-1.5">
                          <span class="px-2.5 py-0.5 text-[11px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100/60 dark:border-rose-900/40 rounded-md inline-flex items-center gap-1">
                            ${JC_ICONS.tag('w-2.5 h-2.5 opacity-75')}
                            <span>${escapeHtml(q.category || 'অন্যান্য')}</span>
                          </span>
                          ${isPopular ? `
                            <span class="px-2 py-0.5 text-[10px] font-extrabold bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 rounded-md inline-flex items-center gap-1">
                              ${JC_ICONS.flame('w-3 h-3 text-amber-600 dark:text-amber-400')}
                              <span>জনপ্রিয়</span>
                            </span>
                          ` : ''}
                        </div>
                        <span class="inline-flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                          ${JC_ICONS.calendar('w-3 h-3')}
                          <span>${escapeHtml(q.createdAt || '')}</span>
                        </span>
                      </div>
                      <h3 class="font-bold text-sm md:text-base text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-2 hover:text-rose-600 transition">${escapeHtml(q.title)}</h3>
                      <p class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">${escapeHtml(q.content)}</p>
                    </div>
                    <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                      <span class="inline-flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300 text-[11px]">
                        <span class="text-zinc-400 dark:text-zinc-500">${JC_ICONS.user('w-3 h-3')}</span>
                        <span>${escapeHtml(q.author || 'সদস্য')}</span>
                      </span>
                      <div class="flex items-center gap-1.5">
                        <!-- Upvote Button -->
                        <button 
                          onclick="window.JC_toggleUpvote('${q.id}', event)" 
                          class="jc-upvote-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${isUpvoted ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-2xs' : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'}"
                          title="${isUpvoted ? 'আপভোট প্রত্যাহার করুন' : 'আপভোট দিন'}"
                        >
                          <span class="${isUpvoted ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-400 dark:text-zinc-500'}">
                            ${JC_ICONS.arrowUp('w-3 h-3')}
                          </span>
                          <span>${upvotes}</span>
                        </button>
                        <span class="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                          <span class="text-zinc-400 dark:text-zinc-500">${JC_ICONS.messageSquare('w-3 h-3')}</span>
                          <span>${count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ==========================================
  // Q&A LIST VIEW HTML (One UI Inspired, Light & Dark Mode Perfect)
  // ==========================================
  function getListHtml() {
    const filtered = filterQuestions();
    const user = getCurrentUser();
    const userEmail = user ? user.email.toLowerCase() : '';
    const maxUpvotes = getMaxUpvotes();

    return `
      <div class="py-6 space-y-6 jc-fade-in max-w-7xl mx-auto px-4">
        
        <!-- Hero Banner: Clean One UI Theme-Aware Header -->
        <div class="bg-gradient-to-br from-rose-50/70 via-white to-zinc-50/80 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 rounded-3xl p-6 md:p-10 border border-zinc-200/80 dark:border-zinc-800 shadow-xs relative overflow-hidden">
          
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="max-w-2xl space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60 text-xs font-bold">
                <span class="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400"></span>
                <span>সমাজতান্ত্রিক ছাত্র ফ্রন্ট • মুক্ত প্রশ্নোত্তর ও মতামত ফোরাম</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">জানতে চাই</h1>
              <p class="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                রাজনীতি, সমাজ, শিক্ষা ও বৈপ্লবিক মতাদর্শ নিয়ে প্রশ্ন করুন, মতামত জানুন, আপভোট দিয়ে গুরুত্বপূর্ণ প্রশ্নকে তুলে ধরুন এবং প্রগতিশীল গণতান্ত্রিক আলোচনায় অংশ নিন।
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              ${user ? `
                <div class="bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 px-4 py-2.5 rounded-2xl shadow-2xs flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <div class="text-left">
                    <p class="font-bold text-zinc-900 dark:text-white leading-none">${escapeHtml(user.name)}</p>
                    <p class="text-[10px] text-zinc-400 leading-tight mt-0.5">${escapeHtml(user.roleName)}</p>
                  </div>
                </div>
              ` : `
                <button onclick="window.JC_promptLogin()" class="px-4 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold rounded-2xl shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer">
                  ${JC_ICONS.logIn('w-4 h-4 text-zinc-600 dark:text-zinc-300')}
                  <span>লগইন করুন</span>
                </button>
              `}

              <button onclick="window.JC_openAskModal()" class="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 text-sm cursor-pointer">
                ${JC_ICONS.plus('w-4 h-4')}
                <span>আপনার প্রশ্ন করুন</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Search & Filter Controls -->
        <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white dark:bg-zinc-900 p-3.5 md:p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div class="w-full md:w-80 relative">
            <input type="text" id="jc-search-input" value="${escapeHtml(searchQuery)}" oninput="window.JC_setSearch(this.value)" placeholder="কী বিষয়ে জানতে চান? অনুসন্ধান করুন..." class="w-full pl-9 pr-4 py-2.5 text-xs md:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-rose-600 focus:bg-white transition">
            <span class="absolute left-3 top-3 text-zinc-400 dark:text-zinc-500 pointer-events-none">
              ${JC_ICONS.search('w-4 h-4')}
            </span>
          </div>

          <div class="flex items-center gap-2 justify-between md:justify-end overflow-x-auto">
            <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">ক্রমবিন্যাস:</span>
            <select id="jc-sort-select" onchange="window.JC_setSort(this.value)" class="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none focus:border-rose-600 cursor-pointer">
              <option value="latest" ${currentSort === 'latest' ? 'selected' : ''}>সর্বশেষ প্রশ্ন</option>
              <option value="popular" ${currentSort === 'popular' ? 'selected' : ''}>সর্বাধিক আপভোট (জনপ্রিয়)</option>
              <option value="discussed" ${currentSort === 'discussed' ? 'selected' : ''}>সর্বাধিক আলোচিত</option>
            </select>
          </div>
        </div>

        <!-- Category Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          ${categories.map(cat => {
            const isActive = currentFilter === cat;
            return `
              <button onclick="window.JC_setFilter('${cat}')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5 ${isActive ? 'bg-rose-600 text-white shadow-xs' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-zinc-700'}">
                ${cat !== 'সব' ? JC_ICONS.tag('w-3 h-3 opacity-70') : ''}
                <span>${cat}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Questions Feed -->
        <div class="space-y-3.5">
          ${filtered.length === 0 ? `
            <div class="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs p-6">
              <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-3">
                ${JC_ICONS.inbox('w-6 h-6')}
              </div>
              <h3 class="text-base font-bold text-zinc-800 dark:text-zinc-200">কোনো প্রশ্ন খুঁজে পাওয়া যায়নি</h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">আপনার কাঙ্ক্ষিত বিষয়ে নতুন প্রশ্ন করে আলোচনা শুরু করুন।</p>
              <button onclick="window.JC_openAskModal()" class="mt-4 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-2">
                ${JC_ICONS.plus('w-4 h-4')}
                <span>প্রশ্ন করুন</span>
              </button>
            </div>
          ` : filtered.map(q => {
            const count = q.answerCount || (q.answers ? q.answers.length : 0);
            const upvotes = q.upvotes || 0;
            const isUpvoted = userEmail && Array.isArray(q.upvotedBy) && q.upvotedBy.some(em => em.toLowerCase() === userEmail);
            const isPopular = upvotes >= 3 && upvotes >= maxUpvotes - 1;

            return `
              <div onclick="window.JC_openDetail('${q.id}')" class="jc-card ${isPopular ? 'bg-gradient-to-r from-amber-50/30 via-white to-white dark:from-amber-950/15 dark:via-zinc-900 dark:to-zinc-900 border-amber-200/90 dark:border-amber-900/40' : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/90'} p-5 md:p-6 rounded-2xl border shadow-xs hover:border-rose-300 dark:hover:border-zinc-700 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="px-2.5 py-0.5 text-[11px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100/60 dark:border-rose-900/40 rounded-md inline-flex items-center gap-1">
                      ${JC_ICONS.tag('w-2.5 h-2.5 opacity-75')}
                      <span>${escapeHtml(q.category || 'অন্যান্য')}</span>
                    </span>
                    ${isPopular ? `
                      <span class="px-2.5 py-0.5 text-[11px] font-extrabold bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-md inline-flex items-center gap-1 shadow-2xs">
                        ${JC_ICONS.flame('w-3.5 h-3.5 text-amber-600 dark:text-amber-400')}
                        <span>জনপ্রিয় প্রশ্ন</span>
                      </span>
                    ` : ''}
                    <span class="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                      ${JC_ICONS.calendar('w-3.5 h-3.5')}
                      <span>${escapeHtml(q.createdAt || '')}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      <span class="text-zinc-400 dark:text-zinc-500">${JC_ICONS.user('w-3.5 h-3.5')}</span>
                      <span>${escapeHtml(q.author || 'সদস্য')}</span>
                    </span>
                  </div>

                  <h2 class="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-rose-600 transition leading-snug">
                    ${escapeHtml(q.title)}
                  </h2>

                  <p class="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    ${escapeHtml(q.content)}
                  </p>

                  ${q.tags && Array.isArray(q.tags) && q.tags.length ? `
                    <div class="flex flex-wrap gap-1.5 pt-1">
                      ${q.tags.map(t => `<span class="px-2 py-0.5 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">#${escapeHtml(t)}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>

                <div class="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800 w-full md:w-auto justify-between md:justify-end">
                  <!-- Interactive Upvote Button -->
                  <button 
                    onclick="window.JC_toggleUpvote('${q.id}', event)" 
                    class="jc-upvote-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${isUpvoted ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-2xs' : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'}"
                    title="${isUpvoted ? 'আপভোট প্রত্যাহার করুন' : 'প্রশ্নটিতে আপভোট দিন'}"
                  >
                    <span class="${isUpvoted ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400'}">
                      ${JC_ICONS.arrowUp('w-3.5 h-3.5')}
                    </span>
                    <span>${upvotes}</span>
                    <span class="hidden sm:inline text-[11px] font-medium ${isUpvoted ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400'}">${isUpvoted ? 'সমর্থিত' : 'আপভোট'}</span>
                  </button>

                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <span class="text-zinc-400 dark:text-zinc-500">${JC_ICONS.messageSquare('w-3.5 h-3.5')}</span>
                    <span>${count}টি উত্তর</span>
                  </span>

                  <span class="text-xs font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1 hover:underline ml-1">
                    <span>আলোচনা</span>
                    ${JC_ICONS.arrowRight('w-3.5 h-3.5')}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // QUESTION DETAIL VIEW HTML
  // ==========================================
  function getDetailHtml() {
    const q = questionsData.find(item => item.id === selectedQuestionId);
    if (!q) {
      return `
        <div class="p-8 text-center max-w-md mx-auto my-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <div class="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mx-auto flex items-center justify-center mb-3">
            ${JC_ICONS.helpCircle('w-6 h-6')}
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 font-medium">প্রশ্নটি খুঁজে পাওয়া যায়নি বা মুছে ফেলা হয়েছে।</p>
          <button onclick="window.JC_setTab('qa-list')" class="mt-4 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-2">
            ${JC_ICONS.arrowLeft('w-4 h-4')}
            <span>প্রশ্নসমূহের তালিকায় ফিরে যান</span>
          </button>
        </div>
      `;
    }

    const user = getCurrentUser();
    const userEmail = user ? user.email.toLowerCase() : '';
    const isSuper = user && user.isSuperAdmin;
    const canDeleteQ = user && (isSuper || (user.email && user.email.toLowerCase() === (q.authorEmail || '').toLowerCase()));
    const answers = q.answers || [];
    const upvotes = q.upvotes || 0;
    const isUpvoted = userEmail && Array.isArray(q.upvotedBy) && q.upvotedBy.some(em => em.toLowerCase() === userEmail);
    const maxUpvotes = getMaxUpvotes();
    const isPopular = upvotes >= 3 && upvotes >= maxUpvotes - 1;

    return `
      <div class="py-6 space-y-6 jc-fade-in max-w-4xl mx-auto px-4">
        
        <!-- Navigation & Actions -->
        <div class="flex items-center justify-between">
          <button onclick="window.JC_setTab('qa-list')" class="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 shadow-2xs">
            ${JC_ICONS.arrowLeft('w-4 h-4')}
            <span>সব প্রশ্নে ফিরে যান</span>
          </button>

          <div class="flex items-center gap-2">
            <!-- Upvote Button in Detail View -->
            <button 
              onclick="window.JC_toggleUpvote('${q.id}', event)" 
              class="jc-upvote-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${isUpvoted ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-2xs' : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs'}"
              title="${isUpvoted ? 'আপভোট প্রত্যাহার করুন' : 'প্রশ্নটিতে আপভোট দিন'}"
            >
              <span class="${isUpvoted ? 'text-rose-600 dark:text-rose-400' : 'text-zinc-500 dark:text-zinc-400'}">
                ${JC_ICONS.arrowUp('w-4 h-4')}
              </span>
              <span>${upvotes} আপভোট</span>
              ${isUpvoted ? '<span class="text-[10px] bg-rose-200/60 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 px-1.5 py-0.5 rounded font-bold">সমর্থিত</span>' : ''}
            </button>

            ${canDeleteQ ? `
              <button onclick="window.JC_deleteQuestion('${q.id}')" class="px-3.5 py-2 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer">
                ${JC_ICONS.trash('w-3.5 h-3.5')}
                <span>মুছুন</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Main Question Card -->
        <div class="${isPopular ? 'bg-gradient-to-r from-amber-50/20 via-white to-white dark:from-amber-950/10 dark:via-zinc-900 dark:to-zinc-900 border-amber-200/80 dark:border-amber-900/40' : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800'} p-6 md:p-8 rounded-3xl border shadow-xs space-y-4">
          
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 rounded-lg inline-flex items-center gap-1">
                ${JC_ICONS.tag('w-3 h-3 opacity-75')}
                <span>${escapeHtml(q.category || 'অন্যান্য')}</span>
              </span>
              ${isPopular ? `
                <span class="px-2.5 py-1 text-xs font-extrabold bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-lg inline-flex items-center gap-1">
                  ${JC_ICONS.flame('w-3.5 h-3.5 text-amber-600 dark:text-amber-400')}
                  <span>জনপ্রিয় প্রশ্ন</span>
                </span>
              ` : ''}
            </div>
            <span class="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              ${JC_ICONS.calendar('w-3.5 h-3.5')}
              <span>${escapeHtml(q.createdAt || '')}</span>
            </span>
          </div>

          <h1 class="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">
            ${escapeHtml(q.title)}
          </h1>

          <div class="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span class="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
              ${JC_ICONS.user('w-3.5 h-3.5')}
            </span>
            <span class="font-bold text-zinc-900 dark:text-white">${escapeHtml(q.author || 'সদস্য')}</span>
            ${q.authorEmail ? `<span class="text-zinc-400 dark:text-zinc-500 text-[11px]">(${escapeHtml(q.authorEmail)})</span>` : ''}
          </div>

          <div class="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap pt-2">
            ${escapeHtml(q.content)}
          </div>

          ${q.tags && Array.isArray(q.tags) && q.tags.length ? `
            <div class="flex flex-wrap gap-1.5 pt-4">
              ${q.tags.map(t => `<span class="px-2.5 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg">#${escapeHtml(t)}</span>`).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Answers Section -->
        <div class="space-y-4 pt-2">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <span class="text-rose-600 dark:text-rose-400">${JC_ICONS.messageSquare('w-5 h-5')}</span>
              <span>উত্তর ও আলোচনা (${answers.length}টি)</span>
            </h3>
          </div>

          ${answers.length === 0 ? `
            <div class="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
              <div class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mx-auto flex items-center justify-center mb-2">
                ${JC_ICONS.messageSquare('w-5 h-5')}
              </div>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">এই প্রশ্নে এখনও কোনো উত্তর যুক্ত করা হয়নি। নিচে আপনার গঠনমূলক উত্তর দিন।</p>
            </div>
          ` : `
            <div class="space-y-3">
              ${answers.map(a => {
                const canDeleteA = user && (isSuper || (user.email && user.email.toLowerCase() === (a.authorEmail || '').toLowerCase()));
                return `
                  <div class="bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
                    <div class="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                      <div class="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                        <span class="w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                          ${JC_ICONS.user('w-3 h-3')}
                        </span>
                        <span>${escapeHtml(a.author || 'সদস্য')}</span>
                        <span class="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
                        <span class="inline-flex items-center gap-1 text-zinc-400 dark:text-zinc-500 font-normal text-[11px]">
                          ${JC_ICONS.calendar('w-3 h-3')}
                          <span>${escapeHtml(a.createdAt || '')}</span>
                        </span>
                      </div>
                      ${canDeleteA ? `
                        <button onclick="window.JC_deleteAnswer('${q.id}', '${a.id}')" class="text-xs text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1">
                          ${JC_ICONS.trash('w-3 h-3')}
                          <span>মুছুন</span>
                        </button>
                      ` : ''}
                    </div>
                    <div class="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                      ${escapeHtml(a.content)}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Submit Answer Form -->
        <div class="bg-white dark:bg-zinc-900 p-6 md:p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <h3 class="font-bold text-base text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span class="text-rose-600 dark:text-rose-400">${JC_ICONS.penLine('w-5 h-5')}</span>
            <span>আপনার উত্তর লিখুন</span>
          </h3>

          ${user ? `
            <div class="mb-3 px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 rounded-xl flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>আপনি উত্তর দিচ্ছেন: <strong class="text-zinc-900 dark:text-white">${escapeHtml(user.name)}</strong> (${escapeHtml(user.email)})</span>
            </div>

            <form onsubmit="window.JC_submitAnswer(event, '${q.id}')" class="space-y-3">
              <textarea id="jc-answer-content" rows="4" placeholder="আপনার তথ্যবহুল ও গঠনমূলক উত্তর লিখুন..." class="w-full p-4 text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-rose-600 focus:bg-white transition" required></textarea>
              <div class="flex justify-end">
                <button type="submit" id="jc-ans-submit-btn" class="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2">
                  ${JC_ICONS.send('w-3.5 h-3.5')}
                  <span>উত্তর প্রকাশ করুন</span>
                </button>
              </div>
            </form>
          ` : `
            <div class="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-3">
              <p class="text-sm text-zinc-600 dark:text-zinc-400 font-medium">আলোচনায় অংশ নিতে ও উত্তর দিতে অনুগ্রহ করে লগইন করুন।</p>
              <button type="button" onclick="window.JC_promptLogin()" class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer inline-flex items-center gap-2">
                ${JC_ICONS.logIn('w-4 h-4')}
                <span>গুগল দিয়ে লগইন করুন</span>
              </button>
            </div>
          `}
        </div>

      </div>
    `;
  }

  // ==========================================
  // MODAL / ACTIONS
  // ==========================================
  window.JC_openAskModal = function() {
    const user = getCurrentUser();

    // If NOT logged in, show login prompt modal
    if (!user) {
      showLoginRequiredModal();
      return;
    }

    // If logged in, IMMEDIATELY show the question submission modal
    const existing = document.getElementById('jc-ask-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'jc-ask-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4';
    modal.innerHTML = `
      <div class="jc-modal-animate bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 space-y-5">
        
        <div class="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 class="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">নতুন প্রশ্ন করুন</h3>
            <p class="text-xs text-zinc-500 mt-0.5">গঠনমূলক ও স্পষ্ট প্রশ্ন উপস্থাপন করুন</p>
          </div>
          <button onclick="document.getElementById('jc-ask-modal').remove()" class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition" title="বন্ধ করুন">
            ${JC_ICONS.close('w-4 h-4')}
          </button>
        </div>

        <div class="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>প্রশ্ন প্রকাশকারী: <strong>${escapeHtml(user.name)}</strong> (${escapeHtml(user.email)})</span>
        </div>

        <form onsubmit="window.JC_submitQuestion(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">প্রশ্নের শিরোনাম *</label>
            <input type="text" id="jc-q-title" placeholder="সংক্ষিপ্ত ও স্পষ্ট শিরোনাম দিন..." class="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600 focus:bg-white transition" required>
          </div>

          <div>
            <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">বিভাগ নির্বাচন করুন *</label>
            <select id="jc-q-cat" class="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600 font-medium">
              ${categories.filter(c => c !== 'সব').map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">প্রশ্নের বিস্তারিত বিবরণ *</label>
            <textarea id="jc-q-content" rows="4" placeholder="আপনার প্রশ্নটি বিস্তারিতভাবে লিখুন..." class="w-full p-4 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600 focus:bg-white transition" required></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)</label>
            <input type="text" id="jc-q-tags" placeholder="যেমন: শিক্ষা, রাজনীতি, ছাত্র আন্দোলন" class="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-rose-600">
          </div>

          <div class="flex justify-end gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onclick="document.getElementById('jc-ask-modal').remove()" class="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl hover:bg-zinc-200 transition cursor-pointer">
              বাতিল
            </button>
            <button type="submit" id="jc-q-submit-btn" class="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2">
              ${JC_ICONS.send('w-3.5 h-3.5')}
              <span>প্রশ্ন প্রকাশ করুন</span>
            </button>
          </div>
        </form>

      </div>
    `;
    document.body.appendChild(modal);
  };

  function showLoginRequiredModal() {
    const existing = document.getElementById('jc-login-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'jc-login-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4';
    modal.innerHTML = `
      <div class="jc-modal-animate bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
          ${JC_ICONS.lock('w-6 h-6')}
        </div>
        <div>
          <h3 class="text-lg font-bold text-zinc-900 dark:text-white">লগইন প্রয়োজন</h3>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            প্রশ্ন করতে বা মতামত প্রকাশ করতে অনুগ্রহ করে আপনার গুগল বা সদস্য অ্যাকাউন্ট দিয়ে লগইন করুন।
          </p>
        </div>
        <div class="flex flex-col gap-2 pt-2">
          <button onclick="document.getElementById('jc-login-modal').remove(); window.JC_promptLogin();" class="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2">
            ${JC_ICONS.logIn('w-4 h-4')}
            <span>গুগল দিয়ে লগইন করুন</span>
          </button>
          <button onclick="document.getElementById('jc-login-modal').remove()" class="w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-xl hover:bg-zinc-200 transition cursor-pointer">
            বাতিল
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.JC_promptLogin = function() {
    const loginBtn = document.querySelector('button[title="গুগল দিয়ে লগইন"]') || 
                     document.querySelector('.login-button') || 
                     document.querySelector('button');
    if (loginBtn) {
      loginBtn.click();
    }
  };

  window.JC_submitQuestion = async function(e) {
    e.preventDefault();
    if (isSubmitting) return;

    const user = getCurrentUser();
    if (!user) {
      showLoginRequiredModal();
      return;
    }

    const title = document.getElementById('jc-q-title').value.trim();
    const category = document.getElementById('jc-q-cat').value;
    const content = document.getElementById('jc-q-content').value.trim();
    const tagsRaw = document.getElementById('jc-q-tags').value;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (!title || !content) {
      alert('দয়া করে শিরোনাম এবং বিস্তারিত বিবরণ পূরণ করুন।');
      return;
    }

    const submitBtn = document.getElementById('jc-q-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'প্রকাশ হচ্ছে...';
    }
    isSubmitting = true;

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: {
            title,
            content,
            category,
            tags,
            author: user.name
          },
          userEmail: user.email
        })
      });

      if (res.ok) {
        const modal = document.getElementById('jc-ask-modal');
        if (modal) modal.remove();
        await fetchQuestions();
        activeTab = 'qa-list';
        renderView();
      } else {
        const err = await res.json();
        alert(err.error || 'প্রশ্ন প্রকাশ করতে ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      console.error(err);
      alert('নেটওয়ার্ক ত্রুটি ঘটেছে।');
    } finally {
      isSubmitting = false;
    }
  };

  window.JC_submitAnswer = async function(e, qId) {
    e.preventDefault();
    if (isSubmitting) return;

    const user = getCurrentUser();
    if (!user) {
      showLoginRequiredModal();
      return;
    }

    const contentInput = document.getElementById('jc-answer-content');
    const content = contentInput ? contentInput.value.trim() : '';

    if (!content) return;

    const submitBtn = document.getElementById('jc-ans-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'যুক্ত হচ্ছে...';
    }
    isSubmitting = true;

    try {
      const res = await fetch('/api/questions/' + encodeURIComponent(qId) + '/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: { content },
          userEmail: user.email,
          authorName: user.name
        })
      });

      if (res.ok) {
        if (contentInput) contentInput.value = '';
        await fetchQuestions();
      } else {
        const err = await res.json();
        alert(err.error || 'উত্তর দিতে ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      console.error(err);
      alert('নেটওয়ার্ক ত্রুটি ঘটেছে।');
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'উত্তর প্রকাশ করুন';
      }
    }
  };

  window.JC_deleteQuestion = async function(qId) {
    const user = getCurrentUser();
    if (!user) return;

    if (!confirm('আপনি কি নিশ্চিত যে এই প্রশ্নটি ডিলিট করতে চান?')) return;

    try {
      const res = await fetch('/api/questions/' + encodeURIComponent(qId), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email })
      });

      if (res.ok) {
        activeTab = 'qa-list';
        await fetchQuestions();
      } else {
        alert('ডিলিট করার অনুমতি নেই।');
      }
    } catch (e) {
      console.error(e);
      alert('ত্রুটি ঘটেছে।');
    }
  };

  window.JC_deleteAnswer = async function(qId, aId) {
    const user = getCurrentUser();
    if (!user) return;

    if (!confirm('আপনি কি এই উত্তরটি ডিলিট করতে চান?')) return;

    try {
      const res = await fetch('/api/questions/' + encodeURIComponent(qId) + '/answers/' + encodeURIComponent(aId), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email })
      });

      if (res.ok) {
        await fetchQuestions();
      } else {
        alert('ডিলিট করার অনুমতি নেই।');
      }
    } catch (e) {
      console.error(e);
      alert('ত্রুটি ঘটেছে।');
    }
  };

  window.JC_openDetail = function(id) {
    selectedQuestionId = id;
    activeTab = 'qa-detail';
    renderView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.JC_setTab = function(tab) {
    activeTab = tab;
    renderView();
  };

  window.JC_setFilter = function(filter) {
    currentFilter = filter;
    renderView();
  };

  window.JC_setSort = function(sort) {
    currentSort = sort;
    renderView();
  };

  window.JC_setSearch = function(query) {
    searchQuery = query;
    renderView();
  };

  window.JC_navigateToQaTab = function() {
    const navBtns = Array.from(document.querySelectorAll('button, a'));
    const qaBtn = navBtns.find(b => b.innerText && b.innerText.includes('জানতে চাই'));
    if (qaBtn) {
      qaBtn.click();
    } else {
      activeTab = 'qa-list';
      renderView();
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // REACTIVE LISTENERS & DOM OBSERVER
  // ==========================================
  window.addEventListener('storage', (e) => {
    if (e.key === 'admin-email' || e.key === 'ssf_user_email' || e.key === 'front-theme') {
      renderView();
    }
  });

  window.addEventListener('ssf_auth_state_changed', () => {
    renderView();
  });

  let renderDebounce = null;
  const observer = new MutationObserver(() => {
    if (renderDebounce) clearTimeout(renderDebounce);
    renderDebounce = setTimeout(() => {
      const qaRoot = document.getElementById('qa-react-root');
      const homeRoot = document.getElementById('jante-chai-app-root');

      if (qaRoot && !qaRoot.hasChildNodes()) {
        renderView();
      } else if (homeRoot && !homeRoot.hasChildNodes()) {
        renderView();
      }
    }, 40);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial Data Fetch
  fetchQuestions();
  setInterval(fetchQuestions, 15000);

})();
