(function () {
    var DEFAULT_SETTINGS = {
        format: 'classic-red',
        primaryColor: '#e20d12',
        secondaryColor: '#be0006',
        accentColor: '#ff6f78',
        topBackgroundColor: '#f7ecef',
        titleColor: '#ffffff',
        dateColor: '#5a5a5a',
        textColor: '#181818',
        logoColor: '#181818',
        logoUrl: '',
        bottomText: 'বিস্তারিত কমেন্টে',
        captionText: 'ছবি: সংগৃহীত',
        sectionLabel: 'News',
        footerLeftText: '',
        footerRightText: '',
        adText: '',
        brandUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        instagramUrl: '',
        frontButtonText: 'Download PhotoCard',
        downloadPrefix: 'photocard'
    };

    var COLOR_OPTION_MAP = {
        primaryColor: 'primary_color',
        secondaryColor: 'secondary_color',
        accentColor: 'accent_color',
        topBackgroundColor: 'top_background_color',
        titleColor: 'title_color',
        dateColor: 'date_color',
        textColor: 'text_color',
        logoColor: 'logo_color'
    };

    function normalizeHexColor(value, fallback) {
        var color = String(value || '').trim();
        var shortHex = /^#([0-9a-f]{3})$/i.exec(color);

        if (shortHex) {
            color = '#' + shortHex[1].split('').map(function (char) {
                return char + char;
            }).join('');
        }

        if (/^#[0-9a-f]{6}$/i.test(color)) {
            return color;
        }

        return fallback;
    }

    function normalizeSettings(settings) {
        settings = settings || {};

        return {
            format: settings.format || DEFAULT_SETTINGS.format,
            primaryColor: normalizeHexColor(settings.primaryColor, DEFAULT_SETTINGS.primaryColor),
            secondaryColor: normalizeHexColor(settings.secondaryColor, DEFAULT_SETTINGS.secondaryColor),
            accentColor: normalizeHexColor(settings.accentColor, DEFAULT_SETTINGS.accentColor),
            topBackgroundColor: normalizeHexColor(settings.topBackgroundColor, DEFAULT_SETTINGS.topBackgroundColor),
            titleColor: normalizeHexColor(settings.titleColor, DEFAULT_SETTINGS.titleColor),
            dateColor: normalizeHexColor(settings.dateColor, DEFAULT_SETTINGS.dateColor),
            textColor: normalizeHexColor(settings.textColor, DEFAULT_SETTINGS.textColor),
            logoColor: normalizeHexColor(settings.logoColor, DEFAULT_SETTINGS.logoColor),
            logoUrl: String(settings.logoUrl || ''),
            bottomText: String(settings.bottomText || DEFAULT_SETTINGS.bottomText),
            captionText: String(settings.captionText || DEFAULT_SETTINGS.captionText),
            sectionLabel: String(settings.sectionLabel || DEFAULT_SETTINGS.sectionLabel),
            footerLeftText: String(settings.footerLeftText || DEFAULT_SETTINGS.footerLeftText),
            footerRightText: String(settings.footerRightText || DEFAULT_SETTINGS.footerRightText),
            adText: String(settings.adText || DEFAULT_SETTINGS.adText),
            brandUrl: String(settings.brandUrl || DEFAULT_SETTINGS.brandUrl),
            facebookUrl: String(settings.facebookUrl || DEFAULT_SETTINGS.facebookUrl),
            youtubeUrl: String(settings.youtubeUrl || DEFAULT_SETTINGS.youtubeUrl),
            instagramUrl: String(settings.instagramUrl || DEFAULT_SETTINGS.instagramUrl),
            frontButtonText: String(settings.frontButtonText || DEFAULT_SETTINGS.frontButtonText),
            downloadPrefix: String(settings.downloadPrefix || DEFAULT_SETTINGS.downloadPrefix)
        };
    }

    function getPluginSettings() {
        return normalizeSettings((window.borbilaPhotoCard && window.borbilaPhotoCard.settings) || {});
    }

    function hexToRgb(color) {
        var normalized = normalizeHexColor(color, '#000000').replace('#', '');
        return {
            r: parseInt(normalized.slice(0, 2), 16),
            g: parseInt(normalized.slice(2, 4), 16),
            b: parseInt(normalized.slice(4, 6), 16)
        };
    }

    function colorWithAlpha(color, alpha) {
        var rgb = hexToRgb(color);
        return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + alpha + ')';
    }

    function displayUrlText(url, fallback) {
        var raw = String(url || '').trim();
        if (!raw) {
            return String(fallback || '').trim();
        }

        try {
            var parsed = new URL(raw, window.location.origin);
            var host = parsed.hostname.replace(/^www\./i, '');
            var path = parsed.pathname.replace(/\/$/, '');
            return host + (path && path !== '/' ? path : '');
        } catch (error) {
            return raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
        }
    }

    function socialHandleText(url, fallback) {
        var raw = String(url || '').trim();
        if (!raw) {
            return String(fallback || '').trim();
        }

        try {
            var parsed = new URL(raw, window.location.origin);
            var parts = parsed.pathname.split('/').filter(Boolean);
            return parts.length ? parts[parts.length - 1] : parsed.hostname.replace(/^www\./i, '');
        } catch (error) {
            return raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
        }
    }

    function loadImage(src) {
        return new Promise(function (resolve, reject) {
            if (!src) {
                reject(new Error('Image source is empty'));
                return;
            }

            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                var fallback = new Image();
                fallback.onload = function () {
                    resolve(fallback);
                };
                fallback.onerror = function () {
                    reject(new Error('Failed to load image: ' + src));
                };
                fallback.src = src;
            };
            img.src = src;
        });
    }

    function drawImageCover(ctx, img, x, y, width, height) {
        if (!img || !img.width || !img.height) {
            return;
        }

        var boxRatio = width / height;
        var imageRatio = img.width / img.height;
        var drawWidth;
        var drawHeight;
        var drawX;
        var drawY;

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

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    function getTextFont(weight, size) {
        return weight + ' ' + size + 'px "SolaimanLipi","Noto Sans Bengali","Hind Siliguri","Arial",sans-serif';
    }

    function getTitleFont(size) {
        return '700 ' + size + 'px "SolaimanLipi","Noto Sans Bengali","Hind Siliguri",Arial,sans-serif';
    }

    function getTitleFontMedium(size) {
        return '500 ' + size + 'px Arial,"Noto Sans Bengali","SolaimanLipi","Hind Siliguri",sans-serif';
    }

    function trimTextToWidth(ctx, text, maxWidth) {
        var value = String(text || '').trim();
        if (!value) {
            return '';
        }

        if (ctx.measureText(value).width <= maxWidth) {
            return value;
        }

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

    function wrapText(ctx, text, maxWidth) {
        var words = String(text || '').trim().split(/\s+/);
        if (!words.length || !words[0]) {
            return [];
        }

        var lines = [];
        var currentLine = '';

        for (var i = 0; i < words.length; i++) {
            var testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
            if (ctx.measureText(testLine).width <= maxWidth || !currentLine) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    function drawAdaptiveMultiline(ctx, text, options) {
        var maxWidth = options.maxWidth;
        var maxLines = options.maxLines || 3;
        var maxFont = options.maxFont || 80;
        var minFont = options.minFont || 38;
        var lineGap = options.lineGap || 1.12;
        var fontGetter = options.fontGetter || function (size) {
            return getTextFont('700', size);
        };
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
            if (!lines.length) {
                lines = testLines;
            }
        }

        ctx.font = fontGetter(bestSize);
        if (lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
            lines[maxLines - 1] = trimTextToWidth(ctx, lines[maxLines - 1], maxWidth - 10);
        }

        if (!lines.length) {
            return;
        }

        var lineHeight = Math.round(bestSize * lineGap);
        var blockHeight = lines.length * lineHeight;
        var startY = y + Math.max(0, Math.floor((boxHeight - blockHeight) / 2));

        ctx.textAlign = options.align || 'center';
        ctx.textBaseline = 'top';
        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, startY + i * lineHeight);
        }
    }

    function toEnglishDateText(text) {
        var map = {
            '০': '0',
            '১': '1',
            '২': '2',
            '৩': '3',
            '৪': '4',
            '৫': '5',
            '৬': '6',
            '৭': '7',
            '৮': '8',
            '৯': '9'
        };

        return String(text || '').replace(/[০-৯]/g, function (digit) {
            return map[digit] || digit;
        });
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

    function clipRoundedImage(ctx, img, x, y, w, h, r) {
        ctx.save();
        roundedRectPath(ctx, x, y, w, h, r);
        ctx.clip();
        drawImageCover(ctx, img, x, y, w, h);
        ctx.restore();
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

    function drawLogo(ctx, logoImage, payload, settings, options) {
        var x = options.x;
        var y = options.y;
        var maxW = options.maxW || 330;
        var maxH = options.maxH || 110;
        var align = options.align || 'left';

        if (logoImage) {
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

            ctx.drawImage(logoImage, drawX, y + (maxH - h) / 2, w, h);
            return;
        }

        var siteText = payload.siteName || payload.domain || 'Borbila';
        var textX = x;
        if (align === 'center') {
            textX = x + maxW / 2;
        } else if (align === 'right') {
            textX = x + maxW;
        }

        ctx.fillStyle = options.color || settings.logoColor;
        ctx.font = getTextFont('800', options.fontSize || 48);
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, siteText, maxW), textX, y + maxH / 2);
    }

    function drawDate(ctx, payload, settings, x, y, align, size, color) {
        var dateText = toEnglishDateText(payload.dateText || '');
        ctx.fillStyle = color || settings.dateColor;
        ctx.font = getTextFont('700', size || 42);
        ctx.textAlign = align || 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(dateText, x, y);
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
        gloss.addColorStop(0, 'rgba(255,255,255,0.58)');
        gloss.addColorStop(0.28, 'rgba(255,255,255,0.22)');
        gloss.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gloss;
        ctx.fillRect(stripX, stripY, stripW, stripH * 0.62);
        ctx.restore();

        strokeRoundedRect(ctx, stripX, stripY, stripW, stripH, radius, colorWithAlpha(settings.accentColor, 0.72), 1.2);

        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('700', options.fontSize || 30);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
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
        var left = settings.footerLeftText || payload.siteName || '';
        var right = settings.footerRightText || displayUrlText(settings.brandUrl, payload.domain);

        ctx.fillStyle = options.color || settings.textColor;
        ctx.font = getTextFont('600', options.size || 28);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, left + (left && payload.dateText ? ' | ' : '') + toEnglishDateText(payload.dateText || ''), 450), options.leftX || 54, y);

        ctx.textAlign = 'right';
        ctx.fillText(trimTextToWidth(ctx, right, 420), options.rightX || 1026, y);
    }

    function drawSocialStrip(ctx, payload, settings, x, y, w, h) {
        var site = displayUrlText(settings.brandUrl, payload.domain);
        var facebook = socialHandleText(settings.facebookUrl, '');
        var youtube = socialHandleText(settings.youtubeUrl, '');
        var instagram = socialHandleText(settings.instagramUrl, '');
        var items = [site];

        if (facebook) {
            items.push('f  ' + facebook);
        }
        if (youtube) {
            items.push('▶  ' + youtube);
        }
        if (instagram) {
            items.push('ig  ' + instagram);
        }

        var gradient = ctx.createLinearGradient(x, y, x + w, y);
        gradient.addColorStop(0, settings.secondaryColor);
        gradient.addColorStop(0.55, settings.primaryColor);
        gradient.addColorStop(1, settings.secondaryColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('700', 30);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, items.join('   |   '), w - 80), x + w / 2, y + h / 2);
    }

    function drawAdBar(ctx, settings, x, y, w, h) {
        var adText = settings.adText || '';
        if (!adText) {
            return;
        }

        var gradient = ctx.createLinearGradient(x, y, x + w, y);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, colorWithAlpha(settings.accentColor, 0.18));
        gradient.addColorStop(1, '#ffffff');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = settings.primaryColor;
        ctx.font = getTextFont('800', 34);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, adText, w - 80), x + w / 2, y + h / 2);
    }

    function drawClassicFormat(ctx, photoImage, logoImage, payload, settings, size) {
        ctx.fillStyle = settings.topBackgroundColor;
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
            ctx.fillText(trimTextToWidth(ctx, settings.captionText, 640), 66, 704);
        }

        ctx.fillStyle = settings.titleColor;
        drawAdaptiveMultiline(ctx, payload.title || '', {
            x: 540,
            y: 760,
            maxWidth: 900,
            maxLines: 3,
            maxFont: 54,
            minFont: 30,
            lineGap: 1.12,
            height: 190,
            fontGetter: getTitleFontMedium
        });

        drawBottomLinkStrip(ctx, payload.centerText, settings);
    }

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
            ctx.fillText(trimTextToWidth(ctx, settings.captionText, 720), 52, 575);
        }

        ctx.fillStyle = '#f3f3f3';
        ctx.beginPath();
        ctx.moveTo(0, 620);
        ctx.lineTo(455, 620);
        ctx.quadraticCurveTo(540, 535, 625, 620);
        ctx.lineTo(size, 620);
        ctx.lineTo(size, 1000);
        ctx.lineTo(0, 1000);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = settings.accentColor;
        ctx.beginPath();
        ctx.arc(540, 620, 64, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f3f3f3';
        ctx.lineWidth = 18;
        ctx.stroke();

        drawLogo(ctx, logoImage, payload, settings, {
            x: 42,
            y: 32,
            maxW: 300,
            maxH: 70,
            align: 'left',
            color: '#ffffff'
        });

        ctx.fillStyle = settings.titleColor;
        drawAdaptiveMultiline(ctx, payload.title || '', {
            x: 540,
            y: 710,
            maxWidth: 840,
            maxLines: 3,
            maxFont: 58,
            minFont: 34,
            lineGap: 1.15,
            height: 190,
            fontGetter: getTitleFont
        });

        ctx.fillStyle = '#e4e4e4';
        ctx.fillRect(0, 1000, size, 80);
        drawFooterMeta(ctx, payload, settings, {
            y: 1040,
            color: settings.dateColor,
            size: 28,
            leftX: 48,
            rightX: 1030
        });
    }

    function drawMarketFormat(ctx, photoImage, logoImage, payload, settings, size) {
        var bg = ctx.createLinearGradient(0, 0, 0, size);
        bg.addColorStop(0, settings.secondaryColor);
        bg.addColorStop(0.52, settings.primaryColor);
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
            fillRoundedRect(ctx, 825, 36, 210, 54, 12, colorWithAlpha(settings.primaryColor, 0.82));
            ctx.fillStyle = '#ffffff';
            ctx.font = getTextFont('800', 28);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 170), 930, 64);
        }

        ctx.fillStyle = settings.titleColor;
        drawAdaptiveMultiline(ctx, payload.title || '', {
            x: 540,
            y: 112,
            maxWidth: 990,
            maxLines: 3,
            maxFont: 70,
            minFont: 42,
            lineGap: 1.04,
            height: 250,
            fontGetter: getTitleFont
        });

        drawBottomLinkStrip(ctx, payload.centerText, settings, {
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
        imageShade.addColorStop(0, 'rgba(0,0,0,0.12)');
        imageShade.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = imageShade;
        ctx.fillRect(0, 380, size, 500);

        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('600', 28);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, toEnglishDateText(payload.dateText || '') + (settings.captionText ? ' | ' + settings.captionText : ''), 650), 24, 842);

        ctx.fillStyle = '#0b2e86';
        ctx.fillRect(0, 880, size, 200);

        drawAdBar(ctx, settings, 0, 900, size, 120);

        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('800', 42);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 420), 1030, 1030);
    }

    function drawMagazineFormat(ctx, photoImage, logoImage, payload, settings, size) {
        ctx.fillStyle = settings.primaryColor;
        ctx.fillRect(0, 0, size, size);
        ctx.strokeStyle = settings.secondaryColor;
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
            y: 22,
            maxW: 260,
            maxH: 80,
            align: 'left',
            color: settings.logoColor
        });

        if (settings.sectionLabel) {
            fillRoundedRect(ctx, 820, 36, 220, 58, 8, colorWithAlpha(settings.secondaryColor, 0.68));
            ctx.fillStyle = '#ffffff';
            ctx.font = getTextFont('800', 28);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(trimTextToWidth(ctx, settings.sectionLabel, 180), 930, 66);
        }

        if (settings.captionText) {
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.font = getTextFont('600', 24);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(trimTextToWidth(ctx, settings.captionText, 620), 32, 535);
        }

        var titleGradient = ctx.createLinearGradient(0, 568, 0, 820);
        titleGradient.addColorStop(0, settings.primaryColor);
        titleGradient.addColorStop(1, settings.secondaryColor);
        ctx.fillStyle = titleGradient;
        ctx.fillRect(0, 568, size, 252);

        ctx.fillStyle = colorWithAlpha(settings.secondaryColor, 0.28);
        ctx.beginPath();
        ctx.arc(500, 740, 220, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = settings.titleColor;
        drawAdaptiveMultiline(ctx, payload.title || '', {
            x: 540,
            y: 590,
            maxWidth: 840,
            maxLines: 3,
            maxFont: 62,
            minFont: 36,
            lineGap: 1.08,
            height: 200,
            fontGetter: getTitleFont
        });

        drawDate(ctx, payload, settings, 890, 800, 'right', 30, settings.dateColor);

        drawSocialStrip(ctx, payload, settings, 0, 820, size, 70);
        drawAdBar(ctx, settings, 0, 890, size, 125);

        ctx.fillStyle = settings.topBackgroundColor || '#ffffff';
        ctx.fillRect(0, 1015, size, 65);
        ctx.fillStyle = settings.primaryColor;
        ctx.font = getTextFont('800', 28);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, settings.footerRightText || settings.bottomText || '', 860), 540, 1048);
    }

    function drawFrameFormat(ctx, photoImage, logoImage, payload, settings, size) {
        ctx.fillStyle = settings.topBackgroundColor || '#080000';
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
            lineGap: 1.08,
            height: 260,
            fontGetter: getTitleFont
        });

        ctx.fillStyle = colorWithAlpha('#000000', 0.35);
        ctx.fillRect(0, 1010, size, 70);
        drawDate(ctx, payload, settings, 56, 1044, 'left', 28, '#ffffff');

        ctx.fillStyle = '#ffffff';
        ctx.font = getTextFont('800', 31);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(trimTextToWidth(ctx, settings.bottomText || '', 360), 540, 1044);

        ctx.textAlign = 'right';
        ctx.fillText(trimTextToWidth(ctx, displayUrlText(settings.brandUrl, payload.domain), 340), 1024, 1044);

        if (settings.accentColor) {
            ctx.fillStyle = settings.accentColor;
            ctx.font = getTextFont('900', 58);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'alphabetic';
            var words = String(payload.title || '').trim().split(/\s+/);
            if (words.length > 2) {
                ctx.fillText(trimTextToWidth(ctx, words[words.length - 1], 270), 1016, 952);
            }
        }
    }

    function buildPhotoCardBlob(payload) {
        return new Promise(function (resolve, reject) {
            var canvas = document.createElement('canvas');
            var size = 1080;
            var settings = normalizeSettings(payload.settings || getPluginSettings());
            var logoUrl = payload.logoUrl || settings.logoUrl || '';

            canvas.width = size;
            canvas.height = size;
            var ctx = canvas.getContext('2d');

            Promise.all([
                loadImage(payload.imageUrl),
                logoUrl ? loadImage(logoUrl).catch(function () { return null; }) : Promise.resolve(null)
            ]).then(function (assets) {
                var photoImage = assets[0];
                var logoImage = assets[1];
                var rendererMap = {
                    'classic-red': drawClassicFormat,
                    'fresh-blue': drawSplitFormat,
                    'green-market': drawMarketFormat,
                    'dark-magazine': drawMagazineFormat,
                    'gold-frame': drawFrameFormat
                };
                var renderer = rendererMap[settings.format] || drawClassicFormat;

                payload.centerText = payload.centerText || settings.bottomText || DEFAULT_SETTINGS.bottomText;
                renderer(ctx, photoImage, logoImage, payload, settings, size);

                canvas.toBlob(function (blob) {
                    if (!blob) {
                        reject(new Error('Failed to generate image blob'));
                        return;
                    }
                    resolve(blob);
                }, 'image/png', 1);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    function sanitizeFileName(text) {
        var cleaned = String(text || '')
            .toLowerCase()
            .replace(/[^\w\u0980-\u09FF]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        if (!cleaned) {
            cleaned = 'photocard-' + Date.now();
        }

        return cleaned;
    }

    function downloadBlob(blob, filename) {
        var link = document.createElement('a');
        var url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function activateTab(root, tabName) {
        var tabs = root.querySelectorAll('.borbila-admin-tab');
        var panels = root.querySelectorAll('.borbila-admin-panel');
        var activeInput = root.querySelector('.borbila-active-tab-input');
        var settingsForm = root.querySelector('[data-settings-form]');

        tabs.forEach(function (tab) {
            var active = tab.getAttribute('data-tab') === tabName;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
            var active = panel.getAttribute('data-panel') === tabName;
            panel.classList.toggle('is-active', active);
            panel.hidden = !active;
        });

        if (settingsForm) {
            settingsForm.hidden = tabName === 'license';
        }

        if (activeInput && tabName !== 'license') {
            activeInput.value = tabName;
        }

        try {
            window.localStorage.setItem('borbilaPhotoCardActiveTab', tabName);
        } catch (error) {}
    }

    function initTabs(root) {
        var activeInput = root.querySelector('.borbila-active-tab-input');
        var page = root.closest('.borbila-photocard-admin-page');
        var requestedTab = page ? String(page.getAttribute('data-default-tab') || '') : '';
        var initialTab = requestedTab || (activeInput && activeInput.value ? activeInput.value : 'colors');
        var allowedTabs = ['colors', 'logo', 'text', 'social', 'visibility', 'formats', 'license'];

        if (requestedTab !== 'license') {
            try {
                initialTab = window.localStorage.getItem('borbilaPhotoCardActiveTab') || initialTab;
            } catch (error) {}
        }

        if (allowedTabs.indexOf(initialTab) === -1) {
            initialTab = 'colors';
        }

        root.querySelectorAll('.borbila-admin-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                activateTab(root, tab.getAttribute('data-tab'));
            });
        });

        root.querySelectorAll('[data-open-license]').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                activateTab(root, 'license');
                var licenseTab = root.querySelector('[data-tab="license"]');
                if (licenseTab) {
                    licenseTab.focus();
                }
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', '#tab-license');
                }
            });
        });

        activateTab(root, initialTab);
    }

    function updateLogoPreview(root, url) {
        var preview = root.querySelector('.borbila-logo-preview');
        if (!preview) {
            return;
        }

        preview.innerHTML = '';
        if (url) {
            var image = document.createElement('img');
            image.src = url;
            image.alt = 'Selected logo';
            preview.appendChild(image);
            return;
        }

        var placeholder = document.createElement('span');
        placeholder.textContent = preview.getAttribute('data-empty-text') || 'No custom logo selected';
        preview.appendChild(placeholder);
    }

    function initLogoPicker(root) {
        var uploadButton = root.querySelector('.borbila-upload-logo');
        var removeButton = root.querySelector('.borbila-remove-logo');
        var idInput = root.querySelector('.borbila-logo-id');
        var urlInput = root.querySelector('.borbila-logo-url');
        var frame = null;

        if (uploadButton && window.wp && window.wp.media) {
            uploadButton.addEventListener('click', function (event) {
                event.preventDefault();

                if (frame) {
                    frame.open();
                    return;
                }

                frame = window.wp.media({
                    title: (window.borbilaPhotoCard && window.borbilaPhotoCard.mediaTitle) || 'Choose Borbila logo',
                    button: {
                        text: (window.borbilaPhotoCard && window.borbilaPhotoCard.mediaButtonText) || 'Use this logo'
                    },
                    multiple: false
                });

                frame.on('select', function () {
                    var attachment = frame.state().get('selection').first().toJSON();
                    if (idInput) {
                        idInput.value = attachment.id || '';
                    }
                    if (urlInput) {
                        urlInput.value = attachment.url || '';
                    }
                    updateLogoPreview(root, attachment.url || '');
                });

                frame.open();
            });
        }

        if (removeButton) {
            removeButton.addEventListener('click', function (event) {
                event.preventDefault();
                if (idInput) {
                    idInput.value = '';
                }
                if (urlInput) {
                    urlInput.value = '';
                }
                updateLogoPreview(root, '');
            });
        }

        if (urlInput) {
            urlInput.addEventListener('input', function () {
                if (idInput) {
                    idInput.value = '';
                }
                updateLogoPreview(root, urlInput.value);
            });
        }
    }

    function setColorOption(root, optionName, value) {
        var field = root.querySelector('[data-borbila-option="' + optionName + '"]');
        if (!field || !value) {
            return;
        }
        field.value = value;
    }

    function refreshPresetCards(root, selectedId) {
        root.querySelectorAll('.borbila-format-card').forEach(function (card) {
            var selected = card.getAttribute('data-borbila-preset') === selectedId;
            card.classList.toggle('is-selected', selected);
        });
    }

    function applyPreset(root, presetId) {
        var presets = (window.borbilaPhotoCard && window.borbilaPhotoCard.presets) || {};
        var preset = presets[presetId];

        if (!preset) {
            refreshPresetCards(root, presetId);
            return;
        }

        Object.keys(COLOR_OPTION_MAP).forEach(function (presetKey) {
            setColorOption(root, COLOR_OPTION_MAP[presetKey], preset[presetKey]);
        });

        refreshPresetCards(root, presetId);
    }

    function initPresets(root) {
        root.addEventListener('change', function (event) {
            var target = event.target;
            if (!target.matches('input[type="radio"][name$="[selected_format]"]')) {
                return;
            }

            applyPreset(root, target.value);
        });

        root.querySelectorAll('.borbila-format-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var radio = card.querySelector('input[type="radio"][name$="[selected_format]"]');
                if (!radio) {
                    return;
                }

                radio.checked = true;
                applyPreset(root, radio.value);
            });
        });

        var checked = root.querySelector('input[type="radio"][name$="[selected_format]"]:checked');
        if (checked) {
            refreshPresetCards(root, checked.value);
        }
    }

    function initSettingsPage() {
        var root = document.querySelector('.borbila-photocard-dashboard');
        if (!root) {
            return;
        }

        initTabs(root);
        if (root.getAttribute('data-license-active') === '1') {
            initLogoPicker(root);
            initPresets(root);
        }
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('.borbila-photocard-download');
        if (!button) {
            return;
        }

        event.preventDefault();

        if (window.borbilaPhotoCard && window.borbilaPhotoCard.licenseActive === false) {
            window.alert(window.borbilaPhotoCard.licenseMessage || 'Activate your Borbila license to use PhotoCard Generator.');
            return;
        }

        var box = button.closest('.borbila-photocard-box');
        if (!box) {
            return;
        }

        var imageUrl = box.getAttribute('data-image') || '';
        if (!imageUrl) {
            window.alert((window.borbilaPhotoCard && window.borbilaPhotoCard.missingImageText) || 'Set a featured image first.');
            return;
        }

        var settings = getPluginSettings();
        var title = box.getAttribute('data-title') || '';
        var oldText = button.textContent;
        button.disabled = true;
        button.textContent = (window.borbilaPhotoCard && window.borbilaPhotoCard.loadingText) || 'Generating...';

        buildPhotoCardBlob({
            title: title,
            imageUrl: imageUrl,
            logoUrl: settings.logoUrl || box.getAttribute('data-logo') || '',
            dateText: box.getAttribute('data-date') || '',
            domain: box.getAttribute('data-domain') || '',
            siteName: box.getAttribute('data-site-name') || '',
            centerText: settings.bottomText || ((window.borbilaPhotoCard && window.borbilaPhotoCard.defaultCenterText) || 'বিস্তারিত কমেন্টে'),
            settings: settings
        }).then(function (blob) {
            var prefix = settings.downloadPrefix || ((window.borbilaPhotoCard && window.borbilaPhotoCard.downloadPrefix) || 'photocard');
            var fileName = sanitizeFileName(prefix + '-' + title) + '.png';
            downloadBlob(blob, fileName);
        }).catch(function (error) {
            console.error(error);
            window.alert((window.borbilaPhotoCard && window.borbilaPhotoCard.errorText) || 'PhotoCard তৈরি করা যায়নি।');
        }).finally(function () {
            button.disabled = false;
            button.textContent = oldText || ((window.borbilaPhotoCard && window.borbilaPhotoCard.buttonText) || 'Generate & Download PhotoCard (1080x1080)');
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSettingsPage);
    } else {
        initSettingsPage();
    }
})();
