function BorbilaPhotoCardV2({ item, db, onClose, isStandalone, onSelectItem, setCurrentTab }) {
  // Built-in Complete Borbila PhotoCard V2 Canvas Engine
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
    logoUrl: "",
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
    downloadPrefix: "ssf-photocard"
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
      topBackgroundColor: "#1a0505",
      titleColor: "#ffffff",
      dateColor: "#ffffff",
      textColor: "#ffffff",
      logoColor: "#ffffff",
      badge: "ফ্রেম"
    }
  };

  // Helper Engine Functions
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

  function socialHandleText(url, fallback) {
    var raw = String(url || "").trim();
    if (!raw) return String(fallback || "").trim();
    try {
      var parsed = new URL(raw.startsWith("http") ? raw : "https://" + raw);
      var parts = parsed.pathname.split("/").filter(Boolean);
      return parts.length ? parts[parts.length - 1] : parsed.hostname.replace(/^www\./i, "");
    } catch (e) {
      return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
    }
  }

  function getTextFont(weight, size) {
    return weight + " " + size + "px "SolaimanLipi", "Noto Sans Bengali", "Hind Siliguri", "Arial", sans-serif";
  }

  function getTitleFont(size) {
    return "700 " + size + "px "SolaimanLipi", "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif";
  }

  function getTitleFontMedium(size) {
    return "500 " + size + "px Arial, "Noto Sans Bengali", "SolaimanLipi", "Hind Siliguri", sans-serif";
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

  function wrapText(ctx, text, maxWidth) {
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
    var minFont = options.minFont || 38;
    var lineGap = options.lineGap || 1.12;
    var fontGetter = options.fontGetter || function(size) { return getTextFont("700", size); };
    var x = options.x;
    var y = options.y;
    var boxHeight = options.height || 240;
    var bestSize = minFont;
    var lines = [];
    for (var size = maxFont; size >= minFont; size -= 2) {
      ctx.font = fontGetter(size);
      var testLines = wrapText(ctx, text, maxWidth);
      if (testLines.length <= maxLines) {
        lines = testLines;
        bestSize = size;
        break;
      }
      if (!lines.length) lines = testLines;
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

  function chamferPath(ctx, x, y, w, h, cut) {
    var c = Math.max(0, Math.min(cut, Math.min(w, h) / 3));
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w - c, y);
    ctx.lineTo(x + w, y + c);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + c, y + h);
    ctx.lineTo(x, y + h - c);
    ctx.closePath();
  }

  function drawPlaceholderPattern(ctx, x, y, w, h, label) {
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, "#2d3748");
    grad.addColorStop(0.5, "#1a202c");
    grad.addColorStop(1, "#171923");
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

    // Central Icon badge
    var cx = x + w / 2;
    var cy = y + h / 2 - 15;
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.arc(cx, cy, 44, 0, Math.PI * 2);
    ctx.fill();

    // Camera silhouette
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(cx - 24, cy - 14, 48, 30);
    ctx.fillRect(cx - 10, cy - 20, 20, 7);
    ctx.fillStyle = "#1a202c";
    ctx.beginPath();
    ctx.arc(cx, cy + 1, 9, 0, Math.PI * 2);
    ctx.fill();

    // Text Label
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = getTextFont("600", 22);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label || "সংবাদ ছবি যুক্ত করুন", cx, cy + 42);
  }

  function drawImageCover(ctx, img, x, y, width, height) {
    if (!img || !img.width || !img.height) {
      drawPlaceholderPattern(ctx, x, y, width, height, "সংবাদ ছবি");
      return;
    }
    var boxRatio = width / height;
    var imageRatio = img.width / img.height;
    var drawWidth, drawHeight, drawX, drawY;
    if (imageRatio > boxRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
      drawX = x - (drawWidth - width) / 2;
      drawY = y;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
      drawX = x;
      drawY = y - (drawHeight - height) / 2;
    }
    try {
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    } catch (e) {
      drawPlaceholderPattern(ctx, x, y, width, height, "সংবাদ ছবি");
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
    ctx.font = getTextFont("800", options.fontSize || 38);
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, siteText, maxW), textX, y + maxH / 2);
  }

  function drawDate(ctx, payload, settings, x, y, align, size, color) {
    var dateText = toEnglishDateText(payload.dateText || "");
    ctx.fillStyle = color || settings.dateColor;
    ctx.font = getTextFont("700", size || 42);
    ctx.textAlign = align || "right";
    ctx.textBaseline = "middle";
    ctx.fillText(dateText, x, y);
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
    body.addColorStop(0, settings.accentColor);
    body.addColorStop(0.45, settings.primaryColor);
    body.addColorStop(1, settings.secondaryColor);
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
    strokeRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha(settings.accentColor, 0.72), 1.2);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", options.fontSize || 30);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, text, stripW - 80), stripX + stripW / 2, stripY + stripH / 2 + 1);
  }

  function drawSubtleGrid(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (var gx = x; gx <= x + w; gx += 42) {
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx, y + h);
      ctx.stroke();
    }
    for (var gy = y; gy <= y + h; gy += 42) {
      ctx.beginPath();
      ctx.moveTo(x, gy);
      ctx.lineTo(x + w, gy);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFooterMeta(ctx, payload, settings, options) {
    options = options || {};
    var y = options.y || 1022;
    var left = settings.footerLeftText || payload.siteName || "";
    var right = settings.footerRightText || displayUrlText(settings.brandUrl, payload.domain);
    ctx.fillStyle = options.color || settings.textColor;
    ctx.font = getTextFont("600", options.size || 28);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, left + (left && payload.dateText ? " | " : "") + toEnglishDateText(payload.dateText || ""), 450), options.leftX || 54, y);
    ctx.textAlign = "right";
    ctx.fillText(trimTextToWidth(ctx, right, 420), options.rightX || 1026, y);
  }

  function drawSocialStrip(ctx, payload, settings, x, y, w, h) {
    var site = displayUrlText(settings.brandUrl, payload.domain);
    var facebook = socialHandleText(settings.facebookUrl, "");
    var youtube = socialHandleText(settings.youtubeUrl, "");
    var instagram = socialHandleText(settings.instagramUrl, "");
    var items = [site];
    if (facebook) items.push("f  " + facebook);
    if (youtube) items.push("▶  " + youtube);
    if (instagram) items.push("ig  " + instagram);
    var gradient = ctx.createLinearGradient(x, y, x + w, y);
    gradient.addColorStop(0, settings.secondaryColor);
    gradient.addColorStop(0.55, settings.primaryColor);
    gradient.addColorStop(1, settings.secondaryColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("700", 30);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, items.join("   |   "), w - 80), x + w / 2, y + h / 2);
  }

  function drawAdBar(ctx, settings, x, y, w, h) {
    var adText = settings.adText || "";
    if (!adText) return;
    var gradient = ctx.createLinearGradient(x, y, x + w, y);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.5, colorWithAlpha(settings.accentColor, 0.18));
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = settings.primaryColor;
    ctx.font = getTextFont("800", 34);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, adText, w - 80), x + w / 2, y + h / 2);
  }

  // 1. CLASSIC RED FORMAT
  function drawClassicFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || "#fff0f0";
    ctx.fillRect(0, 0, size, size);
    var redGradient = ctx.createLinearGradient(0, 456, 0, size);
    redGradient.addColorStop(0, settings.primaryColor);
    redGradient.addColorStop(1, settings.secondaryColor);
    ctx.fillStyle = redGradient;
    ctx.fillRect(0, 456, size, size - 456);
    drawCornerTriangle(ctx, size, settings.primaryColor);
    ctx.fillStyle = settings.primaryColor;
    ctx.fillRect(0, 455, size, 135);
    drawSquarePattern(ctx, 0, 600, colorWithAlpha(settings.accentColor, 0.34));
    drawSquarePattern(ctx, 0, 920, colorWithAlpha(settings.accentColor, 0.34));
    drawSquarePattern(ctx, 980, 600, colorWithAlpha(settings.accentColor, 0.34));
    drawSquarePattern(ctx, 980, 920, colorWithAlpha(settings.accentColor, 0.34));
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
      ctx.font = getTextFont("500", 24);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 450), 62, 702);
    }
    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 730,
      maxWidth: 960,
      maxLines: 3,
      maxFont: 72,
      minFont: 36,
      lineGap: 1.12,
      height: 220,
      fontGetter: getTitleFont
    });
    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 162,
      y: 968,
      w: 756,
      h: 74
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
      ctx.font = getTextFont("500", 25);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 720), 52, 575);
    }
    ctx.fillStyle = settings.topBackgroundColor || "#f3f3f3";
    ctx.beginPath();
    ctx.moveTo(0, 620);
    ctx.lineTo(455, 620);
    ctx.quadraticCurveTo(540, 535, 625, 620);
    ctx.lineTo(size, 620);
    ctx.lineTo(size, size);
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.22)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 6;
    fillRoundedRect(ctx, 442, 510, 196, 120, 24, "#ffffff");
    ctx.restore();
    drawLogo(ctx, logoImage, payload, settings, {
      x: 458,
      y: 524,
      maxW: 164,
      maxH: 92,
      align: "center",
      color: settings.logoColor
    });
    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 672,
      maxWidth: 960,
      maxLines: 4,
      maxFont: 64,
      minFont: 36,
      lineGap: 1.1,
      height: 290,
      fontGetter: getTitleFont
    });
    ctx.fillStyle = colorWithAlpha(settings.primaryColor, 0.12);
    ctx.fillRect(0, 978, size, 102);
    drawFooterMeta(ctx, payload, settings, {
      y: 1028,
      color: settings.textColor,
      size: 30,
      leftX: 62,
      rightX: 1018
    });
  }

  // 3. DARK BREAKING NEWS FORMAT
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
      color: settings.logoColor
    });
    if (settings.sectionLabel) {
      fillRoundedRect(ctx, 825, 36, 210, 54, 12, colorWithAlpha(settings.primaryColor, 0.82));
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("800", 28);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 180), 930, 63);
    }
    var cardX = 36;
    var cardY = 126;
    var cardW = 1008;
    var cardH = 540;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 16;
    fillRoundedRect(ctx, cardX, cardY, cardW, cardH, 28, "#ffffff");
    ctx.restore();
    ctx.save();
    roundedRectPath(ctx, cardX, cardY, cardW, cardH, 28);
    ctx.clip();
    drawImageCover(ctx, photoImage, cardX, cardY, cardW, cardH);
    if (settings.captionText) {
      fillRoundedRect(ctx, cardX + 24, cardY + cardH - 64, 460, 44, 12, "rgba(0,0,0,0.65)");
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("500", 22);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 420), cardX + 44, cardY + cardH - 42);
    }
    ctx.restore();
    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 700,
      maxWidth: 960,
      maxLines: 3,
      maxFont: 68,
      minFont: 36,
      lineGap: 1.1,
      height: 200,
      fontGetter: getTitleFont
    });
    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || "বিস্তারিত কমেন্টে", settings, {
      x: 180,
      y: 914,
      w: 720,
      h: 68,
      fontSize: 28
    });
    drawFooterMeta(ctx, payload, settings, {
      y: 1024,
      color: "#ffffff",
      size: 26,
      leftX: 52,
      rightX: 1028
    });
  }

  // 4. SOCIAL FOOTER TV CARD FORMAT
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
      color: settings.logoColor
    });
    if (settings.sectionLabel) {
      fillRoundedRect(ctx, 820, 36, 220, 58, 8, colorWithAlpha(settings.secondaryColor, 0.68));
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("800", 30);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 190), 930, 65);
    }
    if (settings.captionText) {
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = getTextFont("600", 25);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 700), 38, 528);
    }
    var titleBox = ctx.createLinearGradient(0, 568, 0, 890);
    titleBox.addColorStop(0, settings.primaryColor);
    titleBox.addColorStop(1, settings.secondaryColor);
    ctx.fillStyle = titleBox;
    ctx.fillRect(8, 568, size - 16, 322);
    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 602,
      maxWidth: 960,
      maxLines: 4,
      maxFont: 66,
      minFont: 36,
      lineGap: 1.08,
      height: 254,
      fontGetter: getTitleFont
    });
    drawSocialStrip(ctx, payload, settings, 8, 890, size - 16, 68);
    if (settings.adText) {
      drawAdBar(ctx, settings, 8, 958, size - 16, 66);
      drawFooterMeta(ctx, payload, settings, {
        y: 1048,
        color: "#ffffff",
        size: 24,
        leftX: 36,
        rightX: 1044
      });
    } else {
      drawFooterMeta(ctx, payload, settings, {
        y: 994,
        color: "#ffffff",
        size: 28,
        leftX: 36,
        rightX: 1044
      });
    }
  }

  // 5. RED CAPTION SQUARE FRAME FORMAT
  function drawFrameFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || "#1a0505";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = settings.primaryColor;
    ctx.lineWidth = 22;
    ctx.strokeRect(11, 11, size - 22, size - 22);
    drawImageCover(ctx, photoImage, 24, 24, size - 48, 620);
    drawLogo(ctx, logoImage, payload, settings, {
      x: 34,
      y: 30,
      maxW: 180,
      maxH: 110,
      align: "left",
      color: settings.logoColor
    });
    var imageOverlay = ctx.createLinearGradient(0, 440, 0, 645);
    imageOverlay.addColorStop(0, "rgba(0,0,0,0)");
    imageOverlay.addColorStop(1, "rgba(0,0,0,0.52)");
    ctx.fillStyle = imageOverlay;
    ctx.fillRect(24, 440, size - 48, 205);
    if (settings.captionText) {
      ctx.fillStyle = "#ffffff";
      ctx.font = getTextFont("700", 34);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 520), 48, 596);
    }
    var redPanel = ctx.createLinearGradient(0, 632, 0, size);
    redPanel.addColorStop(0, settings.primaryColor);
    redPanel.addColorStop(1, settings.secondaryColor);
    ctx.fillStyle = redPanel;
    ctx.fillRect(0, 632, size, 448);
    drawSubtleGrid(ctx, 0, 632, size, 380, colorWithAlpha(settings.accentColor, 0.06));
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
      color: settings.primaryColor,
      fontSize: 34
    });
    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || "", {
      x: 540,
      y: 710,
      maxWidth: 940,
      maxLines: 4,
      maxFont: 62,
      minFont: 36,
      lineGap: 1.08,
      height: 260,
      fontGetter: getTitleFont
    });
    ctx.fillStyle = colorWithAlpha("#000000", 0.35);
    ctx.fillRect(0, 1010, size, 70);
    drawDate(ctx, payload, settings, 56, 1044, "left", 28, "#ffffff");
    ctx.fillStyle = "#ffffff";
    ctx.font = getTextFont("800", 31);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || "বিস্তারিত কমেন্টে", 360), 540, 1044);
    ctx.textAlign = "right";
    ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 340), 1024, 1044);
    if (settings.accentColor) {
      ctx.fillStyle = settings.accentColor;
      ctx.font = getTextFont("900", 58);
      ctx.textAlign = "right";
      ctx.textBaseline = "alphabetic";
      var words = String(payload.title || "").trim().split(/\s+/);
      if (words.length > 2) {
        ctx.fillText(trimTextToWidth(ctx, words[words.length - 1], 270), 1016, 952);
      }
    }
  }

  const FORMAT_RENDERERS = {
    "classic-red": drawClassicFormat,
    "fresh-blue": drawSplitFormat,
    "green-market": drawMarketFormat,
    "dark-magazine": drawMagazineFormat,
    "gold-frame": drawFrameFormat
  };

  // Safe Image Loader
  const loadSafeImage = (src) => {
    if (!src || typeof src !== "string" || !src.trim()) return Promise.resolve(null);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => {
        // Fallback without crossOrigin for data URIs or local assets
        const fallback = new Image();
        fallback.onload = () => resolve(fallback);
        fallback.onerror = () => resolve(null); // Never reject to prevent rendering crash
        fallback.src = src;
      };
      img.src = src;
    });
  };

  // Component State
  const defaultImg = "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png";
  const defaultLogo = "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png";

  const [format, setFormat] = Q.useState("classic-red");
  const [activeTab, setActiveTab] = Q.useState("formats");
  const [title, setTitle] = Q.useState((item && (item.title || item.headline)) || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ঐতিহাসিক প্রতিনিধি সম্মেলন অনুষ্ঠিত");
  const [imageUrl, setImageUrl] = Q.useState((item && (item.image || item.coverImage || item.coverUrl)) || defaultImg);
  const [logoUrl, setLogoUrl] = Q.useState(defaultLogo);
  const [dateText, setDateText] = Q.useState((item && item.date) || "৩১ আগস্ট ২০২৬");
  const [siteName, setSiteName] = Q.useState("সমাজতান্ত্রিক ছাত্র ফ্রন্ট");
  const [domain, setDomain] = Q.useState("ssf-mymensingh.org");
  const [bottomText, setBottomText] = Q.useState("বিস্তারিত কমেন্টে");
  const [captionText, setCaptionText] = Q.useState("ছবি: সংগৃহীত");
  const [sectionLabel, setSectionLabel] = Q.useState((item && item.category) || "সংবাদ");
  const [footerLeftText, setFooterLeftText] = Q.useState("");
  const [footerRightText, setFooterRightText] = Q.useState("");
  const [adText, setAdText] = Q.useState("");
  const [facebookUrl, setFacebookUrl] = Q.useState("fb.com/ssfmymensingh");
  const [youtubeUrl, setYoutubeUrl] = Q.useState("");
  const [instagramUrl, setInstagramUrl] = Q.useState("");
  const [downloadPrefix, setDownloadPrefix] = Q.useState("ssf-photocard");

  // Colors
  const [primaryColor, setPrimaryColor] = Q.useState("#d60000");
  const [secondaryColor, setSecondaryColor] = Q.useState("#7a0000");
  const [accentColor, setAccentColor] = Q.useState("#ff2d2d");
  const [topBackgroundColor, setTopBackgroundColor] = Q.useState("#fff0f0");
  const [titleColor, setTitleColor] = Q.useState("#ffffff");
  const [dateColor, setDateColor] = Q.useState("#3f3f46");
  const [textColor, setTextColor] = Q.useState("#181818");
  const [logoColor, setLogoColor] = Q.useState("#181818");

  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportNotice, setExportNotice] = Q.useState("");
  const [renderError, setRenderError] = Q.useState("");
  const [zoomLevel, setZoomLevel] = Q.useState("fit");
  const [selectedArticleId, setSelectedArticleId] = Q.useState((item && item.id) || "");
  const [isRendering, setIsRendering] = Q.useState(false);

  const previewCanvasRef = Q.useRef(null);
  const fileInputRef = Q.useRef(null);
  const logoInputRef = Q.useRef(null);

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

  const handleCustomPhotoUpload = (e) => {
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

  const handleCustomLogoUpload = (e) => {
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

  // Live Canvas Rendering Effect
  Q.useEffect(() => {
    let active = true;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    setIsRendering(true);
    setRenderError("");

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

    // Load assets safely
    Promise.all([
      loadSafeImage(payload.imageUrl),
      payload.logoUrl ? loadSafeImage(payload.logoUrl) : Promise.resolve(null)
    ]).then(([photoImg, logoImg]) => {
      if (!active) return;

      // 1. Clear and fill solid base
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = settings.topBackgroundColor || "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // 2. Select and run renderer
      const renderer = FORMAT_RENDERERS[format] || drawClassicFormat;
      try {
        renderer(ctx, photoImg, logoImg, payload, settings, size);
        setIsRendering(false);
      } catch (drawErr) {
        console.error("Format render error:", drawErr);
        // Guaranteed Emergency Fallback: Draw clean card with title and branding
        ctx.fillStyle = settings.primaryColor || "#d60000";
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = "#ffffff";
        ctx.font = getTextFont("800", 52);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(payload.title, size / 2, size / 2);
        setRenderError("ড্রয়িং রেন্ডারিংয়ে সমস্যা হয়েছে: " + drawErr.message);
        setIsRendering(false);
      }
    }).catch(err => {
      if (!active) return;
      console.warn("Borbila preview draw error:", err);
      setRenderError("ছবি লোড করতে সমস্যা হয়েছে: " + (err.message || ""));
      setIsRendering(false);
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

  // Export Handlers
  const handleDownload = async (exportFormat = "png") => {
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
          setExportNotice("ক্লিপবোর্ডে কপি সম্পন্ন হয়েছে!");
          setTimeout(() => setExportNotice(""), 3000);
        } catch (clipErr) {
          setExportNotice("ক্লিপবোর্ড অনুমতি নেই");
          setTimeout(() => setExportNotice(""), 3000);
        }
      }, "image/png");
    } catch (e) {
      setExportNotice("কপি ব্যর্থ হয়েছে");
      setTimeout(() => setExportNotice(""), 3000);
    }
  };

  const allArticles = db ? [...(db.news || []), ...(db.blogs || [])] : [];

  return i.jsxs("div", {
    className: "w-full h-full flex flex-col bg-slate-950 text-slate-100 min-h-0",
    children: [
      // Top Navigation / Header Bar
      i.jsxs("div", {
        className: "bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              i.jsx("div", {
                className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-900/40 font-bold text-lg",
                children: "B2"
              }),
              i.jsxs("div", {
                children: [
                  i.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      i.jsx("h2", { className: "text-base sm:text-lg font-bold text-white tracking-wide", children: "Borbila PhotoCard Pro V2" }),
                      i.jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase", children: "Pro Engine" })
                    ]
                  }),
                  i.jsx("p", { className: "text-xs text-slate-400 hidden sm:block", children: "৫টি প্রফেশনাল লেআউট, লাইভ ক্যানভাস প্রিভিউ এবং ফুল রেজোলিউশন এক্সপোর্ট" })
                ]
              })
            ]
          }),
          i.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              i.jsxs("button", {
                onClick: () => handleDownload("png"),
                disabled: isExporting,
                className: "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50",
                children: [
                  i.jsx("span", { children: "PNG ডাউনলোড (১০৮০p)" })
                ]
              }),
              i.jsxs("button", {
                onClick: handleCopyToClipboard,
                className: "px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer hidden md:flex items-center gap-1.5",
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

      // Main Studio Layout (Sidebar + Live Preview Stage)
      i.jsxs("div", {
        className: "flex-grow flex flex-col lg:flex-row min-h-0 overflow-hidden",
        children: [
          // Left Sidebar: Form Controls
          i.jsxs("div", {
            className: "w-full lg:w-[460px] xl:w-[500px] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-900/60 shrink-0 min-h-0",
            children: [
              // Tab Header
              i.jsxs("div", {
                className: "flex items-center border-b border-slate-800 bg-slate-950/70 px-2 pt-2 gap-1 shrink-0 overflow-x-auto",
                children: [
                  i.jsx("button", {
                    onClick: () => setActiveTab("formats"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 " + (activeTab === "formats" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "লেআউট ফরম্যাট (৫)"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("content"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 " + (activeTab === "content" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "কন্টেন্ট ও ছবি"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("colors"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 " + (activeTab === "colors" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "রং ও স্টাইলিং"
                  }),
                  i.jsx("button", {
                    onClick: () => setActiveTab("branding"),
                    className: "px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 " + (activeTab === "branding" ? "text-rose-400 border-rose-500 bg-slate-900" : "text-slate-400 border-transparent hover:text-slate-200"),
                    children: "ব্র্যান্ড ও ফুটার"
                  })
                ]
              }),

              // Tab Scrollable Body
              i.jsxs("div", {
                className: "flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar",
                children: [
                  // Tab 1: Formats & Presets
                  activeTab === "formats" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsxs("div", {
                        className: "bg-slate-950 p-3 rounded-xl border border-slate-800",
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1.5", children: "ডাটাবেজ থেকে সংবাদ নির্বাচন করুন (ঐচ্ছিক)" }),
                          i.jsxs("select", {
                            value: selectedArticleId,
                            onChange: handleSelectArticle,
                            className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500",
                            children: [
                              i.jsx("option", { value: "", children: "-- সাম্প্রতিক সংবাদ নির্বাচন করুন --" }),
                              allArticles.map(a => i.jsx("option", { value: a.id, children: (a.title || a.headline || "Untitled").slice(0, 60) }, a.id))
                            ]
                          })
                        ]
                      }),
                      i.jsx("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mt-2", children: "Borbila Pro ৫টি অফিসিয়াল ফরম্যাট" }),
                      i.jsx("div", {
                        className: "grid grid-cols-1 gap-2.5",
                        children: Object.values(PRESETS).map(p => i.jsxs("div", {
                          key: p.id,
                          onClick: () => applyPreset(p.id),
                          className: "p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 " + (format === p.id ? "bg-rose-950/40 border-rose-500 ring-1 ring-rose-500 shadow-md" : "bg-slate-950/60 border-slate-800 hover:border-slate-700"),
                          children: [
                            i.jsxs("div", {
                              className: "space-y-1",
                              children: [
                                i.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    i.jsx("span", { className: "text-sm font-bold text-white", children: p.label }),
                                    i.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold", children: p.badge })
                                  ]
                                }),
                                i.jsx("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: p.description })
                              ]
                            }),
                            i.jsx("div", {
                              className: "w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-inner flex items-center justify-center",
                              style: { backgroundColor: p.primaryColor },
                              children: format === p.id && i.jsx("span", { className: "text-white text-xs font-bold", children: "✓" })
                            })
                          ]
                        }))
                      })
                    ]
                  }),

                  // Tab 2: Content & Images
                  activeTab === "content" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "হেডলাইন / শিরোনাম *" }),
                          i.jsx("textarea", {
                            rows: 3,
                            value: title,
                            onChange: (e) => setTitle(e.target.value),
                            placeholder: "সংবাদের শিরোনাম লিখুন...",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500 leading-relaxed"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ক্যাটাগরি ব্যাজ" }),
                              i.jsx("input", {
                                type: "text",
                                value: sectionLabel,
                                onChange: (e) => setSectionLabel(e.target.value),
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "তারিখ" }),
                              i.jsx("input", {
                                type: "text",
                                value: dateText,
                                onChange: (e) => setDateText(e.target.value),
                                className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ছবি ক্যাপশন / ক্রেডিট" }),
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
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "বটম কল-টু-অ্যাকশন টেক্সট" }),
                          i.jsx("input", {
                            type: "text",
                            value: bottomText,
                            onChange: (e) => setBottomText(e.target.value),
                            placeholder: "বিস্তারিত কমেন্টে",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "pt-2 border-t border-slate-800 space-y-2",
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300", children: "সংবাদ ছবি আপলোড বা URL" }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: imageUrl,
                                onChange: (e) => setImageUrl(e.target.value),
                                placeholder: "https://... অথবা ডিভাইস থেকে আপলোড করুন",
                                className: "flex-grow bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500 font-mono text-[11px]"
                              }),
                              i.jsx("input", {
                                type: "file",
                                ref: fileInputRef,
                                onChange: handleCustomPhotoUpload,
                                accept: "image/*",
                                className: "hidden"
                              }),
                              i.jsx("button", {
                                type: "button",
                                onClick: () => fileInputRef.current && fileInputRef.current.click(),
                                className: "px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 cursor-pointer shrink-0",
                                children: "আপলোড"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 3: Colors & Styling
                  activeTab === "colors" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsx("div", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1", children: "প্যালেট ও ব্যাকগ্রাউন্ড কন্ট্রোল" }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2.5",
                        children: [
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Primary Color" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: primaryColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: primaryColor,
                                onChange: (e) => setPrimaryColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Secondary Color" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: secondaryColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: secondaryColor,
                                onChange: (e) => setSecondaryColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Accent Color" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: accentColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: accentColor,
                                onChange: (e) => setAccentColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Top Background" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: topBackgroundColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: topBackgroundColor,
                                onChange: (e) => setTopBackgroundColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Title Color" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: titleColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: titleColor,
                                onChange: (e) => setTitleColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between",
                            children: [
                              i.jsxs("div", {
                                children: [
                                  i.jsx("div", { className: "text-xs font-bold text-slate-200", children: "Date/Meta Color" }),
                                  i.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: dateColor })
                                ]
                              }),
                              i.jsx("input", {
                                type: "color",
                                value: dateColor,
                                onChange: (e) => setDateColor(e.target.value),
                                className: "w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 4: Branding & Footers
                  activeTab === "branding" && i.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "ওয়েবসাইট ডোমেইন / ব্র্যান্ড নাম" }),
                          i.jsx("input", {
                            type: "text",
                            value: domain,
                            onChange: (e) => setDomain(e.target.value),
                            placeholder: "ssf-mymensingh.org",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500 font-mono"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "সংগঠনের নাম (লোগো অল্টারনেট)" }),
                          i.jsx("input", {
                            type: "text",
                            value: siteName,
                            onChange: (e) => setSiteName(e.target.value),
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "লোগো ইমেজ আপলোড / URL" }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: logoUrl,
                                onChange: (e) => setLogoUrl(e.target.value),
                                className: "flex-grow bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500 font-mono text-[11px]"
                              }),
                              i.jsx("input", {
                                type: "file",
                                ref: logoInputRef,
                                onChange: handleCustomLogoUpload,
                                accept: "image/*",
                                className: "hidden"
                              }),
                              i.jsx("button", {
                                type: "button",
                                onClick: () => logoInputRef.current && logoInputRef.current.click(),
                                className: "px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 cursor-pointer shrink-0",
                                children: "লোগো"
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2",
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
                      i.jsxs("div", {
                        children: [
                          i.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "অ্যাডভার্টাইজ / ফুটার ব্যানার টেক্সট" }),
                          i.jsx("input", {
                            type: "text",
                            value: adText,
                            onChange: (e) => setAdText(e.target.value),
                            placeholder: "বিজ্ঞাপন বা স্পেশাল মেসেজ...",
                            className: "w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Right Stage: Live Interactive Canvas View
          i.jsxs("div", {
            className: "flex-grow flex flex-col items-center justify-between p-3 sm:p-6 bg-slate-950 overflow-y-auto min-h-0 relative",
            children: [
              // Notice / Status Bar
              (exportNotice || renderError) && i.jsx("div", {
                className: "w-full max-w-xl mb-3 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg text-center transition-all " + (renderError ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"),
                children: renderError || exportNotice
              }),

              // Canvas Preview Centering Container
              i.jsx("div", {
                className: "w-full flex-grow flex items-center justify-center py-2",
                children: i.jsxs("div", {
                  className: "relative shadow-2xl rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 transition-all duration-200 " + (zoomLevel === "fit" ? "max-w-[480px] w-full" : zoomLevel === "50" ? "w-[540px]" : zoomLevel === "75" ? "w-[810px]" : "w-[1080px]"),
                  style: { aspectRatio: "1 / 1" },
                  children: [
                    i.jsx("canvas", {
                      ref: previewCanvasRef,
                      className: "w-full h-full object-contain block select-none pointer-events-none"
                    }),
                    isRendering && i.jsx("div", {
                      className: "absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center text-white text-xs font-bold",
                      children: "রেন্ডার হচ্ছে..."
                    })
                  ]
                })
              }),

              // Bottom Canvas Toolbar (Zoom + Multi-Format Export)
              i.jsxs("div", {
                className: "w-full max-w-2xl mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3",
                children: [
                  i.jsxs("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      i.jsx("span", { className: "text-xs font-semibold text-slate-400", children: "জুম:" }),
                      i.jsx("button", {
                        onClick: () => setZoomLevel("fit"),
                        className: "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all " + (zoomLevel === "fit" ? "bg-rose-600 text-white font-bold shadow" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"),
                        children: "Fit"
                      }),
                      i.jsx("button", {
                        onClick: () => setZoomLevel("50"),
                        className: "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all " + (zoomLevel === "50" ? "bg-rose-600 text-white font-bold shadow" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"),
                        children: "50%"
                      }),
                      i.jsx("button", {
                        onClick: () => setZoomLevel("75"),
                        className: "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all " + (zoomLevel === "75" ? "bg-rose-600 text-white font-bold shadow" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"),
                        children: "75%"
                      }),
                      i.jsx("button", {
                        onClick: () => setZoomLevel("100"),
                        className: "px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all " + (zoomLevel === "100" ? "bg-rose-600 text-white font-bold shadow" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"),
                        children: "100%"
                      })
                    ]
                  }),
                  i.jsxs("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      i.jsx("button", {
                        onClick: () => handleDownload("png"),
                        disabled: isExporting,
                        className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow transition-all cursor-pointer disabled:opacity-50",
                        children: "PNG (1080p)"
                      }),
                      i.jsx("button", {
                        onClick: () => handleDownload("jpg"),
                        disabled: isExporting,
                        className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-50",
                        children: "JPG"
                      }),
                      i.jsx("button", {
                        onClick: () => handleDownload("webp"),
                        disabled: isExporting,
                        className: "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-50",
                        children: "WebP"
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