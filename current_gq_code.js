function GQ({ item: n, onClose: e }) {
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
  const [customCategory, setCustomCategory] = Q.useState(n.category || n.type.toUpperCase());
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
  const [stepSize, setStepSize] = Q.useState(5);
  const [fontSampleText, setFontSampleText] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [activeTab, setActiveTab] = Q.useState("templates");
  const [exportFormat, setExportFormat] = Q.useState("png");
  const [exportResolution, setExportResolution] = Q.useState("retina");
  const [isExporting, setIsExporting] = Q.useState(false);
  const [isRendering, setIsRendering] = Q.useState(false);
  const [exportSuccess, setExportSuccess] = Q.useState(false);
  const [renderedBlob, setRenderedBlob] = Q.useState(null);
  const [renderError, setRenderError] = Q.useState(null);
  const [qrDataUrl, setQrDataUrl] = Q.useState("");
  const [containerSize, setContainerSize] = Q.useState({ width: 340, height: 340 });
  const canvasRef = Q.useRef(null);
  const previewContainerRef = Q.useRef(null);
  const canvasMetricsRef = Q.useRef({ objectCoordinates: {}, width: 1080, height: 1080 });
  const [metricsVersion, setMetricsVersion] = Q.useState(0);
  Q.useEffect(() => {
    const raw = (n.excerpt || n.content || "").replace(/[#*`_[\]]/g, "").slice(0, 450);
    setCustomSummary(raw);
  }, [n]);
  Q.useEffect(() => {
    i1.loadFonts().catch(err => console.error("Font loading error:", err));
  }, []);
  Q.useEffect(() => {
    const updateContainerSize = () => {
      if (previewContainerRef.current) {
        const rect = previewContainerRef.current.getBoundingClientRect();
        const availW = Math.max(160, Math.floor(rect.width) - 20);
        const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
        const maxH = isSmallScreen ? Math.min(360, (window.innerHeight || 600) * 0.45) : Math.min(480, (window.innerHeight || 800) * 0.52);
        setContainerSize({ width: availW, height: Math.max(160, Math.floor(maxH)) });
      }
    };
    updateContainerSize();
    let ro = null;
    if (typeof ResizeObserver !== "undefined" && previewContainerRef.current) {
      ro = new ResizeObserver(updateContainerSize);
      ro.observe(previewContainerRef.current);
    }
    window.addEventListener("resize", updateContainerSize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);
  Q.useEffect(() => {
    const tpl = zS.find(ot => ot.id === selectedTemplate);
    if (tpl) {
      setBgTheme(tpl.theme);
      setBgStyle(tpl.bg);
      setAccentColor(tpl.color);
      if (tpl.font === "serif") setFontFamily("serif");
      else if (tpl.font === "mono") setFontFamily("mono");
      else setFontFamily("Bornopata Bold");
      setImagePosition(tpl.img);
      setBorderStyle(tpl.border);
      setTextAlignment(tpl.align);
      setCustomSlogan(tpl.slogan || "");
      if (tpl.tag === "BANNER" || tpl.tag === "EDITORIAL") setAspectRatio("16:9");
      else if (tpl.tag === "FB_FEED" || tpl.tag === "IG_FEED" || tpl.tag === "LIBRARY") setAspectRatio("4:5");
      else if (tpl.tag === "AWARENESS" || tpl.tag === "POLITICAL") setAspectRatio("9:16");
      else setAspectRatio("1:1");
    }
  }, [selectedTemplate]);
  Q.useEffect(() => {
    const url = window.location.origin + "/?tab=" + (n.type === "blog" || n.type === "news" ? "news" : n.type === "publication" ? "books" : n.type === "circular" ? "circulars" : n.type === "event" ? "events" : n.type === "media" ? "media" : "home") + "&" + (n.type === "publication" ? "bookId" : n.type === "circular" ? "circularId" : n.type + "Id") + "=" + n.id;
    F1.toDataURL(url, {
      margin: 1,
      width: 256,
      color: { dark: bgTheme === "dark" ? "#ffffff" : "#000000", light: bgTheme === "dark" ? "#0b0f19" : "#ffffff" }
    }).then(d => setQrDataUrl(d)).catch(e => console.error(e));
  }, [n.id, bgTheme, n.type]);
  const renderLivePreview = Q.useCallback(async () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    try {
      setIsRendering(true);
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
        customTitle,
        customSummary,
        customCategory,
        customLocation,
        customAuthor,
        customDate,
        customSlogan,
        showLogo,
        showQR,
        showDate,
        showAuthor,
        showLocation,
        showCategory,
        showFooter,
        showReadingTime,
        aspectRatio,
        showWatermark,
        watermarkText,
        showWeb,
        showFB,
        summaryLength,
        offsets
      };
      const rendered = await op.renderPhotoCard(n, cardOptions, 1, canvasMetricsRef.current);
      if (rendered && cvs) {
        cvs.width = rendered.width;
        cvs.height = rendered.height;
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          ctx.drawImage(rendered, 0, 0);
        }
        setMetricsVersion(v => v + 1);
        setRenderError(null);
      }
    } catch (err) {
      console.error("Live render error:", err);
      setRenderError({
        message: err.message || "রেন্ডারিং সমস্যা হয়েছে",
        stack: err.stack,
        time: new Date().toLocaleTimeString()
      });
    } finally {
      setIsRendering(false);
    }
  }, [
    n, selectedTemplate, accentColor, bgStyle, bgTheme, fontSize, imagePosition,
    fontFamily, textAlignment, borderStyle, customTitle, customSummary, customCategory,
    customLocation, customAuthor, customDate, customSlogan, showLogo, showQR, showDate,
    showAuthor, showLocation, showCategory, showFooter, showReadingTime, aspectRatio,
    showWatermark, watermarkText, showWeb, showFB, summaryLength, offsets
  ]);
  Q.useEffect(() => {
    renderLivePreview();
  }, [renderLivePreview]);
  const moveElement = (dx, dy) => {
    if (!selectedElement) return;
    setOffsets(prev => {
      const cur = prev[selectedElement] || { x: 0, y: 0 };
      return {
        ...prev,
        [selectedElement]: {
          x: cur.x + dx,
          y: cur.y + dy
        }
      };
    });
  };
  const resetElementPosition = (elemId) => {
    const id = elemId || selectedElement;
    setOffsets(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };
  const resetAllPositions = () => {
    setOffsets({});
  };
  const handleCanvasClick = (e) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * cvs.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * cvs.height;
    const coords = canvasMetricsRef.current?.objectCoordinates || {};
    const priority = ["title", "category", "summary", "header", "image", "footer", "qr", "watermark"];
    for (const key of priority) {
      const box = coords[key];
      if (box && clickX >= box.x && clickX <= box.x + box.w && clickY >= box.y && clickY <= box.y + box.h) {
        setSelectedElement(key);
        return;
      }
    }
  };
  const handleDownload = async () => {
    try {
      setIsExporting(true);
      setRenderError(null);
      setExportSuccess(false);
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
        customTitle,
        customSummary,
        customCategory,
        customLocation,
        customAuthor,
        customDate,
        customSlogan,
        showLogo,
        showQR,
        showDate,
        showAuthor,
        showLocation,
        showCategory,
        showFooter,
        showReadingTime,
        aspectRatio,
        showWatermark,
        watermarkText,
        showWeb,
        showFB,
        summaryLength,
        offsets
      };
      await op.exportAndDownload(n, cardOptions, exportFormat, exportResolution);
      setExportSuccess(true);
      setRenderedBlob(true);
    } catch (err) {
      console.error("Export failure:", err);
      setRenderError({
        message: err.message || "কার্ড এক্সপোর্ট করতে ব্যর্থ হয়েছে।",
        stack: err.stack,
        time: new Date().toLocaleTimeString()
      });
    } finally {
      setIsExporting(false);
    }
  };
  let internalWidth = 1080;
  let internalHeight = 1080;
  switch (aspectRatio) {
    case "4:5": internalWidth = 1080; internalHeight = 1350; break;
    case "9:16": internalWidth = 1080; internalHeight = 1920; break;
    case "16:9": internalWidth = 1920; internalHeight = 1080; break;
    case "1200x630": internalWidth = 1200; internalHeight = 630; break;
    case "A4 Portrait": internalWidth = 1240; internalHeight = 1754; break;
    case "A4 Landscape": internalWidth = 1754; internalHeight = 1240; break;
    case "Custom":
      internalWidth = 1080;
      internalHeight = Math.round(1080 / (customRatio || 1));
      break;
    case "1:1": default:
      internalWidth = 1080;
      internalHeight = 1080;
      break;
  }
  const currentAspect = internalWidth / internalHeight;
  const maxFitW = Math.min(containerSize.width || 340, 480);
  const maxFitH = containerSize.height || 380;
  let previewBoxWidth = maxFitW;
  let previewBoxHeight = previewBoxWidth / currentAspect;
  if (previewBoxHeight > maxFitH) {
    previewBoxHeight = maxFitH;
    previewBoxWidth = previewBoxHeight * currentAspect;
  }
  previewBoxWidth = Math.max(140, Math.floor(previewBoxWidth));
  previewBoxHeight = Math.max(140, Math.floor(previewBoxHeight));
  const fontList = [
    { id: "Bornopata Bold", name: "বর্ণপাতা বোল্ড", enName: "Bornopata Bold", category: "বোল্ড ও হেভি পোস্টার", fontFamily: "'Bornopata Bold', 'Bornopata', 'Hind Siliguri', sans-serif", weight: "700", style: "normal" },
    { id: "Bornopata Regular", name: "বর্ণপাতা রেগুলার", enName: "Bornopata Regular", category: "ক্লাসিক ডিসপ্লে ও হেডলাইন", fontFamily: "'Bornopata Regular', 'Bornopata', 'Hind Siliguri', sans-serif", weight: "400", style: "normal" },
    { id: "Li Alinur Sangbadpatra 2 Unicode", name: "আলী নূর সংবাদপত্র ২", enName: "Li Alinur Sangbadpatra 2", category: "পত্রিকা হেডলাইন ফন্ট", fontFamily: "'Li Alinur Sangbadpatra 2 Unicode', 'Li Alinur Sangbadpatra2 Unicode', 'Hind Siliguri', sans-serif", weight: "700", style: "normal" },
    { id: "Li Alinur Sangbadpatra 2 Unicode Italic", name: "আলী নূর সংবাদপত্র ২ ইতালিক", enName: "Li Alinur Sangbadpatra 2 Italic", category: "পত্রিকা তির্যক শিরোনাম", fontFamily: "'Li Alinur Sangbadpatra 2 Unicode Italic', 'Li Alinur Sangbadpatra2 Unicode Italic', 'Hind Siliguri', sans-serif", weight: "700", style: "italic" },
    { id: "sans", name: "নোটো সান্স বেঙ্গলি", enName: "Noto Sans Bengali", category: "আধুনিক ও পরিচ্ছন্ন সান্স", fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', 'Inter', sans-serif", weight: "600", style: "normal" },
    { id: "serif", name: "কালপুরুষ সেরিফ", enName: "Kalpurush Serif", category: "ঐতিহ্যবাহী মার্জিত সেরিফ", fontFamily: "'Kalpurush', 'SutonnyBanglaOMJ', 'Noto Serif Bengali', 'Georgia', serif", weight: "600", style: "normal" },
    { id: "mono", name: "জেটব্রেইনস মনো", enName: "JetBrains Mono", category: "প্রযুক্তি ও গবেষণাপত্র", fontFamily: "'JetBrains Mono', monospace", weight: "500", style: "normal" },
    { id: "inter", name: "ইন্টার ক্লিন সান্স", enName: "Inter Sans", category: "ইন্টারন্যাশনাল মিনিমাল", fontFamily: "'Inter', 'Hind Siliguri', sans-serif", weight: "600", style: "normal" }
  ];
  const layerElements = [
    { id: "title", name: "শিরোনাম (Title)", desc: "প্রধান নিউজ হেডলাইন" },
    { id: "summary", name: "সারসংক্ষেপ (Summary)", desc: "নিবন্ধের বিষয়বস্তু" },
    { id: "image", name: "প্রধান চিত্র (Photo)", desc: "ফিচার্ড ফটো ও ব্যানার" },
    { id: "header", name: "হেডার / লোগো (Header)", desc: "সংগঠনের লোগো ও নাম" },
    { id: "category", name: "ক্যাটাগরি / স্লোগান (Badge)", desc: "টপিক ও স্লোগান বার" },
    { id: "footer", name: "ফুটার বার (Footer)", desc: "তারিখ, শাখা ও সোশ্যাল" },
    { id: "watermark", name: "জলছাপ (Watermark)", desc: "ব্যাকগ্রাউন্ডের জলছাপ" }
  ];
  const activeOffset = (offsets && offsets[selectedElement]) || { x: 0, y: 0 };
  const activeCoords = canvasMetricsRef.current?.objectCoordinates?.[selectedElement];
  const cvsWidth = canvasMetricsRef.current?.width || internalWidth;
  const cvsHeight = canvasMetricsRef.current?.height || internalHeight;
  return i.jsxs("div", {
    id: "photocard-builder-modal",
    className: "fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden w-full max-w-full",
    children: [
      i.jsxs("div", {
        className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-7xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] animate-in fade-in zoom-in-95 duration-200",
        children: [
          i.jsxs("div", {
            className: "flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 shrink-0 w-full",
            children: [
              i.jsxs("div", {
                className: "flex items-center space-x-2.5 sm:space-x-3 overflow-hidden",
                children: [
                  i.jsx("div", {
                    className: "w-8 h-8 shrink-0 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30",
                    children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [i.jsx("path", { d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })] })
                  }),
                  i.jsxs("div", {
                    className: "truncate",
                    children: [
                      i.jsx("h2", { className: "text-xs sm:text-sm font-black text-zinc-900 dark:text-white leading-tight truncate", children: "পেশাদার ফটোকার্ড ও ব্যানার স্টুডিও" }),
                      i.jsx("p", { className: "text-[9px] sm:text-[10px] text-zinc-500 truncate max-w-xs sm:max-w-md", children: n.title || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ফটোকার্ড" })
                    ]
                  })
                ]
              }),
              i.jsx("button", {
                onClick: e,
                className: "p-2 bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer transition shrink-0 ml-2",
                title: "বন্ধ করুন",
                children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M18 6L6 18M6 6l12 12" })] })
              })
            ]
          }),
          i.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden w-full max-w-full",
            children: [
              i.jsxs("div", {
                className: "lg:col-span-5 border-r border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[82vh] bg-white dark:bg-zinc-950 w-full max-w-full overflow-x-hidden",
                children: [
                  i.jsx("div", {
                    className: "flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-[11px] font-bold overflow-x-auto no-scrollbar shrink-0 w-full",
                    children: [
                      { id: "templates", name: "টেমপ্লেট" },
                      { id: "typography", name: "ফন্ট ও টাইপো" },
                      { id: "position", name: "পজিশন ডি-প্যাড" },
                      { id: "style", name: "ডিজাইন ও কালার" },
                      { id: "branding", name: "উপাদান ও লোগো" },
                      { id: "debug", name: "ডায়াগনস্টিক" }
                    ].map(t => i.jsx("button", {
                      key: t.id,
                      onClick: () => setActiveTab(t.id),
                      className: "flex-1 min-w-[50px] py-2.5 px-1.5 text-center border-b-2 cursor-pointer transition whitespace-nowrap " + (activeTab === t.id ? "border-rose-600 text-rose-600 bg-white dark:bg-zinc-950 font-black" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"),
                      children: t.name
                    }))
                  }),
                  i.jsxs("div", {
                    className: "p-3 sm:p-4 overflow-y-auto overflow-x-hidden flex-1 space-y-4 text-xs text-left w-full",
                    children: [
                      activeTab === "templates" && i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "font-black text-zinc-800 dark:text-zinc-200 text-xs", children: "ডিজাইন টেমপ্লেট নির্বাচন (২৮টি প্রি-সেট)" }),
                              i.jsx("span", { className: "text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-600 font-bold px-2 py-0.5 rounded-full", children: "স্বয়ংক্রিয় স্টাইল" })
                            ]
                          }),
                          i.jsx("div", {
                            className: "grid grid-cols-2 gap-2 max-h-[58vh] overflow-y-auto pr-1",
                            children: zS.map(t => i.jsxs("button", {
                              key: t.id,
                              onClick: () => setSelectedTemplate(t.id),
                              className: "p-2.5 rounded-xl text-left transition cursor-pointer border flex flex-col justify-between " + (selectedTemplate === t.id ? "bg-rose-600 text-white border-rose-600 shadow-md font-black" : "bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"),
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
                                onChange: e => setFontSampleText(e.target.value),
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
                                className: "space-y-2 max-h-[42vh] overflow-y-auto pr-1",
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
                                    onChange: e => setCustomTitle(e.target.value),
                                    rows: 2,
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none focus:border-rose-500 font-medium"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block font-bold mb-1", children: "টেক্সট অ্যালাইনমেন্ট" }),
                                      i.jsxs("select", {
                                        value: textAlignment,
                                        onChange: e => setTextAlignment(e.target.value),
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg outline-none",
                                        children: [
                                          i.jsx("option", { value: "left", children: "বামে (Left)" }),
                                          i.jsx("option", { value: "center", children: "মাঝে (Center)" }),
                                          i.jsx("option", { value: "right", children: "ডানে (Right)" })
                                        ]
                                      })
                                    ]
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block font-bold mb-1", children: "ফন্ট সাইজ স্কেল" }),
                                      i.jsxs("select", {
                                        value: fontSize,
                                        onChange: e => setFontSize(e.target.value),
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
                      activeTab === "position" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          i.jsxs("div", {
                            className: "bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 p-3 rounded-xl",
                            children: [
                              i.jsx("h4", { className: "font-black text-rose-800 dark:text-rose-300 text-xs mb-1", children: "ইন্টারেক্টিভ উপাদান পজিশন কন্ট্রোল" }),
                              i.jsx("p", { className: "text-[11px] text-rose-900/80 dark:text-rose-200/70 leading-relaxed", children: "যেকোনো উপাদানের অবস্থান নড়চড় করতে নিচের উপাদান নির্বাচন করুন এবং অ্যারো কি দিয়ে নিখুঁতভাবে পজিশনিং করুন।" })
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
                                  i.jsxs("span", { className: "font-bold text-zinc-700 dark:text-zinc-300", children: ["সক্রিয়: ", i.jsx("strong", { className: "text-rose-600", children: layerElements.find(l => l.id === selectedElement)?.name || selectedElement })] }),
                                  i.jsxs("div", {
                                    className: "flex items-center space-x-1.5",
                                    children: [
                                      i.jsx("span", { className: "text-[10px] text-zinc-500", children: "ধাপ:" }),
                                      [2, 5, 10, 20].map(sz => i.jsx("button", {
                                        key: sz,
                                        onClick: () => setStepSize(sz),
                                        className: "px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition " + (stepSize === sz ? "bg-rose-600 text-white font-bold" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"),
                                        children: sz + "px"
                                      }))
                                    ]
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "relative w-36 h-36 flex items-center justify-center select-none",
                                children: [
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, -stepSize),
                                    className: "absolute top-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "উপরে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 19V5M5 12l7-7 7 7" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(-stepSize, 0),
                                    className: "absolute left-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "বামে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => resetElementPosition(),
                                    className: "w-10 h-10 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-xl shadow-inner flex items-center justify-center transition cursor-pointer font-black text-[10px]",
                                    title: "পজিশন রিসেট করুন",
                                    children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" }), i.jsx("path", { d: "M3 3v5h5" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(stepSize, 0),
                                    className: "absolute right-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "ডানে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })] })
                                  }),
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, stepSize),
                                    className: "absolute bottom-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "নিচে সরান",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 5v14M5 12l7 7 7-7" })] })
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "flex space-x-2 mt-3 w-full",
                                children: [
                                  i.jsx("button", {
                                    onClick: () => resetElementPosition(),
                                    className: "flex-1 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-lg font-bold text-[10px] text-zinc-700 dark:text-zinc-300 transition cursor-pointer",
                                    children: "বর্তমান উপাদান রিসেট"
                                  }),
                                  i.jsx("button", {
                                    onClick: resetAllPositions,
                                    className: "flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 rounded-lg font-bold text-[10px] transition cursor-pointer",
                                    children: "সব পজিশন রিসেট"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      activeTab === "style" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-black text-zinc-800 dark:text-zinc-200 mb-1.5", children: "অ্যাকসেন্ট কালার (Accent Color)" }),
                              i.jsxs("div", {
                                className: "flex items-center space-x-2 mb-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: accentColor.startsWith("#") ? accentColor : "#B3002D",
                                    onChange: e => setAccentColor(e.target.value),
                                    className: "w-9 h-9 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700 p-0.5 bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: accentColor,
                                    onChange: e => setAccentColor(e.target.value),
                                    className: "flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg text-xs font-mono font-bold uppercase outline-none"
                                  })
                                ]
                              }),
                              i.jsx("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: ["#B3002D", "#dc2626", "#580c1f", "#16a34a", "#1d4ed8", "#ea580c", "#0f766e", "#e11d48", "#111827", "#ffffff"].map(c => i.jsx("button", {
                                  key: c,
                                  onClick: () => setAccentColor(c),
                                  style: { backgroundColor: c },
                                  className: "w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition hover:scale-110 cursor-pointer " + (accentColor === c ? "ring-2 ring-rose-500 ring-offset-2" : ""),
                                  children: accentColor === c && i.jsx("span", { className: "text-[10px] " + (c === "#ffffff" ? "text-zinc-900 font-black" : "text-white"), children: "✓" })
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
                                onChange: e => setBgStyle(e.target.value),
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
                                    onChange: e => setAspectRatio(e.target.value),
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
                                    onChange: e => setBorderStyle(e.target.value),
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
                          aspectRatio === "Custom" && i.jsxs("div", {
                            className: "bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg",
                            children: [
                              i.jsxs("div", { className: "flex justify-between text-[10px] mb-1 font-bold", children: [i.jsx("span", { children: "কাস্টম রেশিও" }), i.jsxs("span", { children: [customRatio, "x"] })] }),
                              i.jsx("input", { type: "range", min: "0.5", max: "2.0", step: "0.05", value: customRatio, onChange: e => setCustomRatio(parseFloat(e.target.value)), className: "w-full accent-rose-600 cursor-pointer" })
                            ]
                          })
                        ]
                      }),
                      activeTab === "branding" && i.jsxs("div", {
                        className: "space-y-3.5",
                        children: [
                          i.jsxs("div", {
                            className: "grid grid-cols-2 gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3",
                            children: [
                              i.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
                                i.jsx("input", { type: "checkbox", checked: showLogo, onChange: e => setShowLogo(e.target.checked), className: "rounded text-rose-600" }),
                                i.jsx("span", { className: "font-medium", children: "লোগো প্রদর্শন" })
                              ]}),
                              i.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
                                i.jsx("input", { type: "checkbox", checked: showQR, onChange: e => setShowQR(e.target.checked), className: "rounded text-rose-600" }),
                                i.jsx("span", { className: "font-medium", children: "QR কোড প্রদর্শন" })
                              ]}),
                              i.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
                                i.jsx("input", { type: "checkbox", checked: showWatermark, onChange: e => setShowWatermark(e.target.checked), className: "rounded text-rose-600" }),
                                i.jsx("span", { className: "font-medium", children: "জলছাপ প্রদর্শন" })
                              ]}),
                              i.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
                                i.jsx("input", { type: "checkbox", checked: showFooter, onChange: e => setShowFooter(e.target.checked), className: "rounded text-rose-600" }),
                                i.jsx("span", { className: "font-medium", children: "ফুটার স্ট্রিপ" })
                              ]})
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "ফিচার্ড ফটো পজিশন" }),
                              i.jsxs("select", {
                                value: imagePosition,
                                onChange: e => setImagePosition(e.target.value),
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-xs outline-none",
                                children: [
                                  i.jsx("option", { value: "top", children: "উপরে (Top Photo)" }),
                                  i.jsx("option", { value: "left", children: "বামে (Left Photo)" }),
                                  i.jsx("option", { value: "right", children: "ডানে (Right Photo)" }),
                                  i.jsx("option", { value: "background", children: "পটভূমিতে (Background Vignette)" }),
                                  i.jsx("option", { value: "hidden", children: "লুকান (Text-only Mode)" })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1.5", children: "মেটাডাটা উপাদানসমূহ" }),
                              i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2 bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800",
                                children: [
                                  i.jsxs("label", { className: "flex items-center space-x-1.5 cursor-pointer text-[11px]", children: [
                                    i.jsx("input", { type: "checkbox", checked: showLocation, onChange: e => setShowLocation(e.target.checked), className: "rounded text-rose-600" }),
                                    i.jsx("span", { children: "লোকেশন" })
                                  ]}),
                                  i.jsxs("label", { className: "flex items-center space-x-1.5 cursor-pointer text-[11px]", children: [
                                    i.jsx("input", { type: "checkbox", checked: showAuthor, onChange: e => setShowAuthor(e.target.checked), className: "rounded text-rose-600" }),
                                    i.jsx("span", { children: "প্রতিবেদক" })
                                  ]}),
                                  i.jsxs("label", { className: "flex items-center space-x-1.5 cursor-pointer text-[11px]", children: [
                                    i.jsx("input", { type: "checkbox", checked: showDate, onChange: e => setShowDate(e.target.checked), className: "rounded text-rose-600" }),
                                    i.jsx("span", { children: "তারিখ" })
                                  ]}),
                                  i.jsxs("label", { className: "flex items-center space-x-1.5 cursor-pointer text-[11px]", children: [
                                    i.jsx("input", { type: "checkbox", checked: showCategory, onChange: e => setShowCategory(e.target.checked), className: "rounded text-rose-600" }),
                                    i.jsx("span", { children: "ক্যাটাগরি ব্যাজ" })
                                  ]})
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "স্থান (Location)" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: customLocation,
                                    onChange: e => setCustomLocation(e.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg outline-none"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block font-bold mb-1", children: "প্রতিবেদক (Reporter)" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: customAuthor,
                                    onChange: e => setCustomAuthor(e.target.value),
                                    className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg outline-none"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "স্লোগান / টপিক ব্যানার" }),
                              i.jsx("input", {
                                type: "text",
                                value: customSlogan,
                                onChange: e => setCustomSlogan(e.target.value),
                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg outline-none",
                                placeholder: "উদাঃ বিপ্লবী লাল সালাম"
                              })
                            ]
                          })
                        ]
                      }),
                      activeTab === "debug" && i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            className: "bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] space-y-1.5 font-mono",
                            children: [
                              i.jsx("h4", { className: "font-black text-zinc-500 uppercase tracking-widest text-[10px] mb-2 border-b pb-1 font-sans", children: "ক্যানভাস ও রেন্ডারিং ডায়াগনস্টিকস" }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "ক্যানভাস ডাইমেনশন:" }), i.jsx("span", { className: "font-bold", children: cvsWidth + "px × " + cvsHeight + "px" })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "অ্যাসপেক্ট রেশিও:" }), i.jsx("span", { className: "font-bold", children: aspectRatio })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "প্রিভিউ স্কেল সাইজ:" }), i.jsx("span", { className: "font-bold text-blue-600", children: previewBoxWidth + "px × " + previewBoxHeight + "px" })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "সক্রিয় ফন্ট:" }), i.jsx("span", { className: "font-bold text-rose-600", children: fontFamily })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "সিলেক্টেড উপাদান:" }), i.jsx("span", { className: "font-bold text-green-600", children: selectedElement })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "মুভমেন্ট অফসেটস:" }), i.jsx("span", { className: "font-bold", children: JSON.stringify(offsets) })] })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              i.jsxs("div", {
                className: "lg:col-span-7 bg-zinc-100 dark:bg-zinc-900/60 p-3 sm:p-5 flex flex-col justify-between items-center relative overflow-y-auto overflow-x-hidden max-h-[82vh] w-full max-w-full",
                children: [
                  i.jsxs("div", {
                    className: "w-full flex items-center justify-between mb-2 shrink-0 px-1",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center space-x-2 truncate",
                        children: [
                          i.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 shrink-0" }),
                          i.jsx("span", { className: "text-[10px] sm:text-[11px] font-black text-zinc-600 dark:text-zinc-300 uppercase font-mono tracking-wider truncate", children: "লকড ক্যানভাস প্রিভিউ (Fixed Canvas)" })
                        ]
                      }),
                      i.jsx("span", {
                        className: "text-[9px] sm:text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 shrink-0 ml-1",
                        children: "উপাদান নির্বাচন করতে ক্লিক করুন"
                      })
                    ]
                  }),
                  renderError && i.jsxs("div", {
                    className: "w-full bg-rose-50 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-200 p-2.5 rounded-xl text-xs mb-2",
                    children: [
                      i.jsx("strong", { children: "ত্রুটি: " }),
                      renderError.message
                    ]
                  }),
                  i.jsx("div", {
                    ref: previewContainerRef,
                    id: "photocard-preview-viewport",
                    style: { touchAction: "pan-y" },
                    className: "w-full max-w-full overflow-hidden flex-1 flex items-center justify-center p-2 min-h-[220px] select-none",
                    children: i.jsxs("div", {
                      id: "locked-canvas-stage",
                      style: {
                        width: previewBoxWidth + "px",
                        height: previewBoxHeight + "px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        aspectRatio: internalWidth + " / " + internalHeight,
                        touchAction: "none",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitUserDrag: "none"
                      },
                      draggable: false,
                      onDragStart: ev => ev.preventDefault(),
                      onClick: handleCanvasClick,
                      className: "relative shrink-0 shadow-2xl rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-950 flex items-center justify-center cursor-pointer select-none",
                      children: [
                        i.jsx("canvas", {
                          ref: canvasRef,
                          draggable: false,
                          onDragStart: ev => ev.preventDefault(),
                          style: {
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                            userSelect: "none",
                            WebkitUserDrag: "none",
                            display: "block"
                          },
                          className: "w-full h-full object-contain pointer-events-none select-none block"
                        }),
                        isRendering && i.jsx("div", {
                          className: "absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-30 pointer-events-none",
                          children: i.jsx("div", { className: "w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" })
                        }),
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
                                i.jsx("span", { children: (layerElements.find(l => l.id === selectedElement)?.name || selectedElement) }),
                                activeOffset && (activeOffset.x !== 0 || activeOffset.y !== 0) && i.jsx("span", { className: "opacity-80", children: "(" + activeOffset.x + "," + activeOffset.y + ")" })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  }),
                  i.jsxs("div", {
                    className: "w-full bg-white dark:bg-zinc-950 p-3 sm:p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg mt-3 shrink-0 space-y-3",
                    children: [
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 items-center",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider", children: "ডাউনলোড ফরম্যাট" }),
                              i.jsx("div", {
                                className: "flex space-x-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg",
                                children: ["png", "jpeg", "webp", "pdf"].map(fmt => i.jsx("button", {
                                  key: fmt,
                                  onClick: () => setExportFormat(fmt),
                                  className: "flex-1 py-1 rounded font-black uppercase text-[10px] cursor-pointer transition " + (exportFormat === fmt ? "bg-rose-600 text-white shadow-xs" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"),
                                  children: fmt
                                }))
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider", children: "রেন্ডার রেজোলিউশন" }),
                              i.jsx("div", {
                                className: "flex space-x-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg",
                                children: [
                                  { id: "normal", name: "2x" },
                                  { id: "retina", name: "Retina 3x" },
                                  { id: "4k", name: "Extreme 4K" }
                                ].map(res => i.jsx("button", {
                                  key: res.id,
                                  onClick: () => setExportResolution(res.id),
                                  className: "flex-1 py-1 rounded font-bold text-[10px] cursor-pointer transition " + (exportResolution === res.id ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black shadow-xs" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"),
                                  children: res.name
                                }))
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
                            className: "p-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center shrink-0",
                            title: "ক্যানভাস রিফ্রেশ করুন",
                            children: [
                              i.jsx("svg", { className: "w-4 h-4 " + (isRendering ? "animate-spin" : ""), viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [i.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }), i.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })] })
                            ]
                          }),
                          i.jsxs("button", {
                            onClick: handleDownload,
                            disabled: isExporting,
                            className: "flex-1 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.98] text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50",
                            children: [
                              isExporting ? i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                                  i.jsx("span", { children: "প্রসেসিং ও এক্সপোর্ট হচ্ছে..." })
                                ]
                              }) : exportSuccess ? i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("svg", { className: "w-4 h-4 text-white", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [i.jsx("path", { d: "M20 6L9 17l-5-5" })] }),
                                  i.jsx("span", { children: "সফলভাবে ডাউনলোড হয়েছে!" })
                                ]
                              }) : i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" })] }),
                                  i.jsxs("span", { children: ["হাই-রেজোলিউশন ফটোকার্ড ডাউনলোড (", exportFormat.toUpperCase(), ")"] })
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
          })
        ]
      })
    ]
  });
}
