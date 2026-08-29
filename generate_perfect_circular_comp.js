// Upgraded Circular Component GH
const fs = require('fs');

const ghCode = `
function GH({ circulars: n = [], isVerifiedMember: e = false, onSelectItem: t, isAdmin: lAdmin = false, onOpenPressReleaseCreator: lOpenPR = null, userEmail = "" }) {
  const toast = Nm();
  const [s, r] = Q.useState(null); // active expanded circular id
  const [unlockedCirculars, setUnlockedCirculars] = Q.useState({}); // map of circular id -> unlocked content/data
  const [passwordInputs, setPasswordInputs] = Q.useState({}); // map of circular id -> current password text
  const [verifyingId, setVerifyingId] = Q.useState(null);
  const [passwordErrors, setPasswordErrors] = Q.useState({});

  // URL query sync
  js.useEffect(() => {
    const l = new URLSearchParams(window.location.search);
    const d = l.get("circularId") || l.get("noticeId");
    if (d && n && n.length > 0 && n.some(h => h.id === d)) {
      r(d);
      setTimeout(() => {
        const h = document.getElementById("circular-" + d);
        if (h) h.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [n]);

  const toggleExpand = (l) => {
    if (s === l) {
      r(null);
      const d = new URLSearchParams(window.location.search);
      d.delete("circularId");
      d.delete("noticeId");
      const u = d.toString();
      const h = window.location.pathname + (u ? "?" + u : "");
      window.history.replaceState(null, "", h);
    } else {
      r(l);
      const d = new URLSearchParams(window.location.search);
      d.set("circularId", l);
      const u = window.location.pathname + "?" + d.toString();
      window.history.replaceState(null, "", u);
    }
  };

  const handlePasswordSubmit = async (circularItem) => {
    const cid = circularItem.id;
    const pwd = (passwordInputs[cid] || "").trim();
    if (!pwd) {
      setPasswordErrors(prev => ({ ...prev, [cid]: "অনুগ্রহ করে পাসওয়ার্ড দিন।" }));
      return;
    }

    setVerifyingId(cid);
    setPasswordErrors(prev => ({ ...prev, [cid]: "" }));

    try {
      const email = userEmail || window.ssf_current_user_email || localStorage.getItem("admin-email") || "";
      const res = await fetch("/api/circulars/" + cid + "/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd, userEmail: email })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "পাসওয়ার্ড ভুল হয়েছে!");
      }

      setUnlockedCirculars(prev => ({
        ...prev,
        [cid]: {
          content: data.content,
          pressReleaseData: data.pressReleaseData,
          image: data.image,
          pdfUrl: data.pdfUrl
        }
      }));
      toast.success("পাসওয়ার্ড সফলভাবে যাচাই করা হয়েছে! সংরক্ষিত সার্কুলারটি উন্মুক্ত হলো।");
    } catch (err) {
      console.error("Password verification failed:", err);
      setPasswordErrors(prev => ({ ...prev, [cid]: err.message }));
      toast.error(err.message);
    } finally {
      setVerifyingId(null);
    }
  };

  return i.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans",
    children: [
      // Header & PR Button
      i.jsxs("div", {
        className: "border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        children: [
          i.jsxs("div", {
            children: [
              i.jsxs("h1", {
                className: "text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white flex items-center space-x-2",
                children: [
                  i.jsx(pd, { className: "text-rose-600 w-7 h-7" }),
                  i.jsx("span", { children: "অফিসিয়াল সার্কুলার ও নোটিশ বোর্ড" })
                ]
              }),
              i.jsx("p", {
                className: "text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono",
                children: "ময়মনসিংহ জেলা সংসদ ও সংশ্লিষ্ট থানা/কলেজ শাখার নির্দেশাবলী এবং রেজোলিউশন আর্কাইভ"
              })
            ]
          }),
          (lAdmin || lOpenPR) && i.jsx("button", {
            type: "button",
            onClick: () => {
              if (lOpenPR) lOpenPR();
              else window.location.hash = "#press-release-creator";
            },
            className: "inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-all cursor-pointer select-none self-start sm:self-auto shrink-0",
            children: [
              i.jsx(pd, { className: "w-4 h-4 shrink-0" }),
              i.jsx("span", { children: "প্রেস রিলিজ তৈরি করুন" })
            ]
          })
        ]
      }),

      // Circulars List
      i.jsxs("div", {
        className: "max-w-4xl mx-auto space-y-4",
        children: [
          n.map(l => {
            const isExpanded = s === l.id;
            const isMemberLocked = l.isPrivate && !e;
            const isPasswordReq = l.isPrivate && (l.isPasswordProtected || l.hasPassword);
            const isUnlocked = Boolean(unlockedCirculars[l.id]);
            const unlockedData = unlockedCirculars[l.id] || {};
            const displayContent = isUnlocked && unlockedData.content ? unlockedData.content : l.content;
            const displayImage = isUnlocked && unlockedData.image ? unlockedData.image : l.image;
            const displayPdf = isUnlocked && unlockedData.pdfUrl ? unlockedData.pdfUrl : l.pdfUrl;

            return i.jsxs("div", {
              id: "circular-" + l.id,
              className: "bg-white dark:bg-zinc-950 border rounded-sm overflow-hidden transition-all duration-300 " + (
                isExpanded
                  ? (isMemberLocked ? "border-amber-500 ring-1 ring-amber-500/10 shadow-sm" : "border-rose-600 shadow-md ring-1 ring-rose-600/10")
                  : "border-zinc-200 dark:border-zinc-900 hover:border-zinc-350 dark:hover:border-zinc-800"
              ),
              children: [
                // Top Collapsible Header Card
                i.jsxs("div", {
                  onClick: () => {
                    if (t) t("circular", l.id);
                    toggleExpand(l.id);
                  },
                  className: "p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none",
                  children: [
                    i.jsxs("div", {
                      className: "flex items-start sm:items-center space-x-4 min-w-0 font-sans",
                      children: [
                        i.jsx("div", {
                          className: "p-2.5 rounded shrink-0 " + (
                            isMemberLocked
                              ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                              : l.category === "official"
                              ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600"
                              : l.category === "resolution"
                              ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600"
                              : "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                          ),
                          children: isMemberLocked
                            ? i.jsx(ch, { className: "w-5 h-5 animate-pulse" })
                            : i.jsx(lp, { className: "w-5 h-5" })
                        }),
                        i.jsxs("div", {
                          className: "min-w-0",
                          children: [
                            i.jsxs("div", {
                              className: "flex flex-wrap items-center gap-2 mb-1.5 font-sans text-xs",
                              children: [
                                i.jsxs("span", {
                                  className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded " + (
                                    isMemberLocked
                                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                      : l.category === "official"
                                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                                      : l.category === "resolution"
                                      ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                                      : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                  ),
                                  children: [
                                    isMemberLocked && "সংরক্ষিত নির্দেশনা",
                                    !isMemberLocked && (
                                      l.category === "official" ? "অফিসিয়াল সার্কুলার" :
                                      l.category === "resolution" ? "কমিটি রেজোলিউশন" :
                                      l.category === "press-release" ? "প্রেস বিজ্ঞপ্তি" : "সাধারণ নোটিশ"
                                    )
                                  ]
                                }),
                                l.isPrivate && i.jsx("span", {
                                  className: "text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded " + (
                                    e
                                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                      : "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                                  ),
                                  children: e ? "● সদস্য অ্যাক্সেস অনুমোদিত" : "🔒 শুধুমাত্র সদস্যের জন্য"
                                }),
                                isPasswordReq && i.jsx("span", {
                                  className: "text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700",
                                  children: isUnlocked ? "🔓 পাসওয়ার্ড ভেরিফাইড" : "🔐 পাসওয়ার্ড সুরক্ষিত"
                                }),
                                i.jsxs("span", {
                                  className: "text-[11px] text-zinc-400 font-mono flex items-center",
                                  children: [
                                    i.jsx(dd, { className: "w-3 h-3 mr-1" }),
                                    i.jsx("span", { children: l.date })
                                  ]
                                })
                              ]
                            }),
                            i.jsx("h3", {
                              className: "text-sm sm:text-base font-bold text-zinc-850 dark:text-white leading-snug",
                              children: l.title
                            })
                          ]
                        })
                      ]
                    }),
                    i.jsx("div", {
                      className: "text-zinc-400 select-none shrink-0",
                      children: isExpanded ? i.jsx(NE, { className: "w-5 h-5" }) : i.jsx(bE, { className: "w-5 h-5" })
                    })
                  ]
                }),

                // Collapsible Body Section
                i.jsx(Na, {
                  children: isExpanded && i.jsx($r.div, {
                    initial: { height: 0 },
                    animate: { height: "auto" },
                    exit: { height: 0 },
                    className: "overflow-hidden border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10",
                    children: i.jsx("div", {
                      className: "p-6 space-y-4",
                      children: isMemberLocked ? (
                        // Not logged in member prompt
                        i.jsxs("div", {
                          className: "bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded p-6 text-center space-y-4",
                          children: [
                            i.jsx(ch, { className: "w-10 h-10 text-amber-500 mx-auto" }),
                            i.jsxs("div", {
                              className: "max-w-md mx-auto space-y-2",
                              children: [
                                i.jsx("h4", {
                                  className: "text-sm font-bold text-zinc-900 dark:text-white font-sans",
                                  children: "এই কন্টেন্টের অ্যাক্সেস শুধুমাত্র ভেরিফাইড সদস্যদের জন্য সীমিত"
                                }),
                                i.jsx("p", {
                                  className: "text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed font-sans",
                                  children: 'এটি ময়মনসিংহ জেলা সংসদের একটি অভ্যন্তরীণ সাংগঠনিক বিবরণী বা সদস্যদের জন্য বিশেষ নোটিশ। প্রকাশনা ও নির্দেশিকার গোপনীয়তা বজায় রাখার স্বার্থে এর অ্যাক্সেস ব্লক রয়েছে। অ্যাক্সেস পেতে দয়া করে "মেম্বার পোর্টাল" ট্যাবে গিয়ে নিবন্ধিত ইমেইল দ্বরা লগইন করুন।'
                                })
                              ]
                            }),
                            i.jsxs("div", {
                              className: "pt-2 text-xs font-mono text-zinc-400",
                              children: ["নথি আইডি: ", l.id]
                            })
                          ]
                        })
                      ) : isPasswordReq && !isUnlocked ? (
                        // Member logged in, but password protection required & not yet unlocked
                        i.jsxs("div", {
                          className: "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 max-w-md mx-auto space-y-4 text-center",
                          children: [
                            i.jsx("div", { className: "w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold", children: "🔐" }),
                            i.jsxs("div", {
                              className: "space-y-1",
                              children: [
                                i.jsx("h4", { className: "text-sm font-bold text-zinc-900 dark:text-white", children: "সংরক্ষিত সার্কুলার পাসওয়ার্ড লক" }),
                                i.jsx("p", { className: "text-xs text-zinc-500", children: "এই বিশেষ সার্কুলারটি দেখতে সাংগঠনিক অ্যাক্সেস পাসওয়ার্ড দিন।" })
                              ]
                            }),
                            i.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                i.jsx("input", {
                                  type: "password",
                                  value: passwordInputs[l.id] || "",
                                  onChange: (ev) => {
                                    const val = ev.target.value;
                                    setPasswordInputs(prev => ({ ...prev, [l.id]: val }));
                                  },
                                  onKeyDown: (ev) => {
                                    if (ev.key === "Enter") handlePasswordSubmit(l);
                                  },
                                  placeholder: "পাসওয়ার্ড লিখুন...",
                                  className: "w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/20"
                                }),
                                passwordErrors[l.id] && i.jsx("p", {
                                  className: "text-[11px] text-rose-600 font-semibold text-left",
                                  children: passwordErrors[l.id]
                                }),
                                i.jsx("button", {
                                  type: "button",
                                  onClick: () => handlePasswordSubmit(l),
                                  disabled: verifyingId === l.id,
                                  className: "w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md transition-all cursor-pointer disabled:opacity-50",
                                  children: verifyingId === l.id ? "যাচাই করা হচ্ছে..." : "সার্কুলার আনলক করুন"
                                })
                              ]
                            })
                          ]
                        })
                      ) : (
                        // Content granted (Public, or Member unlocked)
                        i.jsxs(i.Fragment, {
                          children: [
                            i.jsxs("div", {
                              className: "flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono",
                              children: [
                                i.jsx(ch, { className: "w-3.5 h-3.5 shrink-0" }),
                                i.jsx("span", { children: "সংগঠন সদস্যদের জন্য সংরক্ষিত তথ্য নথি। কপিরাইট সংরক্ষিত।" })
                              ]
                            }),
                            i.jsx("div", {
                              className: "text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-sans border-l-2 border-zinc-300 dark:border-zinc-800 pl-4",
                              children: displayContent
                            }),
                            displayImage && i.jsx("div", {
                              className: "my-4 max-w-xl mx-auto rounded overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xs",
                              children: i.jsx("img", {
                                src: displayImage,
                                alt: l.title,
                                referrerPolicy: "no-referrer",
                                className: "w-full object-contain max-h-[500px]"
                              })
                            }),
                            displayPdf && displayPdf !== "#" && displayPdf !== "" && i.jsxs("div", {
                              className: "bg-rose-50/20 dark:bg-zinc-900 border border-rose-100/40 dark:border-zinc-800 p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-4 mt-2",
                              children: [
                                i.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    i.jsx("div", { className: "px-2 py-1 bg-rose-600 rounded text-[10px] font-bold text-white uppercase tracking-wider font-mono", children: "PDF Doc" }),
                                    i.jsx("span", { className: "text-xs text-zinc-700 dark:text-zinc-300 font-sans font-semibold", children: "অফিসিয়াল সার্কুলার ফাইল" })
                                  ]
                                }),
                                i.jsxs("div", {
                                  className: "flex gap-2 w-full sm:w-auto shrink-0",
                                  children: [
                                    i.jsx("a", {
                                      href: displayPdf,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "flex-1 sm:flex-none text-center px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded transition text-nowrap select-none",
                                      children: "পিডিএফ দেখুন"
                                    }),
                                    i.jsx("a", {
                                      href: displayPdf,
                                      download: true,
                                      className: "flex-1 sm:flex-none text-center px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold rounded border border-zinc-700 transition text-nowrap",
                                      children: "ডাউনলোড"
                                    })
                                  ]
                                })
                              ]
                            }),
                            i.jsxs("div", {
                              className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-855 rounded-sm p-4 text-xs font-mono flex flex-col sm:flex-row justify-between items-center gap-3",
                              children: [
                                i.jsxs("span", { children: ["ডকুমেন্ট আইডি: ", l.id] }),
                                i.jsx("div", {
                                  className: "flex space-x-2 text-rose-600 dark:text-rose-400 font-sans font-bold",
                                  children: i.jsx("span", { children: "ময়মনসিংহ জেলা সংসদ" })
                                })
                              ]
                            })
                          ]
                        })
                      )
                    })
                  })
                })
              ]
            }, l.id);
          }),
          n.length === 0 && i.jsx("div", {
            className: "p-16 border border-dashed rounded text-center text-zinc-400",
            children: "এই মুহূর্তে নোটিশ বোর্ডে কোনো সার্কুলার নেই।"
          })
        ]
      })
    ]
  });
}
`;

fs.writeFileSync('circular_comp.js', ghCode, 'utf8');
console.log('Saved upgraded circular_comp.js successfully!');
