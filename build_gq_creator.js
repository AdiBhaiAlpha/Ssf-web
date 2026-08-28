const fs = require('fs');

console.log('--- Writing build_gq.js ---');

const gqCode = `
function GQ({ item: n, onClose: e }) {
  // 1. Core State
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

  // 2. Custom Text State
  const [customTitle, setCustomTitle] = Q.useState(n.title || "");
  const [customLocation, setCustomLocation] = Q.useState(n.location || "ময়মনসিংহ");
  const [customAuthor, setCustomAuthor] = Q.useState(n.author || "স্টাফ রিপোর্টার");
  const [customSummary, setCustomSummary] = Q.useState("");
  const [customDate, setCustomDate] = Q.useState(n.date || "");
  const [customCategory, setCustomCategory] = Q.useState(n.category || n.type.toUpperCase());
  const [customSlogan, setCustomSlogan] = Q.useState("");
  const [watermarkText, setWatermarkText] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [summaryLength, setSummaryLength] = Q.useState("medium");

  // 3. Visibility Toggles
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

  // 4. Upgraded Positioning & Selection State
  const [selectedElement, setSelectedElement] = Q.useState("title");
  const [offsets, setOffsets] = Q.useState({});
  const [stepSize, setStepSize] = Q.useState(5);
  const [fontSampleText, setFontSampleText] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [activeTab, setActiveTab] = Q.useState("templates");

  // 5. Export & Render State
  const [exportFormat, setExportFormat] = Q.useState("png");
  const [exportResolution, setExportResolution] = Q.useState("retina");
  const [isExporting, setIsExporting] = Q.useState(false);
  const [isRendering, setIsRendering] = Q.useState(false);
  const [exportSuccess, setExportSuccess] = Q.useState(false);
  const [renderedBlob, setRenderedBlob] = Q.useState(null);
  const [renderError, setRenderError] = Q.useState(null);
  const [qrDataUrl, setQrDataUrl] = Q.useState("");

  const canvasRef = Q.useRef(null);
  const previewContainerRef = Q.useRef(null);
  const canvasMetricsRef = Q.useRef({ objectCoordinates: {}, width: 1080, height: 1080 });
  const [metricsVersion, setMetricsVersion] = Q.useState(0);

  // Initial summary extract
  Q.useEffect(() => {
    const raw = (n.excerpt || n.content || "").replace(/[#*\`_\\[\\]]/g, "").slice(0, 450);
    setCustomSummary(raw);
  }, [n]);

  // Load custom fonts on mount
  Q.useEffect(() => {
    i1.loadFonts().catch(err => console.error("Font loading error:", err));
  }, []);

  // Preset Template Change
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

  // QR Code Generator
  Q.useEffect(() => {
    const url = \`\${window.location.origin}/?tab=\${n.type === "blog" || n.type === "news" ? "news" : n.type === "publication" ? "books" : n.type === "circular" ? "circulars" : n.type === "event" ? "events" : n.type === "media" ? "media" : "home"}&\${n.type === "publication" ? "bookId" : n.type === "circular" ? "circularId" : n.type + "Id"}=\${n.id}\`;
    F1.toDataURL(url, {
      margin: 1,
      width: 256,
      color: { dark: bgTheme === "dark" ? "#ffffff" : "#000000", light: bgTheme === "dark" ? "#0b0f19" : "#ffffff" }
    }).then(d => setQrDataUrl(d)).catch(e => console.error(e));
  }, [n.id, bgTheme, n.type]);

  // Live Preview Renderer
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

  // Movement Helpers
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

  // Canvas Click Hit Testing for Component Selection
  const handleCanvasClick = (e) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * cvs.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * cvs.height;

    const coords = canvasMetricsRef.current?.objectCoordinates || {};
    // Priority order of selectable elements
    const priority = ["title", "category", "summary", "header", "image", "footer", "qr", "watermark"];
    
    for (const key of priority) {
      const box = coords[key];
      if (box && clickX >= box.x && clickX <= box.x + box.w && clickY >= box.y && clickY <= box.y + box.h) {
        setSelectedElement(key);
        return;
      }
    }
  };

  // Export & Download Handler
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

  // Calculate Aspect Ratio dimensions for preview box
  const getAspectRatioNumber = () => {
    switch (aspectRatio) {
      case "4:5": return 4 / 5;
      case "9:16": return 9 / 16;
      case "16:9": return 16 / 9;
      case "1200x630": return 1200 / 630;
      case "A4 Portrait": return 1240 / 1754;
      case "A4 Landscape": return 1754 / 1240;
      case "Custom": return customRatio;
      case "1:1": default: return 1;
    }
  };

  const currentRatio = getAspectRatioNumber();
  const previewBoxWidth = 380;
  const previewBoxHeight = Math.round(previewBoxWidth / currentRatio);

  // Fonts list for dedicated Font Preview Component
  const fontList = [
    {
      id: "Bornopata Bold",
      name: "বর্ণপাতা বোল্ড",
      enName: "Bornopata Bold",
      category: "বোল্ড ও হেভি পোস্টার",
      fontFamily: "'Bornopata Bold', 'Bornopata', 'Hind Siliguri', sans-serif",
      weight: "700",
      style: "normal"
    },
    {
      id: "Bornopata Regular",
      name: "বর্ণপাতা রেগুলার",
      enName: "Bornopata Regular",
      category: "ক্লাসিক ডিসপ্লে ও হেডলাইন",
      fontFamily: "'Bornopata Regular', 'Bornopata', 'Hind Siliguri', sans-serif",
      weight: "400",
      style: "normal"
    },
    {
      id: "Li Alinur Sangbadpatra 2 Unicode",
      name: "আলী নূর সংবাদপত্র ২",
      enName: "Li Alinur Sangbadpatra 2",
      category: "পত্রিকা হেডলাইন ফন্ট",
      fontFamily: "'Li Alinur Sangbadpatra 2 Unicode', 'Li Alinur Sangbadpatra2 Unicode', 'Hind Siliguri', sans-serif",
      weight: "700",
      style: "normal"
    },
    {
      id: "Li Alinur Sangbadpatra 2 Unicode Italic",
      name: "আলী নূর সংবাদপত্র ২ ইতালিক",
      enName: "Li Alinur Sangbadpatra 2 Italic",
      category: "পত্রিকা তির্যক শিরোনাম",
      fontFamily: "'Li Alinur Sangbadpatra 2 Unicode Italic', 'Li Alinur Sangbadpatra2 Unicode Italic', 'Hind Siliguri', sans-serif",
      weight: "700",
      style: "italic"
    },
    {
      id: "sans",
      name: "নোটো সান্স বেঙ্গলি",
      enName: "Noto Sans Bengali",
      category: "আধুনিক ও পরিচ্ছন্ন সান্স",
      fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', 'Inter', sans-serif",
      weight: "600",
      style: "normal"
    },
    {
      id: "serif",
      name: "কালপুরুষ সেরিফ",
      enName: "Kalpurush Serif",
      category: "ঐতিহ্যবাহী মার্জিত সেরিফ",
      fontFamily: "'Kalpurush', 'SutonnyBanglaOMJ', 'Noto Serif Bengali', 'Georgia', serif",
      weight: "600",
      style: "normal"
    },
    {
      id: "mono",
      name: "জেটব্রেইনস মনো",
      enName: "JetBrains Mono",
      category: "প্রযুক্তি ও গবেষণাপত্র",
      fontFamily: "'JetBrains Mono', monospace",
      weight: "500",
      style: "normal"
    },
    {
      id: "inter",
      name: "ইন্টার ক্লিন সান্স",
      enName: "Inter Sans",
      category: "ইন্টারন্যাশনাল মিনিমাল",
      fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
      weight: "600",
      style: "normal"
    }
  ];

  // Layer elements list
  const layerElements = [
    { id: "title", name: "শিরোনাম (Title)", desc: "প্রধান নিউজ হেডলাইন" },
    { id: "summary", name: "সারসংক্ষেপ (Summary)", desc: "নিবন্ধের বিষয়বস্তু" },
    { id: "image", name: "প্রধান চিত্র (Photo)", desc: "ফিচার্ড ফটো ও ব্যানার" },
    { id: "header", name: "হেডার / লোগো (Header)", desc: "সংগঠনের লোগো ও নাম" },
    { id: "category", name: "ক্যাটাগরি / স্লোগান (Badge)", desc: "টপিক ও স্লোগান বার" },
    { id: "footer", name: "ফুটার বার (Footer)", desc: "তারিখ, শাখা ও সোশ্যাল" },
    { id: "watermark", name: "জলছাপ (Watermark)", desc: "ব্যাকগ্রাউন্ডের জলছাপ" }
  ];

  // Active layer offset
  const activeOffset = (offsets && offsets[selectedElement]) || { x: 0, y: 0 };

  // Calculate bounding box overlay coordinates
  const activeCoords = canvasMetricsRef.current?.objectCoordinates?.[selectedElement];
  const cvsWidth = canvasMetricsRef.current?.width || 1080;
  const cvsHeight = canvasMetricsRef.current?.height || 1080;

  return i.jsxs("div", {
    id: "photocard-builder-modal",
    className: "fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-2 sm:p-4 overflow-y-auto",
    children: [
      i.jsxs("div", {
        className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-7xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] animate-in fade-in zoom-in-95 duration-200",
        children: [
          // Header Bar
          i.jsxs("div", {
            className: "flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 shrink-0",
            children: [
              i.jsxs("div", {
                className: "flex items-center space-x-3",
                children: [
                  i.jsx("div", {
                    className: "w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30",
                    children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [i.jsx("path", { d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })] })
                  }),
                  i.jsxs("div", {
                    children: [
                      i.jsx("h2", { className: "text-sm font-black text-zinc-900 dark:text-white leading-tight", children: "পেশাদার ফটোকার্ড ও ব্যানার স্টুডিও" }),
                      i.jsx("p", { className: "text-[10px] text-zinc-500 truncate max-w-md", children: n.title || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ফটোকার্ড" })
                    ]
                  })
                ]
              }),
              i.jsx("button", {
                onClick: e,
                className: "p-2 bg-zinc-200/70 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer transition",
                title: "বন্ধ করুন",
                children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M18 6L6 18M6 6l12 12" })] })
              })
            ]
          }),

          // Main Responsive Workspace (Sidebar + Canvas + Controls)
          i.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden",
            children: [
              // Left Column: Navigation & Settings (5 cols)
              i.jsxs("div", {
                className: "lg:col-span-5 border-r border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[82vh] bg-white dark:bg-zinc-950",
                children: [
                  // Tab Buttons
                  i.jsx("div", {
                    className: "flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-[11px] font-bold overflow-x-auto no-scrollbar shrink-0",
                    children: [
                      { id: "templates", name: "টেমপ্লেট", icon: "LayoutGrid" },
                      { id: "typography", name: "ফন্ট ও টাইপো", icon: "Type" },
                      { id: "position", name: "পজিশন ডি-প্যাড", icon: "Move" },
                      { id: "style", name: "ডিজাইন ও কালার", icon: "Palette" },
                      { id: "branding", name: "উপাদান ও লোগো", icon: "Sliders" },
                      { id: "debug", name: "ডায়াগনস্টিক", icon: "Activity" }
                    ].map(t => i.jsxs("button", {
                      key: t.id,
                      onClick: () => setActiveTab(t.id),
                      className: \`flex-1 min-w-[70px] py-2.5 px-2 text-center border-b-2 flex items-center justify-center space-x-1 cursor-pointer transition whitespace-nowrap \${activeTab === t.id ? "border-rose-600 text-rose-600 bg-white dark:bg-zinc-950 font-black" : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}\`,
                      children: [
                        i.jsx("span", { children: t.name })
                      ]
                    }))
                  }),

                  // Tab Content Area
                  i.jsxs("div", {
                    className: "p-4 overflow-y-auto flex-1 space-y-4 text-xs text-left",
                    children: [
                      // TAB 1: TEMPLATES
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
                              className: \`p-2.5 rounded-xl text-left transition cursor-pointer border flex flex-col justify-between \${selectedTemplate === t.id ? "bg-rose-600 text-white border-rose-600 shadow-md font-black" : "bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"}\`,
                              children: [
                                i.jsx("div", { className: "font-bold truncate text-[11px]", children: t.name }),
                                i.jsxs("div", { className: \`text-[9px] mt-1.5 flex items-center justify-between opacity-80 \${selectedTemplate === t.id ? "text-rose-100" : "text-zinc-500"}\`, children: [
                                  i.jsx("span", { children: t.tag }),
                                  i.jsx("span", { className: "uppercase text-[8px] font-mono", children: t.theme })
                                ]})
                              ]
                            }))
                          })
                        ]
                      }),

                      // TAB 2: TYPOGRAPHY & LIVE FONT PREVIEW COMPONENT
                      activeTab === "typography" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          // Sample Text Box for Font Previews
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

                          // Font Selection Cards with Actual Live Rendering
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
                                    className: \`p-3 rounded-xl border transition cursor-pointer flex flex-col space-y-1.5 \${isSelected ? "bg-rose-50 dark:bg-rose-950/30 border-rose-500 shadow-sm ring-1 ring-rose-500" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}\`,
                                    children: [
                                      i.jsxs("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                          i.jsxs("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                              i.jsx("span", { className: \`font-bold text-[11px] \${isSelected ? "text-rose-600 dark:text-rose-400" : "text-zinc-800 dark:text-zinc-200"}\`, children: f.name }),
                                              i.jsx("span", { className: "text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded", children: f.category })
                                            ]
                                          }),
                                          isSelected && i.jsxs("span", {
                                            className: "flex items-center text-[10px] font-bold text-rose-600 dark:text-rose-400",
                                            children: [
                                              i.jsx("svg", { className: "w-3.5 h-3.5 mr-1", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [i.jsx("path", { d: "M20 6L9 17l-5-5" })] }),
                                              "সক্রিয়"
                                            ]
                                          })
                                        ]
                                      }),
                                      // Rendered Sample Text with exact Font Family
                                      i.jsx("div", {
                                        style: { fontFamily: f.fontFamily, fontWeight: f.weight, fontStyle: f.style },
                                        className: \`text-sm sm:text-base py-1 leading-normal truncate \${isSelected ? "text-rose-950 dark:text-rose-100 font-bold" : "text-zinc-800 dark:text-zinc-200"}\`,
                                        children: fontSampleText || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"
                                      })
                                    ]
                                  });
                                })
                              })
                            ]
                          }),

                          // Text Content & Alignment Controls
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
                                      i.jsx("div", {
                                        className: "flex bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800",
                                        children: ["left", "center", "right"].map(align => i.jsx("button", {
                                          key: align,
                                          onClick: () => setTextAlignment(align),
                                          className: \`flex-1 py-1 text-[10px] font-bold rounded cursor-pointer transition capitalize \${textAlignment === align ? "bg-white dark:bg-zinc-800 text-rose-600 shadow-xs" : "text-zinc-500 hover:text-zinc-800"}\`,
                                          children: align === "left" ? "বাম" : align === "center" ? "মাঝ" : "ডান"
                                        }))
                                      })
                                    ]
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block font-bold mb-1", children: "লেখার আকার" }),
                                      i.jsxs("select", {
                                        value: fontSize,
                                        onChange: e => setFontSize(e.target.value),
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-lg text-xs outline-none",
                                        children: [
                                          i.jsx("option", { value: "sm", children: "ছোট (Small)" }),
                                          i.jsx("option", { value: "md", children: "স্বাভাবিক (Medium)" }),
                                          i.jsx("option", { value: "lg", children: "বড় (Large)" }),
                                          i.jsx("option", { value: "xl", children: "অতিরিক্ত বড় (XL)" })
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

                      // TAB 3: POSITION D-PAD & COMPONENT SELECTION
                      activeTab === "position" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          // Component Selector Dropdown / Pills
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-black text-zinc-800 dark:text-zinc-200 mb-1.5", children: "সম্পাদনা ও মুভমেন্টের উপাদান সিলেক্ট করুন" }),
                              i.jsx("div", {
                                className: "grid grid-cols-2 gap-1.5",
                                children: layerElements.map(l => i.jsxs("button", {
                                  key: l.id,
                                  onClick: () => setSelectedElement(l.id),
                                  className: \`p-2 rounded-lg text-left border cursor-pointer transition flex items-center justify-between \${selectedElement === l.id ? "bg-rose-600 text-white border-rose-600 font-bold shadow-xs" : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"}\`,
                                  children: [
                                    i.jsx("span", { className: "truncate text-[11px]", children: l.name }),
                                    offsets[l.id] && (offsets[l.id].x !== 0 || offsets[l.id].y !== 0) && i.jsx("span", {
                                      className: \`text-[9px] px-1 py-0.5 rounded font-mono \${selectedElement === l.id ? "bg-white/20 text-white" : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"}\`,
                                      children: \`\${offsets[l.id].x},\${offsets[l.id].y}\`
                                    })
                                  ]
                                }))
                              })
                            ]
                          }),

                          // D-PAD CONTROLLER
                          i.jsxs("div", {
                            className: "bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex flex-col items-center shadow-inner",
                            children: [
                              i.jsxs("div", {
                                className: "w-full flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2",
                                children: [
                                  i.jsxs("div", {
                                    className: "flex items-center space-x-1.5",
                                    children: [
                                      i.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" }),
                                      i.jsxs("span", { className: "font-black text-xs text-zinc-800 dark:text-zinc-200", children: [
                                        layerElements.find(l => l.id === selectedElement)?.name || "উপাদান",
                                        " মুভ করুন"
                                      ]})
                                    ]
                                  }),
                                  i.jsxs("span", {
                                    className: "text-[10px] font-mono bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold",
                                    children: [\`X: \${activeOffset.x >= 0 ? "+" : ""}\${activeOffset.x}px | Y: \${activeOffset.y >= 0 ? "+" : ""}\${activeOffset.y}px\`]
                                  })
                                ]
                              }),

                              // Step size toggle
                              i.jsxs("div", {
                                className: "flex items-center space-x-1 mb-3 text-[10px]",
                                children: [
                                  i.jsx("span", { className: "text-zinc-500 font-bold mr-1", children: "স্টেপ:" }),
                                  [1, 2, 5, 10, 25].map(st => i.jsx("button", {
                                    key: st,
                                    onClick: () => setStepSize(st),
                                    className: \`px-2 py-0.5 rounded font-bold cursor-pointer transition \${stepSize === st ? "bg-rose-600 text-white shadow-xs" : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"}\`,
                                    children: \`\${st}px\`
                                  }))
                                ]
                              }),

                              // Directional D-Pad Layout
                              i.jsxs("div", {
                                className: "relative w-36 h-36 flex items-center justify-center my-1 select-none",
                                children: [
                                  // UP ARROW
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, -stepSize),
                                    className: "absolute top-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "উপরে সরান (Move Up)",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 19V5M5 12l7-7 7 7" })] })
                                  }),

                                  // LEFT ARROW
                                  i.jsx("button", {
                                    onClick: () => moveElement(-stepSize, 0),
                                    className: "absolute left-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "বামে সরান (Move Left)",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" })] })
                                  }),

                                  // CENTER RESET BUTTON
                                  i.jsx("button", {
                                    onClick: () => resetElementPosition(),
                                    className: "w-10 h-10 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-xl shadow-inner flex items-center justify-center transition cursor-pointer font-black text-[10px]",
                                    title: "পজিশন রিসেট করুন",
                                    children: i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" }), i.jsx("path", { d: "M3 3v5h5" })] })
                                  }),

                                  // RIGHT ARROW
                                  i.jsx("button", {
                                    onClick: () => moveElement(stepSize, 0),
                                    className: "absolute right-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "ডানে সরান (Move Right)",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })] })
                                  }),

                                  // DOWN ARROW
                                  i.jsx("button", {
                                    onClick: () => moveElement(0, stepSize),
                                    className: "absolute bottom-0 w-11 h-11 bg-white hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-90 text-zinc-800 dark:text-white rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition cursor-pointer",
                                    title: "নিচে সরান (Move Down)",
                                    children: i.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M12 5v14M5 12l7 7 7-7" })] })
                                  })
                                ]
                              }),

                              // Reset All Offsets Button
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

                      // TAB 4: STYLE & COLORS
                      activeTab === "style" && i.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          // Accent Color Picker
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
                              // Quick Presets
                              i.jsx("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: ["#B3002D", "#dc2626", "#580c1f", "#16a34a", "#1d4ed8", "#ea580c", "#0f766e", "#e11d48", "#111827", "#ffffff"].map(c => i.jsx("button", {
                                  key: c,
                                  onClick: () => setAccentColor(c),
                                  style: { backgroundColor: c },
                                  className: \`w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition hover:scale-110 cursor-pointer \${accentColor === c ? "ring-2 ring-rose-500 ring-offset-2" : ""}\`,
                                  children: accentColor === c && i.jsx("span", { className: \`text-[10px] \${c === "#ffffff" ? "text-zinc-900 font-black" : "text-white"}\`, children: "✓" })
                                }))
                              })
                            ]
                          }),

                          // Theme Choice
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block font-bold mb-1", children: "থিম" }),
                              i.jsx("div", {
                                className: "grid grid-cols-3 gap-2",
                                children: [
                                  { id: "light", name: "শুভ্র লাইট", bg: "bg-white text-zinc-800" },
                                  { id: "cream", name: "ভিন্টেজ ক্রিম", bg: "bg-[#faf6ee] text-amber-950" },
                                  { id: "dark", name: "কসমিক ডার্ক", bg: "bg-zinc-900 text-zinc-200" }
                                ].map(th => i.jsx("button", {
                                  key: th.id,
                                  onClick: () => setBgTheme(th.id),
                                  className: \`py-1.5 rounded-lg border text-[11px] font-bold cursor-pointer transition \${bgTheme === th.id ? "bg-rose-600 text-white border-rose-600 shadow-xs" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"}\`,
                                  children: th.name
                                }))
                              })
                            ]
                          }),

                          // Background Pattern
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

                          // Aspect Ratio & Border
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

                      // TAB 5: BRANDING & LOGOS
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

                          // Image Position Dropdown
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

                          // Metadata Toggles
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

                          // Custom Inputs
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

                      // TAB 6: DIAGNOSTICS
                      activeTab === "debug" && i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            className: "bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] space-y-1.5 font-mono",
                            children: [
                              i.jsx("h4", { className: "font-black text-zinc-500 uppercase tracking-widest text-[10px] mb-2 border-b pb-1 font-sans", children: "ক্যানভাস ও রেন্ডারিং ডায়াগনস্টিকস" }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "ক্যানভাস ডাইমেনশন:" }), i.jsxs("span", { className: "font-bold", children: [\`\${cvsWidth}px × \${cvsHeight}px\`] })] }),
                              i.jsxs("div", { className: "flex justify-between", children: [i.jsx("span", { className: "text-zinc-500", children: "অ্যাসপেক্ট রেশিও:" }), i.jsx("span", { className: "font-bold", children: aspectRatio })] }),
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

              // Right Column: Canvas Live Preview & Export Toolbar (7 cols)
              i.jsxs("div", {
                className: "lg:col-span-7 bg-zinc-100 dark:bg-zinc-900/60 p-4 sm:p-5 flex flex-col justify-between items-center relative overflow-y-auto max-h-[82vh]",
                children: [
                  // Preview Header
                  i.jsxs("div", {
                    className: "w-full flex items-center justify-between mb-2 shrink-0",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          i.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500" }),
                          i.jsx("span", { className: "text-[11px] font-black text-zinc-600 dark:text-zinc-300 uppercase font-mono tracking-wider", children: "রিয়েল-টাইম ইন্টারেক্টিভ ক্যানভাস প্রিভিউ" })
                        ]
                      }),
                      i.jsxs("span", {
                        className: "text-[10px] bg-white dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700",
                        children: ["সিলেক্ট করতে যেকোনো উপাদানে ক্লিক করুন"]
                      })
                    ]
                  }),

                  // Error Banner (if any)
                  renderError && i.jsxs("div", {
                    className: "w-full bg-rose-50 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-200 p-2.5 rounded-xl text-xs mb-2",
                    children: [
                      i.jsx("strong", { children: "ত্রুটি: " }),
                      renderError.message
                    ]
                  }),

                  // Interactive Live Preview Canvas Box with Bounding Box Overlay
                  i.jsx("div", {
                    ref: previewContainerRef,
                    className: "w-full flex-1 flex items-center justify-center p-2 min-h-[320px] select-none",
                    children: i.jsxs("div", {
                      style: { width: \`\${previewBoxWidth}px\`, height: \`\${previewBoxHeight}px\` },
                      onClick: handleCanvasClick,
                      className: "relative transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-zinc-950 flex items-center justify-center cursor-crosshair group",
                      children: [
                        // Live Canvas
                        i.jsx("canvas", {
                          ref: canvasRef,
                          className: "w-full h-full object-contain pointer-events-none"
                        }),

                        // Loading spinner
                        isRendering && i.jsx("div", {
                          className: "absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-30",
                          children: i.jsx("div", { className: "w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" })
                        }),

                        // Selection Bounding Box Overlay (DOM only, excluded from download)
                        activeCoords && activeCoords.w > 0 && i.jsxs("div", {
                          style: {
                            left: \`\${(activeCoords.x / cvsWidth) * 100}%\`,
                            top: \`\${(activeCoords.y / cvsHeight) * 100}%\`,
                            width: \`\${(activeCoords.w / cvsWidth) * 100}%\`,
                            height: \`\${(activeCoords.h / cvsHeight) * 100}%\`
                          },
                          className: "absolute border-2 border-dashed border-cyan-400 bg-cyan-400/10 pointer-events-none z-20 animate-in fade-in duration-150 transition-all",
                          children: [
                            // 4 Corner Handles
                            i.jsx("div", { className: "absolute -top-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                            i.jsx("div", { className: "absolute -top-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                            i.jsx("div", { className: "absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                            i.jsx("div", { className: "absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-cyan-400 border border-white rounded-full shadow-xs" }),
                            // Floating Label Badge
                            i.jsxs("div", {
                              className: "absolute -top-6 left-0 bg-cyan-500 text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap flex items-center space-x-1",
                              children: [
                                i.jsx("span", { children: layerElements.find(l => l.id === selectedElement)?.name || selectedElement }),
                                activeOffset && (activeOffset.x !== 0 || activeOffset.y !== 0) && i.jsx("span", { className: "opacity-80", children: \`(\${activeOffset.x},\${activeOffset.y})\` })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  }),

                  // Export Toolbar & Download Controls
                  i.jsxs("div", {
                    className: "w-full bg-white dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg mt-3 shrink-0 space-y-3",
                    children: [
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 items-center",
                        children: [
                          // Format Selector
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-[10px] text-zinc-500 font-bold mb-1 uppercase tracking-wider", children: "ডাউনলোড ফরম্যাট" }),
                              i.jsx("div", {
                                className: "flex space-x-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg",
                                children: ["png", "jpeg", "webp", "pdf"].map(fmt => i.jsx("button", {
                                  key: fmt,
                                  onClick: () => setExportFormat(fmt),
                                  className: \`flex-1 py-1 rounded font-black uppercase text-[10px] cursor-pointer transition \${exportFormat === fmt ? "bg-rose-600 text-white shadow-xs" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}\`,
                                  children: fmt
                                }))
                              })
                            ]
                          }),

                          // Quality Selector
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
                                  className: \`flex-1 py-1 rounded font-bold text-[10px] cursor-pointer transition \${exportResolution === res.id ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black shadow-xs" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}\`,
                                  children: res.name
                                }))
                              })
                            ]
                          })
                        ]
                      }),

                      // Download Button
                      i.jsx("button", {
                        onClick: handleDownload,
                        disabled: isExporting,
                        className: "w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800 text-white rounded-xl text-xs font-black tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/25 transition cursor-pointer active:scale-98",
                        children: isExporting ? i.jsxs(i.Fragment, {
                          children: [
                            i.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                            i.jsx("span", { children: "হাই-রেজোলিউশন কার্ড প্রস্তুত হচ্ছে..." })
                          ]
                        }) : i.jsxs(i.Fragment, {
                          children: [
                            i.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [i.jsx("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" })] }),
                            i.jsxs("span", { children: [exportFormat === "pdf" ? "পিডিএফ সংস্করণ" : "হাই-কোয়ালিটি ফটোকার্ড", " ডাউনলোড করুন"] })
                          ]
                        })
                      }),

                      // Export Success Message
                      exportSuccess && i.jsxs("div", {
                        className: "p-2 bg-green-50 dark:bg-green-950/30 border border-green-400 text-green-800 dark:text-green-300 rounded-xl text-center text-xs font-bold animate-in fade-in duration-200 flex items-center justify-center space-x-1.5",
                        children: [
                          i.jsx("svg", { className: "w-4 h-4 text-green-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [i.jsx("path", { d: "M20 6L9 17l-5-5" })] }),
                          i.jsx("span", { children: "ফটোকার্ড ডাউনলোড সফল হয়েছে!" })
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
`;

fs.writeFileSync('gq_replacement.js', gqCode, 'utf8');
console.log('Saved gq_replacement.js');
`;

fs.writeFileSync('build_gq_creator.js', gqCode, 'utf8');
console.log('Created build_gq_creator.js');
