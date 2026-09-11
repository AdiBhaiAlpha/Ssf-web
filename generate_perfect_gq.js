const fs = require('fs');

// Let's create an updated upgraded_gq.js with this bulletproof top-to-bottom scroll & viewport layout
const gqCode = `function GQ({ item: n, onClose: e }) {
  const [selectedTemplate, setSelectedTemplate] = Q.useState(1);
  const [accentColor, setAccentColor] = Q.useState("#B3002D");
  const [bgStyle, setBgStyle] = Q.useState("solid");
  const [bgTheme, setBgTheme] = Q.useState("light");
  const [fontSize, setFontSize] = Q.useState("md");
  const [imagePosition, setImagePosition] = Q.useState("top");
  const [fontFamily, setFontFamily] = Q.useState("Bornopata Bold");
  const [textAlignment, setTextAlignment] = Q.useState("left");
  const [borderStyle, setBorderStyle] = Q.useState("none");
  const [aspectRatio, setAspectRatio] = Q.useState("1:1");
  const [customRatio, setCustomRatio] = Q.useState(1);
  const [customTitle, setCustomTitle] = Q.useState(n.title || "");
  const [customLocation, setCustomLocation] = Q.useState(n.location || "ময়মনসিংহ");
  const [customAuthor, setCustomAuthor] = Q.useState(n.author || "স্টাফ রিপোর্টার");
  const [customSummary, setCustomSummary] = Q.useState("");
  const [customDate, setCustomDate] = Q.useState(n.date || "");
  const [customCategory, setCustomCategory] = Q.useState(n.category || (n.type ? n.type.toUpperCase() : "সংবাদ"));
  const [customSlogan, setCustomSlogan] = Q.useState("");
  const [watermarkText, setWatermarkText] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [summaryLength, setSummaryLength] = Q.useState("medium");
  const [showLogo, setShowLogo] = Q.useState(true);
  const [showQR, setShowQR] = Q.useState(true);
  const [showWatermark, setShowWatermark] = Q.useState(true);
  const [showFooter, setShowFooter] = Q.useState(true);
  const [showLocation, setShowLocation] = Q.useState(true);
  const [showAuthor, setShowAuthor] = Q.useState(true);
  const [showDate, setShowDate] = Q.useState(true);
  const [showReadingTime, setShowReadingTime] = Q.useState(true);
  const [showCategory, setShowCategory] = Q.useState(true);
  const [showFB, setShowFB] = Q.useState(true);
  const [showWeb, setShowWeb] = Q.useState(true);
  const [selectedElement, setSelectedElement] = Q.useState("title");
  const [offsets, setOffsets] = Q.useState({});
  const [stepSize, setStepSize] = Q.useState(1);
  const [fontSampleText, setFontSampleText] = Q.useState("");
  const [activeTab, setActiveTab] = Q.useState("templates");
  const [exportFormat, setExportFormat] = Q.useState("png");
  const [exportResolution, setExportResolution] = Q.useState("retina");
  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportSuccess, setExportSuccess] = Q.useState(false);
  const [isRendering, setIsRendering] = Q.useState(false);

  const canvasContainerRef = Q.useRef(null);
  const canvasMetricsRef = Q.useRef({});

  // Font list
  const fontList = [
    { id: "Bornopata Bold", name: "বর্ণপতা বোল্ড", enName: "Bornopata Bold", fontFamily: "'Bornopata Bold', sans-serif", category: "ডিসপ্লে / হেডলাইন", weight: "700", style: "normal" },
    { id: "Siyam Rupali", name: "সিয়াম রূপালী", enName: "Siyam Rupali", fontFamily: "'Siyam Rupali', sans-serif", category: "ক্ল্যাসিক / বডি", weight: "400", style: "normal" },
    { id: "Ador Noirrit Bold", name: "আদর নৈঋত বোল্ড", enName: "Ador Noirrit Bold", fontFamily: "'Ador Noirrit Bold', sans-serif", category: "মডার্ন টাইটেল", weight: "700", style: "normal" },
    { id: "Li Alinur Rohmotullah", name: "রহমতুল্লাহ ইউনিক", enName: "Li Alinur Rohmotullah", fontFamily: "'Li Alinur Rohmotullah', sans-serif", category: "এক্সক্লুসিভ", weight: "700", style: "normal" },
    { id: "Li Mahfuz Binnur", name: "মাহফুজ বিননূর", enName: "Li Mahfuz Binnur", fontFamily: "'Li Mahfuz Binnur', sans-serif", category: "ব্যানার টাইপো", weight: "700", style: "normal" },
    { id: "Galib Standard", name: "গালিব স্ট্যান্ডার্ড", enName: "Galib Standard", fontFamily: "'Galib Standard', sans-serif", category: "সংবাদপত্র", weight: "700", style: "normal" },
    { id: "Alinur Prottoy", name: "প্রত্যয় বোল্ড", enName: "Alinur Prottoy", fontFamily: "'Alinur Prottoy', sans-serif", category: "হেডিং", weight: "700", style: "normal" },
    { id: "Nikosh", name: "নিকোশ বাংলা", enName: "Nikosh", fontFamily: "'Nikosh', sans-serif", category: "অফিশিয়াল", weight: "400", style: "normal" },
    { id: "Kalpurush", name: "কালপুরুষ স্ট্যান্ডার্ড", enName: "Kalpurush", fontFamily: "'Kalpurush', sans-serif", category: "স্ট্যান্ডার্ড", weight: "400", style: "normal" },
    { id: "SolaimanLipi", name: "সোলাইমান লিপি", enName: "SolaimanLipi", fontFamily: "'SolaimanLipi', sans-serif", category: "জনপ্রিয় ক্ল্যাসিক", weight: "400", style: "normal" },
    { id: "Noto Serif Bengali", name: "নোটো সেরিফ বাংলা", enName: "Noto Serif Bengali", fontFamily: "'Noto Serif Bengali', serif", category: "সেরিফ ও সাহিত্য", weight: "700", style: "normal" },
    { id: "Noto Sans Bengali", name: "নোটো সান্স বাংলা", enName: "Noto Sans Bengali", fontFamily: "'Noto Sans Bengali', sans-serif", category: "মডার্ন ক্লিন", weight: "700", style: "normal" },
    { id: "Anek Bangla", name: "অনেক বাংলা", enName: "Anek Bangla", fontFamily: "'Anek Bangla', sans-serif", category: "বোল্ড ও কমপ্যাক্ট", weight: "800", style: "normal" },
    { id: "Hind Siliguri", name: "হিন্দ শিলিগুড়ি", enName: "Hind Siliguri", fontFamily: "'Hind Siliguri', sans-serif", category: "ডিজিটাল ও ইউআই", weight: "700", style: "normal" },
    { id: "Mina", name: "মিনা লাইট/রেগুলার", enName: "Mina", fontFamily: "'Mina', sans-serif", category: "মডার্ন মিনিমাল", weight: "700", style: "normal" }
  ];

  // Template switch handler
  Q.useEffect(() => {
    const tpl = zS.find(ot => ot.id === selectedTemplate);
    if (tpl) {
      setBgTheme(tpl.theme);
      setBgStyle(tpl.bg);
      setAccentColor(tpl.color);
      setFontFamily(tpl.font === "serif" ? "Noto Serif Bengali" : tpl.font === "mono" ? "Galib Standard" : "Bornopata Bold");
      setImagePosition(tpl.img);
      setBorderStyle(tpl.border);
      setTextAlignment(tpl.align);
      if (tpl.slogan !== undefined) setCustomSlogan(tpl.slogan);
      if (tpl.tag === "BANNER") setAspectRatio("16:9");
      else if (tpl.tag === "FB_FEED") setAspectRatio("4:5");
      else if (tpl.tag === "STATEMENT" || tpl.tag === "GOVT_NOTICE") setAspectRatio("A4 Portrait");
      else setAspectRatio("1:1");
    }
  }, [selectedTemplate]);

  // Layer elements central registry
  const layerElements = [
    { id: "title", name: "শিরোনাম (Title)", desc: "প্রধান নিউজ হেডলাইন", type: "text", movable: true },
    { id: "summary", name: "সারসংক্ষেপ (Summary)", desc: "নিবন্ধের বিবরণ / সাব-টাইটেল", type: "text", movable: true },
    { id: "image", name: "প্রধান ফটো (Image)", desc: "ফিচার্ড ফটো ও ব্যানার", type: "image", movable: true },
    { id: "header", name: "লোগো ও ব্যানার (Header/Logo)", desc: "সংগঠনের লোগো ও নাম", type: "branding", movable: true },
    { id: "category", name: "ক্যাটাগরি / স্লোগান (Badge)", desc: "টপিক ও স্লোগান বার", type: "badge", movable: true },
    { id: "footer", name: "ফুটার বার (Footer)", desc: "তারিখ, শাখা ও ক্রেডিট", type: "footer", movable: true },
    { id: "watermark", name: "জলছাপ (Watermark)", desc: "পটভূমির প্রতীকি জলছাপ", type: "watermark", movable: true },
    { id: "background", name: "ব্যাকগ্রাউন্ড (Canvas)", desc: "মূল ক্যানভাস পটভূমি", type: "canvas", locked: true, movable: false }
  ];

  const selectedElementObj = layerElements.find(l => l.id === selectedElement) || layerElements[0];

  // Move element by exact internal canvas pixels
  const moveElement = (dx, dy) => {
    if (selectedElementObj && selectedElementObj.locked) return;
    setOffsets(prev => {
      const cur = prev[selectedElement] || { x: 0, y: 0 };
      return {
        ...prev,
        [selectedElement]: {
          x: (cur.x || 0) + dx,
          y: (cur.y || 0) + dy
        }
      };
    });
  };

  const resetElementPosition = () => {
    if (selectedElementObj && selectedElementObj.locked) return;
    setOffsets(prev => {
      const next = { ...prev };
      delete next[selectedElement];
      return next;
    });
  };

  // Render live preview
  const renderLivePreview = Q.useCallback(async () => {
    if (!canvasContainerRef.current) return;
    setIsRendering(true);
    try {
      const cardOptions = {
        selectedTemplate,
        accentColor,
        bgStyle,
        bgTheme,
        fontSize,
        imagePosition,
        fontFamily,
        textAlignment,
        borderStyle,
        aspectRatio,
        customRatio,
        customTitle,
        customLocation,
        customAuthor,
        customSummary,
        customDate,
        customCategory,
        customSlogan,
        watermarkText,
        showLogo,
        showQR,
        showWatermark,
        showFooter,
        showLocation,
        showAuthor,
        showDate,
        showReadingTime,
        showCategory,
        showWeb,
        showFB,
        summaryLength,
        offsets
      };
      const rendered = await op.renderPhotoCard(n, cardOptions, 1, canvasMetricsRef.current);
      if (canvasContainerRef.current) {
        const existing = canvasContainerRef.current.querySelector("canvas");
        if (existing) canvasContainerRef.current.removeChild(existing);
        rendered.className = "w-full h-auto object-contain rounded-xl shadow-xl block pointer-events-none select-none";
        canvasContainerRef.current.prepend(rendered);
      }
    } catch (err) {
      console.error("Live preview render failed:", err);
    } finally {
      setIsRendering(false);
    }
  }, [
    n, selectedTemplate, accentColor, bgStyle, bgTheme, fontSize, imagePosition,
    fontFamily, textAlignment, borderStyle, aspectRatio, customRatio, customTitle,
    customLocation, customAuthor, customSummary, customDate, customCategory,
    customSlogan, watermarkText, showLogo, showQR, showWatermark, showFooter,
    showLocation, showAuthor, showDate, showReadingTime, showCategory,
    showWeb, showFB, summaryLength, offsets
  ]);

  Q.useEffect(() => {
    renderLivePreview();
  }, [renderLivePreview]);

  // Export and download
  const handleDownload = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const cardOptions = {
        selectedTemplate,
        accentColor,
        bgStyle,
        bgTheme,
        fontSize,
        imagePosition,
        fontFamily,
        textAlignment,
        borderStyle,
        aspectRatio,
        customRatio,
        customTitle,
        customLocation,
        customAuthor,
        customSummary,
        customDate,
        customCategory,
        customSlogan,
        watermarkText,
        showLogo,
        showQR,
        showWatermark,
        showFooter,
        showLocation,
        showAuthor,
        showDate,
        showReadingTime,
        showCategory,
        showWeb,
        showFB,
        summaryLength,
        offsets
      };
      await op.exportAndDownload(n, cardOptions, exportFormat, exportResolution);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      alert("এক্সপোর্ট সমস্যা: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Canvas click handler for component selection
  const handleCanvasClick = e => {
    if (!canvasContainerRef.current || !canvasMetricsRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const cvsW = canvasMetricsRef.current?.width || internalWidth;
    const cvsH = canvasMetricsRef.current?.height || internalHeight;
    const clickX = ((e.clientX - rect.left) / rect.width) * cvsW;
    const clickY = ((e.clientY - rect.top) / rect.height) * cvsH;

    const coords = canvasMetricsRef.current.objectCoordinates || {};
    const priorityOrder = ["category", "title", "summary", "header", "footer", "image", "watermark", "background"];
    for (const key of priorityOrder) {
      const box = coords[key];
      if (box && box.w > 0 && box.h > 0) {
        if (clickX >= box.x && clickX <= box.x + box.w && clickY >= box.y && clickY <= box.y + box.h) {
          setSelectedElement(key);
          return;
        }
      }
    }
  };

  let internalWidth = 1080, internalHeight = 1080;
  switch (aspectRatio) {
    case "4:5": internalHeight = 1350; break;
    case "9:16": internalHeight = 1920; break;
    case "16:9": internalHeight = 607; break;
    case "1200x630": internalWidth = 1200; internalHeight = 630; break;
    case "A4 Portrait": internalWidth = 1240; internalHeight = 1754; break;
    case "A4 Landscape": internalWidth = 1754; internalHeight = 1240; break;
    default: internalWidth = 1080; internalHeight = 1080; break;
  }

  const cvsWidth = canvasMetricsRef.current?.width || internalWidth;
  const cvsHeight = canvasMetricsRef.current?.height || internalHeight;
  const activeOffset = (offsets && offsets[selectedElement]) || { x: 0, y: 0 };
  const activeCoords = canvasMetricsRef.current?.objectCoordinates?.[selectedElement];

  return i.jsxs("div", {
    id: "photocard-builder-modal",
    className: "fixed inset-0 z-[150] bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain flex flex-col items-center justify-start p-0 sm:p-3 md:p-5 w-full min-h-screen",
    children: [
      i.jsxs("div", {
        className: "bg-white dark:bg-zinc-950 border-0 sm:border border-zinc-200 dark:border-zinc-800 rounded-none sm:rounded-2xl w-full max-w-7xl shadow-2xl flex flex-col my-0 sm:my-auto shrink-0 lg:max-h-[92vh] overflow-hidden",
        children: [
          // STICKY TOP HEADER - ALWAYS PINNED AT TOP WITH LARGE CLEAR CLOSE BUTTON
          i.jsxs("div", {
            className: "sticky top-0 z-50 shrink-0 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md w-full shadow-xs",
            children: [
              i.jsxs("div", {
                className: "flex items-center space-x-2.5 sm:space-x-3 overflow-hidden",
                children: [
                  i.jsx("div", {
                    className: "w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-600/30",
                    children: i.jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [i.jsx("path", { d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })] })
                  }),
                  i.jsxs("div", {
                    className: "truncate",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          i.jsx("h2", { className: "text-xs sm:text-sm md:text-base font-black text-zinc-900 dark:text-white leading-tight truncate", children: "পেশাদার ফটোকার্ড ও ব্যানার স্টুডিও" }),
                          i.jsx("span", { className: "hidden xs:inline-block text-[9px] bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-bold px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/60", children: "Studio v3.0" })
                        ]
                      }),
                      i.jsx("p", { className: "text-[9px] sm:text-[11px] text-zinc-500 truncate max-w-xs sm:max-w-md", children: n.title || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ফটোকার্ড" })
                    ]
                  })
                ]
              }),
              i.jsxs("button", {
                onClick: e,
                className: "h-9 px-3 sm:h-10 sm:px-4 flex items-center space-x-1.5 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-zinc-700 dark:text-zinc-200 rounded-xl transition cursor-pointer shrink-0 ml-2 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80 font-bold text-xs",
                title: "বন্ধ করুন (Close Studio)",
                children: [
                  i.jsx("span", { className: "hidden sm:inline", children: "বন্ধ করুন" }),
                  i.jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M18 6L6 18M6 6l12 12" })] })
                ]
              })
            ]
          }),

          // MAIN CONTAINER: smoothly scrolls top-to-bottom on mobile/tablets, 2-column independent scroll on desktop (lg)
          i.jsxs("div", {
            className: "flex-1 min-h-0 lg:overflow-hidden lg:grid lg:grid-cols-12 w-full",
            children: [
              // LEFT PANEL (Tabs & Controls)
              i.jsxs("div", {
                className: "lg:col-span-5 flex flex-col lg:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 lg:h-full lg:overflow-hidden min-h-0 w-full overflow-x-hidden",
                children: [
                  // TABS HEADER - STICKY FOR EASY SWITCHING
                  i.jsx("div", {
                    className: "sticky top-0 z-30 shrink-0 flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-md text-[11px] font-bold overflow-x-auto no-scrollbar py-1.5 px-2 gap-1.5 w-full shadow-2xs",
                    children: [
                      { id: "templates", name: "টেমপ্লেট (২৮)" },
                      { id: "typography", name: "ফন্ট ও টাইপো" },
                      { id: "position", name: "পজিশন ডি-প্যাড" },
                      { id: "style", name: "ডিজাইন ও কালার" },
                      { id: "branding", name: "উপাদান ও লোগো" },
                      { id: "debug", name: "সিস্টেম মেট্রিক্স" }
                    ].map(tab => i.jsx("button", {
                      key: tab.id,
                      onClick: () => setActiveTab(tab.id),
                      className: "px-3 py-2 rounded-lg cursor-pointer whitespace-nowrap transition flex items-center shrink-0 " + (activeTab === tab.id ? "bg-rose-600 text-white shadow-xs font-black" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"),
                      children: tab.name
                    }))
                  }),

                  // TAB CONTENT (Scrollable on desktop, natural flow on mobile)
                  i.jsxs("div", {
                    className: "p-3.5 sm:p-4.5 lg:overflow-y-auto flex-1 space-y-4 text-xs text-left w-full",
                    children: [
                      // TAB: TEMPLATES
                      activeTab === "templates" && i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "font-black text-zinc-800 dark:text-zinc-200 text-xs", children: "ডিজাইন টেমপ্লেট নির্বাচন (২৮টি প্রি-সেট)" }),
                              i.jsx("span", { className: "text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-600 font-bold px-2 py-0.5 rounded-full", children: "২৮টি সক্রিয় টেমপ্লেট" })
                            ]
                          }),
                          i.jsx("div", {
                            className: "grid grid-cols-2 gap-2 max-h-[48vh] lg:max-h-[62vh] overflow-y-auto pr-1 overscroll-contain",
                            children: zS.map(t => i.jsxs("button", {
                              key: t.id,
                              onClick: () => setSelectedTemplate(t.id),
                              className: "p-2.5 rounded-xl text-left transition cursor-pointer border flex flex-col justify-between " + (selectedTemplate === t.id ? "bg-rose-600 text-white border-rose-600 shadow-md font-black ring-2 ring-rose-600/30" : "bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"),
                              children: [
                                i.jsx("div", { className: "font-bold truncate text-[11px]", children: t.name }),
                                i.jsxs("div", { className: "text-[9px] mt-1.5 flex items-center justify-between opacity-80 " + (selectedTemplate === t.id ? "text-rose-100" : "text-zinc-500"), children: [
                                  i.jsx("span", { children: t.tag }),
                                  i.jsx("span", { className: "uppercase text-[8px] font-mono", children: t.theme })
                                ]})
                              ]
                            }))
                          })
                        ]
                      }),

                      // TAB: TYPOGRAPHY
                      activeTab === "typography" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          i.jsxs("div", {
                            className: "bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-3 rounded-xl",
                            children: [
                              i.jsx("label", { className: "block font-bold text-rose-900 dark:text-rose-300 mb-1 text-[11px]", children: "ফন্ট টেস্টের নমুনা টেক্সট (Live Font Preview Text)" }),
                              i.jsx("input", {
                                type: "text",
                                value: fontSampleText,
                                onChange: ev => setFontSampleText(ev.target.value),
                                placeholder: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                className: "w-full bg-white dark:bg-zinc-900 border border-rose-300 dark:border-rose-800 p-2 rounded-lg text-xs outline-none text-zinc-900 dark:text-white font-medium shadow-xs"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-2",
                            children: [
                              i.jsx("label", { className: "block font-black text-zinc-800 dark:text-zinc-200", children: "উপলব্ধ বাংলা ফন্টসমূহ (১-ক্লিকে সিলেক্ট করুন)" }),
                              i.jsx("div", {
                                className: "space-y-2 max-h-[38vh] lg:max-h-[44vh] overflow-y-auto pr-1 overscroll-contain",
                                children: fontList.map(f => {
                                  const isSelected = fontFamily === f.id || fontFamily === f.enName;
                                  return i.jsxs("div", {
                                    key: f.id,
                                    onClick: () => setFontFamily(f.id),
                                    className: "p-2.5 sm:p-3 rounded-xl border transition cursor-pointer flex flex-col space-y-1.5 " + (isSelected ? "bg-rose-50 dark:bg-rose-950/30 border-rose-500 shadow-sm ring-1 ring-rose-500" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"),
                                    children: [
                                      i.jsxs("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                          i.jsxs("div", {
                                            className: "flex items-center space-x-2 truncate",
                                            children: [
                                              i.jsx("span", { className: "font-bold text-[11px] truncate " + (isSelected ? "text-rose-600 dark:text-rose-400" : "text-zinc-800 dark:text-zinc-200"), children: f.name }),
                                              i.jsx("span", { className: "text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded shrink-0", children: f.category })
                                            ]
                                          }),
                                          isSelected && i.jsxs("span", {
                                            className: "flex items-center text-[10px] font-bold text-rose-600 dark:text-rose-400 shrink-0 ml-1",
                                            children: [
                                              i.jsx("svg", { className: "w-3.5 h-3.5 mr-1", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [i.jsx("path", { d: "M20 6L9 17l-5-5" })] }),
                                              "সক্রিয়"
                                            ]
                                          })
                                        ]
                                      }),
                                      i.jsx("div", {
                                        style: { fontFamily: f.fontFamily, fontWeight: f.weight, fontStyle: f.style },
                                        className: "text-sm sm:text-base py-1 leading-normal truncate " + (isSelected ? "text-rose-950 dark:text-rose-100 font-bold" : "text-zinc-800 dark:text-zinc-200"),
                                        children: fontSampleText || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"
                                      })
                                    ]
                                  });
                                })
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "হেডলাইন (শিরোনাম)" }),
                                  i.jsx("textarea", {
                                    value: customTitle,
                                    onChange: ev => setCustomTitle(ev.target.value),
                                    rows: 2,
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none focus:border-rose-500 font-medium"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "সারসংক্ষেপ (সাব-টাইটেল)" }),
                                  i.jsx("textarea", {
                                    value: customSummary,
                                    onChange: ev => setCustomSummary(ev.target.value),
                                    rows: 3,
                                    placeholder: "সংবাদের বিস্তারিত বিবরণ বা উপ-শিরোনাম...",
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none focus:border-rose-500"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block font-bold mb-1", children: "টেক্সট অ্যালাইন" }),
                                      i.jsxs("select", {
                                        value: textAlignment,
                                        onChange: ev => setTextAlignment(ev.target.value),
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none",
                                        children: [
                                          i.jsx("option", { value: "left", children: "বামে (Left)" }),
                                          i.jsx("option", { value: "center", children: "মাঝখানে (Center)" }),
                                          i.jsx("option", { value: "right", children: "ডানে (Right)" }),
                                          i.jsx("option", { value: "justified", children: "জাস্টিফাইড (Justified)" })
                                        ]
                                      })
                                    ]
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block font-bold mb-1", children: "ফন্ট সাইজ স্কেল" }),
                                      i.jsxs("select", {
                                        value: fontSize,
                                        onChange: ev => setFontSize(ev.target.value),
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none",
                                        children: [
                                          i.jsx("option", { value: "sm", children: "ছোট (Small)" }),
                                          i.jsx("option", { value: "md", children: "স্বাভাবিক (Medium)" }),
                                          i.jsx("option", { value: "lg", children: "বড় (Large)" }),
                                          i.jsx("option", { value: "xl", children: "অতিরিক্ত বড় (Extra)" })
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // TAB: POSITION
                      activeTab === "position" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          i.jsxs("div", {
                            className: "bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 p-3 rounded-xl",
                            children: [
                              i.jsx("h4", { className: "font-black text-rose-800 dark:text-rose-300 text-xs mb-1", children: "ইন্টারেক্টিভ উপাদান পজিশন কন্ট্রোল (1-Pixel Precision)" }),
                              i.jsx("p", { className: "text-[11px] text-rose-900/80 dark:text-rose-200/70 leading-relaxed", children: "যেকোনো উপাদানের অবস্থান ১ পিক্সেল নিখুঁতভাবে সরাতে নিচের তালিকা থেকে উপাদান নির্বাচন করুন অথবা প্রিভিউ ক্যানভাসে সরাসরি ক্লিক করুন।" })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-black text-zinc-800 dark:text-zinc-200 mb-1.5", children: "উপাদান নির্বাচন (Select Element)" }),
                              i.jsx("div", {
                                className: "grid grid-cols-2 gap-1.5",
                                children: layerElements.map(elem => {
                                  const isSelected = selectedElement === elem.id;
                                  const off = offsets[elem.id];
                                  const isMoved = off && (off.x !== 0 || off.y !== 0);
                                  return i.jsxs("button", {
                                    key: elem.id,
                                    onClick: () => setSelectedElement(elem.id),
                                    className: "p-2 rounded-lg text-left transition cursor-pointer border flex flex-col justify-between " + (isSelected ? "bg-rose-600 text-white border-rose-600 shadow-sm font-bold" : isMoved ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-zinc-800 dark:text-zinc-200" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"),
                                    children: [
                                      i.jsxs("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                          i.jsx("span", { className: "text-[11px] font-bold truncate", children: elem.name }),
                                          isMoved && i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" })
                                        ]
                                      }),
                                      i.jsx("div", { className: "text-[9px] opacity-75 truncate mt-0.5", children: isMoved ? "Offset: " + off.x + ", " + off.y : elem.desc })
                                    ]
                                  });
                                })
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center",
                            children: [
                              i.jsxs("div", {
                                className: "w-full flex items-center justify-between mb-3 text-[11px]",
                                children: [
                                  i.jsxs("span", { className: "font-bold text-zinc-700 dark:text-zinc-300", children: ["সক্রিয়: ", i.jsx("strong", { className: "text-rose-600", children: selectedElementObj?.name || selectedElement })] }),
                                  i.jsxs("div", {
                                    className: "flex items-center space-x-1.5",
                                    children: [
                                      i.jsx("span", { className: "text-[10px] text-zinc-500", children: "ধাপ:" }),
                                      [1, 5, 10, 20].map(sz => i.jsx("button", {
                                        key: sz,
                                        onClick: () => setStepSize(sz),
                                        className: "px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition " + (stepSize === sz ? "bg-rose-600 text-white font-bold" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"),
                                        children: sz + "px"
                                      }))
                                    ]
                                  })
                                ]
                              }),
                              // D-pad in Tab
                              i.jsxs("div", {
                                className: "relative w-36 h-36 flex items-center justify-center select-none",
                                children: [
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, -stepSize),
                                    disabled: selectedElementObj?.locked,
                                    className: "absolute top-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-40 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "উপরে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 19V5M5 12l7-7 7 7" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(-stepSize, 0),
                                    disabled: selectedElementObj?.locked,
                                    className: "absolute left-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-40 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "বামে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })] })
                                  }),
                                  i.jsxs("button", {
                                    onClick: () => resetElementPosition(),
                                    disabled: selectedElementObj?.locked,
                                    className: "w-10 h-10 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-90 disabled:opacity-40 text-zinc-700 dark:text-zinc-200 rounded-xl shadow-inner flex flex-col items-center justify-center transition cursor-pointer",
                                    title: "পজিশন রিসেট করুন",
                                    children: [
                                      i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" }), i.jsx("path", { d: "M3 3v5h5" })] }),
                                      i.jsx("span", { className: "text-[7px] font-mono mt-0.5", children: "0,0" })
                                    ]
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(stepSize, 0),
                                    disabled: selectedElementObj?.locked,
                                    className: "absolute right-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-40 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "ডানে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, stepSize),
                                    disabled: selectedElementObj?.locked,
                                    className: "absolute bottom-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-40 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "নিচে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 5v14M5 12l7 7 7-7" })] })
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // TAB: STYLE
                      activeTab === "style" && i.jsxs("div", {
                        className: "space-y-3.5",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "থিম কালার (Accent Color)" }),
                              i.jsx("div", {
                                className: "grid grid-cols-6 gap-1.5 mb-2",
                                children: ["#B3002D", "#b91c1c", "#580c1f", "#18181b", "#ffffff", "#f4f4f5", "#0f172a", "#064e3b", "#ea580c", "#1d4ed8", "#7c3aed", "#059669"].map(c => i.jsx("button", {
                                  key: c,
                                  onClick: () => setAccentColor(c),
                                  style: { backgroundColor: c },
                                  className: "h-7 rounded-lg border border-zinc-300 dark:border-zinc-700 cursor-pointer flex items-center justify-center " + (accentColor === c ? "ring-2 ring-rose-500 ring-offset-2" : ""),
                                  children: accentColor === c && i.jsx("span", { className: "text-[10px] " + (c === "#ffffff" || c === "#f4f4f5" ? "text-zinc-900 font-black" : "text-white"), children: "✓" })
                                }))
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "থিম" }),
                              i.jsx("div", {
                                className: "grid grid-cols-3 gap-2",
                                children: [
                                  { id: "light", name: "শুভ্র লাইট" },
                                  { id: "cream", name: "ভিন্টেজ ক্রিম" },
                                  { id: "dark", name: "কসমিক ডার্ক" }
                                ].map(th => i.jsx("button", {
                                  key: th.id,
                                  onClick: () => setBgTheme(th.id),
                                  className: "py-1.5 rounded-lg border text-[11px] font-bold cursor-pointer transition " + (bgTheme === th.id ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"),
                                  children: th.name
                                }))
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "পটভূমির প্যাটার্ন" }),
                              i.jsxs("select", {
                                value: bgStyle,
                                onChange: ev => setBgStyle(ev.target.value),
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none",
                                children: [
                                  i.jsx("option", { value: "solid", children: "সলিড রঙ (Solid Color)" }),
                                  i.jsx("option", { value: "gradient", children: "গ্রেডিয়েন্ট (Smooth Gradient)" }),
                                  i.jsx("option", { value: "geometric", children: "জ্যামিতিক গ্রিড (Geometric Grid)" }),
                                  i.jsx("option", { value: "paper", children: "ভিন্টেজ পেপার (Paper Texture)" }),
                                  i.jsx("option", { value: "noise", children: "ডিজিটাল নয়েজ (Digital Noise)" }),
                                  i.jsx("option", { value: "brand", children: "ব্র্যান্ড জলছাপ (Brand Watermarks)" })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "অ্যাসপেক্ট রেশিও" }),
                                  i.jsxs("select", {
                                    value: aspectRatio,
                                    onChange: ev => setAspectRatio(ev.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-[11px] outline-none",
                                    children: [
                                      i.jsx("option", { value: "1:1", children: "Square (1:1)" }),
                                      i.jsx("option", { value: "4:5", children: "Portrait (4:5)" }),
                                      i.jsx("option", { value: "9:16", children: "Story (9:16)" }),
                                      i.jsx("option", { value: "16:9", children: "Landscape (16:9)" }),
                                      i.jsx("option", { value: "1200x630", children: "FB Share (1200×630)" }),
                                      i.jsx("option", { value: "A4 Portrait", children: "A4 Portrait" }),
                                      i.jsx("option", { value: "A4 Landscape", children: "A4 Landscape" }),
                                      i.jsx("option", { value: "Custom", children: "Custom Slider" })
                                    ]
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "সীমানা স্টাইল" }),
                                  i.jsxs("select", {
                                    value: borderStyle,
                                    onChange: ev => setBorderStyle(ev.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-[11px] outline-none",
                                    children: [
                                      i.jsx("option", { value: "none", children: "কোনো সীমানা নেই" }),
                                      i.jsx("option", { value: "double", children: "ডাবল সীমানা" }),
                                      i.jsx("option", { value: "vintage", children: "ভিন্টেজ ফ্রেম" }),
                                      i.jsx("option", { value: "neon-glow", children: "নিয়ন গ্লো ফ্রেম" }),
                                      i.jsx("option", { value: "thin-red", children: "সরু লাল বর্ডার" })
                                    ]
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "ছবির অবস্থান (Image Position)" }),
                              i.jsxs("select", {
                                value: imagePosition,
                                onChange: ev => setImagePosition(ev.target.value),
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none",
                                children: [
                                  i.jsx("option", { value: "top", children: "উপরে (Top)" }),
                                  i.jsx("option", { value: "left", children: "বামে (Left Side)" }),
                                  i.jsx("option", { value: "right", children: "ডানে (Right Side)" }),
                                  i.jsx("option", { value: "background", children: "পটভূমিতে ফুল ব্যাকগ্রাউন্ড" }),
                                  i.jsx("option", { value: "hidden", children: "কোনো ছবি ছাড়া (Text Only)" })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // TAB: BRANDING
                      activeTab === "branding" && i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "স্লোগান / টপিক ব্যাজ" }),
                              i.jsx("input", {
                                type: "text",
                                value: customSlogan,
                                onChange: ev => setCustomSlogan(ev.target.value),
                                placeholder: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "ওয়াটারমার্ক টেক্সট" }),
                              i.jsx("input", {
                                type: "text",
                                value: watermarkText,
                                onChange: ev => setWatermarkText(ev.target.value),
                                placeholder: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "শাখা / অবস্থান" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: customLocation,
                                    onChange: ev => setCustomLocation(ev.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "রিপোর্টার / বিভাগ" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: customAuthor,
                                    onChange: ev => setCustomAuthor(ev.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2",
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "উপাদান প্রদর্শন টগলসমূহ" }),
                              i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showLogo, onChange: ev => setShowLogo(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "সংগঠনের লোগো" })] }),
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showFooter, onChange: ev => setShowFooter(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "ফুটার বার" })] }),
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showWatermark, onChange: ev => setShowWatermark(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "জলছাপ ব্যাকগ্রাউন্ড" })] }),
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showDate, onChange: ev => setShowDate(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "প্রকাশের তারিখ" })] }),
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showFB, onChange: ev => setShowFB(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "ফেসবুক ও সোশ্যাল" })] }),
                                  i.jsxs("label", { className: "flex items-center space-x-2 text-xs cursor-pointer", children: [i.jsx("input", { type: "checkbox", checked: showWeb, onChange: ev => setShowWeb(ev.target.checked), className: "rounded text-rose-600" }), i.jsx("span", { children: "অফিশিয়াল ওয়েবসাইট" })] })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // TAB: DEBUG
                      activeTab === "debug" && i.jsxs("div", {
                        className: "space-y-3 font-mono text-[10px]",
                        children: [
                          i.jsx("div", { className: "font-bold text-xs font-sans mb-1 text-zinc-800 dark:text-zinc-200", children: "ক্যানভাস রেন্ডারার ও কোঅর্ডিনেট ইন্সপেক্টর" }),
                          i.jsxs("div", {
                            className: "bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl space-y-1 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800",
                            children: [
                              i.jsxs("div", { children: ["Canvas Dimensions: ", i.jsx("span", { className: "text-rose-600 font-bold", children: cvsWidth + " × " + cvsHeight + " px" })] }),
                              i.jsxs("div", { children: ["Active Element: ", i.jsx("span", { className: "text-rose-600 font-bold", children: selectedElement })] }),
                              i.jsxs("div", { children: ["Active Coords: ", i.jsx("span", { className: "text-cyan-600 font-bold", children: JSON.stringify(activeCoords || {}) })] }),
                              i.jsxs("div", { children: ["Total Offsets: ", i.jsx("span", { className: "text-emerald-600 font-bold", children: JSON.stringify(offsets) })] })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),

              // RIGHT PANEL (Canvas Preview, D-pad toolbar, Export actions)
              i.jsxs("div", {
                className: "lg:col-span-7 p-3.5 sm:p-5 flex flex-col items-center justify-start bg-zinc-100/90 dark:bg-zinc-900/60 lg:h-full lg:overflow-y-auto space-y-4 min-h-0 w-full pb-16 sm:pb-8",
                children: [
                  // CANVAS PREVIEW CONTAINER WITH CLICK-TO-SELECT
                  i.jsxs("div", {
                    ref: canvasContainerRef,
                    onClick: handleCanvasClick,
                    className: "relative w-full max-w-lg mx-auto flex items-center justify-center select-none cursor-crosshair group rounded-xl overflow-hidden shadow-2xl bg-zinc-900 shrink-0",
                    children: [
                      // SELECTION BOUNDING BOX
                      activeCoords && activeCoords.w > 0 && i.jsxs("div", {
                        style: {
                          left: ((activeCoords.x / cvsWidth) * 100) + "%",
                          top: ((activeCoords.y / cvsHeight) * 100) + "%",
                          width: ((activeCoords.w / cvsWidth) * 100) + "%",
                          height: ((activeCoords.h / cvsHeight) * 100) + "%"
                        },
                        className: "absolute border-2 border-dashed border-cyan-400 bg-cyan-400/10 pointer-events-none z-20 animate-in fade-in duration-150 transition-all select-none",
                        children: [
                          i.jsx("div", { className: "absolute -top-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                          i.jsx("div", { className: "absolute -top-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                          i.jsx("div", { className: "absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                          i.jsx("div", { className: "absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                          i.jsxs("div", {
                            className: "absolute -top-6 left-0 bg-cyan-500 text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap flex items-center space-x-1",
                            children: [
                              i.jsx("span", { children: (selectedElementObj?.name || selectedElement) }),
                              activeOffset && (activeOffset.x !== 0 || activeOffset.y !== 0) && i.jsx("span", { className: "opacity-80 font-mono", children: "(" + (activeOffset.x > 0 ? "+" + activeOffset.x : activeOffset.x) + "px, " + (activeOffset.y > 0 ? "+" + activeOffset.y : activeOffset.y) + "px)" })
                            ]
                          })
                        ]
                      }),

                      // HOVER INSTRUCTION PILL
                      i.jsxs("div", {
                        className: "absolute top-2.5 right-2.5 z-10 bg-black/75 backdrop-blur-md text-white font-medium text-[10px] px-2.5 py-1 rounded-full shadow-md pointer-events-none flex items-center space-x-1.5 border border-white/10",
                        children: [
                          i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" }),
                          i.jsx("span", { children: "ক্লিক করে উপাদান সিলেক্ট করুন" })
                        ]
                      })
                    ]
                  }),

                  // INTEGRATED D-PAD & ALIGNMENT CONTROLS BAR (BELOW CANVAS)
                  i.jsxs("div", {
                    className: "w-full max-w-lg mx-auto bg-white dark:bg-zinc-950 p-3 sm:p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0",
                    children: [
                      // Active Element Selector & Info
                      i.jsxs("div", {
                        className: "flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start",
                        children: [
                          i.jsxs("div", {
                            className: "flex flex-col",
                            children: [
                              i.jsx("span", { className: "text-[10px] text-zinc-500 uppercase font-bold tracking-wider", children: "নির্বাচিত উপাদান" }),
                              i.jsx("select", {
                                value: selectedElement,
                                onChange: ev => setSelectedElement(ev.target.value),
                                className: "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-rose-600 dark:text-rose-400 p-1.5 rounded-lg outline-none cursor-pointer",
                                children: layerElements.map(l => i.jsx("option", { key: l.id, value: l.id, children: l.name }))
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "flex flex-col items-end sm:items-start pl-2",
                            children: [
                              i.jsx("span", { className: "text-[10px] text-zinc-500 font-bold", children: "ধাপ" }),
                              i.jsx("div", {
                                className: "flex space-x-1",
                                children: [1, 5, 10, 20].map(sz => i.jsx("button", {
                                  key: sz,
                                  onClick: () => setStepSize(sz),
                                  className: "px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition " + (stepSize === sz ? "bg-rose-600 text-white font-bold" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"),
                                  children: sz + "px"
                                }))
                              })
                            ]
                          })
                        ]
                      }),

                      // Responsive Compact D-pad
                      i.jsxs("div", {
                        className: "flex items-center space-x-1.5 select-none shrink-0",
                        children: [
                          i.jsx("button", {
                            onClick: () => moveElement(-stepSize, 0),
                            disabled: selectedElementObj?.locked,
                            className: "w-9 h-9 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-30 text-zinc-800 dark:text-white rounded-xl shadow-xs border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                            title: "বামে সরান",
                            children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })] })
                          }),
                          i.jsxs("div", {
                            className: "flex flex-col space-y-1.5",
                            children: [
                              i.jsx("button", {
                                onClick: () => moveElement(0, -stepSize),
                                disabled: selectedElementObj?.locked,
                                className: "w-9 h-9 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-30 text-zinc-800 dark:text-white rounded-xl shadow-xs border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                title: "উপরে সরান",
                                children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 19V5M5 12l7-7 7 7" })] })
                              }),
                              i.jsx("button", {
                                onClick: () => moveElement(0, stepSize),
                                disabled: selectedElementObj?.locked,
                                className: "w-9 h-9 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-30 text-zinc-800 dark:text-white rounded-xl shadow-xs border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                title: "নিচে সরান",
                                children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 5v14M5 12l7 7 7-7" })] })
                              })
                            ]
                          }),
                          i.jsx("button", {
                            onClick: () => moveElement(stepSize, 0),
                            disabled: selectedElementObj?.locked,
                            className: "w-9 h-9 bg-zinc-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 disabled:opacity-30 text-zinc-800 dark:text-white rounded-xl shadow-xs border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                            title: "ডানে সরান",
                            children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })] })
                          }),
                          i.jsxs("button", {
                            onClick: () => resetElementPosition(),
                            disabled: selectedElementObj?.locked,
                            className: "h-9 px-2 bg-zinc-200 hover:bg-rose-100 hover:text-rose-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-90 disabled:opacity-30 text-zinc-700 dark:text-zinc-200 rounded-xl text-[10px] font-bold flex items-center space-x-1 shadow-inner cursor-pointer transition ml-1",
                            title: "পজিশন রিসেট",
                            children: [
                              i.jsx("svg", { className: "w-3.5 h-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" }), i.jsx("path", { d: "M3 3v5h5" })] }),
                              i.jsx("span", { children: "রিসেট" })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // EXPORT CONFIGURATION & DOWNLOAD BAR
                  i.jsxs("div", {
                    className: "w-full max-w-lg mx-auto bg-white dark:bg-zinc-950 p-3 sm:p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3 shrink-0",
                    children: [
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2 text-xs",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "ফরমেট (Format)" }),
                              i.jsxs("select", {
                                value: exportFormat,
                                onChange: ev => setExportFormat(ev.target.value),
                                className: "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none font-bold text-zinc-900 dark:text-white",
                                children: [
                                  i.jsx("option", { value: "png", children: "PNG (ক্রিস্টাল ক্লিয়ার)" }),
                                  i.jsx("option", { value: "jpeg", children: "JPEG (স্ট্যান্ডার্ড ওয়েব)" }),
                                  i.jsx("option", { value: "webp", children: "WEBP (আধুনিক হালকা)" }),
                                  i.jsx("option", { value: "pdf", children: "PDF (ডকুমেন্ট প্রিন্ট)" })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "রেজোলিউশন (Resolution)" }),
                              i.jsxs("select", {
                                value: exportResolution,
                                onChange: ev => setExportResolution(ev.target.value),
                                className: "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none font-bold text-zinc-900 dark:text-white",
                                children: [
                                  i.jsx("option", { value: "standard", children: "স্ট্যান্ডার্ড (1x Normal)" }),
                                  i.jsx("option", { value: "retina", children: "রেটিনা এইচডি (2x Ultra HD)" }),
                                  i.jsx("option", { value: "4k", children: "৪কে আল্ট্রা (3.5x Print Ready)" })
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "flex items-center space-x-2 pt-1",
                        children: [
                          i.jsxs("button", {
                            onClick: renderLivePreview,
                            disabled: isRendering,
                            className: "p-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center shrink-0 shadow-xs",
                            title: "ক্যানভাস রিফ্রেশ করুন",
                            children: [
                              i.jsx("svg", { className: "w-4 h-4 " + (isRendering ? "animate-spin" : ""), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [i.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }), i.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })] })
                            ]
                          }),
                          i.jsxs("button", {
                            onClick: handleDownload,
                            disabled: isExporting,
                            className: "flex-1 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.98] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50",
                            children: [
                              isExporting ? i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                                  i.jsx("span", { children: "প্রসেসিং ও এক্সপোর্ট হচ্ছে..." })
                                ]
                              }) : i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }), i.jsx("path", { d: "M7 10l5 5 5-5" }), i.jsx("path", { d: "M12 15V3" })] }),
                                  i.jsx("span", { children: "ফটোকার্ড ডাউনলোড করুন (" + exportFormat.toUpperCase() + ")" })
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      exportSuccess && i.jsxs("div", {
                        className: "p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs flex items-center justify-center space-x-2 animate-in fade-in",
                        children: [
                          i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M20 6L9 17l-5-5" })] }),
                          i.jsx("span", { className: "font-bold", children: "ফটোকার্ড সফলভাবে ডাউনলোড ফোল্ডারে সংরক্ষিত হয়েছে!" })
                        ]
                      })
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
}`;

fs.writeFileSync('upgraded_gq.js', gqCode, 'utf8');
console.log('Successfully written upgraded_gq.js with seamless full top-to-bottom scroll & pinned sticky header!');
