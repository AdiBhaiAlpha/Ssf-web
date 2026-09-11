function BorbilaPhotoCardV2({ item, db, onClose, isStandalone, onSelectItem, setCurrentTab }) {
  // Body scroll lock effect
  Q.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  const DEFAULT_SETTINGS = {
    format: "classic-red",
    primaryColor: "#d60000",
    secondaryColor: "#7a0000",
    accentColor: "#ff2d2d",
    topBackgroundColor: "#fff0f0",
    titleColor: "#ffffff",
    dateColor: "#3f3f46",
    textColor: "#181818",
    logoColor: "#181818",
    logoUrl: "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
    bottomText: "বিস্তারিত কমেন্টে",
    captionText: "ছবি: সংগৃহীত",
    sectionLabel: "সংবাদ",
    footerLeftText: "",
    footerRightText: "",
    adText: "",
    brandUrl: "ssf-mymensingh.org",
    facebookUrl: "fb.com/ssfmymensingh",
    youtubeUrl: "",
    instagramUrl: "",
    frontButtonText: "Download PhotoCard",
    downloadPrefix: "ssf-photocard",
    titleFontFamily: "SolaimanLipi",
    titleFontSize: 50
  };

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
      description: "টপ ইমেজ ব্যানার, সেন্টার ডার্ক টেক্সট কার্ড, সোশাল মিডিয়া চ্যানেল আইকন স্ট্রিপ ও ফুল ফুটার।",
      primaryColor: "#b40000",
      secondaryColor: "#6c0000",
      accentColor: "#ff4d4d",
      topBackgroundColor: "#140303",
      titleColor: "#ffffff",
      dateColor: "#cccccc",
      textColor: "#ffffff",
      logoColor: "#ffffff",
      badge: "সোশাল"
    },
    "golden-frame": {
      id: "golden-frame",
      label: "বর্ডার ফ্রেম গোল্ডেন এডিশন",
      labelEn: "Border Frame Edition",
      description: "বোল্ড মার্জিন ফ্রেম, ফুল কাট ফটো, সেন্ট্রাল ব্র্যান্ড এমব্লেম ব্যাজ ও ডুয়াল ফুটার মেটা।",
      primaryColor: "#b80000",
      secondaryColor: "#400000",
      accentColor: "#ffd700",
      topBackgroundColor: "#1a0505",
      titleColor: "#ffffff",
      dateColor: "#f0e68c",
      textColor: "#ffffff",
      logoColor: "#ffd700",
      badge: "প্রিমিয়াম"
    }
  };

  const AVAILABLE_FONTS = [
    { id: "SolaimanLipi", name: "সোলায়মান লিপি (SolaimanLipi)", family: '"SolaimanLipi", "Noto Sans Bengali", sans-serif' },
    { id: "Bornopata-Bold", name: "বর্ণপাতা বোল্ড (Bornopata Bold)", family: '"Bornopata Bold", "Bornopata-Bold", "SolaimanLipi", sans-serif' },
    { id: "Bornopata-Regular", name: "বর্ণপাতা রেগুলার (Bornopata Regular)", family: '"Bornopata Regular", "Bornopata-Regular", "SolaimanLipi", sans-serif' },
    { id: "Li Alinur Sangbadpatra 2 Unicode", name: "আলী নূর সংবাদপত্র ২ (Li Alinur)", family: '"Li Alinur Sangbadpatra 2 Unicode", "SolaimanLipi", sans-serif' },
    { id: "Li Alinur Sangbadpatra 2 Unicode Italic", name: "আলী নূর সংবাদপত্র ২ ইতালিক", family: '"Li Alinur Sangbadpatra 2 Unicode Italic", "SolaimanLipi", sans-serif' },
    { id: "Noto Sans Bengali", name: "নোটো সান্স বাংলা (Noto Sans Bengali)", family: '"Noto Sans Bengali", "SolaimanLipi", sans-serif' },
    { id: "Kalpurush", name: "কালপুরুষ সেরিফ (Kalpurush)", family: '"Kalpurush", "Noto Serif Bengali", serif' },
    { id: "Hind Siliguri", name: "হিন্দ শিলিগুড়ি (Hind Siliguri)", family: '"Hind Siliguri", "SolaimanLipi", sans-serif' },
    { id: "Tiro Bangla", name: "তিরো বাংলা (Tiro Bangla)", family: '"Tiro Bangla", serif' },
    { id: "JetBrains Mono", name: "জেটব্রেইনস মনো (JetBrains Mono)", family: '"JetBrains Mono", monospace' }
  ];

  const getFormattedDate = () => {
    try {
      const now = new Date();
      return now.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch (e) {
      return "০২ সেপ্টেম্বর ২০২৬";
    }
  };

  // State Declarations
  const [format, setFormat] = Q.useState(DEFAULT_SETTINGS.format);
  const [title, setTitle] = Q.useState(item?.title || "সমাজতান্ত্রিক বিপ্লব ত্বরান্বিত করতে ছাত্র সমাজের অগ্রণী ভূমিকা অনিবার্য");
  const [photoUrl, setPhotoUrl] = Q.useState(item?.image || item?.coverImage || item?.coverUrl || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop");
  const [photoZoom, setPhotoZoom] = Q.useState(100);
  const [showLogo, setShowLogo] = Q.useState(true);
  const [logoUrl, setLogoUrl] = Q.useState(DEFAULT_SETTINGS.logoUrl);
  const [dateText, setDateText] = Q.useState(item?.date || getFormattedDate());
  const [captionText, setCaptionText] = Q.useState(DEFAULT_SETTINGS.captionText);
  const [sectionLabel, setSectionLabel] = Q.useState(item?.category || "সংবাদ");
  const [bottomText, setBottomText] = Q.useState(DEFAULT_SETTINGS.bottomText);
  const [siteName, setSiteName] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [domain, setDomain] = Q.useState("ssf-mymensingh.org");
  const [brandUrl, setBrandUrl] = Q.useState("ssf-mymensingh.org");
  const [facebookUrl, setFacebookUrl] = Q.useState("fb.com/ssfmymensingh");
  const [youtubeUrl, setYoutubeUrl] = Q.useState("");
  const [instagramUrl, setInstagramUrl] = Q.useState("");
  const [adText, setAdText] = Q.useState("");

  // QR Code States
  const [showQrCode, setShowQrCode] = Q.useState(false);
  const [qrCodeData, setQrCodeData] = Q.useState("https://ssf-mymensingh.org");
  const [qrPosition, setQrPosition] = Q.useState("bottom-right"); // "bottom-right" | "bottom-left" | "top-right"
  const [qrSize, setQrSize] = Q.useState(120);

  // Color States
  const [primaryColor, setPrimaryColor] = Q.useState(DEFAULT_SETTINGS.primaryColor);
  const [secondaryColor, setSecondaryColor] = Q.useState(DEFAULT_SETTINGS.secondaryColor);
  const [accentColor, setAccentColor] = Q.useState(DEFAULT_SETTINGS.accentColor);
  const [topBackgroundColor, setTopBackgroundColor] = Q.useState(DEFAULT_SETTINGS.topBackgroundColor);
  const [titleColor, setTitleColor] = Q.useState(DEFAULT_SETTINGS.titleColor);
  const [dateColor, setDateColor] = Q.useState(DEFAULT_SETTINGS.dateColor);
  const [textColor, setTextColor] = Q.useState(DEFAULT_SETTINGS.textColor);
  const [logoColor, setLogoColor] = Q.useState(DEFAULT_SETTINGS.logoColor);

  // Typography Settings
  const [titleFontFamily, setTitleFontFamily] = Q.useState("SolaimanLipi");
  const [titleFontSize, setTitleFontSize] = Q.useState(50);

  // Positioning & Offset States
  const [activePositionComponent, setActivePositionComponent] = Q.useState("title");
  const [offsets, setOffsets] = Q.useState({
    title: { x: 0, y: 0 },
    photo: { x: 0, y: 0 },
    logo: { x: 0, y: 0 },
    category: { x: 0, y: 0 },
    date: { x: 0, y: 0 },
    qr: { x: 0, y: 0 }
  });

  const updateOffset = (comp, axis, val) => {
    setOffsets(prev => ({
      ...prev,
      [comp]: {
        ...prev[comp],
        [axis]: Number(val)
      }
    }));
  };

  const nudgeOffset = (comp, dx, dy) => {
    setOffsets(prev => ({
      ...prev,
      [comp]: {
        x: (prev[comp]?.x || 0) + dx,
        y: (prev[comp]?.y || 0) + dy
      }
    }));
  };

  const resetOffset = (comp) => {
    setOffsets(prev => ({
      ...prev,
      [comp]: { x: 0, y: 0 }
    }));
  };

  const resetAllOffsets = () => {
    setOffsets({
      title: { x: 0, y: 0 },
      photo: { x: 0, y: 0 },
      logo: { x: 0, y: 0 },
      category: { x: 0, y: 0 },
      date: { x: 0, y: 0 },
      qr: { x: 0, y: 0 }
    });
  };

  // UI Studio State
  const [activeTab, setActiveTab] = Q.useState("formats"); // "formats" | "content" | "colors" | "branding" | "positioning"
  const [zoomLevel, setZoomLevel] = Q.useState("fit"); // "fit" | "50" | "75" | "100"
  const [isRendering, setIsRendering] = Q.useState(false);
  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportNotice, setExportNotice] = Q.useState("");
  const [renderError, setRenderError] = Q.useState("");

  const previewCanvasRef = Q.useRef(null);

  // Apply Preset Handler
  const handleApplyPreset = (presetKey) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setFormat(p.id);
    setPrimaryColor(p.primaryColor);
    setSecondaryColor(p.secondaryColor);
    setAccentColor(p.accentColor);
    setTopBackgroundColor(p.topBackgroundColor);
    setTitleColor(p.titleColor);
    setDateColor(p.dateColor);
    setTextColor(p.textColor);
    setLogoColor(p.logoColor);
  };

  // ---------------- CANVAS DRAWING ENGINE HELPERS ----------------
  const normalizeHexColor = (value, fallback) => {
    if (!value || typeof value !== "string") return fallback;
    var trimmed = value.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(trimmed) || /^#[0-9a-fA-F]{3}$/.test(trimmed)) {
      return trimmed;
    }
    return fallback;
  };

  const colorWithAlpha = (hexColor, alpha) => {
    var hex = normalizeHexColor(hexColor, "#d60000").replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
    }
    var num = parseInt(hex, 16);
    var r = (num >> 16) & 255;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  };

  const safeLoadImage = (src) => {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  const getFontFamilyString = (fontId) => {
    const f = AVAILABLE_FONTS.find(item => item.id === fontId);
    return f ? f.family : '"SolaimanLipi", "Noto Sans Bengali", sans-serif';
  };

  const getTextFont = (weight, size, fontId) => {
    return (weight || "normal") + " " + size + "px " + getFontFamilyString(fontId || titleFontFamily);
  };

  const getTitleFont = (size, fontId) => {
    return "bold " + size + "px " + getFontFamilyString(fontId || titleFontFamily);
  };

  const getTitleFontMedium = (size, fontId) => {
    return "600 " + size + "px " + getFontFamilyString(fontId || titleFontFamily);
  };

  const trimTextToWidth = (ctx, text, maxWidth) => {
    if (!text) return "";
    var str = String(text);
    if (ctx.measureText(str).width <= maxWidth) return str;
    var low = 0, high = str.length, best = "";
    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      var candidate = str.slice(0, mid) + "...";
      if (ctx.measureText(candidate).width <= maxWidth) {
        best = candidate;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return best || str.slice(0, 1) + "...";
  };

  const wrapText = (ctx, text, maxWidth, maxLines) => {
    if (!text) return [];
    var words = String(text).split(/\s+/);
    var lines = [];
    var currentLine = "";
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var testLine = currentLine ? currentLine + " " + word : word;
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
        if (maxLines && lines.length === maxLines - 1) {
          var remaining = words.slice(i).join(" ");
          lines.push(trimTextToWidth(ctx, remaining, maxWidth));
          return lines;
        }
      }
    }
    if (currentLine && (!maxLines || lines.length < maxLines)) {
      lines.push(currentLine);
    }
    return lines;
  };

  const drawAdaptiveMultiline = (ctx, text, options) => {
    options = options || {};
    var x = options.x || 540;
    var y = options.y || 760;
    var maxWidth = options.maxWidth || 900;
    var maxLines = options.maxLines || 3;
    var maxFont = options.maxFont || 54;
    var minFont = options.minFont || 28;
    var lineGap = options.lineGap || 1.15;
    var fontGetter = options.fontGetter || function(sz) { return getTitleFont(sz); };

    var bestLines = [];
    var bestFontSize = minFont;

    for (var fontSize = maxFont; fontSize >= minFont; fontSize -= 2) {
      ctx.font = fontGetter(fontSize);
      var lines = wrapText(ctx, text, maxWidth, maxLines);
      if (lines.length <= maxLines) {
        var fits = true;
        for (var j = 0; j < lines.length; j++) {
          if (ctx.measureText(lines[j]).width > maxWidth) {
            fits = false;
            break;
          }
        }
        if (fits) {
          bestLines = lines;
          bestFontSize = fontSize;
          break;
        }
      }
    }

    if (bestLines.length === 0) {
      ctx.font = fontGetter(minFont);
      bestLines = wrapText(ctx, text, maxWidth, maxLines);
      bestFontSize = minFont;
    }

    ctx.font = fontGetter(bestFontSize);
    ctx.textAlign = options.align || "center";
    ctx.textBaseline = "middle";

    var lineHeight = bestFontSize * lineGap;
    var totalHeight = (bestLines.length - 1) * lineHeight;
    var startY = y - totalHeight / 2;

    for (var k = 0; k < bestLines.length; k++) {
      ctx.fillText(bestLines[k], x, startY + k * lineHeight);
    }
    return { lines: bestLines, fontSize: bestFontSize, startY: startY, totalHeight: totalHeight };
  };

  const fillRoundedRect = (ctx, x, y, w, h, radius, fillStyle) => {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, radius);
    } else {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    }
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
  };

  const strokeRoundedRect = (ctx, x, y, w, h, radius, strokeStyle, lineWidth) => {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, radius);
    } else {
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    }
    ctx.closePath();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth || 1;
      ctx.stroke();
    }
  };

  const chamferPath = (ctx, x, y, w, h, cut) => {
    ctx.beginPath();
    ctx.moveTo(x + cut, y);
    ctx.lineTo(x + w - cut, y);
    ctx.lineTo(x + w, y + cut);
    ctx.lineTo(x + w, y + h - cut);
    ctx.lineTo(x + w - cut, y + h);
    ctx.lineTo(x + cut, y + h);
    ctx.lineTo(x, y + h - cut);
    ctx.lineTo(x, y + cut);
    ctx.closePath();
  };

  const drawPlaceholderPattern = (ctx, x, y, width, height, text) => {
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = getTextFont("600", 24);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text || "ছবি নেই", x + width / 2, y + height / 2);
  };

  const drawImageCover = (ctx, img, x, y, width, height, zoom = 100) => {
    if (!img || !img.width || !img.height) {
      drawPlaceholderPattern(ctx, x, y, width, height, "ছবি লোড হচ্ছে...");
      return;
    }
    try {
      var scaleFactor = (zoom || 100) / 100;
      var imgRatio = img.width / img.height;
      var targetRatio = width / height;
      var sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
      if (imgRatio > targetRatio) {
        sWidth = Math.round((img.height * targetRatio) / scaleFactor);
        sx = Math.round((img.width - sWidth) / 2);
      } else {
        sHeight = Math.round((img.width / targetRatio) / scaleFactor);
        sy = Math.round((img.height - sHeight) / 2);
      }
      ctx.drawImage(img, Math.max(0, sx), Math.max(0, sy), Math.min(img.width, sWidth), Math.min(img.height, sHeight), x, y, width, height);
    } catch (e) {
      drawPlaceholderPattern(ctx, x, y, width, height, "ছবি প্রদর্শন ত্রুটি");
    }
  };

  const drawLogo = (ctx, logoImage, payload, settings, options) => {
    if (!settings.showLogo) return;
    var x = options.x + (offsets.logo.x || 0);
    var y = options.y + (offsets.logo.y || 0);
    var maxW = options.maxW || 330;
    var maxH = options.maxH || 110;
    var align = options.align || "left";
    if (logoImage && logoImage.width && logoImage.height) {
      var ratio = logoImage.width / logoImage.height;
      var w = maxW;
      var h = maxW / ratio;
      if (h > maxH) {
        h = maxH;
        w = h * ratio;
      }
      var drawX = x;
      if (align === "center") {
        drawX = x + (maxW - w) / 2;
      } else if (align === "right") {
        drawX = x + maxW - w;
      }
      try {
        ctx.drawImage(logoImage, drawX, y + (maxH - h) / 2, w, h);
        return;
      } catch (e) {}
    }
    var siteText = payload.siteName || payload.domain || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট";
    var textX = x;
    if (align === "center") {
      textX = x + maxW / 2;
    } else if (align === "right") {
      textX = x + maxW;
    }
    ctx.fillStyle = options.color || settings.logoColor || "#181818";
    ctx.font = getTextFont("800", options.fontSize || 42, settings.titleFontFamily);
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, siteText, maxW), textX, y + maxH / 2);
  };

  const drawDate = (ctx, payload, settings, x, y, align, size, color) => {
    var drawX = x + (offsets.date.x || 0);
    var drawY = y + (offsets.date.y || 0);
    var dateVal = payload.dateText || "";
    ctx.fillStyle = color || settings.dateColor || "#3f3f46";
    ctx.font = getTextFont("700", size || 42, settings.titleFontFamily);
    ctx.textAlign = align || "right";
    ctx.textBaseline = "middle";
    ctx.fillText(dateVal, drawX, drawY);
  };

  const drawCornerTriangle = (ctx, size, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(size - 120, 0);
    ctx.lineTo(size, 120);
    ctx.closePath();
    ctx.fill();
  };

  const drawSquarePattern = (ctx, startX, startY, color) => {
    var square = 16;
    var gap = 11;
    var rows = 9;
    var cols = 4;
    ctx.fillStyle = color;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(startX + c * (square + gap), startY + r * (square + gap), square, square);
        }
      }
    }
  };

  const drawImageFrameClassic = (ctx, photoImage) => {
    var x = 40 + (offsets.photo.x || 0);
    var y = 145 + (offsets.photo.y || 0);
    var w = 1000;
    var h = 590;
    var cut = 42;
    var inset = 8;
    ctx.fillStyle = "#ffffff";
    chamferPath(ctx, x, y, w, h, cut);
    ctx.fill();
    var ix = x + inset;
    var iy = y + inset;
    var iw = w - inset * 2;
    var ih = h - inset * 2;
    var icut = Math.max(0, cut - inset);
    ctx.save();
    chamferPath(ctx, ix, iy, iw, ih, icut);
    ctx.clip();
    drawImageCover(ctx, photoImage, ix, iy, iw, ih, photoZoom);
    ctx.restore();
  };

  const drawBottomLinkStrip = (ctx, text, settings, options) => {
    options = options || {};
    var stripX = options.x || 162;
    var stripY = options.y || 968;
    var stripW = options.w || 756;
    var stripH = options.h || 74;
    var radius = stripH / 2;
    ctx.save();
    ctx.shadowColor = colorWithAlpha(settings.primaryColor, 0.28);
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 0;
    fillRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha(settings.primaryColor, 0.18));
    ctx.restore();
    var body = ctx.createLinearGradient(stripX, stripY, stripX, stripY + stripH);
    body.addColorStop(0, settings.accentColor || "#ff2d2d");
    body.addColorStop(0.45, settings.primaryColor || "#d60000");
    body.addColorStop(1, settings.secondaryColor || "#7a0000");
    fillRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, body);
    strokeRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.72), 1.2);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", options.fontSize || 30, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, text, stripW - 80), stripX + stripW / 2, stripY + stripH / 2 + 1);
  };

  const drawFooterMeta = (ctx, payload, settings, options) => {
    options = options || {};
    var y = options.y || 1040;
    var color = options.color || settings.dateColor;
    var size = options.size || 28;
    ctx.fillStyle = color;
    ctx.font = getTextFont("600", size, settings.titleFontFamily);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    var leftText = settings.footerLeftText || payload.dateText || "";
    if (leftText) ctx.fillText(trimTextToWidth(ctx, leftText, 450), options.leftX || 48, y);
    ctx.textAlign = "right";
    var rightText = settings.footerRightText || settings.brandUrl || payload.domain || "ssf-mymensingh.org";
    if (rightText) ctx.fillText(trimTextToWidth(ctx, rightText, 450), options.rightX || 1030, y);
  };

  const drawSocialStrip = (ctx, payload, settings, x, y, width, height) => {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", 26, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var text = settings.facebookUrl ? "facebook: " + settings.facebookUrl : (settings.brandUrl || payload.domain || "ssf-mymensingh.org");
    ctx.fillText(trimTextToWidth(ctx, text, width - 40), x + width / 2, y + height / 2);
  };

  const drawQrCodeOverlay = (ctx, qrImg, settings, size) => {
    if (!settings.showQrCode || !qrImg) return;
    var qSize = settings.qrSize || 120;
    var qx = size - qSize - 36 + (offsets.qr.x || 0);
    var qy = size - qSize - 36 + (offsets.qr.y || 0);
    if (settings.qrPosition === "bottom-left") {
      qx = 36 + (offsets.qr.x || 0);
      qy = size - qSize - 36 + (offsets.qr.y || 0);
    } else if (settings.qrPosition === "top-right") {
      qx = size - qSize - 36 + (offsets.qr.x || 0);
      qy = 36 + (offsets.qr.y || 0);
    }

    ctx.save();
    // Background card for QR
    fillRoundedRect(ctx, qx - 8, qy - 8, qSize + 16, qSize + 16, 12, "#ffffff");
    strokeRoundedRect(ctx, qx - 8, qy - 8, qSize + 16, qSize + 16, 12, "rgba(0,0,0,0.15)", 1.5);
    ctx.drawImage(qrImg, qx, qy, qSize, qSize);
    ctx.restore();
  };

  // 1. CLASSIC RED FORMAT
  const drawClassicFormat = (ctx, photoImage, logoImage, qrImg, payload, settings, size) => {
    ctx.fillStyle = settings.topBackgroundColor || "#fff0f0";
    ctx.fillRect(0, 0, size, size);

    var redGradient = ctx.createLinearGradient(0, 456, 0, size);
    redGradient.addColorStop(0, settings.primaryColor || "#d60000");
    redGradient.addColorStop(1, settings.secondaryColor || "#7a0000");
    ctx.fillStyle = redGradient;
    ctx.fillRect(0, 456, size, size - 456);

    drawCornerTriangle(ctx, size, settings.primaryColor || "#d60000");
    ctx.fillStyle = settings.primaryColor || "#d60000";
    ctx.fillRect(0, 455, size, 135);

    drawSquarePattern(ctx, 0, 600, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.34));
    drawSquarePattern(ctx, 0, 920, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.34));
    drawSquarePattern(ctx, 980, 600, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.34));
    drawSquarePattern(ctx, 980, 920, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.34));

    drawLogo(ctx, logoImage, payload, settings, {
      x: 66,
      y: 34,
      maxW: 330,
      maxH: 110,
      align: "left"
    });

    drawDate(ctx, payload, settings, 980, 82, "right", 42);
    drawImageFrameClassic(ctx, photoImage);

    if (settings.captionText) {
      ctx.fillStyle = colorWithAlpha("#000000", 0.52);
      ctx.font = getTextFont("500", 24, settings.titleFontFamily);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 640), 66, 704);
    }

    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540 + (offsets.title.x || 0),
      y: 760 + (offsets.title.y || 0),
      maxWidth: 900,
      maxLines: 3,
      maxFont: settings.titleFontSize || 54,
      minFont: 26,
      lineGap: 1.12,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 162,
      y: 968,
      w: 756,
      h: 74,
      fontSize: 30
    });

    drawQrCodeOverlay(ctx, qrImg, settings, size);
  };

  // 2. FRESH BLUE / EDITORIAL WHITE FORMAT
  const drawSplitFormat = (ctx, photoImage, logoImage, qrImg, payload, settings, size) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    var imgX = 0 + (offsets.photo.x || 0);
    var imgY = 0 + (offsets.photo.y || 0);
    var imgW = size;
    var imgH = 590;
    drawImageCover(ctx, photoImage, imgX, imgY, imgW, imgH, photoZoom);

    // Bottom red accent bar under image
    ctx.fillStyle = settings.primaryColor || "#d32929";
    ctx.fillRect(0, 584, size, 8);

    // Section Badge
    if (settings.sectionLabel) {
      var catX = 64 + (offsets.category.x || 0);
      var catY = 620 + (offsets.category.y || 0);
      fillRoundedRect(ctx, catX, catY, 140, 42, 8, settings.primaryColor || "#d32929");
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("700", 22, settings.titleFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(settings.sectionLabel, catX + 70, catY + 21);
    }

    // Logo & Header
    drawLogo(ctx, logoImage, payload, settings, {
      x: 64,
      y: 30,
      maxW: 280,
      maxH: 80,
      align: "left"
    });

    // Date
    drawDate(ctx, payload, settings, 1016, 640, "right", 28, settings.dateColor || "#666666");

    // Title
    ctx.fillStyle = settings.titleColor || "#181818";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540 + (offsets.title.x || 0),
      y: 750 + (offsets.title.y || 0),
      maxWidth: 950,
      maxLines: 3,
      maxFont: settings.titleFontSize || 52,
      minFont: 26,
      lineGap: 1.15,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    // Bottom strip
    ctx.fillStyle = "#f4f4f5";
    ctx.fillRect(0, 980, size, 100);
    ctx.fillStyle = settings.primaryColor || "#d32929";
    ctx.fillRect(0, 980, size, 3);

    drawFooterMeta(ctx, payload, settings, {
      y: 1030,
      color: "#52525b",
      size: 26,
      leftX: 64,
      rightX: 1016
    });

    drawQrCodeOverlay(ctx, qrImg, settings, size);
  };

  // 3. GREEN MARKET / DARK BREAKING NEWS FORMAT
  const drawMarketFormat = (ctx, photoImage, logoImage, qrImg, payload, settings, size) => {
    ctx.fillStyle = settings.topBackgroundColor || "#130000";
    ctx.fillRect(0, 0, size, size);

    // Top Breaking News Bar
    var topH = 130;
    var grad = ctx.createLinearGradient(0, 0, size, 0);
    grad.addColorStop(0, settings.primaryColor || "#e50914");
    grad.addColorStop(1, settings.secondaryColor || "#050000");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, topH);

    drawLogo(ctx, logoImage, payload, settings, {
      x: 60,
      y: 20,
      maxW: 300,
      maxH: 90,
      align: "left",
      color: "#ffffff"
    });

    drawDate(ctx, payload, settings, 1020, 65, "right", 32, "#ffffff");

    // Photo
    var photoY = topH + 10 + (offsets.photo.y || 0);
    var photoH = 520;
    drawImageCover(ctx, photoImage, 40 + (offsets.photo.x || 0), photoY, size - 80, photoH, photoZoom);
    strokeRoundedRect(ctx, 40 + (offsets.photo.x || 0), photoY, size - 80, photoH, 8, settings.primaryColor || "#e50914", 3);

    // Title Area
    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540 + (offsets.title.x || 0),
      y: 780 + (offsets.title.y || 0),
      maxWidth: 960,
      maxLines: 3,
      maxFont: settings.titleFontSize || 50,
      minFont: 26,
      lineGap: 1.15,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    // Footer
    drawSocialStrip(ctx, payload, settings, 0, 990, size, 90);

    drawQrCodeOverlay(ctx, qrImg, settings, size);
  };

  // 4. DARK MAGAZINE / SOCIAL TV FORMAT
  const drawMagazineFormat = (ctx, photoImage, logoImage, qrImg, payload, settings, size) => {
    ctx.fillStyle = settings.topBackgroundColor || "#140303";
    ctx.fillRect(0, 0, size, size);

    // Full photo top
    drawImageCover(ctx, photoImage, 0 + (offsets.photo.x || 0), 0 + (offsets.photo.y || 0), size, 580, photoZoom);

    // Overlay gradient
    var darkGrad = ctx.createLinearGradient(0, 350, 0, 580);
    darkGrad.addColorStop(0, "rgba(20,3,3,0)");
    darkGrad.addColorStop(1, "rgba(20,3,3,0.95)");
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 350, size, 230);

    // Center Badge
    drawLogo(ctx, logoImage, payload, settings, {
      x: 50,
      y: 40,
      maxW: 280,
      maxH: 80,
      align: "left",
      color: "#ffffff"
    });

    drawDate(ctx, payload, settings, 1030, 80, "right", 32, "#ffffff");

    // Solid Title Box
    fillRoundedRect(ctx, 40, 600, size - 80, 350, 16, settings.primaryColor || "#b40000");
    strokeRoundedRect(ctx, 40, 600, size - 80, 350, 16, settings.accentColor || "#ff4d4d", 2);

    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540 + (offsets.title.x || 0),
      y: 760 + (offsets.title.y || 0),
      maxWidth: 900,
      maxLines: 3,
      maxFont: settings.titleFontSize || 52,
      minFont: 26,
      lineGap: 1.15,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    // Bottom Link
    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 140,
      y: 860,
      w: 800,
      h: 64,
      fontSize: 28
    });

    // Social footer
    drawSocialStrip(ctx, payload, settings, 0, 990, size, 90);

    drawQrCodeOverlay(ctx, qrImg, settings, size);
  };

  // 5. GOLDEN FRAME / BORDER EDITION
  const drawFrameFormat = (ctx, photoImage, logoImage, qrImg, payload, settings, size) => {
    ctx.fillStyle = settings.topBackgroundColor || "#1a0505";
    ctx.fillRect(0, 0, size, size);

    // Gold Margin Border
    strokeRoundedRect(ctx, 24, 24, size - 48, size - 48, 12, settings.accentColor || "#ffd700", 6);
    strokeRoundedRect(ctx, 34, 34, size - 68, size - 68, 8, "rgba(255,215,0,0.3)", 1.5);

    drawLogo(ctx, logoImage, payload, settings, {
      x: 60,
      y: 50,
      maxW: 280,
      maxH: 80,
      align: "left",
      color: settings.accentColor || "#ffd700"
    });

    drawDate(ctx, payload, settings, 1020, 90, "right", 32, settings.dateColor || "#f0e68c");

    // Center Image
    var photoY = 150 + (offsets.photo.y || 0);
    var photoH = 500;
    drawImageCover(ctx, photoImage, 50 + (offsets.photo.x || 0), photoY, size - 100, photoH, photoZoom);
    strokeRoundedRect(ctx, 50 + (offsets.photo.x || 0), photoY, size - 100, photoH, 4, settings.accentColor || "#ffd700", 2);

    // Title
    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540 + (offsets.title.x || 0),
      y: 770 + (offsets.title.y || 0),
      maxWidth: 920,
      maxLines: 3,
      maxFont: settings.titleFontSize || 50,
      minFont: 26,
      lineGap: 1.15,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 160,
      y: 950,
      w: 760,
      h: 68,
      fontSize: 28
    });

    drawQrCodeOverlay(ctx, qrImg, settings, size);
  };

  // Unified Rendering Engine: Draw on canvas
  const renderCanvasNow = async (canvas, currentSettings, payload) => {
    if (!canvas) return;
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // QR Image source
    let qrSrc = null;
    if (currentSettings.showQrCode && currentSettings.qrCodeData) {
      qrSrc = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=0&data=" + encodeURIComponent(currentSettings.qrCodeData);
    }

    // Load assets in parallel safely
    const [photoImg, logoImg, qrImg] = await Promise.all([
      safeLoadImage(payload.photoUrl),
      safeLoadImage(currentSettings.logoUrl),
      safeLoadImage(qrSrc)
    ]);

    switch (currentSettings.format) {
      case "fresh-blue":
        drawSplitFormat(ctx, photoImg, logoImg, qrImg, payload, currentSettings, size);
        break;
      case "green-market":
        drawMarketFormat(ctx, photoImg, logoImg, qrImg, payload, currentSettings, size);
        break;
      case "dark-magazine":
        drawMagazineFormat(ctx, photoImg, logoImg, qrImg, payload, currentSettings, size);
        break;
      case "golden-frame":
        drawFrameFormat(ctx, photoImg, logoImg, qrImg, payload, currentSettings, size);
        break;
      case "classic-red":
      default:
        drawClassicFormat(ctx, photoImg, logoImg, qrImg, payload, currentSettings, size);
        break;
    }
  };

  // Live Canvas Rendering Effect
  Q.useEffect(() => {
    let active = true;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    setIsRendering(true);
    setRenderError("");

    const currentSettings = {
      format: format,
      primaryColor: primaryColor || "#d60000",
      secondaryColor: secondaryColor || "#7a0000",
      accentColor: accentColor || "#ff2d2d",
      topBackgroundColor: topBackgroundColor || "#fff0f0",
      titleColor: titleColor || "#ffffff",
      dateColor: dateColor || "#3f3f46",
      textColor: textColor || "#181818",
      logoColor: logoColor || "#181818",
      showLogo: showLogo,
      logoUrl: logoUrl,
      bottomText: bottomText || "বিস্তারিত কমেন্টে",
      captionText: captionText || "ছবি: সংগৃহীত",
      sectionLabel: sectionLabel || "সংবাদ",
      footerLeftText: footerLeftText,
      footerRightText: footerRightText,
      adText: adText,
      brandUrl: brandUrl || "ssf-mymensingh.org",
      facebookUrl: facebookUrl,
      youtubeUrl: youtubeUrl,
      instagramUrl: instagramUrl,
      titleFontFamily: titleFontFamily,
      titleFontSize: titleFontSize,
      showQrCode: showQrCode,
      qrCodeData: qrCodeData,
      qrPosition: qrPosition,
      qrSize: qrSize
    };

    const payload = {
      title: title || "",
      photoUrl: photoUrl || "",
      dateText: dateText || getFormattedDate(),
      siteName: siteName || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
      domain: domain || "ssf-mymensingh.org",
      centerText: bottomText || "বিস্তারিত কমেন্টে"
    };

    renderCanvasNow(canvas, currentSettings, payload)
      .then(() => {
        if (active) setIsRendering(false);
      })
      .catch((err) => {
        if (active) {
          setIsRendering(false);
          setRenderError("ক্যানভাস রেন্ডারিং ত্রুটি: " + (err.message || String(err)));
        }
      });

    return () => {
      active = false;
    };
  }, [
    format,
    title,
    photoUrl,
    photoZoom,
    showLogo,
    logoUrl,
    dateText,
    captionText,
    sectionLabel,
    bottomText,
    siteName,
    domain,
    brandUrl,
    facebookUrl,
    youtubeUrl,
    instagramUrl,
    adText,
    primaryColor,
    secondaryColor,
    accentColor,
    topBackgroundColor,
    titleColor,
    dateColor,
    textColor,
    logoColor,
    titleFontFamily,
    titleFontSize,
    showQrCode,
    qrCodeData,
    qrPosition,
    qrSize,
    offsets
  ]);

  // Image Upload Handling
  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setPhotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setLogoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // High-Resolution Export Handler
  const handleDownload = async (exportFormat = "png") => {
    if (isExporting) return;
    setIsExporting(true);
    setExportNotice("ফটোকার্ড প্রস্তুত হচ্ছে (" + exportFormat.toUpperCase() + ")...");
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
          .slice(0, 35)
          .replace(/^-+|-+$/g, "");
        const fileName = (cleanedTitle || "ssf-photocard") + "-v2." + exportFormat;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setExportNotice("সফলভাবে ডাউনলোড হয়েছে (" + fileName + ")!");
        setTimeout(() => setExportNotice(""), 3500);
      }, mimeType, quality);
    } catch (e) {
      setIsExporting(false);
      setRenderError("ডাউনলোড ত্রুটি: " + (e.message || String(e)));
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          setExportNotice("ক্লিপবোর্ডে কপি হয়েছে!");
          setTimeout(() => setExportNotice(""), 3000);
        } else {
          setExportNotice("ক্লিপবোর্ড এপিআই সাপোর্ট করে না");
        }
      });
    } catch (e) {
      setRenderError("কপি ব্যর্থ হয়েছে: " + e.message);
    }
  };

  // ---------------- UI VIEW RENDERING ----------------
  return i.jsxs("div", {
    className: "w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans",
    children: [
      // Top Header Toolbar
      i.jsxs("div", {
        className: "border-b border-slate-800 bg-slate-950 px-4 py-2.5 flex items-center justify-between gap-3 shrink-0 shadow-lg",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-3 min-w-0",
            children: [
              i.jsx("div", {
                className: "w-8 h-8 rounded-lg bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0",
                children: i.jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) })
              }),
              i.jsxs("div", {
                className: "min-w-0",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      i.jsx("h2", { className: "text-sm sm:text-base font-bold text-white tracking-wide truncate", children: "Borbila PhotoCard Pro V2" }),
                      i.jsx("span", { className: "px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase shrink-0", children: "Pro" })
                    ]
                  }),
                  i.jsx("p", { className: "text-[11px] text-slate-400 hidden md:block truncate", children: "৫টি প্রফেশনাল বোরবিলা লেআউট, লাইভ ক্যানভাস প্রিভিউ এবং ফুল রেজোলিউশন এক্সপোর্ট" })
                ]
              })
            ]
          }),
          i.jsxs("div", {
            className: "flex items-center gap-2 shrink-0",
            children: [
              i.jsxs("button", {
                onClick: () => handleDownload("png"),
                disabled: isExporting,
                className: "px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50",
                children: [
                  i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                  i.jsx("span", { className: "hidden xs:inline", children: "PNG ডাউনলোড (১০৮০p)" }),
                  i.jsx("span", { className: "xs:hidden", children: "PNG" })
                ]
              }),
              i.jsxs("button", {
                onClick: handleCopyToClipboard,
                className: "px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer hidden md:flex items-center gap-1.5",
                children: [
                  i.jsx("span", { children: "কপি" })
                ]
              }),
              onClose && i.jsx("button", {
                onClick: onClose,
                className: "p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer ml-1",
                children: "✕"
              })
            ]
          })
        ]
      }),

      // Main Studio Layout (Responsive: Mobile = Top Preview + Bottom Controls; Desktop = Left Sidebar Controls + Right Preview Stage)
      i.jsxs("div", {
        className: "flex-grow flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden overscroll-contain bg-slate-900",
        children: [
          // PREVIEW STAGE (Right on Desktop, Top on Mobile)
          i.jsxs("div", {
            className: "order-1 lg:order-2 flex-shrink-0 lg:flex-grow flex flex-col items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950 lg:overflow-y-auto lg:min-h-0 border-b lg:border-b-0 border-slate-800",
            children: [
              (exportNotice || renderError) && i.jsx("div", {
                className: "w-full max-w-md mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md text-center transition-all " + (renderError ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"),
                children: renderError || exportNotice
              }),
              i.jsx("div", {
                className: "w-full flex items-center justify-center py-1 sm:py-2",
                children: i.jsxs("div", {
                  className: "w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[540px] aspect-square relative shadow-2xl rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 flex items-center justify-center mx-auto transition-all",
                  style: { aspectRatio: "1 / 1" },
                  children: [
                    i.jsx("canvas", {
                      ref: previewCanvasRef,
                      style: { width: "100%", height: "100%", display: "block", aspectRatio: "1 / 1" },
                      className: "w-full h-full object-contain block select-none pointer-events-none"
                    }),
                    isRendering && i.jsx("div", {
                      className: "absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 text-rose-400 border border-rose-500/30 text-[11px] font-bold flex items-center gap-1.5 shadow-lg animate-pulse",
                      children: [
                        i.jsx("span", { className: "w-2 h-2 rounded-full bg-rose-500 animate-ping" }),
                        i.jsx("span", { children: "রেন্ডার..." })
                      ]
                    })
                  ]
                })
              }),
              i.jsxs("div", {
                className: "w-full max-w-md mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center gap-1.5 text-xs text-slate-400 font-mono",
                    children: [
                      i.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }),
                      i.jsx("span", { children: "1080 × 1080 px" })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      i.jsx("button", {
                        onClick: () => handleDownload("png"),
                        disabled: isExporting,
                        className: "px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow cursor-pointer disabled:opacity-50 transition-all",
                        children: "PNG (1080p)"
                      }),
                      i.jsx("button", {
                        onClick: () => handleDownload("jpg"),
                        disabled: isExporting,
                        className: "px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer disabled:opacity-50 transition-all",
                        children: "JPG"
                      }),
                      i.jsx("button", {
                        onClick: () => handleDownload("webp"),
                        disabled: isExporting,
                        className: "px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer disabled:opacity-50 transition-all",
                        children: "WEBP"
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // EDITING CONTROLS (Left Sidebar on Desktop, Bottom on Mobile)
          i.jsxs("div", {
            className: "order-2 lg:order-1 w-full lg:w-[460px] xl:w-[500px] border-slate-800 lg:border-r flex flex-col bg-slate-900 shrink-0 lg:min-h-0 lg:h-full lg:overflow-hidden",
            children: [
              // Tab Navigation
              i.jsxs("div", {
                className: "flex items-center border-b border-slate-800 bg-slate-950 px-2 pt-2 gap-1 shrink-0 overflow-x-auto",
                children: [
                  i.jsx("button", {
                    onClick: () => setActiveTab("formats"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "formats" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "লেআউট প্রিসেট"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("content"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "content" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "বিষয়বস্তু ও ফন্ট"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("colors"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "colors" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "কালার ও স্টাইল"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("branding"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "branding" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "ব্র্যান্ডিং ও ছবি"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("positioning"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "positioning" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "পজিশনিং ডি-প্যাড"
                  })
                ]
              }),

              // Tab Content Body
              i.jsxs("div", {
                className: "p-4 space-y-4 lg:overflow-y-auto lg:flex-grow min-h-0",
                children: [
                  // TAB 1: FORMATS
                  activeTab === "formats" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "প্রফেশনাল বোরবিলা লেআউট নির্বাচন করুন" }),
                      Object.keys(PRESETS).map((key) => {
                        const p = PRESETS[key];
                        const isSelected = format === p.id;
                        return i.jsxs("div", {
                          key: p.id,
                          onClick: () => handleApplyPreset(p.id),
                          className: "p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 " + (isSelected ? "bg-rose-950/40 border-rose-500 ring-1 ring-rose-500/50 shadow-md shadow-rose-950/50" : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-950"),
                          children: [
                            i.jsx("div", {
                              className: "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 " + (isSelected ? "border-rose-500 bg-rose-500 text-white" : "border-slate-600"),
                              children: isSelected && i.jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
                            }),
                            i.jsxs("div", {
                              className: "flex-grow",
                              children: [
                                i.jsxs("div", {
                                  className: "flex items-center justify-between gap-2",
                                  children: [
                                    i.jsx("h4", { className: "text-sm font-bold text-slate-100", children: p.label }),
                                    i.jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-rose-400 border border-slate-700 font-mono", children: p.badge })
                                  ]
                                }),
                                i.jsx("p", { className: "text-xs text-slate-400 mt-1 leading-relaxed", children: p.description }),
                                i.jsxs("div", {
                                  className: "flex items-center gap-1.5 mt-2",
                                  children: [
                                    i.jsx("div", { className: "w-4 h-4 rounded-full border border-black/30 shadow-sm", style: { backgroundColor: p.primaryColor } }),
                                    i.jsx("div", { className: "w-4 h-4 rounded-full border border-black/30 shadow-sm", style: { backgroundColor: p.secondaryColor } }),
                                    i.jsx("div", { className: "w-4 h-4 rounded-full border border-black/30 shadow-sm", style: { backgroundColor: p.accentColor } }),
                                    i.jsx("span", { className: "text-[10px] text-slate-500 ml-1 font-mono", children: p.primaryColor })
                                  ]
                                })
                              ]
                            })
                          ]
                        });
                      })
                    ]
                  }),

                  // TAB 2: CONTENT & TYPOGRAPHY
                  activeTab === "content" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      // Headline Input
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "মূল হেডলাইন / শিরোনাম" }),
                          i.jsx("textarea", {
                            rows: 3,
                            value: title,
                            onChange: (e) => setTitle(e.target.value),
                            placeholder: "ফটোকার্ডের মূল শিরোনাম লিখুন...",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 leading-relaxed font-sans"
                          })
                        ]
                      }),

                      // Bengali Font Selector
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "বাংলা ফন্ট ফ্যামিলি (Font Selector)" }),
                          i.jsx("select", {
                            value: titleFontFamily,
                            onChange: (e) => setTitleFontFamily(e.target.value),
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500 cursor-pointer",
                            children: AVAILABLE_FONTS.map((f) => i.jsx("option", { key: f.id, value: f.id, children: f.name }))
                          })
                        ]
                      }),

                      // Title Font Size Slider & Numeric Input
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "শিরোনাম ফন্ট সাইজ (Font Size)" }),
                              i.jsxs("span", { className: "text-xs font-mono font-bold text-rose-400", children: [titleFontSize, " px"] })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              i.jsx("input", {
                                type: "range",
                                min: 20,
                                max: 100,
                                value: titleFontSize,
                                onChange: (e) => setTitleFontSize(Number(e.target.value)),
                                className: "flex-grow accent-rose-600 cursor-pointer h-2 bg-slate-800 rounded-lg"
                              }),
                              i.jsx("input", {
                                type: "number",
                                min: 20,
                                max: 120,
                                value: titleFontSize,
                                onChange: (e) => setTitleFontSize(Number(e.target.value)),
                                className: "w-16 bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center text-xs text-rose-300 font-mono font-bold focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      // Category / Section & Date
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ক্যাটাগরি / সেকশন" }),
                              i.jsx("input", {
                                type: "text",
                                value: sectionLabel,
                                onChange: (e) => setSectionLabel(e.target.value),
                                placeholder: "সংবাদ / বিশেষ প্রতিবেদন",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "তারিখ টেক্সট" }),
                              i.jsx("input", {
                                type: "text",
                                value: dateText,
                                onChange: (e) => setDateText(e.target.value),
                                placeholder: "০২ সেপ্টেম্বর ২০২৬",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      // Caption & Bottom Link
                      i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ছবির ক্যাপশন / ক্রেডিট" }),
                              i.jsx("input", {
                                type: "text",
                                value: captionText,
                                onChange: (e) => setCaptionText(e.target.value),
                                placeholder: "ছবি: সংগৃহীত",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "বটম লিংক স্ট্রিপ টেক্সট" }),
                              i.jsx("input", {
                                type: "text",
                                value: bottomText,
                                onChange: (e) => setBottomText(e.target.value),
                                placeholder: "বিস্তারিত কমেন্টে",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // TAB 3: COLORS & STYLES
                  activeTab === "colors" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1", children: "কাস্টম কালার প্যালেট" }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          // Primary Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "প্রাইমারি রঙ" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: primaryColor,
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: primaryColor,
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Secondary Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "সেকেন্ডারি রঙ" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: secondaryColor,
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: secondaryColor,
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Accent Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "অ্যাকসেন্ট রঙ" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: accentColor,
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: accentColor,
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Top Background Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "টপ ব্যাকগ্রাউন্ড" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: topBackgroundColor,
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: topBackgroundColor,
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Title Text Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "শিরোনাম টেক্সট কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: titleColor,
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: titleColor,
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Date Color
                          i.jsxs("div", {
                            className: "p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5",
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "তারিখ ও মেটা কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: dateColor,
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: "w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: dateColor,
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs text-slate-200 font-mono"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // TAB 4: BRANDING, MEDIA & QR CODE
                  activeTab === "branding" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      // Photo Image Controls
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "মূল ছবি (Photo Image Source & Zoom)" }),
                          i.jsx("input", {
                            type: "text",
                            value: photoUrl,
                            onChange: (e) => setPhotoUrl(e.target.value),
                            placeholder: "https://... বা ছবি আপলোড করুন",
                            className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          }),
                          i.jsxs("div", {
                            className: "flex items-center gap-3 pt-1",
                            children: [
                              i.jsx("label", {
                                className: "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all",
                                children: [
                                  i.jsx("span", { children: "📁 ডিভাইস থেকে ছবি আপলোড" }),
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handlePhotoUpload,
                                    className: "hidden"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2 flex-grow",
                                children: [
                                  i.jsx("span", { className: "text-[11px] text-slate-400 shrink-0", children: "জুম:" }),
                                  i.jsx("input", {
                                    type: "range",
                                    min: 50,
                                    max: 200,
                                    value: photoZoom,
                                    onChange: (e) => setPhotoZoom(Number(e.target.value)),
                                    className: "w-full accent-rose-600 h-1.5 bg-slate-800 rounded"
                                  }),
                                  i.jsxs("span", { className: "text-[11px] font-mono text-rose-400 shrink-0", children: [photoZoom, "%"] })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // Logo Controls
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "সংগঠনের লোগো (Logo Image)" }),
                              i.jsxs("label", {
                                className: "flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer",
                                children: [
                                  i.jsx("input", {
                                    type: "checkbox",
                                    checked: showLogo,
                                    onChange: (e) => setShowLogo(e.target.checked),
                                    className: "rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-0 cursor-pointer"
                                  }),
                                  i.jsx("span", { children: "লোগো দেখান" })
                                ]
                              })
                            ]
                          }),
                          showLogo && i.jsxs("div", {
                            className: "space-y-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: logoUrl,
                                onChange: (e) => setLogoUrl(e.target.value),
                                placeholder: "লোগোর অনলাইন লিংক...",
                                className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              }),
                              i.jsx("label", {
                                className: "inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all",
                                children: [
                                  i.jsx("span", { children: "🏷️ কাস্টম লোগো আপলোড" }),
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleLogoUpload,
                                    className: "hidden"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // QR Code Controls
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-bold text-slate-300", children: "কিউআর কোড (QR Code Overlay)" }),
                              i.jsxs("label", {
                                className: "flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer",
                                children: [
                                  i.jsx("input", {
                                    type: "checkbox",
                                    checked: showQrCode,
                                    onChange: (e) => setShowQrCode(e.target.checked),
                                    className: "rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-0 cursor-pointer"
                                  }),
                                  i.jsx("span", { children: "QR কোড যুক্ত করুন" })
                                ]
                              })
                            ]
                          }),
                          showQrCode && i.jsxs("div", {
                            className: "space-y-2.5 pt-1",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("label", { className: "block text-[11px] text-slate-400 mb-1", children: "QR কোড লিঙ্ক / ডেটা" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: qrCodeData,
                                    onChange: (e) => setQrCodeData(e.target.value),
                                    placeholder: "https://ssf-mymensingh.org",
                                    className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                                  })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block text-[11px] text-slate-400 mb-1", children: "QR পজিশন" }),
                                      i.jsxs("select", {
                                        value: qrPosition,
                                        onChange: (e) => setQrPosition(e.target.value),
                                        className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-100",
                                        children: [
                                          i.jsx("option", { value: "bottom-right", children: "নিচে ডানে (Bottom Right)" }),
                                          i.jsx("option", { value: "bottom-left", children: "নিচে বামে (Bottom Left)" }),
                                          i.jsx("option", { value: "top-right", children: "উপরে ডানে (Top Right)" })
                                        ]
                                      })
                                    ]
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("label", { className: "block text-[11px] text-slate-400 mb-1", children: "QR সাইজ" }),
                                      i.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          i.jsx("input", {
                                            type: "range",
                                            min: 70,
                                            max: 180,
                                            value: qrSize,
                                            onChange: (e) => setQrSize(Number(e.target.value)),
                                            className: "w-full accent-rose-600 h-1.5 bg-slate-800 rounded"
                                          }),
                                          i.jsxs("span", { className: "text-[11px] font-mono text-rose-400 shrink-0", children: [qrSize, "px"] })
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

                      // Social & Brand Domains
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ব্র্যান্ড ওয়েবসাইট লিঙ্ক" }),
                              i.jsx("input", {
                                type: "text",
                                value: brandUrl,
                                onChange: (e) => setBrandUrl(e.target.value),
                                placeholder: "ssf-mymensingh.org",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ফেসবুক পেজ হ্যান্ডেল" }),
                              i.jsx("input", {
                                type: "text",
                                value: facebookUrl,
                                onChange: (e) => setFacebookUrl(e.target.value),
                                placeholder: "fb.com/ssfmymensingh",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // TAB 5: POSITIONING & D-PAD CONTROLS
                  activeTab === "positioning" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1", children: "উপাদান নির্বাচন ও পজিশনিং ডি-প্যাড" }),
                      
                      // Component Selector
                      i.jsxs("div", {
                        className: "grid grid-cols-3 gap-2",
                        children: [
                          { id: "title", label: "শিরোনাম" },
                          { id: "photo", label: "ছবি" },
                          { id: "logo", label: "লোগো" },
                          { id: "category", label: "ক্যাটাগরি" },
                          { id: "date", label: "তারিখ" },
                          { id: "qr", label: "QR কোড" }
                        ].map((c) => i.jsx("button", {
                          key: c.id,
                          onClick: () => setActivePositionComponent(c.id),
                          className: "px-2.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer text-center " + (activePositionComponent === c.id ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-950" : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700"),
                          children: c.label
                        }))
                      }),

                      // D-Pad Control Box
                      i.jsxs("div", {
                        className: "p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center gap-2",
                        children: [
                          i.jsx("div", { className: "text-xs font-bold text-slate-400 mb-1 text-center", children: "ডি-প্যাড দিয়ে উপাদান মুভ করুন (±5px)" }),
                          // Up
                          i.jsx("button", {
                            onClick: () => nudgeOffset(activePositionComponent, 0, -5),
                            className: "w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-rose-600 text-slate-200 hover:text-white flex items-center justify-center font-bold text-base shadow border border-slate-700 cursor-pointer transition-all",
                            children: "▲"
                          }),
                          // Left, Center Reset, Right
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("button", {
                                onClick: () => nudgeOffset(activePositionComponent, -5, 0),
                                className: "w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-rose-600 text-slate-200 hover:text-white flex items-center justify-center font-bold text-base shadow border border-slate-700 cursor-pointer transition-all",
                                children: "◀"
                              }),
                              i.jsx("button", {
                                onClick: () => resetOffset(activePositionComponent),
                                className: "w-10 h-10 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white flex items-center justify-center text-[10px] font-bold shadow border border-rose-500/40 cursor-pointer transition-all",
                                title: "সেন্টার রিসেট",
                                children: "RESET"
                              }),
                              i.jsx("button", {
                                onClick: () => nudgeOffset(activePositionComponent, 5, 0),
                                className: "w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-rose-600 text-slate-200 hover:text-white flex items-center justify-center font-bold text-base shadow border border-slate-700 cursor-pointer transition-all",
                                children: "▶"
                              })
                            ]
                          }),
                          // Down
                          i.jsx("button", {
                            onClick: () => nudgeOffset(activePositionComponent, 0, 5),
                            className: "w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-rose-600 text-slate-200 hover:text-white flex items-center justify-center font-bold text-base shadow border border-slate-700 cursor-pointer transition-all",
                            children: "▼"
                          })
                        ]
                      }),

                      // Fine-tuning Sliders & Numeric Inputs
                      i.jsxs("div", {
                        className: "space-y-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800",
                        children: [
                          // X Offset
                          i.jsxs("div", {
                            className: "space-y-1.5",
                            children: [
                              i.jsxs("div", {
                                className: "flex items-center justify-between text-xs",
                                children: [
                                  i.jsx("span", { className: "font-bold text-slate-300", children: "অনুভূমিক অবস্থান (X Offset)" }),
                                  i.jsxs("span", { className: "font-mono font-bold text-rose-400", children: [offsets[activePositionComponent]?.x || 0, " px"] })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  i.jsx("input", {
                                    type: "range",
                                    min: -250,
                                    max: 250,
                                    value: offsets[activePositionComponent]?.x || 0,
                                    onChange: (e) => updateOffset(activePositionComponent, "x", e.target.value),
                                    className: "flex-grow accent-rose-600 h-2 bg-slate-800 rounded"
                                  }),
                                  i.jsx("input", {
                                    type: "number",
                                    min: -300,
                                    max: 300,
                                    value: offsets[activePositionComponent]?.x || 0,
                                    onChange: (e) => updateOffset(activePositionComponent, "x", e.target.value),
                                    className: "w-16 bg-slate-900 border border-slate-700 rounded p-1 text-center text-xs text-rose-300 font-mono font-bold"
                                  })
                                ]
                              })
                            ]
                          }),

                          // Y Offset
                          i.jsxs("div", {
                            className: "space-y-1.5 pt-2 border-t border-slate-800",
                            children: [
                              i.jsxs("div", {
                                className: "flex items-center justify-between text-xs",
                                children: [
                                  i.jsx("span", { className: "font-bold text-slate-300", children: "উল্লম্ব অবস্থান (Y Offset)" }),
                                  i.jsxs("span", { className: "font-mono font-bold text-rose-400", children: [offsets[activePositionComponent]?.y || 0, " px"] })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  i.jsx("input", {
                                    type: "range",
                                    min: -250,
                                    max: 250,
                                    value: offsets[activePositionComponent]?.y || 0,
                                    onChange: (e) => updateOffset(activePositionComponent, "y", e.target.value),
                                    className: "flex-grow accent-rose-600 h-2 bg-slate-800 rounded"
                                  }),
                                  i.jsx("input", {
                                    type: "number",
                                    min: -300,
                                    max: 300,
                                    value: offsets[activePositionComponent]?.y || 0,
                                    onChange: (e) => updateOffset(activePositionComponent, "y", e.target.value),
                                    className: "w-16 bg-slate-900 border border-slate-700 rounded p-1 text-center text-xs text-rose-300 font-mono font-bold"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),

                      // Global Reset Button
                      i.jsx("button", {
                        onClick: resetAllOffsets,
                        className: "w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-all text-center",
                        children: "🔄 সকল উপাদানের অবস্থান ডিফল্টে ফিরিয়ে নিন"
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

window.BorbilaPhotoCardV2 = BorbilaPhotoCardV2;
