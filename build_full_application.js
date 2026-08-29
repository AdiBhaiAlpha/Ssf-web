// Script to build upgraded PressReleaseCreatorComp, SaradeshPageComp, Circulars GH component, and Admin BQ component
const fs = require('fs');

const bundlePath = './assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Initial bundle length:', bundle.length);

// 1. Saradesh Page Component Definition
const saradeshCompCode = `
function SaradeshPageComp({ news = [], onSelectItem, globalSearchQuery = "", setGlobalSearchQuery = null }) {
  const [selectedRegion, setSelectedRegion] = Q.useState("all");
  const [localSearch, setLocalSearch] = Q.useState(globalSearchQuery || "");

  const regions = [
    { id: "all", label: "সকল অঞ্চল" },
    { id: "ঢাকা", label: "ঢাকা" },
    { id: "ময়মনসিংহ", label: "ময়মনসিংহ" },
    { id: "চট্টগ্রাম", label: "চট্টগ্রাম" },
    { id: "রাজশাহী", label: "রাজশাহী" },
    { id: "সিলেট", label: "সিলেট" },
    { id: "খুলনা", label: "খুলনা" },
    { id: "বরিশাল", label: "বরিশাল" },
    { id: "রংপুর", label: "রংপুর" },
    { id: "অন্যান্য", label: "অন্যান্য" }
  ];

  // Filter news for saradesh section or nationwide tags
  const saradeshNews = (news || []).filter(item => {
    const isSaradesh = item.section === "saradesh" || 
      (item.tags && item.tags.some(t => t.includes("সারাদেশ") || t.includes("জাতীয়") || t.includes("কেন্দ্রীয়"))) ||
      item.category === "national";
    
    if (!isSaradesh) return false;

    if (selectedRegion !== "all") {
      const matchRegion = (item.region && item.region.includes(selectedRegion)) ||
        (item.title && item.title.includes(selectedRegion)) ||
        (item.content && item.content.includes(selectedRegion)) ||
        (item.tags && item.tags.some(t => t.includes(selectedRegion)));
      if (!matchRegion) return false;
    }

    if (localSearch && localSearch.trim()) {
      const q = localSearch.trim().toLowerCase();
      const matchSearch = (item.title && item.title.toLowerCase().includes(q)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    return true;
  });

  const featuredItem = saradeshNews.find(item => item.isFeatured) || saradeshNews[0];
  const listItems = featuredItem ? saradeshNews.filter(item => item.id !== featuredItem.id) : saradeshNews;

  return i.jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans",
    children: [
      // Header Banner
      i.jsxs("div", {
        className: "border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
        children: [
          i.jsxs("div", {
            children: [
              i.jsxs("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                  i.jsx("span", { className: "px-2 py-0.5 bg-rose-600 text-white text-[11px] font-bold rounded uppercase tracking-wider", children: "জাতীয় ও আঞ্চলিক" }),
                  i.jsx("span", { className: "text-xs font-mono text-zinc-400 dark:text-zinc-500", children: "• দেশব্যাপী ছাত্র আন্দোলন বুলেটিন" })
                ]
              }),
              i.jsx("h1", {
                className: "text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight",
                children: "সারাদেশের খবর"
              }),
              i.jsx("p", {
                className: "text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1",
                children: "সমাজতান্ত্রিক ছাত্র ফ্রন্টের বিভিন্ন বিশ্ববিদ্যালয়, মহানগর ও জেলা শাখার সাংগঠনিক কার্যক্রম এবং সংগ্রামী তৎপরতা"
              })
            ]
          }),
          i.jsxs("div", {
            className: "flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg text-xs font-mono text-zinc-700 dark:text-zinc-300 self-start md:self-auto",
            children: [
              i.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping" }),
              i.jsxs("span", { children: ["মোট প্রতিবেদন: ", i.jsx("strong", { className: "text-rose-600 dark:text-rose-400 font-bold", children: saradeshNews.length })] })
            ]
          })
        ]
      }),

      // Search & Region Filter Chips
      i.jsxs("div", {
        className: "mb-8 space-y-4",
        children: [
          i.jsxs("div", {
            className: "flex flex-col sm:flex-row items-center gap-3",
            children: [
              i.jsxs("div", {
                className: "relative w-full sm:max-w-md",
                children: [
                  i.jsx("input", {
                    type: "text",
                    value: localSearch,
                    onChange: (e) => {
                      setLocalSearch(e.target.value);
                      if (setGlobalSearchQuery) setGlobalSearchQuery(e.target.value);
                    },
                    placeholder: "সারাদেশের সংবাদ ও প্রতিবেদন অনুসন্ধান করুন...",
                    className: "w-full pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 transition-all"
                  }),
                  i.jsx("svg", {
                    className: "w-4 h-4 text-zinc-400 absolute left-3 top-2.5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
                  }),
                  localSearch && i.jsx("button", {
                    onClick: () => { setLocalSearch(""); if (setGlobalSearchQuery) setGlobalSearchQuery(""); },
                    className: "absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs",
                    children: "✕"
                  })
                ]
              })
            ]
          }),

          // Region Chips Bar
          i.jsx("div", {
            className: "flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none",
            children: regions.map(reg => {
              const isActive = selectedRegion === reg.id;
              return i.jsx("button", {
                key: reg.id,
                onClick: () => setSelectedRegion(reg.id),
                className: "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer " + (
                  isActive
                    ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/30"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                ),
                children: reg.label
              }, reg.id);
            })
          })
        ]
      }),

      // News Content Section
      saradeshNews.length === 0 ? i.jsxs("div", {
        className: "text-center py-20 bg-zinc-50 dark:bg-zinc-900/40 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg space-y-3",
        children: [
          i.jsx("div", { className: "text-4xl", children: "📰" }),
          i.jsx("h3", { className: "text-base font-bold text-zinc-800 dark:text-zinc-200", children: "কোনো সংবাদ পাওয়া যায়নি" }),
          i.jsx("p", { className: "text-xs text-zinc-500 max-w-sm mx-auto", children: "নির্বাচিত অঞ্চল বা অনুসন্ধানের সাথে মিল রেখে এই মুহূর্তে কোনো খবর পাওয়া যায়নি। অন্য অঞ্চল নির্বাচন করুন।" }),
          i.jsx("button", {
            onClick: () => { setSelectedRegion("all"); setLocalSearch(""); },
            className: "px-4 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-md hover:bg-rose-700 transition-colors cursor-pointer",
            children: "সকল সংবাদ দেখুন"
          })
        ]
      }) : i.jsxs("div", {
        className: "space-y-8",
        children: [
          // Featured Lead Story
          featuredItem && i.jsxs("div", {
            onClick: () => onSelectItem && onSelectItem("news", featuredItem.id),
            className: "group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-pointer",
            children: [
              featuredItem.image && i.jsx("div", {
                className: "lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[260px] overflow-hidden bg-zinc-100 dark:bg-zinc-900",
                children: i.jsx("img", {
                  src: featuredItem.image,
                  alt: featuredItem.title,
                  referrerPolicy: "no-referrer",
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                })
              }),
              i.jsxs("div", {
                className: (featuredItem.image ? "lg:col-span-5" : "lg:col-span-12") + " p-6 sm:p-8 flex flex-col justify-between space-y-4",
                children: [
                  i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsxs("div", {
                        className: "flex flex-wrap items-center gap-2 text-xs",
                        children: [
                          i.jsx("span", { className: "px-2 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold rounded text-[10px] uppercase", children: "প্রধান সংবাদ" }),
                          featuredItem.region && i.jsxs("span", { className: "px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold rounded text-[10px]", children: ["📍 ", featuredItem.region] }),
                          i.jsx("span", { className: "text-zinc-400 font-mono text-[11px]", children: featuredItem.date })
                        ]
                      }),
                      i.jsx("h2", {
                        className: "text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug",
                        children: featuredItem.title
                      }),
                      i.jsx("p", {
                        className: "text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed",
                        children: featuredItem.excerpt || (featuredItem.content ? featuredItem.content.substring(0, 160) + "..." : "")
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500",
                    children: [
                      i.jsxs("span", { className: "font-mono", children: ["প্রতিবেদক: ", featuredItem.author || "দপ্তর সেল"] }),
                      i.jsxs("span", {
                        className: "inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-1 transition-transform",
                        children: [
                          "বিস্তারিত পড়ুন",
                          i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // 3-Column Grid for other articles
          listItems.length > 0 && i.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4",
            children: listItems.map(item => {
              return i.jsxs("div", {
                key: item.id,
                onClick: () => onSelectItem && onSelectItem("news", item.id),
                className: "group bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 hover:border-rose-500/50 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer",
                children: [
                  i.jsxs("div", {
                    children: [
                      item.image && i.jsx("div", {
                        className: "relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-900",
                        children: i.jsx("img", {
                          src: item.image,
                          alt: item.title,
                          referrerPolicy: "no-referrer",
                          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        })
                      }),
                      i.jsxs("div", {
                        className: "p-4 sm:p-5 space-y-2.5",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center gap-2 text-[11px]",
                            children: [
                              item.region ? i.jsxs("span", { className: "px-2 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold rounded text-[10px]", children: ["📍 ", item.region] }) : i.jsx("span", { className: "px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold rounded text-[10px]", children: "সারাদেশ" }),
                              i.jsx("span", { className: "text-zinc-400 font-mono", children: item.date })
                            ]
                          }),
                          i.jsx("h3", {
                            className: "text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug",
                            children: item.title
                          }),
                          i.jsx("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed",
                            children: item.excerpt || (item.content ? item.content.substring(0, 120) + "..." : "")
                          })
                        ]
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "p-4 pt-0 sm:p-5 sm:pt-0 flex items-center justify-between text-xs text-zinc-500",
                    children: [
                      i.jsx("span", { className: "font-mono text-[11px] truncate max-w-[140px]", children: item.author || "দপ্তর সেল" }),
                      i.jsxs("span", {
                        className: "inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-1 transition-transform text-xs",
                        children: [
                          "পড়ুন",
                          i.jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
                        ]
                      })
                    ]
                  })
                ]
              }, item.id);
            })
          })
        ]
      })
    ]
  });
}
`;

// Save saradesh component to a file
fs.writeFileSync('saradesh_comp.js', saradeshCompCode, 'utf8');
console.log('Written saradesh_comp.js successfully!');
