const fs = require('fs');

const code = `function BorbilaPhotoCardV2({ item, db, onClose, isStandalone, onSelectItem, setCurrentTab }) {
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
    format: 'classic-red',
    primaryColor: '#d60000',
    secondaryColor: '#7a0000',
    accentColor: '#ff2d2d',
    topBackgroundColor: '#fff0f0',
    titleColor: '#ffffff',
    dateColor: '#3f3f46',
    textColor: '#181818',
    logoColor: '#181818',
    logoUrl: '',
    bottomText: 'বিস্তারিত কমেন্টে',
    captionText: 'ছবি: সংগৃহীত',
    sectionLabel: 'সংবাদ',
    footerLeftText: '',
    footerRightText: '',
    adText: '',
    brandUrl: 'ssf-mymensingh.org',
    facebookUrl: 'fb.com/ssfmymensingh',
    youtubeUrl: '',
    instagramUrl: '',
    frontButtonText: 'Download PhotoCard',
    downloadPrefix: 'ssf-photocard',
    titleFontFamily: 'SolaimanLipi',
    titleFontSize: 32,
    isAutoFontSize: false
  };

  const BANGLA_FONTS = [
    { id: 'SolaimanLipi', label: 'সোলায়মান লিপি (SolaimanLipi)', group: 'জনপ্রিয়' },
    { id: 'Bornopata', label: 'বর্ণপাতা রেগুলার (Bornopata Regular)', group: 'কাস্টম' },
    { id: 'Bornopata Bold', label: 'বর্ণপাতা বোল্ড (Bornopata Bold)', group: 'কাস্টম' },
    { id: 'Li Alinur Sangbadpatra 2 Unicode', label: 'সংবাদপত্র ২ (Sangbadpatra 2)', group: 'পত্রিকা' },
    { id: 'Hind Siliguri', label: 'হিন্দ শিলিগুড়ি (Hind Siliguri)', group: 'ক্লিন' },
    { id: 'Noto Sans Bengali', label: 'নোটো সান্স বেঙ্গলি (Noto Sans)', group: 'মডার্ন' },
    { id: 'Noto Serif Bengali', label: 'নোটো সেরিফ বেঙ্গলি (Noto Serif)', group: 'সেরিফ' },
    { id: 'Tiro Bangla', label: 'তিরো বাংলা (Tiro Bangla)', group: 'ক্লাসিক' },
    { id: 'Anek Bangla', label: 'অনেক বাংলা (Anek Bangla)', group: 'বোল্ড' },
    { id: 'Kalpurush', label: 'কালপুরুষ (Kalpurush)', group: 'ক্লাসিক' },
    { id: 'Mina', label: 'মিনা (Mina)', group: 'জ্যামিতিক' },
    { id: 'Galada', label: 'গলাদা (Galada)', group: 'স্টাইলিশ' },
    { id: 'Roboto Slab', label: 'রোবটো স্ল্যাব (Roboto Slab)', group: 'স্ল্যাব' }
  ];

  const PRESETS = {
    'classic-red': {
      id: 'classic-red',
      label: 'অ্যাঙ্গেল্ড রেড নিউজ কার্ড',
      labelEn: 'Angled Red News Card',
      description: 'লোগো ও তারিখ হেডার, কোণাকুণি ছবির ফ্রেম, গাঢ় লাল হেডলাইন প্যানেল এবং বটম সিটিএ ফুটার।',
      primaryColor: '#d60000',
      secondaryColor: '#7a0000',
      accentColor: '#ff2d2d',
      topBackgroundColor: '#fff0f0',
      titleColor: '#ffffff',
      dateColor: '#3f3f46',
      textColor: '#181818',
      logoColor: '#181818',
      badge: 'জনপ্রিয়'
    },
    'fresh-blue': {
      id: 'fresh-blue',
      label: 'হোয়াইট এডিটোরিয়াল কার্ড',
      labelEn: 'White Editorial Card',
      description: 'বড় আকারের শীর্ষ ছবি, পরিচ্ছন্ন সাদা হেডলাইন এলাকা, বটম তারিখ ও ওয়েবসাইট স্ট্রিপ।',
      primaryColor: '#d32929',
      secondaryColor: '#e6e6e6',
      accentColor: '#f44336',
      topBackgroundColor: '#f3f3f3',
      titleColor: '#202020',
      dateColor: '#52525b',
      textColor: '#202020',
      logoColor: '#d32929',
      badge: 'মিনিমাল'
    },
    'green-market': {
      id: 'green-market',
      label: 'গ্রিন গ্রিড / মার্কেট ব্যানার কার্ড',
      labelEn: 'Green Market Banner',
      description: 'গাঢ় ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট, টেক্সচার গ্রিড, আধুনিক সেন্টার কাটআউট ও হাই-ভিজিবিলিটি ট্যাগ।',
      primaryColor: '#e50914',
      secondaryColor: '#140000',
      accentColor: '#00d26a',
      topBackgroundColor: '#070a0e',
      titleColor: '#ffffff',
      dateColor: '#cbd5e1',
      textColor: '#ffffff',
      logoColor: '#ffffff',
      badge: 'আধুনিক'
    },
    'dark-magazine': {
      id: 'dark-magazine',
      label: 'ডার্ক ম্যাগাজিন ফ্রন্টপেজ কার্ড',
      labelEn: 'Dark Magazine Frontpage',
      description: 'ফ্রেমযুক্ত ইমেজ কভার, ক্যাটাগরি ও ডেট ট্রিপল স্ট্রিপ এবং সেন্টারড ফোকাস টাইপোগ্রাফি।',
      primaryColor: '#b40000',
      secondaryColor: '#6c0000',
      accentColor: '#ff4d4d',
      topBackgroundColor: '#120000',
      titleColor: '#ffffff',
      dateColor: '#e4e4e7',
      textColor: '#ffffff',
      logoColor: '#ffffff',
      badge: 'বোল্ড'
    },
    'gold-frame': {
      id: 'gold-frame',
      label: 'গোল্ডেন ফ্রেম / স্পেশাল এডিটর কার্ড',
      labelEn: 'Golden Frame Special Edition',
      description: 'ডাবল বর্ডার অ্যাকসেন্ট, ফুল ক্যানভাস ভিজ্যুয়াল, ফ্লোটিং লোগো ব্যাজ এবং সিগনেচার বটম বার।',
      primaryColor: '#9e0000',
      secondaryColor: '#4d0000',
      accentColor: '#ffd700',
      topBackgroundColor: '#1a0505',
      titleColor: '#ffffff',
      dateColor: '#fef08a',
      textColor: '#ffffff',
      logoColor: '#ffd700',
      badge: 'স্পেশাল'
    }
  };

  // Helper Canvas Drawing Functions
  function normalizeHexColor(value, fallback) {
    var color = String(value || '').trim();
    var shortHex = /^#([0-9a-f]{3})$/i.exec(color);
    if (shortHex) {
      color = '#' + shortHex[1].split('').map(function(char) { return char + char; }).join('');
    }
    if (/^#[0-9a-f]{6}$/i.test(color)) {
      return color;
    }
    return fallback;
  }

  function hexToRgb(color) {
    var normalized = normalizeHexColor(color, '#000000').replace('#', '');
    return {
      r: parseInt(normalized.slice(0, 2), 16) || 0,
      g: parseInt(normalized.slice(2, 4), 16) || 0,
      b: parseInt(normalized.slice(4, 6), 16) || 0
    };
  }

  function colorWithAlpha(color, alpha) {
    var rgb = hexToRgb(color);
    return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')';
  }

  function displayUrlText(url, fallback) {
    var raw = String(url || '').trim();
    if (!raw) return String(fallback || '').trim();
    try {
      var parsed = new URL(raw.startsWith('http') ? raw : 'https://' + raw);
      var host = parsed.hostname.replace(/^www\\./i, '');
      var path = parsed.pathname.replace(/\\/$/, '');
      return host + (path && path !== '/' ? path : '');
    } catch (e) {
      return raw.replace(/^https?:\\/\\//i, '').replace(/^www\\./i, '');
    }
  }

  function toEnglishDateText(text) {
    var map = { '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9' };
    return String(text || '').replace(/[০-৯]/g, function(digit) { return map[digit] || digit; });
  }

  function roundedRectPath(ctx, x, y, w, h, r) {
    var radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
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

  function getTextFont(weight, size, customFamily) {
    var fam = customFamily ? ('"' + customFamily + '", ') : '';
    return weight + ' ' + size + 'px ' + fam + 'SolaimanLipi, "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif';
  }

  function getTitleFont(size, customFamily) {
    var fam = customFamily ? ('"' + customFamily + '", ') : '';
    return '700 ' + size + 'px ' + fam + 'SolaimanLipi, "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif';
  }

  function trimTextToWidth(ctx, text, maxWidth) {
    var value = String(text || '').trim();
    if (!value) return '';
    if (ctx.measureText(value).width <= maxWidth) return value;
    var ellipsis = '...';
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
    var raw = String(text || '').trim().replace(/\\s+/g, ' ');
    if (!raw) return [];
    var words = raw.split(' ');
    var lines = [];
    var current = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var next = current ? current + ' ' + word : word;
      if (ctx.measureText(next).width <= maxWidth) {
        current = next;
      } else {
        if (current) {
          lines.push(current);
          current = word;
        } else {
          lines.push(word);
          current = '';
        }
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawAdaptiveMultiline(ctx, text, options) {
    var maxWidth = options.maxWidth || 900;
    var maxLines = options.maxLines || 4;
    var maxFont = options.maxFont || 80;
    var minFont = options.minFont || 32;
    var explicitSize = options.customFontSize || null;
    var lineGap = options.lineGap || 1.12;
    var fontGetter = options.fontGetter || function(size) { return getTextFont('700', size); };
    
    var chosenSize = explicitSize || maxFont;
    var chosenLines = [];
    
    if (explicitSize) {
      ctx.font = fontGetter(explicitSize);
      chosenLines = wrapTextLines(ctx, text, maxWidth);
      if (chosenLines.length > maxLines) {
        var found = false;
        for (var size = explicitSize - 2; size >= minFont; size -= 2) {
          ctx.font = fontGetter(size);
          var attempt = wrapTextLines(ctx, text, maxWidth);
          if (attempt.length <= maxLines) {
            chosenSize = size;
            chosenLines = attempt;
            found = true;
            break;
          }
        }
        if (!found) {
          chosenSize = minFont;
          ctx.font = fontGetter(chosenSize);
          chosenLines = wrapTextLines(ctx, text, maxWidth);
        }
      }
    } else {
      for (var s = maxFont; s >= minFont; s -= 2) {
        ctx.font = fontGetter(s);
        var testLines = wrapTextLines(ctx, text, maxWidth);
        if (testLines.length <= maxLines) {
          chosenSize = s;
          chosenLines = testLines;
          break;
        }
      }
      if (!chosenLines.length) {
        chosenSize = minFont;
        ctx.font = fontGetter(chosenSize);
        chosenLines = wrapTextLines(ctx, text, maxWidth);
      }
    }

    if (chosenLines.length > maxLines) {
      chosenLines = chosenLines.slice(0, maxLines);
      ctx.font = fontGetter(chosenSize);
      chosenLines[maxLines - 1] = trimTextToWidth(ctx, chosenLines[maxLines - 1], maxWidth);
    }

    ctx.font = fontGetter(chosenSize);
    ctx.textAlign = options.align || 'center';
    ctx.textBaseline = 'middle';

    var lineHeight = chosenSize * lineGap;
    var totalTextHeight = (chosenLines.length - 1) * lineHeight;
    var startY = options.y - totalTextHeight / 2;

    for (var l = 0; l < chosenLines.length; l++) {
      ctx.fillText(chosenLines[l], options.x, startY + l * lineHeight);
    }

    return {
      fontSize: chosenSize,
      lineCount: chosenLines.length,
      height: totalTextHeight + chosenSize
    };
  }

  function drawPlaceholderPattern(ctx, x, y, w, h, label) {
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
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
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(cx, cy, 54, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Camera / Photo icon in center
    ctx.fillStyle = '#ffffff';
    ctx.font = getTextFont('700', 38);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('📷', cx, cy);

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = getTextFont('700', 24);
    ctx.fillText(label || 'সংবাদ ছবি আপলোড করুন', cx, cy + 74);
  }

  function drawImageCover(ctx, img, x, y, width, height) {
    if (!img || !img.width || !img.height) {
      drawPlaceholderPattern(ctx, x, y, width, height, 'সংবাদ ছবি');
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
      drawPlaceholderPattern(ctx, x, y, width, height, 'সংবাদ ছবি');
    }
  }

  function drawLogo(ctx, logoImage, payload, settings, options) {
    var x = options.x;
    var y = options.y;
    var maxW = options.maxW || 330;
    var maxH = options.maxH || 110;
    var align = options.align || 'left';

    if (logoImage && logoImage.width && logoImage.height) {
      var ratio = logoImage.width / logoImage.height;
      var w = maxW;
      var h = maxW / ratio;
      if (h > maxH) {
        h = maxH;
        w = h * ratio;
      }
      var drawX = x;
      if (align === 'center') {
        drawX = x + (maxW - w) / 2;
      } else if (align === 'right') {
        drawX = x + maxW - w;
      }
      try {
        ctx.drawImage(logoImage, drawX, y + (maxH - h) / 2, w, h);
        return;
      } catch (e) {}
    }

    // Default High-Clarity SVG / Vector Logo Badge
    var badgeW = Math.min(maxW, 310);
    var badgeH = Math.min(maxH, 78);
    var bx = x;
    if (align === 'center') bx = x + (maxW - badgeW) / 2;
    else if (align === 'right') bx = x + maxW - badgeW;

    ctx.save();
    fillRoundedRect(ctx, bx, y + (maxH - badgeH) / 2, badgeW, badgeH, 12, settings.primaryColor || '#d60000');
    
    // Inner emblem
    ctx.fillStyle = '#ffffff';
    ctx.font = getTextFont('900', options.fontSize || 26);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(payload.siteName || 'ছাত্র ফ্রন্ট', bx + badgeW / 2, y + maxH / 2);
    ctx.restore();
  }

  function drawDate(ctx, payload, settings, x, y, align, size, color) {
    var dateText = toEnglishDateText(payload.dateText || '');
    ctx.fillStyle = color || settings.dateColor;
    ctx.font = getTextFont('700', size || 42);
    ctx.textAlign = align || 'right';
    ctx.textBaseline = 'middle';
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

  function drawImageFrameClassic(ctx, photoImage) {
    var x = 40;
    var y = 145;
    var w = 1000;
    var h = 590;
    var cut = 42;
    var inset = 8;

    ctx.fillStyle = '#ffffff';
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
    fillRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha('#ffffff', 0.96));
    ctx.restore();

    ctx.fillStyle = settings.primaryColor;
    ctx.font = getTextFont('700', 33);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimTextToWidth(ctx, text, stripW - 48), stripX + stripW / 2, stripY + stripH / 2 + 1);
  }

  // 1. CLASSIC RED FORMAT
  function drawClassicFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || '#fff0f0';
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
      align: 'left'
    });

    drawDate(ctx, payload, settings, 980, 82, 'right', 42);
    drawImageFrameClassic(ctx, photoImage);

    if (settings.captionText) {
      ctx.fillStyle = colorWithAlpha('#000000', 0.52);
      ctx.font = getTextFont('500', 24);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 450), 62, 702);
    }

    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || '', {
      x: 540,
      y: 730,
      maxWidth: 960,
      maxLines: 3,
      maxFont: 72,
      minFont: 36,
      customFontSize: settings.isAutoFontSize ? null : settings.titleFontSize,
      lineGap: 1.12,
      height: 220,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    drawBottomLinkStrip(ctx, payload.centerText || settings.bottomText || 'বিস্তারিত কমেন্টে', settings, {
      x: 162,
      y: 968,
      w: 756,
      h: 74
    });
  }

  // 2. FRESH BLUE / EDITORIAL WHITE FORMAT
  function drawSplitFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || '#f3f3f3';
    ctx.fillRect(0, 0, size, size);

    drawImageCover(ctx, photoImage, 0, 0, size, 620);

    var imageFade = ctx.createLinearGradient(0, 450, 0, 620);
    imageFade.addColorStop(0, 'rgba(0,0,0,0)');
    imageFade.addColorStop(1, 'rgba(0,0,0,0.42)');
    ctx.fillStyle = imageFade;
    ctx.fillRect(0, 450, size, 170);

    if (settings.captionText) {
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.font = getTextFont('500', 25);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 500), 38, 595);
    }

    fillRoundedRect(ctx, 36, 32, 280, 84, 16, colorWithAlpha('#ffffff', 0.94));
    drawLogo(ctx, logoImage, payload, settings, {
      x: 50,
      y: 42,
      maxW: 252,
      maxH: 64,
      align: 'center',
      color: settings.primaryColor
    });

    if (settings.sectionLabel) {
      var tagW = 190;
      var tagH = 54;
      var tagX = size - 36 - tagW;
      var tagY = 46;
      fillRoundedRect(ctx, tagX, tagY, tagW, tagH, 27, settings.primaryColor);
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('700', 26);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(settings.sectionLabel, tagX + tagW / 2, tagY + tagH / 2 + 1);
    }

    ctx.fillStyle = settings.primaryColor;
    ctx.fillRect(0, 616, size, 10);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 626, size, size - 626);

    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || '', {
      x: 540,
      y: 775,
      maxWidth: 960,
      maxLines: 3,
      maxFont: 68,
      minFont: 34,
      customFontSize: settings.isAutoFontSize ? null : settings.titleFontSize,
      lineGap: 1.15,
      height: 230,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 990, size, 90);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 990, size, 2);

    drawDate(ctx, payload, settings, 54, 1035, 'left', 32, '#64748b');

    ctx.fillStyle = settings.primaryColor;
    ctx.font = getTextFont('700', 32);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || 'বিস্তারিত কমেন্টে', 360), 540, 1035);

    ctx.fillStyle = '#0f172a';
    ctx.font = getTextFont('700', 30);
    ctx.textAlign = 'right';
    ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 330), 1026, 1035);
  }

  // 3. GREEN MARKET FORMAT
  function drawMarketFormat(ctx, photoImage, logoImage, payload, settings, size) {
    var bg = ctx.createLinearGradient(0, 0, 0, size);
    bg.addColorStop(0, settings.secondaryColor || '#050000');
    bg.addColorStop(0.52, settings.primaryColor || '#e50914');
    bg.addColorStop(1, '#001a55');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    drawSubtleGrid(ctx, 0, 0, size, 420, 'rgba(255,255,255,0.08)');

    drawLogo(ctx, logoImage, payload, settings, {
      x: 34,
      y: 28,
      maxW: 240,
      maxH: 85,
      align: 'left',
      color: settings.logoColor
    });

    if (settings.sectionLabel) {
      fillRoundedRect(ctx, 300, 46, 170, 52, 10, 'rgba(255,255,255,0.18)');
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('700', 26);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(settings.sectionLabel, 385, 73);
    }

    drawDate(ctx, payload, settings, 1046, 73, 'right', 38, '#e2e8f0');

    var cardX = 40;
    var cardY = 135;
    var cardW = 1000;
    var cardH = 500;
    var cardR = 26;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    fillRoundedRect(ctx, cardX, cardY, cardW, cardH, cardR, '#000000');
    ctx.restore();

    ctx.save();
    roundedRectPath(ctx, cardX, cardY, cardW, cardH, cardR);
    ctx.clip();
    drawImageCover(ctx, photoImage, cardX, cardY, cardW, cardH);
    ctx.restore();

    strokeRoundedRect(ctx, cardX, cardY, cardW, cardH, cardR, colorWithAlpha(settings.accentColor, 0.6), 4);

    if (settings.captionText) {
      fillRoundedRect(ctx, cardX + 16, cardY + cardH - 56, 360, 42, 8, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('500', 22);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 330), cardX + 30, cardY + cardH - 35);
    }

    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || '', {
      x: 540,
      y: 745,
      maxWidth: 960,
      maxLines: 3,
      maxFont: 66,
      minFont: 34,
      customFontSize: settings.isAutoFontSize ? null : settings.titleFontSize,
      lineGap: 1.14,
      height: 200,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    var badgeW = 660;
    var badgeH = 74;
    var badgeX = 210;
    var badgeY = 880;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 16;
    fillRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 18, colorWithAlpha(settings.accentColor, 0.95));
    ctx.restore();

    ctx.fillStyle = '#052e16';
    ctx.font = getTextFont('900', 36);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || 'বিস্তারিত কমেন্টে', badgeW - 40), badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = getTextFont('700', 30);
    ctx.textAlign = 'center';
    ctx.fillText(displayUrlText(settings.brandUrl, payload.domain), 540, 1024);
  }

  // 4. DARK MAGAZINE FORMAT
  function drawMagazineFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.primaryColor || '#b40000';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = settings.secondaryColor || '#6c0000';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, size - 14, size - 14);

    drawImageCover(ctx, photoImage, 8, 8, size - 16, 560);

    var overlay = ctx.createLinearGradient(0, 380, 0, 568);
    overlay.addColorStop(0, 'rgba(0,0,0,0)');
    overlay.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = overlay;
    ctx.fillRect(8, 380, size - 16, 188);

    drawLogo(ctx, logoImage, payload, settings, {
      x: 32,
      y: 28,
      maxW: 240,
      maxH: 90,
      align: 'left',
      color: '#ffffff'
    });

    drawDate(ctx, payload, settings, 1040, 68, 'right', 38, '#ffffff');

    if (settings.captionText) {
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('500', 24);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 450), 36, 545);
    }

    fillRoundedRect(ctx, 40, 592, size - 80, 436, 24, '#0f0505');
    strokeRoundedRect(ctx, 40, 592, size - 80, 436, 24, colorWithAlpha(settings.accentColor, 0.4), 2);

    if (settings.sectionLabel) {
      var tagW = 160;
      var tagH = 46;
      var tagX = size / 2 - tagW / 2;
      var tagY = 618;
      fillRoundedRect(ctx, tagX, tagY, tagW, tagH, 10, settings.primaryColor);
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('700', 24);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(settings.sectionLabel, tagX + tagW / 2, tagY + tagH / 2 + 1);
    }

    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || '', {
      x: 540,
      y: 775,
      maxWidth: 900,
      maxLines: 3,
      maxFont: 64,
      minFont: 34,
      customFontSize: settings.isAutoFontSize ? null : settings.titleFontSize,
      lineGap: 1.14,
      height: 210,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    ctx.fillStyle = settings.accentColor || '#ff4d4d';
    ctx.font = getTextFont('900', 36);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || 'বিস্তারিত কমেন্টে', 500), 540, 930);

    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.font = getTextFont('600', 28);
    ctx.textAlign = 'center';
    ctx.fillText(displayUrlText(settings.brandUrl, payload.domain), 540, 988);
  }

  // 5. GOLDEN FRAME SPECIAL EDITION FORMAT
  function drawFrameFormat(ctx, photoImage, logoImage, payload, settings, size) {
    ctx.fillStyle = settings.topBackgroundColor || '#1a0505';
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
      align: 'left',
      color: settings.logoColor
    });

    var imageOverlay = ctx.createLinearGradient(0, 440, 0, 645);
    imageOverlay.addColorStop(0, 'rgba(0,0,0,0)');
    imageOverlay.addColorStop(1, 'rgba(0,0,0,0.52)');
    ctx.fillStyle = imageOverlay;
    ctx.fillRect(24, 440, size - 48, 205);

    if (settings.captionText) {
      ctx.fillStyle = '#ffffff';
      ctx.font = getTextFont('700', 34);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(trimTextToWidth(ctx, settings.captionText, 520), 48, 596);
    }

    var redPanel = ctx.createLinearGradient(0, 632, 0, size);
    redPanel.addColorStop(0, settings.primaryColor);
    redPanel.addColorStop(1, settings.secondaryColor);
    ctx.fillStyle = redPanel;
    ctx.fillRect(0, 632, size, 448);

    drawSubtleGrid(ctx, 0, 632, size, 380, colorWithAlpha(settings.accentColor, 0.06));

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 5;
    fillRoundedRect(ctx, 444, 590, 192, 110, 60, '#ffffff');
    ctx.restore();

    drawLogo(ctx, logoImage, payload, settings, {
      x: 462,
      y: 600,
      maxW: 156,
      maxH: 88,
      align: 'center',
      color: settings.primaryColor,
      fontSize: 34
    });

    ctx.fillStyle = settings.titleColor;
    drawAdaptiveMultiline(ctx, payload.title || '', {
      x: 540,
      y: 710,
      maxWidth: 940,
      maxLines: 4,
      maxFont: 62,
      minFont: 36,
      customFontSize: settings.isAutoFontSize ? null : settings.titleFontSize,
      lineGap: 1.08,
      height: 260,
      fontGetter: function(sz) { return getTitleFont(sz, settings.titleFontFamily); }
    });

    ctx.fillStyle = colorWithAlpha('#000000', 0.35);
    ctx.fillRect(0, 1010, size, 70);

    drawDate(ctx, payload, settings, 56, 1044, 'left', 28, '#ffffff');

    ctx.fillStyle = '#ffffff';
    ctx.font = getTextFont('800', 31);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(trimTextToWidth(ctx, settings.bottomText || 'বিস্তারিত কমেন্টে', 360), 540, 1044);

    ctx.textAlign = 'right';
    ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 340), 1024, 1044);

    if (settings.accentColor) {
      ctx.fillStyle = settings.accentColor;
      ctx.font = getTextFont('900', 58);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'alphabetic';
      var words = String(payload.title || '').trim().split(/\\s+/);
      if (words.length > 2) {
        ctx.fillText(trimTextToWidth(ctx, words[words.length - 1], 270), 1016, 952);
      }
    }
  }

  const FORMAT_RENDERERS = {
    'classic-red': drawClassicFormat,
    'fresh-blue': drawSplitFormat,
    'green-market': drawMarketFormat,
    'dark-magazine': drawMagazineFormat,
    'gold-frame': drawFrameFormat
  };

  // Safe Non-Blocking Image Loader with In-Memory Cache
  const imageCacheRef = Q.useRef(new Map());

  const loadSafeImage = (src) => {
    if (!src || typeof src !== 'string' || !src.trim()) return Promise.resolve(null);
    const cleanSrc = src.trim();
    if (imageCacheRef.current.has(cleanSrc)) {
      return Promise.resolve(imageCacheRef.current.get(cleanSrc));
    }
    return new Promise((resolve) => {
      let done = false;
      const timeout = setTimeout(() => {
        if (!done) {
          done = true;
          resolve(null);
        }
      }, 1500);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!done) {
          done = true;
          clearTimeout(timeout);
          try {
            imageCacheRef.current.set(cleanSrc, img);
          } catch (e) {}
          resolve(img);
        }
      };
      img.onerror = () => {
        // Fallback without crossOrigin for data URIs or local assets
        const fallback = new Image();
        fallback.onload = () => {
          if (!done) {
            done = true;
            clearTimeout(timeout);
            try {
              imageCacheRef.current.set(cleanSrc, fallback);
            } catch (e) {}
            resolve(fallback);
          }
        };
        fallback.onerror = () => {
          if (!done) {
            done = true;
            clearTimeout(timeout);
            resolve(null);
          }
        };
        fallback.src = cleanSrc;
      };
      img.src = cleanSrc;
    });
  };

  // Component State
  const defaultImg = (item && (item.image || item.coverImage || item.coverUrl)) || '';
  const defaultLogo = '';

  const [format, setFormat] = Q.useState('classic-red');
  const [activeTab, setActiveTab] = Q.useState('formats');
  const [title, setTitle] = Q.useState((item && (item.title || item.headline)) || 'সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ঐতিহাসিক প্রতিনিধি সম্মেলন অনুষ্ঠিত');
  const [imageUrl, setImageUrl] = Q.useState((item && (item.image || item.coverImage || item.coverUrl)) || '');
  const [logoUrl, setLogoUrl] = Q.useState('');
  const [dateText, setDateText] = Q.useState((item && item.date) || '৩১ আগস্ট ২০২৬');
  const [siteName, setSiteName] = Q.useState('সমাজতান্ত্রিক ছাত্র ফ্রন্ট');
  const [domain, setDomain] = Q.useState('ssf-mymensingh.org');
  const [bottomText, setBottomText] = Q.useState('বিস্তারিত কমেন্টে');
  const [captionText, setCaptionText] = Q.useState('ছবি: সংগৃহীত');
  const [sectionLabel, setSectionLabel] = Q.useState((item && item.category) || 'সংবাদ');
  const [footerLeftText, setFooterLeftText] = Q.useState('');
  const [footerRightText, setFooterRightText] = Q.useState('');
  const [adText, setAdText] = Q.useState('');
  const [facebookUrl, setFacebookUrl] = Q.useState('fb.com/ssfmymensingh');
  const [youtubeUrl, setYoutubeUrl] = Q.useState('');
  const [instagramUrl, setInstagramUrl] = Q.useState('');
  const [downloadPrefix, setDownloadPrefix] = Q.useState('ssf-photocard');

  // Title Typography State
  const [titleFontFamily, setTitleFontFamily] = Q.useState('SolaimanLipi');
  const [titleFontSize, setTitleFontSize] = Q.useState(32);
  const [isAutoFontSize, setIsAutoFontSize] = Q.useState(false);

  // Colors
  const [primaryColor, setPrimaryColor] = Q.useState('#d60000');
  const [secondaryColor, setSecondaryColor] = Q.useState('#7a0000');
  const [accentColor, setAccentColor] = Q.useState('#ff2d2d');
  const [topBackgroundColor, setTopBackgroundColor] = Q.useState('#fff0f0');
  const [titleColor, setTitleColor] = Q.useState('#ffffff');
  const [dateColor, setDateColor] = Q.useState('#3f3f46');
  const [textColor, setTextColor] = Q.useState('#181818');
  const [logoColor, setLogoColor] = Q.useState('#181818');

  const [isExporting, setIsExporting] = Q.useState(false);
  const [exportNotice, setExportNotice] = Q.useState('');
  const [renderError, setRenderError] = Q.useState('');
  const [zoomLevel, setZoomLevel] = Q.useState('fit');
  const [selectedArticleId, setSelectedArticleId] = Q.useState((item && item.id) || '');
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

  // Live Canvas Rendering Effect (Instant synchronous base + async image paint)
  Q.useEffect(() => {
    let active = true;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const size = 1080;
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const settings = {
      format: format,
      primaryColor: primaryColor || '#d60000',
      secondaryColor: secondaryColor || '#7a0000',
      accentColor: accentColor || '#ff2d2d',
      topBackgroundColor: topBackgroundColor || '#fff0f0',
      titleColor: titleColor || '#ffffff',
      dateColor: dateColor || '#3f3f46',
      textColor: textColor || '#181818',
      logoColor: logoColor || '#181818',
      logoUrl: logoUrl,
      bottomText: bottomText || 'বিস্তারিত কমেন্টে',
      captionText: captionText || '',
      sectionLabel: sectionLabel || 'সংবাদ',
      footerLeftText: footerLeftText || '',
      footerRightText: footerRightText || '',
      adText: adText || '',
      brandUrl: domain || '',
      facebookUrl: facebookUrl || '',
      youtubeUrl: youtubeUrl || '',
      instagramUrl: instagramUrl || '',
      downloadPrefix: downloadPrefix || 'ssf-photocard',
      titleFontFamily: titleFontFamily || 'SolaimanLipi',
      titleFontSize: Number(titleFontSize) || 32,
      isAutoFontSize: Boolean(isAutoFontSize)
    };

    const payload = {
      title: title || 'শিরোনাম',
      imageUrl: imageUrl || '',
      logoUrl: logoUrl || '',
      dateText: dateText || '',
      domain: domain || '',
      siteName: siteName || 'সমাজতান্ত্রিক ছাত্র ফ্রন্ট',
      centerText: bottomText || 'বিস্তারিত কমেন্টে',
      settings: settings
    };

    const renderer = FORMAT_RENDERERS[format] || drawClassicFormat;

    const executeDraw = (pImg, lImg) => {
      try {
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = settings.topBackgroundColor || '#ffffff';
        ctx.fillRect(0, 0, size, size);
        renderer(ctx, pImg, lImg, payload, settings, size);
        setRenderError('');
      } catch (drawErr) {
        console.error('Format render error:', drawErr);
        // Guaranteed Emergency Fallback
        ctx.fillStyle = settings.primaryColor || '#d60000';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('800', 52, settings.titleFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(payload.title, size / 2, size / 2);
      }
    };

    // 1. Draw immediately using cached images or placeholder
    const cachedPhoto = (payload.imageUrl && imageCacheRef.current.get(payload.imageUrl)) || null;
    const cachedLogo = (payload.logoUrl && imageCacheRef.current.get(payload.logoUrl)) || null;
    executeDraw(cachedPhoto, cachedLogo);

    // 2. If assets need loading, fetch asynchronously without blocking UI
    const needPhoto = payload.imageUrl && !cachedPhoto;
    const needLogo = payload.logoUrl && !cachedLogo;

    if (needPhoto || needLogo) {
      setIsRendering(true);
      Promise.all([
        needPhoto ? loadSafeImage(payload.imageUrl) : Promise.resolve(cachedPhoto),
        needLogo ? loadSafeImage(payload.logoUrl) : Promise.resolve(cachedLogo)
      ]).then(([photoImg, logoImg]) => {
        if (!active) return;
        executeDraw(photoImg || cachedPhoto, logoImg || cachedLogo);
        setIsRendering(false);
      }).catch(err => {
        if (!active) return;
        executeDraw(cachedPhoto, cachedLogo);
        setIsRendering(false);
      });
    } else {
      setIsRendering(false);
    }

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
    logoColor,
    titleFontFamily,
    titleFontSize,
    isAutoFontSize
  ]);

  // Export Handlers
  const handleDownload = async (exportFormat = 'png') => {
    setIsExporting(true);
    setExportNotice('ফটোকার্ড প্রস্তুত হচ্ছে (' + exportFormat.toUpperCase() + ')...');
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) throw new Error('ক্যানভাস পাওয়া যায়নি');

      const mimeType = exportFormat === 'jpg' || exportFormat === 'jpeg' ? 'image/jpeg' : exportFormat === 'webp' ? 'image/webp' : 'image/png';
      const quality = exportFormat === 'jpg' ? 0.95 : 1.0;

      canvas.toBlob((blob) => {
        if (!blob) {
          setExportNotice('ডাউনলোড ব্যর্থ হয়েছে');
          setIsExporting(false);
          return;
        }
        const cleanedTitle = String(title || 'photocard')
          .toLowerCase()
          .replace(/[^\\w\\u0980-\\u09FF]+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 40);
        const fileName = (downloadPrefix || 'ssf-photocard') + '-' + (cleanedTitle || 'card') + '.' + exportFormat;

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExportNotice('সফলভাবে ডাউনলোড হয়েছে (' + exportFormat.toUpperCase() + ')');
        setIsExporting(false);
        setTimeout(() => setExportNotice(''), 4000);
      }, mimeType, quality);
    } catch (err) {
      console.error(err);
      setExportNotice('ত্রুটি: ' + (err.message || 'ডাউনলোড করা যায়নি'));
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    try {
      setExportNotice('ক্লিপবোর্ডে কপি হচ্ছে...');
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setExportNotice('ক্লিপবোর্ডে কপি সম্পন্ন হয়েছে!');
          setTimeout(() => setExportNotice(''), 3000);
        } catch (clipErr) {
          setExportNotice('ক্লিপবোর্ড অনুমতি নেই');
          setTimeout(() => setExportNotice(''), 3000);
        }
      }, 'image/png');
    } catch (e) {
      setExportNotice('কপি ব্যর্থ হয়েছে');
    }
  };

  const allArticles = db ? [...(db.news || []), ...(db.blogs || [])] : [];

  return i.jsxs('div', {
    className: 'w-full h-full flex flex-col bg-slate-900 text-slate-100 min-h-0 overflow-hidden overscroll-contain',
    children: [
      // Top Navigation / Header Bar
      i.jsxs('div', {
        className: 'bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg',
        children: [
          i.jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              i.jsx('div', {
                className: 'w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-900/40 font-bold text-lg',
                children: 'B2'
              }),
              i.jsxs('div', {
                children: [
                  i.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      i.jsx('h2', { className: 'text-base sm:text-lg font-bold text-white tracking-wide', children: 'Borbila PhotoCard Pro V2' }),
                      i.jsx('span', { className: 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase', children: 'Pro Engine' })
                    ]
                  }),
                  i.jsx('p', { className: 'text-xs text-slate-400 hidden sm:block', children: '৫টি প্রফেশনাল লেআউট, লাইভ ক্যানভাস প্রিভিউ এবং ফুল রেজোলিউশন এক্সপোর্ট' })
                ]
              })
            ]
          }),
          i.jsxs('div', {
            className: 'flex items-center gap-2',
            children: [
              i.jsxs('button', {
                onClick: () => handleDownload('png'),
                disabled: isExporting,
                className: 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50',
                children: [
                  i.jsx('svg', { className: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', children: i.jsx('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' }) }),
                  i.jsx('span', { children: 'PNG ডাউনলোড (১০৮০p)' })
                ]
              }),
              i.jsxs('button', {
                onClick: handleCopyToClipboard,
                className: 'px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer hidden md:flex items-center gap-1.5',
                children: [
                  i.jsx('span', { children: 'কপি' })
                ]
              }),
              onClose && i.jsx('button', {
                onClick: onClose,
                className: 'p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer ml-1',
                children: '✕'
              })
            ]
          })
        ]
      }),

      // Main Studio Layout (Sidebar + Live Preview Stage)
      i.jsxs('div', {
        className: 'flex-grow flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden overscroll-contain bg-slate-900',
        children: [
          // Left Sidebar: Form Controls
          i.jsxs('div', {
            className: 'w-full lg:w-[460px] xl:w-[500px] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-900 shrink-0 min-h-0',
            children: [
              // Tab Header
              i.jsxs('div', {
                className: 'flex items-center border-b border-slate-800 bg-slate-950 px-2 pt-2 gap-1 shrink-0 overflow-x-auto',
                children: [
                  i.jsx('button', {
                    onClick: () => setActiveTab('formats'),
                    className: 'px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ' + (activeTab === 'formats' ? 'text-rose-400 border-rose-500 bg-slate-900' : 'text-slate-400 border-transparent hover:text-slate-200'),
                    children: 'লেআউট ফরম্যাট (৫)'
                  }),
                  i.jsx('button', {
                    onClick: () => setActiveTab('content'),
                    className: 'px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ' + (activeTab === 'content' ? 'text-rose-400 border-rose-500 bg-slate-900' : 'text-slate-400 border-transparent hover:text-slate-200'),
                    children: 'কন্টেন্ট ও ছবি'
                  }),
                  i.jsx('button', {
                    onClick: () => setActiveTab('colors'),
                    className: 'px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ' + (activeTab === 'colors' ? 'text-rose-400 border-rose-500 bg-slate-900' : 'text-slate-400 border-transparent hover:text-slate-200'),
                    children: 'রং ও স্টাইলিং'
                  }),
                  i.jsx('button', {
                    onClick: () => setActiveTab('branding'),
                    className: 'px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ' + (activeTab === 'branding' ? 'text-rose-400 border-rose-500 bg-slate-900' : 'text-slate-400 border-transparent hover:text-slate-200'),
                    children: 'ব্র্যান্ড ও ফুটার'
                  })
                ]
              }),

              // Tab Scrollable Body
              i.jsxs('div', {
                className: 'flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar overscroll-contain',
                children: [
                  // Tab 1: Formats & Presets
                  activeTab === 'formats' && i.jsxs('div', {
                    className: 'space-y-3',
                    children: [
                      i.jsxs('div', {
                        className: 'bg-slate-950 p-3 rounded-xl border border-slate-800',
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1.5', children: 'ডাটাবেজ থেকে সংবাদ নির্বাচন করুন (ঐচ্ছিক)' }),
                          i.jsxs('select', {
                            value: selectedArticleId,
                            onChange: handleSelectArticle,
                            className: 'w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium',
                            children: [
                              i.jsx('option', { value: '', children: '-- সাম্প্রতিক সংবাদ নির্বাচন করুন --' }),
                              allArticles.map(a => i.jsx('option', { value: a.id, children: (a.title || a.headline || 'Untitled').slice(0, 60) }, a.id))
                            ]
                          })
                        ]
                      }),
                      i.jsx('div', { className: 'text-xs font-bold text-slate-300 uppercase tracking-wider mt-2', children: 'Borbila Pro ৫টি অফিসিয়াল ফরম্যাট' }),
                      i.jsx('div', {
                        className: 'grid grid-cols-1 gap-2.5',
                        children: Object.values(PRESETS).map(p => i.jsxs('div', {
                          key: p.id,
                          onClick: () => applyPreset(p.id),
                          className: 'p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ' + (format === p.id ? 'bg-rose-950/50 border-rose-500 ring-1 ring-rose-500 shadow-md' : 'bg-slate-950 border-slate-800 hover:border-slate-700'),
                          children: [
                            i.jsxs('div', {
                              className: 'space-y-1',
                              children: [
                                i.jsxs('div', {
                                  className: 'flex items-center gap-2',
                                  children: [
                                    i.jsx('span', { className: 'text-sm font-bold text-white', children: p.label }),
                                    p.badge && i.jsx('span', { className: 'text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30', children: p.badge })
                                  ]
                                }),
                                i.jsx('p', { className: 'text-xs text-slate-400', children: p.description })
                              ]
                            }),
                            i.jsx('div', {
                              className: 'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ' + (format === p.id ? 'border-rose-500 bg-rose-600 text-white' : 'border-slate-700 bg-slate-900'),
                              children: format === p.id && '✓'
                            })
                          ]
                        }, p.id))
                      })
                    ]
                  }),

                  // Tab 2: Content & Images
                  activeTab === 'content' && i.jsxs('div', {
                    className: 'space-y-3.5',
                    children: [
                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'শিরোনাম (হেডলাইন)' }),
                          i.jsx('textarea', {
                            rows: 3,
                            value: title,
                            onChange: (e) => setTitle(e.target.value),
                            placeholder: 'সংবাদের মূল শিরোনাম লিখুন...',
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                          })
                        ]
                      }),

                      // Typography Controls (Bangla Font Family & Size)
                      i.jsxs('div', {
                        className: 'bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3',
                        children: [
                          i.jsx('div', { className: 'text-xs font-bold text-slate-200 flex items-center justify-between', children: [
                            i.jsx('span', { children: 'টাইটেল ফন্ট ও টাইপোগ্রাফি' }),
                            i.jsx('span', { className: 'text-[10px] text-rose-400 font-mono font-normal', children: '১৩টি বাংলা ফন্ট' })
                          ]}),
                          i.jsxs('div', {
                            children: [
                              i.jsx('label', { className: 'block text-[11px] font-semibold text-slate-300 mb-1', children: 'বাংলা ফন্ট ফ্যামিলি' }),
                              i.jsx('select', {
                                value: titleFontFamily,
                                onChange: (e) => setTitleFontFamily(e.target.value),
                                className: 'w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium',
                                children: BANGLA_FONTS.map(f => i.jsx('option', { value: f.id, children: f.label }, f.id))
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'space-y-1.5',
                            children: [
                              i.jsxs('div', {
                                className: 'flex items-center justify-between',
                                children: [
                                  i.jsx('label', { className: 'text-[11px] font-semibold text-slate-300', children: 'ফন্ট সাইজ (পিটি)' }),
                                  i.jsxs('div', {
                                    className: 'flex items-center gap-2',
                                    children: [
                                      i.jsxs('label', {
                                        className: 'flex items-center gap-1 text-[11px] text-slate-300 cursor-pointer',
                                        children: [
                                          i.jsx('input', {
                                            type: 'checkbox',
                                            checked: isAutoFontSize,
                                            onChange: (e) => setIsAutoFontSize(e.target.checked),
                                            className: 'rounded text-rose-600 focus:ring-0'
                                          }),
                                          i.jsx('span', { children: 'অটো সাইজ' })
                                        ]
                                      }),
                                      !isAutoFontSize && i.jsxs('span', { className: 'text-xs font-bold text-rose-400 font-mono px-1.5 py-0.5 bg-slate-900 rounded', children: [titleFontSize, 'px'] })
                                    ]
                                  })
                                ]
                              }),
                              !isAutoFontSize && i.jsx('input', {
                                type: 'range',
                                min: '20',
                                max: '56',
                                step: '1',
                                value: titleFontSize,
                                onChange: (e) => setTitleFontSize(Number(e.target.value)),
                                className: 'w-full accent-rose-600 cursor-pointer'
                              })
                            ]
                          })
                        ]
                      }),

                      // Image Upload & URL
                      i.jsxs('div', {
                        className: 'bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2',
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200', children: 'সংবাদ ছবি (Photo)' }),
                          i.jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                              i.jsx('input', {
                                type: 'text',
                                value: imageUrl,
                                onChange: (e) => setImageUrl(e.target.value),
                                placeholder: 'ছবির লিংক (URL) পেস্ট করুন...',
                                className: 'flex-grow bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              }),
                              i.jsxs('button', {
                                type: 'button',
                                onClick: () => fileInputRef.current && fileInputRef.current.click(),
                                className: 'px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer border border-slate-700',
                                children: [
                                  i.jsx('span', { children: 'আপলোড' })
                                ]
                              }),
                              i.jsx('input', {
                                type: 'file',
                                ref: fileInputRef,
                                onChange: handleCustomPhotoUpload,
                                accept: 'image/*',
                                className: 'hidden'
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'flex items-center gap-1.5 pt-1 overflow-x-auto',
                            children: [
                              i.jsx('span', { className: 'text-[10px] text-slate-400 shrink-0', children: 'ডেমো ছবি:' }),
                              [
                                { label: 'ছাত্র ফ্রন্ট', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
                                { label: 'সমাবেশ', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800' },
                                { label: 'শিক্ষা', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800' }
                              ].map((s, idx) => i.jsx('button', {
                                key: idx,
                                type: 'button',
                                onClick: () => setImageUrl(s.url),
                                className: 'px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 shrink-0 transition-all border border-slate-700',
                                children: s.label
                              }))
                            ]
                          })
                        ]
                      }),

                      // Custom Logo Upload
                      i.jsxs('div', {
                        className: 'bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2',
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200', children: 'কাস্টম লোগো (Logo URL / Upload)' }),
                          i.jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                              i.jsx('input', {
                                type: 'text',
                                value: logoUrl,
                                onChange: (e) => setLogoUrl(e.target.value),
                                placeholder: 'লোগোর URL (ফাঁকা রাখলে ডিফল্ট লোগো প্রদর্শিত হবে)...',
                                className: 'flex-grow bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              }),
                              i.jsxs('button', {
                                type: 'button',
                                onClick: () => logoInputRef.current && logoInputRef.current.click(),
                                className: 'px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer border border-slate-700',
                                children: [
                                  i.jsx('span', { children: 'আপলোড' })
                                ]
                              }),
                              i.jsx('input', {
                                type: 'file',
                                ref: logoInputRef,
                                onChange: handleCustomLogoUpload,
                                accept: 'image/*',
                                className: 'hidden'
                              })
                            ]
                          })
                        ]
                      }),

                      // Secondary Fields
                      i.jsxs('div', {
                        className: 'grid grid-cols-2 gap-3',
                        children: [
                          i.jsxs('div', {
                            children: [
                              i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'তারিখ' }),
                              i.jsx('input', {
                                type: 'text',
                                value: dateText,
                                onChange: (e) => setDateText(e.target.value),
                                className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            children: [
                              i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'ক্যাটাগরি / ট্যাগ' }),
                              i.jsx('input', {
                                type: 'text',
                                value: sectionLabel,
                                onChange: (e) => setSectionLabel(e.target.value),
                                className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              })
                            ]
                          })
                        ]
                      }),

                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'ছবির ক্যাপশন / ক্রেডিট' }),
                          i.jsx('input', {
                            type: 'text',
                            value: captionText,
                            onChange: (e) => setCaptionText(e.target.value),
                            placeholder: 'যেমন: ছবি: সংগৃহীত',
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 3: Colors & Styling
                  activeTab === 'colors' && i.jsxs('div', {
                    className: 'space-y-3.5',
                    children: [
                      i.jsx('div', { className: 'text-xs font-bold text-slate-200 uppercase tracking-wider', children: 'রং প্যালেট কাস্টমাইজেশন' }),
                      i.jsxs('div', {
                        className: 'grid grid-cols-2 gap-3',
                        children: [
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'প্রাথমিক রং (Primary)' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: primaryColor,
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: primaryColor,
                                    onChange: (e) => setPrimaryColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'দ্বিতীয় রং (Secondary)' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: secondaryColor,
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: secondaryColor,
                                    onChange: (e) => setSecondaryColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'অ্যাকসেন্ট রং (Accent)' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: accentColor,
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: accentColor,
                                    onChange: (e) => setAccentColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'হেডার ব্যাকগ্রাউন্ড' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: topBackgroundColor,
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: topBackgroundColor,
                                    onChange: (e) => setTopBackgroundColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs('div', {
                        className: 'grid grid-cols-2 gap-3',
                        children: [
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'শিরোনাম টেক্সট রং' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: titleColor,
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: titleColor,
                                    onChange: (e) => setTitleColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            className: 'bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1',
                            children: [
                              i.jsx('label', { className: 'block text-xs font-semibold text-slate-300', children: 'তারিখ টেক্সট রং' }),
                              i.jsxs('div', {
                                className: 'flex items-center gap-2',
                                children: [
                                  i.jsx('input', {
                                    type: 'color',
                                    value: dateColor,
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: 'w-8 h-8 rounded border-0 cursor-pointer bg-transparent'
                                  }),
                                  i.jsx('input', {
                                    type: 'text',
                                    value: dateColor,
                                    onChange: (e) => setDateColor(e.target.value),
                                    className: 'flex-grow bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono'
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Tab 4: Branding & Footers
                  activeTab === 'branding' && i.jsxs('div', {
                    className: 'space-y-3.5',
                    children: [
                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'সংগঠনের নাম' }),
                          i.jsx('input', {
                            type: 'text',
                            value: siteName,
                            onChange: (e) => setSiteName(e.target.value),
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                          })
                        ]
                      }),
                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'ওয়েবসাইট ডোমেন' }),
                          i.jsx('input', {
                            type: 'text',
                            value: domain,
                            onChange: (e) => setDomain(e.target.value),
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                          })
                        ]
                      }),
                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'বটম কল-টু-অ্যাকশন টেক্সট' }),
                          i.jsx('input', {
                            type: 'text',
                            value: bottomText,
                            onChange: (e) => setBottomText(e.target.value),
                            placeholder: 'যেমন: বিস্তারিত কমেন্টে',
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                          })
                        ]
                      }),
                      i.jsxs('div', {
                        className: 'grid grid-cols-2 gap-3',
                        children: [
                          i.jsxs('div', {
                            children: [
                              i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'ফেসবুক পেজ' }),
                              i.jsx('input', {
                                type: 'text',
                                value: facebookUrl,
                                onChange: (e) => setFacebookUrl(e.target.value),
                                placeholder: 'fb.com/...',
                                className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              })
                            ]
                          }),
                          i.jsxs('div', {
                            children: [
                              i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'ইউটিউব / ইনস্টাগ্রাম' }),
                              i.jsx('input', {
                                type: 'text',
                                value: youtubeUrl,
                                onChange: (e) => setYoutubeUrl(e.target.value),
                                placeholder: 'yt.com/...',
                                className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs('div', {
                        children: [
                          i.jsx('label', { className: 'block text-xs font-bold text-slate-200 mb-1', children: 'অ্যাডভার্টাইজ / ফুটার ব্যানার টেক্সট' }),
                          i.jsx('input', {
                            type: 'text',
                            value: adText,
                            onChange: (e) => setAdText(e.target.value),
                            placeholder: 'বিজ্ঞাপন বা স্পেশাল মেসেজ...',
                            className: 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500 font-medium'
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
          i.jsxs('div', {
            className: 'flex-grow flex flex-col items-center justify-between p-3 sm:p-6 bg-slate-950 overflow-y-auto min-h-0 relative overscroll-contain',
            children: [
              // Notice / Status Bar
              (exportNotice || renderError) && i.jsx('div', {
                className: 'w-full max-w-xl mb-3 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg text-center transition-all ' + (renderError ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'),
                children: renderError || exportNotice
              }),

              // Canvas Preview Centering Container
              i.jsx('div', {
                className: 'w-full flex-grow flex items-center justify-center py-2 min-h-0',
                children: i.jsxs('div', {
                  className: 'relative shadow-2xl rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 flex items-center justify-center transition-all duration-200 ' + (zoomLevel === 'fit' ? 'max-w-[480px] w-full aspect-square' : zoomLevel === '50' ? 'w-[540px] aspect-square' : zoomLevel === '75' ? 'w-[810px] aspect-square' : 'w-[1080px] aspect-square'),
                  style: { aspectRatio: '1 / 1' },
                  children: [
                    i.jsx('canvas', {
                      ref: previewCanvasRef,
                      width: 1080,
                      height: 1080,
                      className: 'w-full h-full object-contain block'
                    }),
                    isRendering && i.jsxs('div', {
                      className: 'absolute top-3 right-3 px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-full text-white text-[11px] font-bold flex items-center gap-2 border border-white/20 shadow-lg pointer-events-none',
                      children: [
                        i.jsx('span', { className: 'w-2 h-2 rounded-full bg-rose-500 animate-ping' }),
                        i.jsx('span', { children: 'আপডেট হচ্ছে...' })
                      ]
                    })
                  ]
                })
              }),

              // Bottom Canvas Toolbar (Zoom + Multi-Format Export + Prominent PNG Download Button)
              i.jsxs('div', {
                className: 'w-full max-w-2xl mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0',
                children: [
                  i.jsxs('div', {
                    className: 'flex flex-wrap items-center gap-2',
                    children: [
                      i.jsx('span', { className: 'text-xs font-semibold text-slate-400', children: 'জুম:' }),
                      i.jsx('button', {
                        onClick: () => setZoomLevel('fit'),
                        className: 'px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ' + (zoomLevel === 'fit' ? 'bg-rose-600 text-white font-bold shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'),
                        children: 'Fit'
                      }),
                      i.jsx('button', {
                        onClick: () => setZoomLevel('50'),
                        className: 'px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ' + (zoomLevel === '50' ? 'bg-rose-600 text-white font-bold shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'),
                        children: '50%'
                      }),
                      i.jsx('button', {
                        onClick: () => setZoomLevel('75'),
                        className: 'px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ' + (zoomLevel === '75' ? 'bg-rose-600 text-white font-bold shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'),
                        children: '75%'
                      }),
                      i.jsx('button', {
                        onClick: () => setZoomLevel('100'),
                        className: 'px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ' + (zoomLevel === '100' ? 'bg-rose-600 text-white font-bold shadow' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'),
                        children: '100%'
                      })
                    ]
                  }),
                  i.jsxs('div', {
                    className: 'flex flex-wrap items-center gap-2',
                    children: [
                      // Prominent PNG Download Button
                      i.jsxs('button', {
                        onClick: () => handleDownload('png'),
                        disabled: isExporting,
                        className: 'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50',
                        children: [
                          i.jsx('svg', { className: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', children: i.jsx('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' }) }),
                          i.jsx('span', { children: 'PNG ডাউনলোড করুন' })
                        ]
                      }),
                      i.jsx('button', {
                        onClick: () => handleDownload('jpg'),
                        disabled: isExporting,
                        className: 'px-3 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer disabled:opacity-50 transition-all',
                        children: 'JPG'
                      }),
                      i.jsx('button', {
                        onClick: () => handleDownload('webp'),
                        disabled: isExporting,
                        className: 'px-3 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer disabled:opacity-50 transition-all',
                        children: 'WEBP'
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

fs.writeFileSync('borbila_v2_component.js', code, 'utf8');
console.log('Successfully written updated borbila_v2_component.js! Length:', code.length);
