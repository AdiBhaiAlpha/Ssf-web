const fs = require('fs');

// 1. Read current assets/index-DkKEx6Oj.js
const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Original bundle size:', bundle.length);

// 2. Define the complete 28-template array zS
const all28Templates = `const zS = [
  { id: 1, name: "🔴 ব্রেকিং নিউজ (Breaking News)", tag: "BREAKING", theme: "dark", bg: "solid", color: "#B3002D", font: "sans", img: "top", border: "none", align: "left", slogan: "🔴 ব্রেকিং নিউজ" },
  { id: 2, name: "📖 ম্যাগাজিন কভার (Magazine Cover)", tag: "MAGAZINE", theme: "cream", bg: "gradient", color: "#B3002D", font: "serif", img: "background", border: "vintage", align: "center", slogan: "বিশেষ সংখ্যা" },
  { id: 3, name: "🖋️ মডার্ন মিনিমাল (Modern Minimal)", tag: "MINIMAL", theme: "light", bg: "solid", color: "#111827", font: "sans", img: "top", border: "none", align: "left", slogan: "" },
  { id: 4, name: "🟦 স্কয়ার সোশ্যাল (Square Social)", tag: "SOCIAL_SQ", theme: "dark", bg: "gradient", color: "#B3002D", font: "sans", img: "top", border: "none", align: "left", slogan: "সামাজিক যোগাযোগ মাধ্যম" },
  { id: 5, name: "📱 ফেসবুক পোর্ট্রেট (Facebook Feed)", tag: "FB_FEED", theme: "dark", bg: "noise", color: "#B3002D", font: "sans", img: "top", border: "none", align: "left", slogan: "ফেসবুক আপডেট" },
  { id: 6, name: "📸 ইনস্টাগ্রাম স্টাইল (Instagram Post)", tag: "IG_FEED", theme: "light", bg: "geometric", color: "#dc2626", font: "sans", img: "top", border: "none", align: "left", slogan: "ফটো পোস্ট" },
  { id: 7, name: "🖥️ ল্যান্ডস্কেপ ব্যানার (Landscape Banner)", tag: "BANNER", theme: "light", bg: "solid", color: "#B3002D", font: "sans", img: "left", border: "none", align: "left", slogan: "অনলাইন সংস্করণ" },
  { id: 8, name: "🌌 ডার্ক কসমিক (Cosmic Dark)", tag: "COSMIC", theme: "dark", bg: "gradient", color: "#ea580c", font: "sans", img: "top", border: "neon-glow", align: "left", slogan: "কসমিক বুলেটিন" },
  { id: 9, name: "📜 অফিশিয়াল ক্রিম (Official Vintage)", tag: "OFFICIAL_CRM", theme: "cream", bg: "paper", color: "#B3002D", font: "serif", img: "top", border: "double", align: "left", slogan: "অফিসিয়াল নথিপত্র" },
  { id: 10, name: "📢 অফিশিয়াল বিবৃতি (Statement)", tag: "STATEMENT", theme: "light", bg: "solid", color: "#B3002D", font: "serif", img: "hidden", border: "none", align: "center", slogan: "প্রেস বিজ্ঞপ্তি / বিবৃতি" },
  { id: 11, name: "📰 সম্পাদকীয় কলাম (Editorial News)", tag: "EDITORIAL", theme: "cream", bg: "paper", color: "#111827", font: "serif", img: "left", border: "vintage", align: "justified", slogan: "সম্পাদকীয় কলাম" },
  { id: 12, name: "🏢 করপোরেট রিপোর্ট (Corporate Style)", tag: "CORPORATE", theme: "light", bg: "geometric", color: "#1d4ed8", font: "sans", img: "top", border: "none", align: "left", slogan: "বার্ষিক প্রতিবেদন" },
  { id: 13, name: "🏛️ সরকারি নোটিশ (Govt Notice)", tag: "GOVT_NOTICE", theme: "light", bg: "solid", color: "#16a34a", font: "serif", img: "hidden", border: "double", align: "center", slogan: "জরুরি সার্কুলার" },
  { id: 14, name: "🗳️ রাজনৈতিক বিবৃতি (Political Poster)", tag: "POLITICAL", theme: "dark", bg: "gradient", color: "#dc2626", font: "sans", img: "background", border: "thin-red", align: "center", slogan: "বিপ্লবী শুভেচ্ছা ও লাল সালাম" },
  { id: 15, name: "📍 অনুষ্ঠান কাভারেজ (Event Coverage)", tag: "EVENT_COV", theme: "light", bg: "gradient", color: "#ea580c", font: "sans", img: "top", border: "none", align: "left", slogan: "সরাসরি কাভারেজ" },
  { id: 16, name: "📣 সামাজিক সচেতনতা (Awareness)", tag: "AWARENESS", theme: "dark", bg: "gradient", color: "#e11d48", font: "sans", img: "top", border: "none", align: "center", slogan: "জনসচেতনতামূলক বার্তা" },
  { id: 17, name: "🎓 ছাত্র কার্যক্রম (Student Activity)", tag: "STUDENT_ACT", theme: "light", bg: "noise", color: "#B3002D", font: "sans", img: "top", border: "none", align: "left", slogan: "ছাত্র ফ্রন্ট কার্যক্রম" },
  { id: 18, name: "📚 গ্রন্থাগার ও প্রকাশনা (Library Book)", tag: "LIBRARY", theme: "cream", bg: "paper", color: "#854d0e", font: "serif", img: "left", border: "vintage", align: "left", slogan: "নতুন প্রকাশনা রিভিউ" },
  { id: 19, name: "🔬 গবেষণা ও রিপোর্ট (Research)", tag: "RESEARCH", theme: "light", bg: "geometric", color: "#0f766e", font: "mono", img: "top", border: "none", align: "left", slogan: "গবেষণা ও জরীপ" },
  { id: 20, name: "📢 ঘোষণা বোর্ড (Announcement)", tag: "ANNOUNCEMENT", theme: "cream", bg: "solid", color: "#ea580c", font: "sans", img: "hidden", border: "vintage", align: "center", slogan: "জরুরি সাধারণ ঘোষণা" },
  { id: 21, name: "📊 রিপোর্ট ও তথ্যচিত্র (Insights)", tag: "INSIGHTS", theme: "dark", bg: "gradient", color: "#16a34a", font: "sans", img: "top", border: "none", align: "left", slogan: "পরিসংখ্যান ও বিশ্লেষণ" },
  { id: 22, name: "🟥 স্কয়ার ব্র্যান্ড রেড (Brand Red Solid)", tag: "SQ_SPLIT_RED", theme: "dark", bg: "solid", color: "#b91c1c", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 23, name: "🍷 স্কয়ার ডিপ মেরুন (Deep Maroon Solid)", tag: "SQ_SPLIT_MAROON", theme: "dark", bg: "solid", color: "#580c1f", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 24, name: "🖤 স্কয়ার ডার্ক চারকোল (Dark Charcoal Solid)", tag: "SQ_SPLIT_CHARCOAL", theme: "dark", bg: "solid", color: "#18181b", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 25, name: "🤍 স্কয়ার ক্লিন হোয়াইট (Clean White Solid)", tag: "SQ_SPLIT_WHITE", theme: "light", bg: "solid", color: "#ffffff", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 26, name: "🔘 স্কয়ার সফট গ্রে (Soft Zinc Solid)", tag: "SQ_SPLIT_ZINC", theme: "light", bg: "solid", color: "#f4f4f5", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 27, name: "🌌 স্কয়ার মিডনাইট নেভি (Midnight Navy Solid)", tag: "SQ_SPLIT_NAVY", theme: "dark", bg: "solid", color: "#0f172a", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" },
  { id: 28, name: "🌲 স্কয়ার ফরেস্ট গ্রিন (Emerald Forest Solid)", tag: "SQ_SPLIT_GREEN", theme: "dark", bg: "solid", color: "#064e3b", font: "sans", img: "top", border: "none", align: "center", slogan: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট" }
];`;

// Replace zS in bundle
const zsStart = bundle.indexOf('const zS=[');
const zsEnd = bundle.indexOf('function GQ({', zsStart);

if (zsStart !== -1 && zsEnd !== -1) {
  bundle = bundle.slice(0, zsStart) + all28Templates + '\n' + bundle.slice(zsEnd);
  console.log('Successfully updated zS with all 28 templates!');
} else {
  console.error('Could not locate zS in bundle!');
}

fs.writeFileSync('bundle_with_28_templates.js', bundle, 'utf8');
console.log('Saved bundle_with_28_templates.js');
