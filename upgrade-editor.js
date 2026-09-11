const fs = require('fs');

console.log('--- Writing upgrade-editor.js ---');

const code = `
const fs = require('fs');
const path = require('path');

const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Find boundaries of VQ and GQ
const vqStart = bundle.indexOf('class VQ{');
const p5Start = bundle.indexOf('class P5{', vqStart);
const opStart = bundle.indexOf('class op{', vqStart);

const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : opStart;
console.log('VQ range:', vqStart, vqEnd, 'length:', vqEnd - vqStart);

const gqStart = bundle.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = bundle.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);
console.log('GQ range:', gqStart, wqStart, 'length:', wqStart - gqStart);

if (vqStart === -1 || gqStart === -1 || wqStart === -1) {
  console.error('Could not find required symbols in bundle!');
  process.exit(1);
}

// 1. Construct the enhanced VQ class
const enhancedVQ = \`class VQ {
  static wrapText(ctx, text, maxWidth) {
    if (!text) return [];
    const words = text.split(/\\\\s+/);
    const lines = [];
    let curLine = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = curLine ? curLine + " " + words[i] : words[i];
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        lines.push(curLine);
        curLine = words[i];
      } else {
        curLine = testLine;
      }
    }
    if (curLine) lines.push(curLine);
    return lines;
  }

  static wrapTextWithParagraphs(ctx, text, maxWidth) {
    if (!text) return [];
    const paragraphs = text.split(/\\\\r?\\\\n+/);
    const lines = [];
    for (const p of paragraphs) {
      if (p.trim() === "") continue;
      lines.push(...this.wrapText(ctx, p, maxWidth));
    }
    return lines;
  }

  static fillRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, width, height, radius);
    } else {
      ctx.rect(x, y, width, height);
    }
    ctx.fill();
  }

  static strokeRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, width, height, radius);
    } else {
      ctx.rect(x, y, width, height);
    }
    ctx.stroke();
  }

  static getFontFamilyString(familyKey) {
    if (!familyKey) return "'Noto Sans Bengali', 'Hind Siliguri', 'Inter', sans-serif";
    const k = String(familyKey).toLowerCase();
    if (k.includes("bornopata bold") || k === "bornopata-bold") {
      return "'Bornopata Bold', 'Bornopata', 'Hind Siliguri', sans-serif";
    }
    if (k.includes("bornopata regular") || k.includes("bornopata") || k === "bornopata-regular") {
      return "'Bornopata Regular', 'Bornopata', 'Hind Siliguri', sans-serif";
    }
    if (k.includes("italic") && (k.includes("sangbadpatra") || k.includes("alinur"))) {
      return "'Li Alinur Sangbadpatra 2 Unicode Italic', 'Li Alinur Sangbadpatra2 Unicode Italic', 'Hind Siliguri', sans-serif";
    }
    if (k.includes("sangbadpatra") || k.includes("alinur")) {
      return "'Li Alinur Sangbadpatra 2 Unicode', 'Li Alinur Sangbadpatra2 Unicode', 'Hind Siliguri', sans-serif";
    }
    if (k === "serif" || k.includes("kalpurush") || k.includes("serif")) {
      return "'Kalpurush', 'SutonnyBanglaOMJ', 'Noto Serif Bengali', 'Georgia', serif";
    }
    if (k === "mono" || k.includes("mono")) {
      return "'JetBrains Mono', monospace";
    }
    if (k === "inter") {
      return "'Inter', 'Hind Siliguri', sans-serif";
    }
    return "'Noto Sans Bengali', 'Hind Siliguri', 'Inter', sans-serif";
  }

  static async drawLayers(ctx, width, height, item, options, theme, leftLogo, rightLogo, featuredImage, metrics) {
    if (metrics) {
      metrics.width = width;
      metrics.height = height;
      metrics.aspectRatio = options.aspectRatio;
      metrics.objectCount = 0;
      metrics.layerOrder = [];
      metrics.imageBounds = null;
      metrics.objectCoordinates = {};
      metrics.fontMetrics = { fontSize: 0, lineCount: 0, titleHeight: 0 };
    }

    const scale = width / 400;
    const basePadding = scale * 14;
    const fontStr = this.getFontFamilyString(options.fontFamily);

    // Font size scaling
    const titleSize = scale * (options.fontSize === "sm" ? 14 : options.fontSize === "lg" ? 22 : options.fontSize === "xl" ? 26 : 18);
    const bodySize = scale * (options.fontSize === "sm" ? 9.5 : options.fontSize === "lg" ? 13 : options.fontSize === "xl" ? 14.5 : 11);

    // Offsets helper
    const getOff = (key) => {
      const o = (options.offsets && options.offsets[key]) || { x: 0, y: 0 };
      return { x: o.x * scale, y: o.y * scale };
    };

    const registerCoord = (name, x, y, w, h) => {
      if (metrics) {
        metrics.objectCount++;
        metrics.layerOrder.push(name);
        metrics.objectCoordinates[name] = { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) };
      }
    };

    const getSummaryText = () => {
      const sum = options.customSummary || "";
      if (options.summaryLength === "hidden") return "";
      const limit = options.summaryLength === "short" ? 25 : options.summaryLength === "full" ? 120 : 55;
      const words = sum.split(/\\\\s+/);
      return words.length <= limit ? sum : words.slice(0, limit).join(" ") + "...";
    };

    const getReadingTime = () => {
      const words = (item.content || "").split(/\\\\s+/).length;
      return "পড়ার সময়: ~" + Math.max(1, Math.ceil(words / 180)) + " মিনিট";
    };

    // Determine template archetype
    const tplId = options.selectedTemplate;
    const isSquareSplit = [22, 23, 24, 25, 26, 27, 28].includes(tplId);
    let templateMode = "PROCLAMATION";
    if (isSquareSplit) templateMode = "SQ_HALF_SPLIT";
    else if (tplId === 1) templateMode = "BREAKING";
    else if (tplId === 2) templateMode = "MAGAZINE";
    else if ([3, 4, 5, 6, 15, 16, 17].includes(tplId)) templateMode = "SOCIAL_SQ";
    else if ([7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21].includes(tplId)) templateMode = "MINIMAL";

    registerCoord("background", 0, 0, width, height);

    // Watermark
    if (options.showWatermark && leftLogo) {
      ctx.save();
      const wOff = getOff("watermark");
      ctx.globalAlpha = 0.04;
      const wmSize = Math.min(width, height) * 0.45;
      const wmX = (width - wmSize) / 2 + wOff.x;
      const wmY = (height - wmSize) / 2 + wOff.y;
      ctx.drawImage(leftLogo, wmX, wmY, wmSize, wmSize);
      ctx.restore();
      registerCoord("watermark", wmX, wmY, wmSize, wmSize);
    }

    // --- TEMPLATE 1: SQ_HALF_SPLIT ---
    if (templateMode === "SQ_HALF_SPLIT") {
      ctx.save();
      let solidBg = "#b91c1c", titleColor = "#ffffff", catBadgeBg = "rgba(255,255,255,0.18)", catBadgeBorder = "rgba(255,255,255,0.3)", catTextColor = "#ffffff", footerDivider = "rgba(255,255,255,0.22)", footerOrgColor = "#ffffff", footerBranchColor = "#fecaca";
      if (tplId === 22 || options.accentColor === "#b91c1c" || options.accentColor === "#dc2626" || options.accentColor === "#B3002D") {
        solidBg = options.accentColor || "#b91c1c";
      } else if (tplId === 23 || options.accentColor === "#580c1f") {
        solidBg = "#580c1f"; footerBranchColor = "#fbcfe8";
      } else if (tplId === 24 || options.accentColor === "#18181b") {
        solidBg = "#18181b"; footerBranchColor = "#d4d4d8";
      } else if (tplId === 25 || options.accentColor === "#ffffff") {
        solidBg = "#ffffff"; titleColor = "#09090b"; catBadgeBg = "rgba(185,28,28,0.1)"; catBadgeBorder = "rgba(185,28,28,0.25)"; catTextColor = "#b91c1c"; footerDivider = "#e4e4e7"; footerOrgColor = "#18181b"; footerBranchColor = "#b91c1c";
      } else if (tplId === 26 || options.accentColor === "#f4f4f5") {
        solidBg = "#f4f4f5"; titleColor = "#09090b"; catBadgeBg = "rgba(185,28,28,0.1)"; catBadgeBorder = "rgba(185,28,28,0.25)"; catTextColor = "#b91c1c"; footerDivider = "#e4e4e7"; footerOrgColor = "#18181b"; footerBranchColor = "#b91c1c";
      } else if (tplId === 27 || options.accentColor === "#0f172a") {
        solidBg = "#0f172a"; footerBranchColor = "#93c5fd";
      } else if (tplId === 28 || options.accentColor === "#064e3b") {
        solidBg = "#064e3b"; footerBranchColor = "#a7f3d0";
      } else {
        solidBg = options.accentColor || "#b91c1c";
      }

      const imgHeight = height * 0.54;
      const imgOff = getOff("image");

      if (featuredImage && options.imagePosition !== "hidden") {
        const fit = cu.calculateFit(featuredImage.width, featuredImage.height, 0, 0, width, imgHeight, true);
        ctx.drawImage(featuredImage, fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
        if (metrics) metrics.imageBounds = { x: fit.x + imgOff.x, y: fit.y + imgOff.y, w: fit.width, h: fit.height };
        registerCoord("image", fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
      } else {
        ctx.fillStyle = solidBg === "#ffffff" || solidBg === "#f4f4f5" ? "#e4e4e7" : "#111827";
        ctx.fillRect(0, 0, width, imgHeight);
        if (leftLogo && options.showLogo) {
          ctx.save();
          ctx.globalAlpha = 0.15;
          const ph = scale * 44;
          ctx.drawImage(leftLogo, width / 2 - ph / 2 + imgOff.x, imgHeight / 2 - ph / 2 + imgOff.y, ph, ph);
          ctx.restore();
        }
        registerCoord("image", imgOff.x, imgOff.y, width, imgHeight);
      }

      // Lower solid panel
      ctx.fillStyle = solidBg;
      ctx.fillRect(0, imgHeight, width, height - imgHeight);
      registerCoord("background_panel", 0, imgHeight, width, height - imgHeight);

      const footerH = scale * 30;
      const footerY = height - footerH;
      const contentTop = imgHeight + scale * 8;
      const contentH = footerY - contentTop;

      // Category badge
      const catOff = getOff("category");
      let curY = contentTop + catOff.y;
      if (options.showCategory && options.customCategory) {
        ctx.font = "bold " + scale * 9 + "px " + fontStr;
        const catW = ctx.measureText(options.customCategory).width + scale * 16;
        const catH = scale * 16;
        const catX = width / 2 - catW / 2 + catOff.x;
        ctx.fillStyle = catBadgeBg;
        this.fillRoundedRect(ctx, catX, curY, catW, catH, scale * 3);
        ctx.strokeStyle = catBadgeBorder;
        ctx.lineWidth = Math.max(1, scale * 0.8);
        this.strokeRoundedRect(ctx, catX, curY, catW, catH, scale * 3);
        ctx.fillStyle = catTextColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(options.customCategory, width / 2 + catOff.x, curY + catH / 2);
        registerCoord("category", catX, curY, catW, catH);
        curY += catH + scale * 7;
      }

      // Title
      const titleOff = getOff("title");
      const maxTitleW = width - scale * 36;
      let titleFontSize = titleSize;
      ctx.font = "bold " + titleFontSize + "px " + fontStr;
      let lines = this.wrapText(ctx, options.customTitle || item.title || "", maxTitleW);
      if (lines.length > 3) {
        titleFontSize = titleSize * 0.88;
        ctx.font = "bold " + titleFontSize + "px " + fontStr;
        lines = this.wrapText(ctx, options.customTitle || item.title || "", maxTitleW);
      }
      const titleLineH = titleFontSize * 1.35;
      const totalTitleH = lines.length * titleLineH;
      const availH = footerY - curY;
      const titleDrawY = curY + Math.max(0, (availH - totalTitleH) * 0.38) + titleOff.y;

      ctx.fillStyle = titleColor;
      ctx.textAlign = options.textAlignment === "left" ? "left" : options.textAlignment === "right" ? "right" : "center";
      ctx.textBaseline = "top";
      const titleDrawX = options.textAlignment === "left" ? scale * 18 + titleOff.x : options.textAlignment === "right" ? width - scale * 18 + titleOff.x : width / 2 + titleOff.x;

      lines.forEach((l, idx) => {
        ctx.fillText(l, titleDrawX, titleDrawY + idx * titleLineH);
      });

      registerCoord("title", scale * 18 + titleOff.x, titleDrawY, maxTitleW, totalTitleH);
      if (metrics) {
        metrics.fontMetrics = { fontSize: titleFontSize, lineCount: lines.length, titleHeight: totalTitleH };
      }

      // Footer
      if (options.showFooter) {
        const footOff = getOff("footer");
        const fy = footerY + footOff.y;
        ctx.strokeStyle = footerDivider;
        ctx.lineWidth = Math.max(1, scale * 0.8);
        ctx.beginPath();
        ctx.moveTo(scale * 16 + footOff.x, fy);
        ctx.lineTo(width - scale * 16 + footOff.x, fy);
        ctx.stroke();

        const footLogoSize = scale * 18;
        const footLogoY = fy + (footerH - footLogoSize) / 2;
        let leftStart = scale * 18 + footOff.x;

        if (leftLogo && options.showLogo) {
          ctx.drawImage(leftLogo, leftStart, footLogoY, footLogoSize, footLogoSize);
          registerCoord("header", leftStart, footLogoY, footLogoSize, footLogoSize);
          leftStart += footLogoSize + scale * 6;
        }

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = footerOrgColor;
        ctx.font = "bold " + scale * 9 + "px " + fontStr;
        ctx.fillText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট", leftStart, fy + footerH * 0.36);
        ctx.fillStyle = footerBranchColor;
        ctx.font = scale * 7.5 + "px " + fontStr;
        ctx.fillText("ময়মনসিংহ জেলা শাখা", leftStart, fy + footerH * 0.72);

        // Date & Social on right
        let rightStart = width - scale * 18 + footOff.x;
        ctx.textAlign = "right";
        if (options.showDate && options.customDate) {
          ctx.fillStyle = footerBranchColor;
          ctx.font = scale * 7.5 + "px " + fontStr;
          ctx.fillText(options.customDate, rightStart, fy + footerH * 0.5);
        }
        registerCoord("footer", scale * 18 + footOff.x, fy, width - scale * 36, footerH);
      }
      ctx.restore();

    // --- TEMPLATE 2: BREAKING NEWS ---
    } else if (templateMode === "BREAKING") {
      ctx.save();
      const pad = basePadding;

      // Header Bar
      const headOff = getOff("header");
      ctx.fillStyle = "#dc2626";
      this.fillRoundedRect(ctx, pad + headOff.x, pad + headOff.y, scale * 48, scale * 18, scale * 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold " + scale * 10 + "px " + fontStr;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("সরাসরি", pad + scale * 24 + headOff.x, pad + scale * 9 + headOff.y);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 " + scale * 12 + "px " + fontStr;
      ctx.textAlign = "left";
      ctx.fillText(options.customSlogan || "ব্রেকিং নিউজ", pad + scale * 56 + headOff.x, pad + scale * 9 + headOff.y);

      if (options.showLogo && leftLogo) {
        ctx.drawImage(leftLogo, width - pad - scale * 65 + headOff.x, pad - scale * 2 + headOff.y, scale * 22, scale * 22);
      }
      ctx.fillStyle = "#B3002D";
      ctx.font = "900 " + scale * 11 + "px " + fontStr;
      ctx.textAlign = "right";
      ctx.fillText("SSF NEWS", width - pad + headOff.x, pad + scale * 12 + headOff.y);
      registerCoord("header", pad + headOff.x, pad + headOff.y, width - 2 * pad, scale * 22);

      // Featured Image
      const imgOff = getOff("image");
      const imgTop = pad + scale * 24;
      const imgH = scale * 150;
      const imgW = width - 2 * pad;

      if (featuredImage && options.imagePosition !== "hidden") {
        const fit = cu.calculateFit(featuredImage.width, featuredImage.height, pad + imgOff.x, imgTop + imgOff.y, imgW, imgH, true);
        ctx.save();
        ctx.beginPath();
        ctx.rect(pad + imgOff.x, imgTop + imgOff.y, imgW, imgH);
        ctx.clip();
        ctx.drawImage(featuredImage, fit.x, fit.y, fit.width, fit.height);
        ctx.restore();
        registerCoord("image", pad + imgOff.x, imgTop + imgOff.y, imgW, imgH);
      } else {
        ctx.fillStyle = "#111520";
        ctx.fillRect(pad + imgOff.x, imgTop + imgOff.y, imgW, imgH);
        registerCoord("image", pad + imgOff.x, imgTop + imgOff.y, imgW, imgH);
      }

      // Category
      const catOff = getOff("category");
      let curY = imgTop + imgH + scale * 10;
      if (options.showCategory && options.customCategory) {
        ctx.fillStyle = "#facc15";
        ctx.font = "bold " + scale * 9 + "px " + fontStr;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("▶ " + options.customCategory, pad + catOff.x, curY + catOff.y);
        registerCoord("category", pad + catOff.x, curY + catOff.y, scale * 100, scale * 14);
        curY += scale * 18;
      }

      // Title Card
      const titleOff = getOff("title");
      const titleH = scale * 64;
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillRect(pad + titleOff.x, curY + titleOff.y, imgW, titleH);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(pad + titleOff.x, curY + titleOff.y, scale * 4, titleH);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold " + titleSize * 1.15 + "px " + fontStr;
      ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
      ctx.textBaseline = "top";
      const tlines = this.wrapText(ctx, options.customTitle || item.title || "", imgW - scale * 16);
      const tX = options.textAlignment === "center" ? width / 2 + titleOff.x : options.textAlignment === "right" ? width - pad - scale * 8 + titleOff.x : pad + scale * 10 + titleOff.x;
      tlines.forEach((l, idx) => {
        ctx.fillText(l, tX, curY + scale * 6 + idx * titleSize * 1.3 + titleOff.y);
      });
      registerCoord("title", pad + titleOff.x, curY + titleOff.y, imgW, titleH);
      curY += titleH + scale * 8;

      // Summary
      const sumText = getSummaryText();
      if (sumText) {
        const sumOff = getOff("summary");
        ctx.fillStyle = "#cbd5e1";
        ctx.font = bodySize + "px " + fontStr;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        const sumLines = this.wrapText(ctx, sumText, imgW);
        sumLines.slice(0, 4).forEach((l, idx) => {
          ctx.fillText(l, pad + sumOff.x, curY + idx * bodySize * 1.4 + sumOff.y);
        });
        registerCoord("summary", pad + sumOff.x, curY + sumOff.y, imgW, sumLines.length * bodySize * 1.4);
      }

      // Footer
      if (options.showFooter) {
        const footOff = getOff("footer");
        const footH = scale * 22;
        const footY = height - pad - footH + footOff.y;
        ctx.fillStyle = "#B3002D";
        ctx.fillRect(pad + footOff.x, footY, imgW, footH);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold " + scale * 8.5 + "px " + fontStr;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText((options.showLocation ? options.customLocation + " • " : "") + (options.showAuthor ? options.customAuthor : "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"), pad + scale * 6 + footOff.x, footY + footH / 2);

        if (options.showDate && options.customDate) {
          ctx.textAlign = "right";
          ctx.fillText(options.customDate, width - pad - scale * 6 + footOff.x, footY + footH / 2);
        }
        registerCoord("footer", pad + footOff.x, footY, imgW, footH);
      }
      ctx.restore();

    // --- TEMPLATE 3: MAGAZINE COVER ---
    } else if (templateMode === "MAGAZINE") {
      ctx.save();
      const imgOff = getOff("image");
      if (featuredImage && options.imagePosition !== "hidden") {
        const fit = cu.calculateFit(featuredImage.width, featuredImage.height, 0, 0, width, height, true);
        ctx.drawImage(featuredImage, fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
        grad.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0.95)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        registerCoord("image", fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
      } else {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, width, height);
        registerCoord("image", imgOff.x, imgOff.y, width, height);
      }

      // Magazine Header
      const headOff = getOff("header");
      const topY = scale * 16 + headOff.y;
      if (options.showLogo && leftLogo) {
        ctx.drawImage(leftLogo, width / 2 - scale * 14 + headOff.x, topY, scale * 28, scale * 28);
      }
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold " + scale * 8 + "px " + fontStr;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(options.customSlogan || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট • বিশেষ সংখ্যা", width / 2 + headOff.x, topY + scale * 32);
      registerCoord("header", width / 6 + headOff.x, topY, width * 2 / 3, scale * 48);

      // Title
      const titleOff = getOff("title");
      const midY = height / 2 - scale * 20 + titleOff.y;
      if (options.showCategory && options.customCategory) {
        ctx.fillStyle = "#facc15";
        ctx.font = "900 " + scale * 10 + "px " + fontStr;
        ctx.textAlign = "center";
        ctx.fillText("— " + options.customCategory + " —", width / 2 + titleOff.x, midY - scale * 25);
        registerCoord("category", width / 4 + titleOff.x, midY - scale * 25, width / 2, scale * 16);
      }

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 " + titleSize * 1.25 + "px " + fontStr;
      ctx.textAlign = options.textAlignment === "left" ? "left" : options.textAlignment === "right" ? "right" : "center";
      const maxW = width - scale * 60;
      const magLines = this.wrapText(ctx, options.customTitle || item.title || "", maxW);
      const mX = options.textAlignment === "left" ? scale * 30 + titleOff.x : options.textAlignment === "right" ? width - scale * 30 + titleOff.x : width / 2 + titleOff.x;
      magLines.forEach((l, idx) => {
        ctx.fillText(l, mX, midY + idx * titleSize * 1.35);
      });
      registerCoord("title", scale * 30 + titleOff.x, midY, maxW, magLines.length * titleSize * 1.35);

      // Summary
      const magSum = getSummaryText();
      if (magSum) {
        const sumOff = getOff("summary");
        const sumY = midY + magLines.length * titleSize * 1.35 + scale * 14 + sumOff.y;
        ctx.fillStyle = "#e2e8f0";
        ctx.font = bodySize + "px " + fontStr;
        ctx.textAlign = "center";
        const sumLines = this.wrapText(ctx, magSum, maxW);
        sumLines.slice(0, 3).forEach((l, idx) => {
          ctx.fillText(l, width / 2 + sumOff.x, sumY + idx * bodySize * 1.4);
        });
        registerCoord("summary", scale * 30 + sumOff.x, sumY, maxW, sumLines.length * bodySize * 1.4);
      }

      // Footer
      if (options.showFooter) {
        const footOff = getOff("footer");
        const fY = height - scale * 26 + footOff.y;
        ctx.fillStyle = "#94a3b8";
        ctx.font = scale * 8 + "px " + fontStr;
        ctx.textAlign = "center";
        ctx.fillText((options.showLocation ? options.customLocation + " • " : "") + (options.showDate ? options.customDate : ""), width / 2 + footOff.x, fY);
        registerCoord("footer", scale * 20 + footOff.x, fY - scale * 6, width - scale * 40, scale * 20);
      }
      ctx.restore();

    // --- TEMPLATE 4: SOCIAL / EVENT / AWARENESS ---
    } else if (templateMode === "SOCIAL_SQ") {
      ctx.save();
      const isLight = options.bgTheme === "light";
      const bgColor = isLight ? "#faf6ee" : "#0b0f19";
      const txtColor = isLight ? "#090d16" : "#ffffff";
      const secColor = isLight ? "#334155" : "#94a3b8";
      const pad = basePadding;

      const imgOff = getOff("image");
      if (featuredImage && options.imagePosition !== "hidden") {
        const fit = cu.calculateFit(featuredImage.width, featuredImage.height, 0, 0, width, height, true);
        ctx.drawImage(featuredImage, fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        if (isLight) {
          grad.addColorStop(0, "rgba(250, 246, 238, 0.1)");
          grad.addColorStop(0.5, "rgba(250, 246, 238, 0.82)");
          grad.addColorStop(1, "rgba(250, 246, 238, 1)");
        } else {
          grad.addColorStop(0, "rgba(9, 13, 22, 0.1)");
          grad.addColorStop(0.5, "rgba(9, 13, 22, 0.85)");
          grad.addColorStop(1, "rgba(9, 13, 22, 1)");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        registerCoord("image", fit.x + imgOff.x, fit.y + imgOff.y, fit.width, fit.height);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        registerCoord("image", imgOff.x, imgOff.y, width, height);
      }

      // Header
      const headOff = getOff("header");
      const hY = pad + scale * 4 + headOff.y;
      if (options.showLogo && leftLogo) {
        ctx.drawImage(leftLogo, pad + headOff.x, hY, scale * 24, scale * 24);
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = txtColor;
      ctx.font = "bold " + scale * 9 + "px " + fontStr;
      ctx.fillText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট", pad + scale * 28 + headOff.x, hY + scale * 8);
      ctx.fillStyle = options.accentColor || "#B3002D";
      ctx.font = scale * 7.5 + "px " + fontStr;
      ctx.fillText("ময়মনসিংহ জেলা শাখা", pad + scale * 28 + headOff.x, hY + scale * 18);
      registerCoord("header", pad + headOff.x, hY, width - 2 * pad, scale * 26);

      // Slogan / Category
      const catOff = getOff("category");
      let curY = height * 0.46 + catOff.y;
      if (options.customSlogan) {
        ctx.fillStyle = options.accentColor || "#B3002D";
        ctx.font = "bold " + scale * 8.5 + "px " + fontStr;
        ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
        const sx = options.textAlignment === "center" ? width / 2 + catOff.x : options.textAlignment === "right" ? width - pad + catOff.x : pad + catOff.x;
        ctx.fillText(options.customSlogan, sx, curY);
        registerCoord("category", pad + catOff.x, curY - scale * 6, width - 2 * pad, scale * 16);
        curY += scale * 14;
      }

      // Title
      const titleOff = getOff("title");
      ctx.fillStyle = txtColor;
      ctx.font = "bold " + titleSize * 1.1 + "px " + fontStr;
      ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
      ctx.textBaseline = "top";
      const maxW = width - 2 * pad;
      const socLines = this.wrapText(ctx, options.customTitle || item.title || "", maxW);
      const tx = options.textAlignment === "center" ? width / 2 + titleOff.x : options.textAlignment === "right" ? width - pad + titleOff.x : pad + titleOff.x;
      const tStartY = curY + titleOff.y;
      socLines.forEach((l, idx) => {
        ctx.fillText(l, tx, tStartY + idx * titleSize * 1.3);
      });
      registerCoord("title", pad + titleOff.x, tStartY, maxW, socLines.length * titleSize * 1.3);
      curY = tStartY + socLines.length * titleSize * 1.3 + scale * 8;

      // Summary
      const socSum = getSummaryText();
      if (socSum) {
        const sumOff = getOff("summary");
        ctx.fillStyle = secColor;
        ctx.font = bodySize + "px " + fontStr;
        ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
        const sumLines = this.wrapText(ctx, socSum, maxW);
        const sumX = options.textAlignment === "center" ? width / 2 + sumOff.x : options.textAlignment === "right" ? width - pad + sumOff.x : pad + sumOff.x;
        sumLines.slice(0, 3).forEach((l, idx) => {
          ctx.fillText(l, sumX, curY + sumOff.y + idx * bodySize * 1.35);
        });
        registerCoord("summary", pad + sumOff.x, curY + sumOff.y, maxW, sumLines.length * bodySize * 1.35);
      }

      // Footer
      if (options.showFooter) {
        const footOff = getOff("footer");
        const fy = height - pad - scale * 16 + footOff.y;
        ctx.strokeStyle = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)";
        ctx.lineWidth = Math.max(1, scale * 0.8);
        ctx.beginPath();
        ctx.moveTo(pad + footOff.x, fy);
        ctx.lineTo(width - pad + footOff.x, fy);
        ctx.stroke();

        ctx.fillStyle = secColor;
        ctx.font = scale * 7.5 + "px " + fontStr;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText((options.showLocation ? options.customLocation + " • " : "") + (options.showDate ? options.customDate : ""), pad + footOff.x, fy + scale * 10);
        registerCoord("footer", pad + footOff.x, fy, width - 2 * pad, scale * 20);
      }
      ctx.restore();

    // --- TEMPLATE 5: MINIMAL & EDITORIAL ---
    } else {
      ctx.save();
      const isDark = options.bgTheme === "dark";
      const isCream = options.bgTheme === "cream";
      const bgColor = isDark ? "#090d16" : isCream ? "#fdfbf7" : "#ffffff";
      const txtColor = isDark ? "#ffffff" : isCream ? "#1c1917" : "#0f172a";
      const secColor = isDark ? "#94a3b8" : isCream ? "#57534e" : "#475569";
      const pad = basePadding;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Header
      const headOff = getOff("header");
      const hy = pad + headOff.y;
      if (options.showLogo && leftLogo) {
        ctx.drawImage(leftLogo, pad + headOff.x, hy, scale * 26, scale * 26);
      }
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = txtColor;
      ctx.font = "bold " + scale * 9 + "px " + fontStr;
      ctx.fillText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট", pad + scale * 30 + headOff.x, hy + scale * 9);
      ctx.fillStyle = options.accentColor || "#B3002D";
      ctx.font = scale * 7.5 + "px " + fontStr;
      ctx.fillText("ময়মনসিংহ জেলা শাখা", pad + scale * 30 + headOff.x, hy + scale * 19);
      registerCoord("header", pad + headOff.x, hy, width - 2 * pad, scale * 28);

      let curY = hy + scale * 38;

      // Category / Slogan
      const catOff = getOff("category");
      if (options.showCategory && options.customCategory) {
        ctx.fillStyle = options.accentColor || "#B3002D";
        ctx.font = "bold " + scale * 8.5 + "px " + fontStr;
        ctx.textAlign = "left";
        ctx.fillText("■ " + options.customCategory, pad + catOff.x, curY + catOff.y);
        registerCoord("category", pad + catOff.x, curY + catOff.y - scale * 6, scale * 120, scale * 16);
        curY += scale * 14;
      }

      // Title
      const titleOff = getOff("title");
      ctx.fillStyle = txtColor;
      ctx.font = "bold " + titleSize * 1.15 + "px " + fontStr;
      ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
      ctx.textBaseline = "top";
      const maxW = width - 2 * pad;
      const minLines = this.wrapText(ctx, options.customTitle || item.title || "", maxW);
      const minTX = options.textAlignment === "center" ? width / 2 + titleOff.x : options.textAlignment === "right" ? width - pad + titleOff.x : pad + titleOff.x;
      const minStartY = curY + titleOff.y;
      minLines.forEach((l, idx) => {
        ctx.fillText(l, minTX, minStartY + idx * titleSize * 1.32);
      });
      registerCoord("title", pad + titleOff.x, minStartY, maxW, minLines.length * titleSize * 1.32);
      curY = minStartY + minLines.length * titleSize * 1.32 + scale * 10;

      // Featured Image (if available)
      const imgOff = getOff("image");
      if (featuredImage && options.imagePosition !== "hidden") {
        const imgH = scale * 120;
        const fit = cu.calculateFit(featuredImage.width, featuredImage.height, pad + imgOff.x, curY + imgOff.y, maxW, imgH, true);
        ctx.save();
        this.fillRoundedRect(ctx, pad + imgOff.x, curY + imgOff.y, maxW, imgH, scale * 4);
        ctx.clip();
        ctx.drawImage(featuredImage, fit.x, fit.y, fit.width, fit.height);
        ctx.restore();
        registerCoord("image", pad + imgOff.x, curY + imgOff.y, maxW, imgH);
        curY += imgH + scale * 10;
      }

      // Summary
      const minSum = getSummaryText();
      if (minSum) {
        const sumOff = getOff("summary");
        ctx.fillStyle = secColor;
        ctx.font = bodySize + "px " + fontStr;
        ctx.textAlign = options.textAlignment === "center" ? "center" : options.textAlignment === "right" ? "right" : "left";
        const sumLines = this.wrapText(ctx, minSum, maxW);
        const sX = options.textAlignment === "center" ? width / 2 + sumOff.x : options.textAlignment === "right" ? width - pad + sumOff.x : pad + sumOff.x;
        sumLines.slice(0, 4).forEach((l, idx) => {
          ctx.fillText(l, sX, curY + sumOff.y + idx * bodySize * 1.38);
        });
        registerCoord("summary", pad + sumOff.x, curY + sumOff.y, maxW, sumLines.length * bodySize * 1.38);
      }

      // Footer
      if (options.showFooter) {
        const footOff = getOff("footer");
        const fy = height - pad - scale * 18 + footOff.y;
        ctx.strokeStyle = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = Math.max(1, scale * 0.8);
        ctx.beginPath();
        ctx.moveTo(pad + footOff.x, fy);
        ctx.lineTo(width - pad + footOff.x, fy);
        ctx.stroke();

        ctx.fillStyle = secColor;
        ctx.font = scale * 7.5 + "px " + fontStr;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText((options.showLocation ? options.customLocation + " • " : "") + (options.showAuthor ? options.customAuthor : "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"), pad + footOff.x, fy + scale * 10);

        if (options.showDate && options.customDate) {
          ctx.textAlign = "right";
          ctx.fillText(options.customDate, width - pad + footOff.x, fy + scale * 10);
        }
        registerCoord("footer", pad + footOff.x, fy, width - 2 * pad, scale * 20);
      }
      ctx.restore();
    }
  }
}\`;

// 2. Replace VQ in bundle
bundle = bundle.slice(0, vqStart) + enhancedVQ + bundle.slice(vqEnd);
console.log('Enhanced VQ inserted.');
fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log('Saved bundle after VQ enhancement.');
\`;

fs.writeFileSync('upgrade-editor-step1.js', code, 'utf8');
console.log('Created upgrade-editor-step1.js');
