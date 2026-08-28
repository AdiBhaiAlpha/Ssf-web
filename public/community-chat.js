// Community Chat Real-Time System for সমাজতান্ত্রিক ছাত্র ফ্রন্ট
(function() {
  if (window.SSFCommunityChatInitialized) return;
  window.SSFCommunityChatInitialized = true;

  const CSS = `
    .ssf-chat-launcher {
      position: fixed;
      bottom: 130px;
      right: 20px;
      z-index: 9998;
      background: #e11d48;
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(225, 29, 72, 0.4);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s;
    }
    .ssf-chat-launcher:hover {
      transform: scale(1.08);
      background: #be123c;
    }
    .ssf-chat-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ffffff;
      color: #e11d48;
      font-size: 11px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      border: 2px solid #e11d48;
    }
    .ssf-chat-popup {
      position: fixed;
      bottom: 190px;
      right: 20px;
      width: 380px;
      max-width: calc(100vw - 40px);
      height: 540px;
      max-height: calc(100vh - 160px);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
      border: 1px solid rgba(225, 29, 72, 0.15);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Hind Siliguri', sans-serif;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ssf-chat-popup.minimized {
      height: 60px;
      overflow: hidden;
    }
    .ssf-chat-popup.expanded {
      position: fixed;
      inset: 20px;
      width: auto;
      height: auto;
      max-width: 900px;
      max-height: 90vh;
      margin: auto;
    }
    @media (max-width: 640px) {
      .ssf-chat-popup {
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        height: 100vh;
        max-height: 100dvh;
        border-radius: 0;
      }
      .ssf-chat-popup.expanded {
        inset: 0;
        max-width: 100%;
        max-height: 100dvh;
        border-radius: 0;
      }
      .ssf-chat-launcher {
        bottom: 70px;
        right: 16px;
      }
    }
    .ssf-chat-header {
      background: #18181b;
      color: #ffffff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #27272a;
    }
    .ssf-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scroll-behavior: smooth;
    }
    .ssf-msg-card {
      display: flex;
      flex-direction: column;
      max-width: 85%;
      animation: ssfFadeIn 0.2s ease;
    }
    .ssf-msg-card.mine {
      align-self: flex-end;
    }
    .ssf-msg-card.theirs {
      align-self: flex-start;
    }
    .ssf-msg-bubble {
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
      position: relative;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .ssf-msg-card.mine .ssf-msg-bubble {
      background: #e11d48;
      color: #ffffff;
      border-top-right-radius: 2px;
    }
    .ssf-msg-card.theirs .ssf-msg-bubble {
      background: #ffffff;
      color: #18181b;
      border: 1px solid #e4e4e7;
      border-top-left-radius: 2px;
    }
    .ssf-chat-composer {
      padding: 12px 16px;
      background: #ffffff;
      border-top: 1px solid #e4e4e7;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ssf-emoji-picker {
      position: absolute;
      bottom: 70px;
      left: 16px;
      background: white;
      border: 1px solid #e4e4e7;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      z-index: 10000;
      max-width: 260px;
    }
    .ssf-emoji-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.1s;
    }
    .ssf-emoji-btn:hover {
      background: #f4f4f5;
    }
    @keyframes ssfFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.innerHTML = CSS;
  document.head.appendChild(styleEl);

  const container = document.createElement("div");
  container.id = "ssf-community-chat-root";
  document.body.appendChild(container);

  let isOpen = false;
  let isMinimized = false;
  let isExpanded = false;
  let messages = [];
  let unreadCount = 0;
  let userEmail = localStorage.getItem("userEmail") || "";
  let userName = localStorage.getItem("userName") || userEmail.split("@")[0] || "অতিথি";
  let userAvatar = localStorage.getItem("userAvatar") || "";
  let textInput = "";
  let replyTo = null;
  let activeAttachment = null;
  let showEmojiPicker = false;
  let showNewMsgBtn = false;
  let isNearBottom = true;
  let isSubmitting = false;

  async function fetchMessages() {
    try {
      const res = await fetch("/api/chat/messages");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          if (data.length > messages.length && messages.length > 0) {
            const newCount = data.length - messages.length;
            if (!isOpen || isMinimized) {
              unreadCount += newCount;
            } else if (!isNearBottom) {
              showNewMsgBtn = true;
            }
          }
          messages = data;
          render();
        }
      }
    } catch (err) {
      console.error("Failed to fetch chat messages:", err);
    }
  }

  setInterval(fetchMessages, 3000);
  fetchMessages();

  function getCurrentUser() {
    userEmail = localStorage.getItem("userEmail") || "";
    userName = localStorage.getItem("userName") || localStorage.getItem("authorName") || userEmail.split("@")[0] || "সদস্য";
    userAvatar = localStorage.getItem("userAvatar") || "";
    return { userEmail, userName, userAvatar };
  }

  async function sendMessage() {
    const { userEmail, userName, userAvatar } = getCurrentUser();
    if (!userEmail) {
      alert("চ্যাট করতে হলে প্রথমে ওয়েবসাইট বা প্রোফাইলে লগইন করুন।");
      if (window.JC_openLoginModal) window.JC_openLoginModal();
      return;
    }
    if (!textInput.trim() && !activeAttachment) return;
    if (isSubmitting) return;

    isSubmitting = true;
    render();

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textInput.trim() || (activeAttachment ? `[ফাইল: ${activeAttachment.name}]` : ""),
          userEmail,
          userName,
          userAvatar,
          replyTo: replyTo ? replyTo.id : null,
          attachment: activeAttachment
        })
      });
      if (res.ok) {
        textInput = "";
        replyTo = null;
        activeAttachment = null;
        await fetchMessages();
        scrollToBottom(true);
      } else {
        const err = await res.json();
        alert(err.error || "মেসেজ পাঠানো সম্ভব হয়নি।");
      }
    } catch (e) {
      console.error("Send message error:", e);
      alert("নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।");
    } finally {
      isSubmitting = false;
      render();
    }
  }

  async function handleFileUpload(file) {
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
  }

  async function deleteMessage(id) {
    const { userEmail } = getCurrentUser();
    if (!confirm("আপনি কি এই মেসেজটি মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/chat/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", userEmail })
      });
      if (res.ok) {
        await fetchMessages();
      } else {
        const err = await res.json();
        alert(err.error || "অনুমতি নেই।");
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  }

  async function reportMessage(id) {
    const { userEmail } = getCurrentUser();
    if (!userEmail) {
      alert("রিপোর্ট করতে লগইন করুন।");
      return;
    }
    try {
      await fetch(`/api/chat/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "report", userEmail })
      });
      alert("মেসেজটি মডারেটরদের কাছে রিপোর্ট করা হয়েছে।");
      await fetchMessages();
    } catch (e) {
      console.error("Report error:", e);
    }
  }

  async function moderateHide(id) {
    const { userEmail } = getCurrentUser();
    try {
      await fetch(`/api/chat/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "moderateHide", userEmail })
      });
      await fetchMessages();
    } catch (e) {
      console.error("Moderate hide error:", e);
    }
  }

  function scrollToBottom(force = false) {
    setTimeout(() => {
      const msgList = document.getElementById("ssf-chat-msg-list");
      if (msgList) {
        msgList.scrollTop = msgList.scrollHeight;
        showNewMsgBtn = false;
      }
    }, 50);
  }

  function render() {
    const { userEmail } = getCurrentUser();
    const isSuper = userEmail === "chitronbhattacharjee@gmail.com" || userEmail === "tanij@gmail.com";

    container.innerHTML = `
      <button class="ssf-chat-launcher" id="ssf-launcher-btn" title="কমিউনিটি চ্যাট">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        ${unreadCount > 0 ? `<span class="ssf-chat-badge">${unreadCount}</span>` : ""}
      </button>

      ${isOpen ? `
        <div class="ssf-chat-popup ${isMinimized ? "minimized" : ""} ${isExpanded ? "expanded" : ""}">
          <div class="ssf-chat-header">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></div>
              <div>
                <h4 style="margin: 0; font-size: 14px; font-weight: 700; font-family: 'Bornopata Bold', sans-serif;">কমিউনিটি চ্যাট</h4>
                <p style="margin: 0; font-size: 10.5px; color: #a1a1aa;">সদস্য ও শুভানুধ্যায়ীদের উন্মুক্ত মঞ্চ</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button id="ssf-minimize-btn" style="background: none; border: none; color: #a1a1aa; cursor: pointer; padding: 4px;" title="ছোট করুন">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <button id="ssf-expand-btn" style="background: none; border: none; color: #a1a1aa; cursor: pointer; padding: 4px;" title="${isExpanded ? "ছোট স্ক্রিন" : "বড় স্ক্রিন"}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${isExpanded ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>' : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'}
                </svg>
              </button>
              <button id="ssf-close-btn" style="background: none; border: none; color: #a1a1aa; cursor: pointer; padding: 4px;" title="বন্ধ করুন">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          ${!isMinimized ? `
            <div class="ssf-chat-messages" id="ssf-chat-msg-list">
              ${messages.length === 0 ? `
                <div style="text-align: center; color: #71717a; padding: 40px 20px; font-size: 13px;">
                  <p style="font-weight: bold; margin-bottom: 4px;">কোনো মেসেজ নেই</p>
                  <p style="font-size: 11.5px; color: #a1a1aa;">প্রথম মেসেজ পাঠিয়ে কমিউনিটি চ্যাট শুরু করুন!</p>
                </div>
              ` : messages.map(m => {
                const isMine = m.userEmail === userEmail;
                const timeStr = new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return `
                  <div class="ssf-msg-card ${isMine ? "mine" : "theirs"}">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px; font-size: 11px; color: #71717a; padding: 0 4px;">
                      <span style="font-weight: 600; color: #3f3f46;">${m.userName}</span>
                      <span>•</span>
                      <span>${timeStr}</span>
                      ${m.editedAt ? '<span style="font-size: 9.5px; font-style: italic;">(এডিট করা)</span>' : ""}
                    </div>
                    <div class="ssf-msg-bubble">
                      ${m.text}
                      ${m.attachment ? `
                        <div style="margin-top: 6px;">
                          ${m.attachment.type === "image" ? `
                            <a href="${m.attachment.url}" target="_blank">
                              <img src="${m.attachment.url}" alt="Attachment" style="max-width: 100%; border-radius: 8px; max-height: 160px; object-fit: cover;" />
                            </a>
                          ` : `
                            <a href="${m.attachment.url}" target="_blank" style="display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.06); padding: 6px 10px; border-radius: 6px; color: inherit; font-size: 12px; text-decoration: none;">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              <span>${m.attachment.name}</span>
                            </a>
                          `}
                        </div>
                      ` : ""}
                    </div>
                    <div style="display: flex; gap: 8px; font-size: 10px; color: #a1a1aa; margin-top: 2px; padding: 0 4px; ${isMine ? "justify-content: flex-end;" : ""}">
                      <button onclick="window.SSF_replyMsg('${m.id}')" style="background:none; border:none; color:inherit; cursor:pointer;" title="রিপ্লাই">রিপ্লাই</button>
                      <button onclick="window.SSF_reportMsg('${m.id}')" style="background:none; border:none; color:inherit; cursor:pointer;" title="রিপোর্ট">রিপোর্ট</button>
                      ${isMine || isSuper ? `<button onclick="window.SSF_deleteMsg('${m.id}')" style="background:none; border:none; color:#e11d48; cursor:pointer;" title="ডিলিট">ডিলিট</button>` : ""}
                      ${isSuper && !m.isModerated ? `<button onclick="window.SSF_modHide('${m.id}')" style="background:none; border:none; color:#f59e0b; cursor:pointer;" title="লুকান">লুকান</button>` : ""}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            ${showNewMsgBtn ? `
              <div style="position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); background: #18181b; color: white; padding: 6px 14px; border-radius: 20px; font-size: 11px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" id="ssf-new-msg-badge">
                ↓ নতুন মেসেজ এসেছে
              </div>
            ` : ""}

            <div class="ssf-chat-composer">
              ${!userEmail ? `
                <div style="background: #fef2f2; border: 1px solid #fee2e2; padding: 8px 12px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #991b1b;">
                  <span>চ্যাট করতে লগইন করা প্রয়োজন</span>
                  <button onclick="if(window.JC_openLoginModal) window.JC_openLoginModal(); else alert('দয়া করে ওয়েবসাইট থেকে লগইন করুন।');" style="background: #e11d48; color: white; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: bold;">লগইন করুন</button>
                </div>
              ` : `
                ${activeAttachment ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; background: #f4f4f5; padding: 6px 10px; border-radius: 6px; font-size: 11.5px;">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📎 ${activeAttachment.name}</span>
                    <button onclick="window.SSF_removeAttachment()" style="background:none; border:none; color:#ef4444; cursor:pointer; font-weight:bold;">✕</button>
                  </div>
                ` : ""}

                <div style="display: flex; align-items: center; gap: 8px; position: relative;">
                  <button id="ssf-emoji-toggle" style="background: none; border: none; color: #71717a; cursor: pointer; padding: 4px;" title="ইমোজি">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  </button>

                  <label style="cursor: pointer; color: #71717a; display: flex; align-items: center; padding: 4px;" title="ফাইল বা ছবি সংযুক্ত করুন">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    <input type="file" id="ssf-file-input" style="display: none;" accept="image/*,.pdf,.doc,.docx" />
                  </label>

                  <input type="text" id="ssf-msg-input" placeholder="মেসেজ লিখুন..." value="${textInput}" style="flex: 1; border: 1px solid #e4e4e7; padding: 8px 12px; border-radius: 8px; font-size: 13px; outline: none; font-family: inherit;" />

                  <button id="ssf-send-btn" style="background: #e11d48; color: white; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" title="পাঠান">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>

                ${showEmojiPicker ? `
                  <div class="ssf-emoji-picker" id="ssf-emoji-grid">
                    ${["😀","😂","❤️","👍","🎉","🔥","🙏","✊","⭐","📚","🚩","💡","✨","👋","👏","💯"].map(em => `
                      <button class="ssf-emoji-btn" onclick="window.SSF_insertEmoji('${em}')">${em}</button>
                    `).join("")}
                  </div>
                ` : ""}
              `}
            </div>
          ` : ""}
        </div>
      ` : ""}
    `;

    bindEvents();
  }

  function bindEvents() {
    const launcher = document.getElementById("ssf-launcher-btn");
    if (launcher) {
      launcher.onclick = () => {
        isOpen = !isOpen;
        if (isOpen) {
          unreadCount = 0;
          isMinimized = false;
        }
        render();
        if (isOpen) scrollToBottom(true);
      };
    }

    const closeBtn = document.getElementById("ssf-close-btn");
    if (closeBtn) {
      closeBtn.onclick = () => {
        isOpen = false;
        render();
      };
    }

    const minimizeBtn = document.getElementById("ssf-minimize-btn");
    if (minimizeBtn) {
      minimizeBtn.onclick = () => {
        isMinimized = !isMinimized;
        render();
      };
    }

    const expandBtn = document.getElementById("ssf-expand-btn");
    if (expandBtn) {
      expandBtn.onclick = () => {
        isExpanded = !isExpanded;
        render();
        scrollToBottom(true);
      };
    }

    const msgInput = document.getElementById("ssf-msg-input");
    if (msgInput) {
      msgInput.oninput = (e) => {
        textInput = e.target.value;
      };
      msgInput.onkeydown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };
      if (document.activeElement !== msgInput && textInput.length > 0) {
        msgInput.focus();
        msgInput.selectionStart = msgInput.selectionEnd = msgInput.value.length;
      }
    }

    const sendBtn = document.getElementById("ssf-send-btn");
    if (sendBtn) {
      sendBtn.onclick = () => sendMessage();
    }

    const emojiToggle = document.getElementById("ssf-emoji-toggle");
    if (emojiToggle) {
      emojiToggle.onclick = (e) => {
        e.stopPropagation();
        showEmojiPicker = !showEmojiPicker;
        render();
      };
    }

    const fileInput = document.getElementById("ssf-file-input");
    if (fileInput) {
      fileInput.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          handleFileUpload(e.target.files[0]);
        }
      };
    }

    const msgList = document.getElementById("ssf-chat-msg-list");
    if (msgList) {
      msgList.onscroll = () => {
        const threshold = 60;
        isNearBottom = msgList.scrollHeight - msgList.scrollTop - msgList.clientHeight <= threshold;
        if (isNearBottom) {
          showNewMsgBtn = false;
        }
      };
    }

    const newMsgBadge = document.getElementById("ssf-new-msg-badge");
    if (newMsgBadge) {
      newMsgBadge.onclick = () => {
        scrollToBottom(true);
      };
    }
  }

  window.SSF_insertEmoji = (em) => {
    textInput += em;
    showEmojiPicker = false;
    render();
  };
  window.SSF_removeAttachment = () => {
    activeAttachment = null;
    render();
  };
  window.SSF_replyMsg = (id) => {
    const m = messages.find(x => x.id === id);
    if (m) {
      replyTo = m;
      textInput = `@${m.userName} `;
      render();
    }
  };
  window.SSF_deleteMsg = (id) => deleteMessage(id);
  window.SSF_reportMsg = (id) => reportMessage(id);
  window.SSF_modHide = (id) => moderateHide(id);

  render();
})();
