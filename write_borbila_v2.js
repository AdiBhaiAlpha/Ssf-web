
const fs = require("fs");

const borbilaComponent = `function BorbilaPhotoCardV2({ item, db, onClose, isStandalone, onSelectItem, setCurrentTab }) {
  // Built-in Complete Borbila PhotoCard V2 Canvas Engine with Font Controls & Instant Non-Blocking Render
  
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
    titleFontFamily: "SolaimanLipi"
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
    { id: "SolaimanLipi", name: "সোলায়মান লিপি (ডিফল্ট বোল্ড)", family: '"SolaimanLipi", "Noto Sans Bengali", sans-serif' },
    { id: "Noto Sans Bengali", name: "নোটো সান্স বাংলা (মডার্ন ক্লিন)", family: '"Noto Sans Bengali", "SolaimanLipi", sans-serif' },
    { id: "Hind Siliguri", name: "হিন্দ শিলিগুড়ি (নিউজপ্রিন্ট)", family: '"Hind Siliguri", "SolaimanLipi", sans-serif' },
    { id: "Tiro Bangla", name: "তিরো বাংলা (ঐতিহ্যবাহী সেরিপ)", family: '"Tiro Bangla", "SolaimanLipi", serif' },
    { id: "Galada", name: "গালাদা (হেডলাইন এক্সট্রা বোল্ড)", family: '"Galada", "SolaimanLipi", cursive' },
    { id: "Bangla", name: "স্ট্যান্ডার্ড বাংলা (সিস্টেম ফন্ট)", family: '"Bangla", "SolaimanLipi", sans-serif' }
  ];

  // Helper formatting for dates
  const getFormattedDate = () => {
    try {
      const now = new Date();
      return now.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return "০২ সেপ্টেম্বর ২০২৬";
    }
  };

  // State Declarations
  const [format, setFormat] = Q.useState(DEFAULT_SETTINGS.format);
  const [title, setTitle] = Q.useState(item?.title || "সমাজতান্ত্রিক বিপ্লব ত্বরান্বিত করতে ছাত্র সমাজকে বিজ্ঞানমনস্ক আদর্শে সংহত করুন");
  const [photoUrl, setPhotoUrl] = Q.useState(item?.image || item?.coverImage || item?.coverUrl || "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png");
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

  // UI Studio State
  const [activeTab, setActiveTab] = Q.useState("formats"); // "formats" | "content" | "colors" | "branding"
  const [zoomLevel, setZoomLevel] = Q.useState("fit"); // "fit" | "50" | "75" | "100"
  const [isRendering, setIsRendering] = Q.useState(false);
  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportNotice, setExportNotice] = Q.useState("");
  const [renderError, setRenderError] = Q.useState("");

  const previewCanvasRef = Q.useRef(null);
  const imageCacheRef = Q.useRef(new Map());

  // Apply preset handler
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

  // Cached, safe Image Loader with instant fallback
  const safeLoadImage = (src, timeout = 3000) => {
    if (!src || typeof src !== "string" || !src.trim()) return Promise.resolve(null);
    const cleanSrc = src.trim();
    if (imageCacheRef.current.has(cleanSrc)) {
      return Promise.resolve(imageCacheRef.current.get(cleanSrc));
    }
    return new Promise((resolve) => {
      const img = new Image();
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, timeout);

      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          imageCacheRef.current.set(cleanSrc, img);
          resolve(img);
        }
      };
      img.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          resolve(null);
        }
      };
      img.src = cleanSrc;
    });
  };

  // Helper Drawing Functions
  function normalizeHexColor(value, fallback) {
    var color = String(value || "").trim();
    var shortHex = /^#([0-9a-f]{3})$/i.exec(color);
    if (shortHex) {
      color = "#" + shortHex[1].split("").map(function(char) { return char + char; }).join("");
    }
    if (/^#[0-9a-f]{6}$/i.test(color)) {
      return color;
    }
    return fallback;
  }

  function hexToRgb(color) {
    var normalized = normalizeHexColor(color, "#000000").replace("#", "");
    return {
      r: parseInt(normalized.slice(0, 2), 16) || 0,
      g: parseInt(normalized.slice(2, 4), 16) || 0,
      b: parseInt(normalized.slice(4, 6), 16) || 0
    };
  }

  function colorWithAlpha(color, alpha) {
    var rgb = hexToRgb(color);
    return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
  }

  function displayUrlText(url, fallback) {
    var raw = String(url || "").trim();
    if (!raw) return String(fallback || "").trim();
    try {
      var parsed = new URL(raw.startsWith("http") ? raw : "https://" + raw);
      var host = parsed.hostname.replace(/^www\./i, "");
      var path = parsed.pathname.replace(/\/$/, "");
      return host + (path && path !== "/" ? path : "");
    } catch (e) {
      return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
    }
  }

  function toEnglishDateText(text) {
    var map = { "০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9" };
    return String(text || "").replace(/[০-৯]/g, function(digit) { return map[digit] || digit; });
  }

  function roundedRectPath(ctx, x, y, w, h, r) {
    var radius = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.arcTo(x + w, y, x + w, y + radius, radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
    ctx.lineTo(x + radius, y + h);
    ctx.arcTo(x, y + h, x, y + h - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }

  function fillRoundedRect(ctx, x, y, w, h, r, fillStyle) {
    ctx.fillStyle = fillStyle;
    roundedRectPath(ctx, x, y, w, h, r);
    ctx.fill();
  }

  function strokeRoundedRect(ctx, x, y, w, h, r, strokeStyle, lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth || 1;
    roundedRectPath(ctx, x, y, w, h, r);
    ctx.stroke();
  }

  function chamferPath(ctx, x, y, w, h, cut) {
    cut = Math.min(cut, Math.min(w, h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + cut, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h - cut);
    ctx.lineTo(x + w - cut, y + h);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x, y + cut);
    ctx.closePath();
  }

  function getTextFont(weight, size, customFamily) {
    var fam = customFamily || titleFontFamily || "SolaimanLipi";
    return weight + " " + size + "px \"" + fam + "\", \"Noto Sans Bengali\", \"Hind Siliguri\", Arial, sans-serif";
  }

  function getTitleFont(size, customFamily) {
    var fam = customFamily || titleFontFamily || "SolaimanLipi";
    return "700 " + size + "px \"" + fam + "\", \"Noto Sans Bengali\", \"Hind Siliguri\", Arial, sans-serif";
  }

  function getTitleFontMedium(size, customFamily) {
    var fam = customFamily || titleFontFamily || "SolaimanLipi";
    return "600 " + size + "px \"" + fam + "\", \"Noto Sans Bengali\", \"Hind Siliguri\", Arial, sans-serif";
  }

  function trimTextToWidth(ctx, text, maxWidth) {
    var value = String(text || "").trim();
    if (!value) return "";
    if (ctx.measureText(value).width <= maxWidth) return value;
    var ellipsis = "...";
    var left = 0;
    var right = value.length;
    var best = ellipsis;
    while (left <= right) {
      var mid = Math.floor((left + right) / 2);
      var candidate = value.slice(0, mid).trim() + ellipsis;
      if (ctx.measureText(candidate).width <= maxWidth) {
        best = candidate;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return best;
  }

  function wrapTextLines(ctx, text, maxWidth) {
    var words = String(text || "").trim().split(/\s+/);
    if (!words.length || !words[0]) return [];
    var lines = [];
    var currentLine = "";
    for (var i = 0; i < words.length; i++) {
      var testLine = currentLine ? currentLine + " " + words[i] : words[i];
      if (ctx.measureText(testLine).width <= maxWidth || !currentLine) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawAdaptiveMultiline(ctx, text, options) {
    var maxWidth = options.maxWidth || 900;
    var maxLines = options.maxLines || 3;
    var maxFont = options.maxFont || 80;
    var minFont = options.minFont || 30;
    var lineGap = options.lineGap || 1.12;
    var fontGetter = options.fontGetter || function(size) { return getTextFont("700", size); };
    var x = options.x;
    var y = options.y;
    var boxHeight = options.height || 240;
    var bestSize = minFont;
    var lines = [];

    for (var size = maxFont; size >= minFont; size -= 2) {
      ctx.font = fontGetter(size);
      var testLines = wrapTextLines(ctx, text, maxWidth);
      if (testLines.length <= maxLines) {
        lines = testLines;
        bestSize = size;
        break;
      }
      if (!lines.length) {
        lines = testLines;
      }
    }

    ctx.font = fontGetter(bestSize);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = trimTextToWidth(ctx, lines[maxLines - 1], maxWidth - 10);
    }
    if (!lines.length) return;

    var lineHeight = Math.round(bestSize * lineGap);
    var blockHeight = lines.length * lineHeight;
    var startY = y + Math.max(0, Math.floor((boxHeight - blockHeight) / 2));
    ctx.textAlign = options.align || "center";
    ctx.textBaseline = "top";
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, startY + i * lineHeight);
    }
  }

  function drawPlaceholderPattern(ctx, x, y, w, h, label) {
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, "#1e293b");
    grad.addColorStop(0.5, "#0f172a");
    grad.addColorStop(1, "#020617");
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
    // Subtle grid
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (var gx = x; gx <= x + w; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx, y + h);
      ctx.stroke();
    }
    for (var gy = y; gy <= y + h; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x + w, gy);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = getTextFont("700", 30);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট", x + w / 2, y + h / 2);
  }

  function drawImageCover(ctx, img, x, y, width, height) {
    if (!img || !img.width || !img.height) {
      drawPlaceholderPattern(ctx, x, y, width, height, "ছবি লোড হচ্ছে...");
      return;
    }
    try {
      var imgRatio = img.width / img.height;
      var targetRatio = width / height;
      var sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
      if (imgRatio > targetRatio) {
        sWidth = Math.round(img.height * targetRatio);
        sx = Math.round((img.width - sWidth) / 2);
      } else {
        sHeight = Math.round(img.width / targetRatio);
        sy = Math.round((img.height - sHeight) / 2);
      }
      ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
    } catch (e) {
      drawPlaceholderPattern(ctx, x, y, width, height, "ছবি প্রদর্শন ত্রুটি");
    }
  }

  function drawLogo(ctx, logoImage, payload, settings, options) {
    var x = options.x;
    var y = options.y;
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
  }

  function drawDate(ctx, payload, settings, x, y, align, size, color) {
    var dateText = toEnglishDateText(payload.dateText || "");
    ctx.fillStyle = color || settings.dateColor || "#3f3f46";
    ctx.font = getTextFont("700", size || 42, settings.titleFontFamily);
    ctx.textAlign = align || "right";
    ctx.textBaseline = "middle";
    ctx.fillText(dateText, x, y);
  }

  function drawCornerTriangle(ctx, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(size - 120, 0);
    ctx.lineTo(size, 120);
    ctx.closePath();
    ctx.fill();
  }

  function drawSquarePattern(ctx, startX, startY, color) {
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
  }

  function drawSubtleGrid(ctx, x, y, w, h, color) {
    ctx.strokeStyle = color || "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (var gx = x; gx <= x + w; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx, y + h);
      ctx.stroke();
    }
    for (var gy = y; gy <= y + h; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x + w, gy);
      ctx.stroke();
    }
  }

  function drawImageFrameClassic(ctx, photoImage) {
    var x = 40;
    var y = 145;
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
    drawImageCover(ctx, photoImage, ix, iy, iw, ih);
    ctx.restore();
  }

  function drawBottomLinkStrip(ctx, text, settings, options) {
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
    ctx.save();
    roundedRectPath(ctx, stripX + 1.5, stripY + 1.5, stripW - 3, stripH - 3, radius - 1.5);
    ctx.clip();
    var gloss = ctx.createLinearGradient(stripX, stripY, stripX, stripY + stripH * 0.62);
    gloss.addColorStop(0, "rgba(255,255,255,0.58)");
    gloss.addColorStop(0.28, "rgba(255,255,255,0.22)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    ctx.fillRect(stripX, stripY, stripW, stripH * 0.62);
    ctx.restore();
    strokeRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha(settings.accentColor || "#ff2d2d", 0.72), 1.2);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", options.fontSize || 30, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, text, stripW - 80), stripX + stripW / 2, stripY + stripH / 2 + 1);
  }

  function drawFooterMeta(ctx, payload, settings, options) {
    options = options || {};
    var y = options.y || 1040;
    var color = options.color || settings.dateColor;
    var size = options.size || 28;
    ctx.fillStyle = color;
    ctx.font = getTextFont("600", size, settings.titleFontFamily);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    var leftText = settings.footerLeftText || toEnglishDateText(payload.dateText || "");
    if (leftText) ctx.fillText(trimTextToWidth(ctx, leftText, 450), options.leftX || 48, y);
    ctx.textAlign = "right";
    var rightText = settings.footerRightText || displayUrlText(settings.brandUrl, payload.domain);
    if (rightText) ctx.fillText(trimTextToWidth(ctx, rightText, 450), options.rightX || 1030, y);
  }

  function drawSocialStrip(ctx, payload, settings, x, y, width, height) {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", 26, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var text = settings.facebookUrl ? "facebook: " + settings.facebookUrl : displayUrlText(settings.brandUrl, payload.domain);
    ctx.fillText(trimTextToWidth(ctx, text, width - 40), x + width / 2, y + height / 2);
  }

  function drawAdBar(ctx, settings, x, y, width, height) {
    if (!settings.adText) return;
    ctx.fillStyle = settings.secondaryColor;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("800", 30, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, settings.adText, width - 40), x + width / 2, y + height / 2);
  }

  // 1. CLASSIC RED FORMAT
  function drawClassicFormat(ctx, photoImage, logoImage, payload, settings, size) {
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
      x: 540,
      y: 760,
      maxWidth: 900,
      maxLines: 3,
      maxFont: 54,
      minFont: 30,
      lineGap: 1.12,
      height: 190,
      fontGetter: function(sz) { return getTitleFontMedium(sz, settings.titleFontFamily); }
    });
    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 162,
      y: 968,
      w: 756,
      h: 74,
      fontSize: 30
    });
  }

  // 2. FRESH BLUE / EDITORIAL WHITE FORMAT
  function drawSplitFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || "#f3f3f3";
    ctx.fillRect(0, 0, size, size);
    drawImageCover(ctx, photoImage, 0, 0, size, 620);
    var imageFade = ctx.createLinearGradient(0, 450, 0, 620);
    imageFade.addColorStop(0, "rgba(0,0,0,0)");
    imageFade.addColorStop(1, "rgba(0,0,0,0.42)");
    ctx.fillStyle = imageFade;
    ctx.fillRect(0, 450, size, 170);
    if (settings.captionText) {
      ctx.fillStyle = "rgba(255,255,255,0.88)";
      ctx.font = getTextFont("500", 25, settings.titleFontFamily);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 720), 52, 575);
    }
    ctx.fillStyle = "#f3f3f3";
    ctx.beginPath();
    ctx.moveTo(0, 620);
    ctx.lineTo(455, 620);
    ctx.quadraticCurveTo(540, 535, 625, 620);
    ctx.lineTo(size, 620);
    ctx.lineTo(size, 1000);
    ctx.lineTo(0, 1000);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = settings.accentColor || "#f44336";
    ctx.beginPath();
    ctx.arc(540, 620, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f3f3f3";
    ctx.lineWidth = 18;
    ctx.stroke();
    drawLogo(ctx, logoImage, payload, settings, {
      x: 42,
      y: 32,
      maxW: 300,
      maxH: 70,
      align: "left",
      color: "#ffffff"
    });
    ctx.fillStyle = settings.titleColor || "#202020";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 710,
      maxWidth: 840,
      maxLines: 3,
      maxFont: 58,
      minFont: 34,
      lineGap: 1.15,
      height: 190,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });
    ctx.fillStyle = "#e4e4e4";
    ctx.fillRect(0, 1000, size, 80);
    drawFooterMeta(ctx, payload, settings, {
      y: 1040,
      color: settings.dateColor || "#555555",
      size: 28,
      leftX: 48,
      rightX: 1030
    });
  }

  // 3. GREEN MARKET / DARK BREAKING NEWS FORMAT
  function drawMarketFormat(ctx, photoImage, logoImage, payload, settings, size) {
    var bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, settings.secondaryColor || "#050000");
    bg.addColorStop(0.52, settings.primaryColor || "#e50914");
    bg.addColorStop(1, "#001a55");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    drawSubtleGrid(ctx, 0, 0, size, 420, "rgba(255,255,255,0.08)");
    drawLogo(ctx, logoImage, payload, settings, {
      x: 34,
      y: 28,
      maxW: 240,
      maxH: 85,
      align: "left",
      color: settings.logoColor || "#ffffff"
    });
    if (settings.sectionLabel) {
      fillRoundedRect(ctx, 825, 36, 210, 54, 12, colorWithAlpha(settings.primaryColor || "#e50914", 0.82));
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("800", 28, settings.titleFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 170), 930, 64);
    }
    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 112,
      maxWidth: 990,
      maxLines: 3,
      maxFont: 70,
      minFont: 42,
      lineGap: 1.04,
      height: 250,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });
    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 400,
      y: 365,
      w: 285,
      h: 62,
      fontSize: 30
    });
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 440);
    ctx.bezierCurveTo(170, 410, 290, 395, 430, 435);
    ctx.bezierCurveTo(585, 480, 730, 405, 900, 420);
    ctx.lineTo(size, 385);
    ctx.lineTo(size, 880);
    ctx.lineTo(0, 880);
    ctx.closePath();
    ctx.clip();
    drawImageCover(ctx, photoImage, 0, 380, size, 500);
    ctx.restore();
    var imageShade = ctx.createLinearGradient(0, 380, 0, 880);
    imageShade.addColorStop(0, "rgba(0,0,0,0.12)");
    imageShade.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = imageShade;
    ctx.fillRect(0, 380, size, 500);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("600", 28, settings.titleFontFamily);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, toEnglishDateText(payload.dateText || "") + (settings.captionText ? " | " + settings.captionText : ""), 650), 24, 842);
    ctx.fillStyle = "#0b2e86";
    ctx.fillRect(0, 880, size, 200);
    drawAdBar(ctx, settings, 0, 900, size, 120);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("800", 42, settings.titleFontFamily);
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 420), 1030, 1030);
  }

  // 4. DARK MAGAZINE / SOCIAL FOOTER FORMAT
  function drawMagazineFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.primaryColor || "#b40000";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = settings.secondaryColor || "#6c0000";
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, size - 14, size - 14);
    drawImageCover(ctx, photoImage, 8, 8, size - 16, 560);
    var overlay = ctx.createLinearGradient(0, 380, 0, 568);
    overlay.addColorStop(0, "rgba(0,0,0,0)");
    overlay.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = overlay;
    ctx.fillRect(8, 380, size - 16, 188);
    drawLogo(ctx, logoImage, payload, settings, {
      x: 32,
      y: 22,
      maxW: 260,
      maxH: 80,
      align: "left",
      color: settings.logoColor || "#ffffff"
    });
    if (settings.sectionLabel) {
      fillRoundedRect(ctx, 820, 36, 220, 58, 8, colorWithAlpha(settings.secondaryColor || "#6c0000", 0.68));
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("800", 28, settings.titleFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 180), 930, 66);
    }
    if (settings.captionText) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = getTextFont("600", 24, settings.titleFontFamily);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 620), 32, 535);
    }
    var titleGradient = ctx.createLinearGradient(0, 568, 0, 820);
    titleGradient.addColorStop(0, settings.primaryColor || "#b40000");
    titleGradient.addColorStop(1, settings.secondaryColor || "#6c0000");
    ctx.fillStyle = titleGradient;
    ctx.fillRect(0, 568, size, 252);
    ctx.fillStyle = colorWithAlpha(settings.secondaryColor || "#6c0000", 0.28);
    ctx.beginPath();
    ctx.arc(500, 740, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 590,
      maxWidth: 840,
      maxLines: 3,
      maxFont: 62,
      minFont: 36,
      lineGap: 1.08,
      height: 200,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });
    drawDate(ctx, payload, settings, 890, 800, "right", 30, settings.dateColor || "#cccccc");
    drawSocialStrip(ctx, payload, settings, 0, 820, size, 70);
    drawAdBar(ctx, settings, 0, 890, size, 125);
    ctx.fillStyle = settings.topBackgroundColor || "#ffffff";
    ctx.fillRect(0, 1015, size, 65);
    ctx.fillStyle = settings.primaryColor || "#b40000";
    ctx.font = getTextFont("800", 28, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, settings.footerRightText || settings.bottomText || "বিস্তারিত কমেন্টে", 860), 540, 1048);
  }

  // 5. GOLDEN FRAME SPECIAL EDITION FORMAT
  function drawFrameFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || "#080000";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = settings.primaryColor || "#b80000";
    ctx.lineWidth = 22;
    ctx.strokeRect(11, 11, size - 22, size - 22);
    drawImageCover(ctx, photoImage, 24, 24, size - 48, 620);
    drawLogo(ctx, logoImage, payload, settings, {
      x: 34,
      y: 30,
      maxW: 180,
      maxH: 110,
      align: "left",
      color: settings.logoColor || "#ffd700"
    });
    var imageOverlay = ctx.createLinearGradient(0, 440, 0, 645);
    imageOverlay.addColorStop(0, "rgba(0,0,0,0)");
    imageOverlay.addColorStop(1, "rgba(0,0,0,0.52)");
    ctx.fillStyle = imageOverlay;
    ctx.fillRect(24, 440, size - 48, 205);
    if (settings.captionText) {
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("700", 34, settings.titleFontFamily);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 520), 48, 596);
    }
    var redPanel = ctx.createLinearGradient(0, 632, 0, size);
    redPanel.addColorStop(0, settings.primaryColor || "#b80000");
    redPanel.addColorStop(1, settings.secondaryColor || "#400000");
    ctx.fillStyle = redPanel;
    ctx.fillRect(0, 632, size, 448);
    drawSubtleGrid(ctx, 0, 632, size, 380, colorWithAlpha(settings.accentColor || "#ffd700", 0.06));
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 5;
    fillRoundedRect(ctx, 444, 590, 192, 110, 60, "#ffffff");
    ctx.restore();
    drawLogo(ctx, logoImage, payload, settings, {
      x: 462,
      y: 600,
      maxW: 156,
      maxH: 88,
      align: "center",
      color: settings.primaryColor || "#b80000",
      fontSize: 34
    });
    ctx.fillStyle = settings.titleColor || "#ffffff";
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 710,
      maxWidth: 940,
      maxLines: 4,
      maxFont: 62,
      minFont: 36,
      lineGap: 1.08,
      height: 260,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });
    ctx.fillStyle = colorWithAlpha("#000000", 0.35);
    ctx.fillRect(0, 1010, size, 70);
    drawDate(ctx, payload, settings, 56, 1044, "left", 28, "#ffffff");
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("800", 31, settings.titleFontFamily);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || "বিস্তারিত কমেন্টে", 360), 540, 1044);
    ctx.textAlign = "right";
    ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 340), 1024, 1044);
    if (settings.accentColor) {
      ctx.fillStyle = settings.accentColor;
      ctx.font = getTextFont("900", 58, settings.titleFontFamily);
      ctx.textAlign = "right";
      ctx.textBaseline = "alphabetic";
      var words = String(payload.title || "").trim().split(/\s+/);
      if (words.length > 2) {
        ctx.fillText(trimTextToWidth(ctx, words[words.length - 1], 270), 1016, 952);
      }
    }
  }

  // Unified Rendering Engine: Draw on canvas
  const renderCanvasNow = async (canvas, currentSettings, payload) => {
    if (!canvas) return;
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Load assets in parallel safely
    const [photoImg, logoImg] = await Promise.all([
      safeLoadImage(payload.photoUrl),
      safeLoadImage(currentSettings.logoUrl)
    ]);

    switch (currentSettings.format) {
      case "fresh-blue":
        drawSplitFormat(ctx, photoImg, logoImg, payload, currentSettings, size);
        break;
      case "green-market":
        drawMarketFormat(ctx, photoImg, logoImg, payload, currentSettings, size);
        break;
      case "dark-magazine":
        drawMagazineFormat(ctx, photoImg, logoImg, payload, currentSettings, size);
        break;
      case "golden-frame":
        drawFrameFormat(ctx, photoImg, logoImg, payload, currentSettings, size);
        break;
      case "classic-red":
      default:
        drawClassicFormat(ctx, photoImg, logoImg, payload, currentSettings, size);
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
      titleFontFamily: titleFontFamily
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
    titleFontFamily
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
          .replace(/[^\\w\\u0980-\\u09FF]+/g, "-")
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

        setExportNotice("সফলভাবে ডাউনলোড হয়েছে: " + fileName);
        setIsExporting(false);
        setTimeout(() => setExportNotice(""), 4000);
      }, mimeType, quality);
    } catch (err) {
      setExportNotice("এক্সপোর্ট ত্রুটি: " + (err.message || String(err)));
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
          setExportNotice("ক্লিপবোর্ডে কপি সম্পন্ন হয়েছে!");
          setTimeout(() => setExportNotice(""), 3000);
        } catch (e) {
          setExportNotice("ক্লিপবোর্ডে কপি ব্যর্থ হয়েছে (ব্রাউজার অনুমতি প্রয়োজন)");
        }
      }, "image/png");
    } catch (e) {
      setExportNotice("কপি সম্ভব হয়নি");
    }
  };

  return i.jsxs("div", {
    className: "w-full h-full flex flex-col bg-slate-900 text-slate-100 min-h-0 overflow-hidden select-none overscroll-contain",
    children: [
      // Top Navigation / Header Bar
      i.jsxs("div", {
        className: "bg-slate-950 border-b border-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 shrink-0 shadow-lg",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-2.5 min-w-0",
            children: [
              i.jsx("div", {
                className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-900/40 font-bold text-base sm:text-lg shrink-0",
                children: "B2"
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
                  i.jsx("p", { className: "text-[11px] text-slate-400 hidden md:block truncate", children: "৫টি প্রফেশনাল লেআউট, লাইভ ক্যানভাস প্রিভিউ এবং ফুল রেজোলিউশন এক্সপোর্ট" })
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
          // PREVIEW STAGE (Order-1 on Mobile: Shows in the middle directly below Header; Order-2 on Desktop: Right full stage)
          i.jsxs("div", {
            className: "order-1 lg:order-2 flex-shrink-0 lg:flex-grow flex flex-col items-center justify-center p-3 sm:p-5 lg:p-6 bg-slate-950 lg:overflow-y-auto lg:min-h-0 border-b lg:border-b-0 border-slate-800",
            children: [
              // Notice / Status Bar
              (exportNotice || renderError) && i.jsx("div", {
                className: "w-full max-w-md mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md text-center transition-all " + (renderError ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"),
                children: renderError || exportNotice
              }),

              // Canvas Preview Centering Container
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

              // Bottom Canvas Toolbar (Quick Export & Zoom)
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

          // EDITING CONTROLS (Order-2 on Mobile: Scrolls below Preview; Order-1 on Desktop: Left Sidebar)
          i.jsxs("div", {
            className: "order-2 lg:order-1 w-full lg:w-[460px] xl:w-[490px] border-slate-800 lg:border-r flex flex-col bg-slate-900 shrink-0 lg:min-h-0 lg:h-full lg:overflow-hidden",
            children: [
              // Tab Header
              i.jsxs("div", {
                className: "flex items-center border-b border-slate-800 bg-slate-950 px-2 pt-2 gap-1 shrink-0 overflow-x-auto",
                children: [
                  i.jsx("button", {
                    onClick: () => setActiveTab("formats"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "formats" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "লেআউট ফরম্যাট (৫)"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("content"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "content" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "বিষয়বস্তু ও ছবি"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("colors"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "colors" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "কালার ও স্টাইল"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("branding"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer " + (activeTab === "branding" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "ব্র্যান্ডিং ও ফুটার"
                  })
                ]
              }),

              // Tab Content Area
              i.jsxs("div", {
                className: "p-4 space-y-4 lg:overflow-y-auto lg:flex-grow min-h-0",
                children: [
                  // TAB 1: FORMATS
                  activeTab === "formats" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "প্রফেশনাল লেআউট প্রিসেট নির্বাচন করুন" }),
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
                                    i.jsx("div", { className: "w-4 h-4 rounded-full border border-black/30 shadow-sm", style: { backgroundColor: p.topBackgroundColor } })
                                  ]
                                })
                              ]
                            })
                          ]
                        });
                      })
                    ]
                  }),

                  // TAB 2: CONTENT & IMAGES
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

                      // Bengali Font Family Selector
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "বাংলা ফন্ট ফ্যামিলি" }),
                          i.jsx("select", {
                            value: titleFontFamily,
                            onChange: (e) => setTitleFontFamily(e.target.value),
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500",
                            children: AVAILABLE_FONTS.map((f) => i.jsx("option", { key: f.id, value: f.id, children: f.name }))
                          })
                        ]
                      }),

                      // Main Photo Source
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "মূল ছবি (Photo / Cover Image)" }),
                          i.jsx("input", {
                            type: "text",
                            value: photoUrl,
                            onChange: (e) => setPhotoUrl(e.target.value),
                            placeholder: "https://... বা নিজের ছবি আপলোড করুন",
                            className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("label", {
                                className: "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all",
                                children: [
                                  i.jsx("span", { children: "📁 ডিভাইস থেকে ছবি নির্বাচন" }),
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handlePhotoUpload,
                                    className: "hidden"
                                  })
                                ]
                              }),
                              photoUrl && i.jsx("button", {
                                onClick: () => setPhotoUrl(""),
                                className: "text-xs text-rose-400 hover:underline cursor-pointer",
                                children: "মুছে ফেলুন"
                              })
                            ]
                          })
                        ]
                      }),

                      // Date & Caption Inputs
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "তারিখ" }),
                              i.jsx("input", {
                                type: "text",
                                value: dateText,
                                onChange: (e) => setDateText(e.target.value),
                                placeholder: "যেমন: ০২ সেপ্টেম্বর ২০২৬",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ছবির ক্যাপশন / সূত্র" }),
                              i.jsx("input", {
                                type: "text",
                                value: captionText,
                                onChange: (e) => setCaptionText(e.target.value),
                                placeholder: "ছবি: সংগৃহীত",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      // Category & Bottom CTA
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ক্যাটাগরি / সেকশন ব্যাজ" }),
                              i.jsx("input", {
                                type: "text",
                                value: sectionLabel,
                                onChange: (e) => setSectionLabel(e.target.value),
                                placeholder: "সংবাদ / প্রেস রিলিজ",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "বটম কল-টু-অ্যাকশন টেক্সট" }),
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

                  // TAB 3: COLORS & STYLING
                  activeTab === "colors" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: "কালার প্যালেট কাস্টমাইজেশন" }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "প্রাইমারি কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(primaryColor, "#d60000"),
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: primaryColor,
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "সেকেন্ডারি কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(secondaryColor, "#7a0000"),
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: secondaryColor,
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "অ্যাকসেন্ট কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(accentColor, "#ff2d2d"),
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: accentColor,
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "টপ ব্যাকগ্রাউন্ড" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(topBackgroundColor, "#fff0f0"),
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: topBackgroundColor,
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "শিরোনাম টেক্সট কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(titleColor, "#ffffff"),
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: titleColor,
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800",
                            children: [
                              i.jsx("label", { className: "block text-[11px] font-bold text-slate-300 mb-1.5", children: "তারিখ টেক্সট কালার" }),
                              i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "color",
                                    value: normalizeHexColor(dateColor, "#3f3f46"),
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: "w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: dateColor,
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: "w-full bg-slate-900 border border-slate-700 rounded p-1 text-xs font-mono text-slate-100"
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // TAB 4: BRANDING & FOOTERS
                  activeTab === "branding" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      // Logo URL and Upload
                      i.jsxs("div", {
                        className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2",
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "লোগো ইমেজ (SSF Logo)" }),
                          i.jsx("input", {
                            type: "text",
                            value: logoUrl,
                            onChange: (e) => setLogoUrl(e.target.value),
                            placeholder: "https://... বা লোগো নির্বাচন করুন",
                            className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("label", {
                                className: "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all",
                                children: [
                                  i.jsx("span", { children: "📁 লোগো আপলোড" }),
                                  i.jsx("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleLogoUpload,
                                    className: "hidden"
                                  })
                                ]
                              }),
                              i.jsx("button", {
                                onClick: () => setLogoUrl("https://i.ibb.co.com/F4MKM3R2/20260527-055637.png"),
                                className: "text-xs text-rose-400 hover:underline cursor-pointer",
                                children: "ডিফল্ট লোগো রিসেট"
                              })
                            ]
                          })
                        ]
                      }),

                      // Organization / Domain Name
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "সংগঠন / ব্র্যান্ড নাম" }),
                              i.jsx("input", {
                                type: "text",
                                value: siteName,
                                onChange: (e) => setSiteName(e.target.value),
                                placeholder: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ওয়েবসাইট ডোমেন" }),
                              i.jsx("input", {
                                type: "text",
                                value: brandUrl,
                                onChange: (e) => setBrandUrl(e.target.value),
                                placeholder: "ssf-mymensingh.org",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      // Social Handles
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ফেসবুক হ্যান্ডেল" }),
                              i.jsx("input", {
                                type: "text",
                                value: facebookUrl,
                                onChange: (e) => setFacebookUrl(e.target.value),
                                placeholder: "fb.com/...",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ইউটিউব / ইনস্টাগ্রাম" }),
                              i.jsx("input", {
                                type: "text",
                                value: youtubeUrl,
                                onChange: (e) => setYoutubeUrl(e.target.value),
                                placeholder: "yt.com/...",
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),

                      // Banner / Ad text
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "অ্যাডভার্টাইজ / ফুটার ব্যানার টেক্সট" }),
                          i.jsx("input", {
                            type: "text",
                            value: adText,
                            onChange: (e) => setAdText(e.target.value),
                            placeholder: "বিজ্ঞাপন বা স্পেশাল বার্তা...",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
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
}`;

fs.writeFileSync("borbila_v2_component.js", borbilaComponent, "utf8");
console.log("Successfully written borbila_v2_component.js! Length:", borbilaComponent.length);
