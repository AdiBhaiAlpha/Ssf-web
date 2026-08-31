
// Borbila PhotoCard Generator V2 Component Generator
const fs = require("fs");

const componentSource = `
// ============================================================================
// BORBILA PHOTOCARD GENERATOR V2 (REACT COMPONENT)
// ============================================================================

function BorbilaPhotoCardV2({ item, db, onClose, isStandalone, onSelectItem, setCurrentTab }) {
  const PRESETS = {
    "classic-red": {
      id: "classic-red",
      label: "অ্যাঙ্গেল্ড রেড নিউজ কার্ড",
      labelEn: "Angled Red News Card",
      description: "লোগো ও তারিখ হেডার, কোণাকুণি ছবির ফ্রেম, গাঢ় লাল হেডলাইন প্যানেল এবং বটম সিটিএ ফুটার।",
      primaryColor: "#d60000",
      secondaryColor: "#7a0000",
      accentColor: "#ff2d2d",
      topBackgroundColor: "#fff0f0",
      titleColor: "#ffffff",
      dateColor: "#3f3f46",
      textColor: "#181818",
      logoColor: "#181818",
      badge: "জনপ্রিয়"
    },
    "fresh-blue": {
      id: "fresh-blue",
      label: "হোয়াইট এডিটোরিয়াল কার্ড",
      labelEn: "White Editorial Card",
      description: "বড় আকারের শীর্ষ ছবি, পরিচ্ছন্ন সাদা হেডলাইন এলাকা, বটম তারিখ ও ওয়েবসাইট স্ট্রিপ।",
      primaryColor: "#d32929",
      secondaryColor: "#e6e6e6",
      accentColor: "#f44336",
      topBackgroundColor: "#f3f3f3",
      titleColor: "#202020",
      dateColor: "#555555",
      textColor: "#202020",
      logoColor: "#d32929",
      badge: "ক্লিন"
    },
    "green-market": {
      id: "green-market",
      label: "ডার্ক ব্রেকিং নিউজ কার্ড",
      labelEn: "Dark Breaking News",
      description: "ডার্ক রেড ব্রেকিং-নিউজ হেডার, আধুনিক ফটো কাটআউট, সিটিএ পিল এবং বটম অ্যাড/ইউআরএল এরিয়া।",
      primaryColor: "#e50914",
      secondaryColor: "#050000",
      accentColor: "#ff3232",
      topBackgroundColor: "#130000",
      titleColor: "#ffffff",
      dateColor: "#ffffff",
      textColor: "#ffffff",
      logoColor: "#ffffff",
      badge: "ব্রেকিং"
    },
    "dark-magazine": {
      id: "dark-magazine",
      label: "সোশাল ফুটার টিভি কার্ড",
      labelEn: "Social Footer TV Card",
      description: "টপ ফটো, স্ট্রং রেড টাইটেল প্যানেল, সোশাল মিডিয়া ইউআরএল স্ট্রিপ ও অ্যাডভার্টাইজ বার।",
      primaryColor: "#b40000",
      secondaryColor: "#6c0000",
      accentColor: "#ffffff",
      topBackgroundColor: "#ffffff",
      titleColor: "#ffffff",
      dateColor: "#ffffff",
      textColor: "#ffffff",
      logoColor: "#ffffff",
      badge: "সোশাল"
    },
    "gold-frame": {
      id: "gold-frame",
      label: "রেড ক্যাপশন স্কয়ার ফ্রেম",
      labelEn: "Red Caption Square",
      description: "শীর্ষে ফুল ছবি, সেন্ট্রাল লোগো ব্যাজ, ডিপ রেড হেডলাইন এরিয়া এবং গোল্ডেন সিটিএ/লিঙ্ক।",
      primaryColor: "#cf0000",
      secondaryColor: "#530000",
      accentColor: "#ffef00",
      topBackgroundColor: "#080000",
      titleColor: "#ffffff",
      dateColor: "#ffffff",
      textColor: "#ffffff",
      logoColor: "#ffffff",
      badge: "ফ্রেম"
    }
  };

  const defaultImg = "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png";
  const defaultLogo = "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png";

  const [format, setFormat] = Q.useState("classic-red");
  const [activeTab, setActiveTab] = Q.useState("formats");
  const [title, setTitle] = Q.useState((item && (item.title || item.headline)) || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ঐতিহাসিক প্রতিনিধি সম্মেলন অনুষ্ঠিত");
  const [imageUrl, setImageUrl] = Q.useState((item && (item.image || item.coverImage || item.coverUrl)) || defaultImg);
  const [logoUrl, setLogoUrl] = Q.useState(defaultLogo);
  const [dateText, setDateText] = Q.useState((item && item.date) || "০৬ ডিসেম্বর, ২০২৫");
  const [siteName, setSiteName] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [domain, setDomain] = Q.useState("socialistchhatrafront.org");
  const [bottomText, setBottomText] = Q.useState("বিস্তারিত কমেন্টে");
  const [captionText, setCaptionText] = Q.useState("ছবি: সংগৃহীত");
  const [sectionLabel, setSectionLabel] = Q.useState((item && item.category) || "সংবাদপত্রক");
  const [footerLeftText, setFooterLeftText] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [footerRightText, setFooterRightText] = Q.useState("ময়মনসিংহ জেলা শাখা");
  const [adText, setAdText] = Q.useState("");
  const [facebookUrl, setFacebookUrl] = Q.useState("fb.com/chhatrafront");
  const [youtubeUrl, setYoutubeUrl] = Q.useState("youtube.com/@chhatrafront");
  const [instagramUrl, setInstagramUrl] = Q.useState("instagram.com/chhatrafront");
  const [downloadPrefix, setDownloadPrefix] = Q.useState("ssf-photocard");

  const [primaryColor, setPrimaryColor] = Q.useState("#d60000");
  const [secondaryColor, setSecondaryColor] = Q.useState("#7a0000");
  const [accentColor, setAccentColor] = Q.useState("#ff2d2d");
  const [topBackgroundColor, setTopBackgroundColor] = Q.useState("#fff0f0");
  const [titleColor, setTitleColor] = Q.useState("#ffffff");
  const [dateColor, setDateColor] = Q.useState("#3f3f46");
  const [textColor, setTextColor] = Q.useState("#181818");
  const [logoColor, setLogoColor] = Q.useState("#181818");

  const [zoomLevel, setZoomLevel] = Q.useState("fit"); // fit, 50, 75, 100
  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportNotice, setExportNotice] = Q.useState("");
  const [selectedArticleId, setSelectedArticleId] = Q.useState((item && item.id) || "");

  const previewCanvasRef = Q.useRef(null);

  // Apply preset
  const applyPreset = (presetKey) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setFormat(presetKey);
    setPrimaryColor(p.primaryColor);
    setSecondaryColor(p.secondaryColor);
    setAccentColor(p.accentColor);
    setTopBackgroundColor(p.topBackgroundColor);
    setTitleColor(p.titleColor);
    setDateColor(p.dateColor);
    setTextColor(p.textColor);
    setLogoColor(p.logoColor);
  };

  // Switch article if db passed
  const handleSelectArticle = (e) => {
    const artId = e.target.value;
    setSelectedArticleId(artId);
    if (!artId || !db) return;
    const allArticles = [...(db.news || []), ...(db.blogs || [])];
    const target = allArticles.find(a => String(a.id) === String(artId));
    if (target) {
      if (target.title) setTitle(target.title);
      if (target.image || target.coverImage || target.coverUrl) {
        setImageUrl(target.image || target.coverImage || target.coverUrl);
      }
      if (target.date) setDateText(target.date);
      if (target.category) setSectionLabel(target.category);
    }
  };

  // Real-time canvas drawing
  Q.useEffect(() => {
    let active = true;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const settings = {
      format: format,
      primaryColor: primaryColor || "#d60000",
      secondaryColor: secondaryColor || "#7a0000",
      accentColor: accentColor || "#ff2d2d",
      topBackgroundColor: topBackgroundColor || "#fff0f0",
      titleColor: titleColor || "#ffffff",
      dateColor: dateColor || "#3f3f46",
      textColor: textColor || "#181818",
      logoColor: logoColor || "#181818",
      logoUrl: logoUrl,
      bottomText: bottomText || "বিস্তারিত কমেন্টে",
      captionText: captionText || "",
      sectionLabel: sectionLabel || "সংবাদ",
      footerLeftText: footerLeftText || "",
      footerRightText: footerRightText || "",
      adText: adText || "",
      brandUrl: domain || "",
      facebookUrl: facebookUrl || "",
      youtubeUrl: youtubeUrl || "",
      instagramUrl: instagramUrl || "",
      downloadPrefix: downloadPrefix || "ssf-photocard"
    };

    const payload = {
      title: title || "শিরোনাম",
      imageUrl: imageUrl || defaultImg,
      logoUrl: logoUrl || defaultLogo,
      dateText: dateText || "",
      domain: domain || "",
      siteName: siteName || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
      centerText: bottomText || "বিস্তারিত কমেন্টে",
      settings: settings
    };

    // Load assets and render
    Promise.all([
      window.borbilaLoadImage(payload.imageUrl).catch(() => null),
      payload.logoUrl ? window.borbilaLoadImage(payload.logoUrl).catch(() => null) : Promise.resolve(null)
    ]).then(([photoImg, logoImg]) => {
      if (!active) return;
      ctx.clearRect(0, 0, size, size);
      const renderers = {
        "classic-red": window.borbilaDrawClassicFormat,
        "fresh-blue": window.borbilaDrawSplitFormat,
        "green-market": window.borbilaDrawMarketFormat,
        "dark-magazine": window.borbilaDrawMagazineFormat,
        "gold-frame": window.borbilaDrawFrameFormat
      };
      const renderer = renderers[format] || window.borbilaDrawClassicFormat;
      if (typeof renderer === "function") {
        renderer(ctx, photoImg, logoImg, payload, settings, size);
      }
    }).catch(err => {
      console.warn("Borbila preview draw error:", err);
    });

    return () => {
      active = false;
    };
  }, [
    format,
    title,
    imageUrl,
    logoUrl,
    dateText,
    siteName,
    domain,
    bottomText,
    captionText,
    sectionLabel,
    footerLeftText,
    footerRightText,
    adText,
    facebookUrl,
    youtubeUrl,
    instagramUrl,
    primaryColor,
    secondaryColor,
    accentColor,
    topBackgroundColor,
    titleColor,
    dateColor,
    textColor,
    logoColor
  ]);

  // Export handlers
  const handleDownload = async (exportFormat = "png") => {
    setIsExporting(true);
    setExportNotice("ফটোকার্ড প্রস্তুত হচ্ছে...");
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) throw new Error("ক্যানভাস পাওয়া যায়নি");

      const mimeType = exportFormat === "jpg" || exportFormat === "jpeg" ? "image/jpeg" : exportFormat === "webp" ? "image/webp" : "image/png";
      const quality = exportFormat === "jpg" ? 0.95 : 1.0;

      canvas.toBlob((blob) => {
        if (!blob) {
          setExportNotice("ডাউনলোড ব্যর্থ হয়েছে");
          setIsExporting(false);
          return;
        }
        const cleanedTitle = String(title || "photocard")
          .toLowerCase()
          .replace(/[^\w\u0980-\u09FF]+/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 40);
        const fileName = (downloadPrefix || "ssf-photocard") + "-" + cleanedTitle + "." + exportFormat;
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExportNotice("সফলভাবে ডাউনলোড হয়েছে (" + exportFormat.toUpperCase() + ")");
        setIsExporting(false);
        setTimeout(() => setExportNotice(""), 4000);
      }, mimeType, quality);
    } catch (err) {
      console.error(err);
      setExportNotice("ত্রুটি: " + (err.message || "ডাউনলোড করা যায়নি"));
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    try {
      setExportNotice("ক্লিপবোর্ডে কপি হচ্ছে...");
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          setExportNotice("ক্লিপবোর্ডে কপি হয়েছে!");
          setTimeout(() => setExportNotice(""), 3000);
        } catch (err) {
          setExportNotice("ক্লিপবোর্ডে সরাসরি কপি সাপোর্ট করছে না");
          setTimeout(() => setExportNotice(""), 3000);
        }
      }, "image/png");
    } catch (e) {
      setExportNotice("কপি করা যায়নি");
    }
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target && evt.target.result) {
        setImageUrl(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target && evt.target.result) {
        setLogoUrl(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const allArticlesList = db ? [...(db.news || []), ...(db.blogs || [])] : [];

  return i.jsxs("div", {
    className: "borbila-photocard-root w-full bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans select-none",
    children: [
      // Top Studio Header
      i.jsxs("header", {
        className: "bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-md",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              i.jsx("div", {
                className: "w-9 h-9 rounded-lg bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center shadow-inner border border-rose-500/30",
                children: i.jsx("svg", {
                  className: "w-5 h-5 text-white",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })
                })
              }),
              i.jsxs("div", {
                children: [
                  i.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      i.jsx("h1", { className: "text-sm sm:text-base font-bold text-white tracking-wide", children: "Borbila PhotoCard Generator V2" }),
                      i.jsx("span", { className: "px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", children: "প্রো সংস্করণ" })
                    ]
                  }),
                  i.jsx("p", { className: "text-[11px] text-slate-400 hidden sm:block", children: "১০৮০×১০৮০ হাই-রেজোলিউশন সোশাল ফটোকার্ড নির্মাতা ও রিয়েল-টাইম ক্যানভাস" })
                ]
              })
            ]
          }),

          // Action controls
          i.jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [
              // Export Status Notice
              exportNotice && i.jsx("span", {
                className: "text-xs font-semibold px-3 py-1 bg-rose-600/30 border border-rose-500/50 text-rose-200 rounded-full animate-pulse",
                children: exportNotice
              }),

              // Quick PNG download
              i.jsxs("button", {
                onClick: () => handleDownload("png"),
                disabled: isExporting,
                className: "px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-900/30 disabled:opacity-50 cursor-pointer",
                children: [
                  i.jsx("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })
                  }),
                  i.jsx("span", { children: isExporting ? "প্রসেসিং..." : "PNG ডাউনলোড (1080p)" })
                ]
              }),

              // Close button
              onClose && i.jsx("button", {
                onClick: onClose,
                className: "p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition cursor-pointer border border-slate-700",
                title: "বন্ধ করুন",
                children: i.jsx("svg", {
                  className: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" })
                })
              })
            ]
          })
        ]
      }),

      // Main Two-Column Layout
      i.jsxs("div", {
        className: "flex-grow flex flex-col lg:flex-row min-h-0",
        children: [
          // Left Settings Panel
          i.jsxs("div", {
            className: "w-full lg:w-[460px] xl:w-[500px] flex-shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col overflow-y-auto max-h-[calc(100vh-60px)]",
            children: [
              // Tabs Navigator
              i.jsxs("div", {
                className: "flex border-b border-slate-800 bg-slate-900/60 sticky top-0 z-20 overflow-x-auto",
                children: [
                  [
                    { id: "formats", label: "ফরম্যাট", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
                    { id: "text", label: "কন্টেন্ট", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                    { id: "colors", label: "কালার থিম", icon: "M7 21a4 4 0 01-4-4 5 5 0 012-4.2V8a2 2 0 012-2h4a2 2 0 012 2v4.8A5 5 0 0117 17a4 4 0 01-4 4H7z" },
                    { id: "media", label: "ছবি ও লোগো", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { id: "social", label: "সোশাল ও লিঙ্ক", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }
                  ].map(tab => (
                    i.jsxs("button", {
                      key: tab.id,
                      onClick: () => setActiveTab(tab.id),
                      className: `flex-1 py-3 px-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition border-b-2 whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? "text-rose-400 border-rose-500 bg-slate-900"
                          : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40"
                      }`,
                      children: [
                        i.jsx("svg", {
                          className: "w-3.5 h-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: tab.icon })
                        }),
                        i.jsx("span", { children: tab.label })
                      ]
                    })
                  ))
                ]
              }),

              // Tab Panels
              i.jsxs("div", {
                className: "p-5 space-y-6 flex-grow",
                children: [
                  // Tab 1: Formats & Layouts
                  activeTab === "formats" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      // Article Quick Selector
                      allArticlesList.length > 0 && i.jsxs("div", {
                        className: "p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300 flex items-center gap-1.5", children: [
                            i.jsx("span", { children: "📰 খবর/পোস্ট থেকে সরাসরি লোড করুন:" })
                          ] }),
                          i.jsxs("select", {
                            value: selectedArticleId,
                            onChange: handleSelectArticle,
                            className: "w-full text-xs bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-rose-500",
                            children: [
                              i.jsx("option", { value: "", children: "-- যেকোনো পোস্ট নির্বাচন করুন --" }),
                              allArticlesList.map(a => (
                                i.jsx("option", { key: a.id, value: a.id, children: (a.title || "").slice(0, 60) })
                              ))
                            ]
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          i.jsx("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider", children: "রেডি ফরম্যাট নির্বাচন করুন (৫টি প্রফেশনাল লেআউট)" }),
                          i.jsx("span", { className: "text-[11px] text-slate-400", children: "Borbila Presets" })
                        ]
                      }),

                      // Presets Cards Grid
                      i.jsx("div", {
                        className: "space-y-3",
                        children: Object.keys(PRESETS).map(key => {
                          const p = PRESETS[key];
                          const isSelected = format === key;
                          return i.jsxs("div", {
                            key: key,
                            onClick: () => applyPreset(key),
                            className: `p-3.5 rounded-xl border transition-all cursor-pointer relative flex gap-3.5 items-start ${
                              isSelected
                                ? "bg-rose-950/20 border-rose-500 shadow-md shadow-rose-950/40 ring-1 ring-rose-500"
                                : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                            }`,
                            children: [
                              // Preset Thumbnail Indicator
                              i.jsxs("div", {
                                className: "w-14 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0 relative flex flex-col justify-between p-1 shadow-sm",
                                style: { background: p.primaryColor },
                                children: [
                                  i.jsx("div", { className: "w-full h-4 rounded-xs", style: { background: p.topBackgroundColor } }),
                                  i.jsx("div", { className: "w-full h-1.5 rounded-xs", style: { background: p.accentColor } })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "flex-grow min-w-0",
                                children: [
                                  i.jsxs("div", {
                                    className: "flex items-center justify-between gap-2",
                                    children: [
                                      i.jsx("h4", { className: `text-xs font-bold truncate ${isSelected ? "text-rose-400" : "text-slate-200"}`, children: p.label }),
                                      i.jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700", children: p.badge })
                                    ]
                                  }),
                                  i.jsx("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2", children: p.description }),
                                  i.jsxs("div", {
                                    className: "flex items-center gap-2 mt-2",
                                    children: [
                                      i.jsx("span", { className: "w-3 h-3 rounded-full border border-black/30", style: { background: p.primaryColor } }),
                                      i.jsx("span", { className: "w-3 h-3 rounded-full border border-black/30", style: { background: p.secondaryColor } }),
                                      i.jsx("span", { className: "w-3 h-3 rounded-full border border-black/30", style: { background: p.accentColor } }),
                                      i.jsx("span", { className: "text-[10px] text-slate-500 font-mono", children: p.labelEn })
                                    ]
                                  })
                                ]
                              })
                            ]
                          });
                        })
                      })
                    ]
                  }),

                  // Tab 2: Text & Content
                  activeTab === "text" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "মূল শিরোনাম (Headline / Title)" }),
                          i.jsx("textarea", {
                            rows: 3,
                            value: title,
                            onChange: (e) => setTitle(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-rose-500 leading-relaxed",
                            placeholder: "ফটোকার্ডের শিরোনাম লিখুন..."
                          }),
                          i.jsx("span", { className: "text-[10px] text-slate-400", children: "শিরোনাম লেখার পর ক্যানভাস স্বয়ংক্রিয়ভাবে ফন্ট সাইজ মানিয়ে নেয়।" })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "তারিখ ও স্থান (Date)" }),
                              i.jsx("input", {
                                type: "text",
                                value: dateText,
                                onChange: (e) => setDateText(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "বিভাগ / ক্যাটাগরি" }),
                              i.jsx("input", {
                                type: "text",
                                value: sectionLabel,
                                onChange: (e) => setSectionLabel(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "বটম কল-টু-অ্যাকশন (CTA)" }),
                              i.jsx("input", {
                                type: "text",
                                value: bottomText,
                                onChange: (e) => setBottomText(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                                placeholder: "বিস্তারিত কমেন্টে"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ছবির ক্যাপশন / উৎস" }),
                              i.jsx("input", {
                                type: "text",
                                value: captionText,
                                onChange: (e) => setCaptionText(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                                placeholder: "ছবি: সংগৃহীত"
                              })
                            ]
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ফুটার বাম টেক্সট" }),
                              i.jsx("input", {
                                type: "text",
                                value: footerLeftText,
                                onChange: (e) => setFooterLeftText(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ফুটার ডান টেক্সট" }),
                              i.jsx("input", {
                                type: "text",
                                value: footerRightText,
                                onChange: (e) => setFooterRightText(e.target.value),
                                className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "বটম হাইলাইট / অ্যাড টেক্সট (ঐচ্ছিক)" }),
                          i.jsx("input", {
                            type: "text",
                            value: adText,
                            onChange: (e) => setAdText(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "www.socialistchhatrafront.org"
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 3: Colors & Theme
                  activeTab === "colors" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider", children: "কাস্টম কালার ও প্যালেট" }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          [
                            { label: "Primary Color (প্রধান রং)", val: primaryColor, set: setPrimaryColor },
                            { label: "Secondary Color (দ্বিতীয় রং)", val: secondaryColor, set: setSecondaryColor },
                            { label: "Accent Color (হাইলাইট)", val: accentColor, set: setAccentColor },
                            { label: "Top Background (টপ ব্যাকগ্রাউন্ড)", val: topBackgroundColor, set: setTopBackgroundColor },
                            { label: "Title Color (শিরোনাম রং)", val: titleColor, set: setTitleColor },
                            { label: "Date Color (তারিখের রং)", val: dateColor, set: setDateColor },
                            { label: "Text Color (সাধারণ লেখা)", val: textColor, set: setTextColor },
                            { label: "Logo Color (লোগো টেক্সট)", val: logoColor, set: setLogoColor }
                          ].map((item, idx) => (
                            i.jsxs("div", {
                              key: idx,
                              className: "p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5",
                              children: [
                                i.jsx("span", { className: "text-[11px] font-semibold text-slate-300 block truncate", children: item.label }),
                                i.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    i.jsx("input", {
                                      type: "color",
                                      value: item.val,
                                      onChange: (e) => item.set(e.target.value),
                                      className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                    }),
                                    i.jsx("input", {
                                      type: "text",
                                      value: item.val,
                                      onChange: (e) => item.set(e.target.value),
                                      className: "w-full text-xs font-mono bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
                                    })
                                  ]
                                })
                              ]
                            })
                          ))
                        ]
                      }),

                      // Quick Palettes
                      i.jsxs("div", {
                        className: "p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2",
                        children: [
                          i.jsx("h4", { className: "text-xs font-bold text-slate-300", children: "কুইক থিম প্যালেট নির্বাচন:" }),
                          i.jsxs("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                              { name: "সমাজতান্ত্রিক লাল", p: "#d60000", s: "#7a0000", a: "#ff2d2d", bg: "#fff0f0" },
                              { name: "গাঢ় ব্রেকিং", p: "#e50914", s: "#050000", a: "#ff3232", bg: "#130000" },
                              { name: "হোয়াইট ক্লিন", p: "#d32929", s: "#e6e6e6", a: "#f44336", bg: "#f3f3f3" },
                              { name: "টেলিভিশন রেড", p: "#b40000", s: "#6c0000", a: "#ffffff", bg: "#ffffff" },
                              { name: "গোল্ডেন ফ্রেম", p: "#cf0000", s: "#530000", a: "#ffef00", bg: "#080000" }
                            ].map((pal, pidx) => (
                              i.jsx("button", {
                                key: pidx,
                                onClick: () => {
                                  setPrimaryColor(pal.p);
                                  setSecondaryColor(pal.s);
                                  setAccentColor(pal.a);
                                  setTopBackgroundColor(pal.bg);
                                },
                                className: "px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] rounded-md text-slate-200 border border-slate-700 cursor-pointer",
                                children: pal.name
                              })
                            ))
                          ]
                        })
                      ]
                    })
                  }),

                  // Tab 4: Media & Logo
                  activeTab === "media" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      // Featured Photo Box
                      i.jsxs("div", {
                        className: "p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300 block", children: "মূল ছবি (Featured Image)" }),
                          i.jsxs("div", {
                            className: "flex gap-3 items-center",
                            children: [
                              i.jsx("div", {
                                className: "w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0",
                                children: i.jsx("img", { src: imageUrl, alt: "Preview", className: "w-full h-full object-cover" })
                              }),
                              i.jsxs("div", {
                                className: "flex-grow space-y-2",
                                children: [
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleImageUpload,
                                    className: "text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: imageUrl,
                                    onChange: (e) => setImageUrl(e.target.value),
                                    placeholder: "অথবা ইমেজ ইউআরএল পেস্ট করুন...",
                                    className: "w-full text-xs bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // Logo Box
                      i.jsxs("div", {
                        className: "p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300 block", children: "সংগঠনের লোগো (Organization Logo)" }),
                          i.jsxs("div", {
                            className: "flex gap-3 items-center",
                            children: [
                              i.jsx("div", {
                                className: "w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0 p-1 flex items-center justify-center",
                                children: i.jsx("img", { src: logoUrl, alt: "Logo", className: "w-full h-full object-contain" })
                              }),
                              i.jsxs("div", {
                                className: "flex-grow space-y-2",
                                children: [
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleLogoUpload,
                                    className: "text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: logoUrl,
                                    onChange: (e) => setLogoUrl(e.target.value),
                                    placeholder: "লোগো ইমেজ ইউআরএল...",
                                    className: "w-full text-xs bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // Organization / Site Name
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "সংগঠন / সাইটের নাম (Site / Org Name)" }),
                          i.jsx("input", {
                            type: "text",
                            value: siteName,
                            onChange: (e) => setSiteName(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500"
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 5: Social & Links
                  activeTab === "social" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "অফিসিয়াল ওয়েবসাইট ডোমেইন" }),
                          i.jsx("input", {
                            type: "text",
                            value: domain,
                            onChange: (e) => setDomain(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "socialistchhatrafront.org"
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ফেসবুক পেজ / লিঙ্ক" }),
                          i.jsx("input", {
                            type: "text",
                            value: facebookUrl,
                            onChange: (e) => setFacebookUrl(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "fb.com/chhatrafront"
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ইউটিউব চ্যানেল" }),
                          i.jsx("input", {
                            type: "text",
                            value: youtubeUrl,
                            onChange: (e) => setYoutubeUrl(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "youtube.com/@chhatrafront"
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ইনস্টাগ্রাম হ্যান্ডেল" }),
                          i.jsx("input", {
                            type: "text",
                            value: instagramUrl,
                            onChange: (e) => setInstagramUrl(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "instagram.com/chhatrafront"
                          })
                        ]
                      }),

                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "ডাউনলোড ফাইলনেম প্রিফিক্স" }),
                          i.jsx("input", {
                            type: "text",
                            value: downloadPrefix,
                            onChange: (e) => setDownloadPrefix(e.target.value),
                            className: "w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-rose-500",
                            placeholder: "ssf-photocard"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Right Live Preview Pane
          i.jsxs("div", {
            className: "flex-grow bg-slate-900/90 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-between overflow-y-auto",
            children: [
              // Zoom & Control Toolbar
              i.jsxs("div", {
                className: "w-full max-w-2xl flex items-center justify-between mb-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 shadow-sm",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center gap-2 text-xs text-slate-300",
                    children: [
                      i.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                      i.jsx("span", { className: "font-semibold", children: "লাইভ ক্যানভাস প্রিভিউ" }),
                      i.jsx("span", { className: "text-[11px] text-slate-500 font-mono", children: "(১০৮০ × ১০৮০ পিক্সেল)" })
                    ]
                  }),

                  // Scale Controls
                  i.jsxs("div", {
                    className: "flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800",
                    children: [
                      [
                        { id: "fit", label: "ফিট" },
                        { id: "50", label: "৫০%" },
                        { id: "75", label: "৭৫%" },
                        { id: "100", label: "১০০%" }
                      ].map(z => (
                        i.jsx("button", {
                          key: z.id,
                          onClick: () => setZoomLevel(z.id),
                          className: `px-2 py-0.5 text-[11px] font-semibold rounded transition cursor-pointer ${
                            zoomLevel === z.id
                              ? "bg-rose-600 text-white shadow-xs"
                              : "text-slate-400 hover:text-slate-200"
                          }`,
                          children: z.label
                        })
                      ))
                    ]
                  })
                ]
              }),

              // Canvas Display Frame
              i.jsx("div", {
                className: "w-full flex-grow flex items-center justify-center py-2",
                children: i.jsx("div", {
                  className: `relative shadow-2xl rounded-2xl overflow-hidden border-2 border-slate-800 bg-black transition-all duration-200 ${
                    zoomLevel === "fit" ? "max-w-[480px] w-full" : zoomLevel === "50" ? "w-[540px]" : zoomLevel === "75" ? "w-[810px]" : "w-[1080px]"
                  }`,
                  style: { aspectRatio: "1 / 1" },
                  children: i.jsx("canvas", {
                    ref: previewCanvasRef,
                    className: "w-full h-full object-contain block select-none pointer-events-none"
                  })
                })
              }),

              // Bottom Action Buttons
              i.jsxs("div", {
                className: "w-full max-w-2xl mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3",
                children: [
                  // Multi-Format Export Buttons
                  i.jsxs("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      i.jsxs("button", {
                        onClick: () => handleDownload("png"),
                        disabled: isExporting,
                        className: "px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50",
                        children: [
                          i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                          i.jsx("span", { children: "PNG (1080p)" })
                        ]
                      }),
                      i.jsxs("button", {
                        onClick: () => handleDownload("jpg"),
                        disabled: isExporting,
                        className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-50",
                        children: [
                          i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                          i.jsx("span", { children: "JPG ডাউনলোড" })
                        ]
                      }),
                      i.jsxs("button", {
                        onClick: () => handleDownload("webp"),
                        disabled: isExporting,
                        className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-50",
                        children: [
                          i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                          i.jsx("span", { children: "WEBP" })
                        ]
                      }),
                      i.jsxs("button", {
                        onClick: handleCopyToClipboard,
                        className: "px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition flex items-center gap-1.5 border border-slate-700 cursor-pointer",
                        title: "ক্লিপবোর্ডে কপি করুন",
                        children: [
                          i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
                          i.jsx("span", { children: "কপি" })
                        ]
                      })
                    ]
                  }),

                  // Version / License Status
                  i.jsxs("div", {
                    className: "flex items-center gap-2 text-[11px] text-slate-500",
                    children: [
                      i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500" }),
                      i.jsx("span", { children: "Borbila PhotoCard Studio Pro" })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// ============================================================================
// PHOTOCARD MODAL HOST (DUAL-VERSION SWITCHER WRAPPER)
// ============================================================================

function PhotoCardModalHost({ item, db, onClose, defaultVersion = "v2", onSelectItem, setCurrentTab }) {
  const [currentVersion, setCurrentVersion] = Q.useState(() => {
    return localStorage.getItem("ssf_photocard_version") || defaultVersion || "v2";
  });

  const handleVersionChange = (ver) => {
    setCurrentVersion(ver);
    try {
      localStorage.setItem("ssf_photocard_version", ver);
    } catch (e) {}
  };

  return i.jsxs("div", {
    className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-0 sm:p-2 overflow-hidden",
    children: [
      // Version Switcher Top Bar
      i.jsxs("div", {
        className: "w-full max-w-7xl bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-lg",
        children: [
          // Version Tabs
          i.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              i.jsx("span", { className: "text-xs font-bold text-slate-400 hidden sm:inline", children: "সংস্করণ নির্বাচন:" }),
              i.jsxs("button", {
                onClick: () => handleVersionChange("v2"),
                className: `px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentVersion === "v2"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`,
                children: [
                  i.jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-pulse" }),
                  i.jsx("span", { children: "ফটোকার্ড মেকার V2 (Borbila জেনারেটর)" }),
                  i.jsx("span", { className: "text-[10px] px-1 py-0.2 rounded bg-black/30", children: "নতুন" })
                ]
              }),
              i.jsxs("button", {
                onClick: () => handleVersionChange("v1"),
                className: `px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentVersion === "v1"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`,
                children: [
                  i.jsx("span", { children: "ফটোকার্ড মেকার V1 (ক্লাসিক স্টুডিও)" }),
                  i.jsx("span", { className: "text-[10px] px-1 py-0.2 rounded bg-black/30", children: "২৮+ টেমপ্লেট" })
                ]
              })
            ]
          }),

          // Close button
          i.jsxs("button", {
            onClick: onClose,
            className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md text-xs transition cursor-pointer border border-slate-800 flex items-center gap-1",
            children: [
              i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }),
              i.jsx("span", { className: "hidden sm:inline text-[11px]", children: "বন্ধ করুন" })
            ]
          })
        ]
      }),

      // Content Body: Either V2 or V1
      i.jsx("div", {
        className: "w-full max-w-7xl flex-grow overflow-hidden flex flex-col bg-slate-950 rounded-b-xl shadow-2xl relative",
        children: currentVersion === "v2"
          ? i.jsx(BorbilaPhotoCardV2, { item: item, db: db, onClose: onClose, onSelectItem: onSelectItem, setCurrentTab: setCurrentTab })
          : i.jsx(GQ, { item: item, onClose: onClose })
      })
    ]
  });
}
`;

fs.writeFileSync("borbila_v2_component.js", componentSource, "utf8");
console.log("borbila_v2_component.js written successfully");
