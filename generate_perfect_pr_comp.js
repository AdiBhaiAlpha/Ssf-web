// Generator for pr_component_code.js
const fs = require('fs');

const code = `
function PressReleaseCreatorComp({ userEmail, onBack, setCurrentTab }) {
  const toast = Nm();
  
  // Master Press Release State initialized with DEFAULT_SSF_PRESS_RELEASE
  const [data, setData] = Q.useState({
    logoUrl: "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
    logoAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্টের লোগো",
    titleImageUrl: "https://i.ibb.co/R4BCPZ0B/20250130-143124.png",
    titleImageAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
    englishName: "Socialist Students' Front",
    districtName: "ময়মনসিংহ জেলা শাখা",
    releaseTitle: "সংবাদ বিজ্ঞপ্তি",
    releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
    showRefNumber: false,
    refNumber: "স্মারক নং: সছফ্র/মজশা/২০২৬/০৫",
    headline: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত ; তানজিল হোসেন মুনিম কে সভাপতি ও চিত্রণ ভট্টাচার্য কে সাধারণ সম্পাদক করে ১৭ সদস্য বিশিষ্ট কমিটি গঠন",
    bannerBgColor: "#c90d15",
    bodyText: "আজ সমাজতান্ত্রিক ছাত্র ফ্রন্ট, ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত হয়। জেলা শাখার সভাপতি আব্দুল্লাহ আল নাকিবের সভাপতিত্বে কাউন্সিল সভায় আরও উপস্থিত ছিলেন সমাজতান্ত্রিক ছাত্র ফ্রন্ট কেন্দ্রীয় কমিটির সাংগঠনিক সম্পাদক কমরেড সুহাইল আহমেদ শুভ; বাসদ ৫ নং জোনের সমন্বয়ক কমরেড ইমাম হুসাইন খোকন এবং বাসদ ময়মনসিংহ জেলা শাখার নেতৃবৃন্দ।\\n\\nকাউন্সিলের শুরুতেই সাধারণ সম্পাদকের রিপোর্ট পর্যালোচনা করা হয়। জাতীয় রাজনৈতিক পরিস্থিতির মূল্যায়ন, শিক্ষার সংকট সহ বিবিধ বিষয়ে আলোচনা হয়। কাউন্সিল থেকে আগামী দিনে শিক্ষা বাণিজ্যিকীকরণ-শিক্ষা সংকোচন সহ শিক্ষার উপর সর্বগ্রাসী আক্রমণের বিরুদ্ধে জোরদার আন্দোলন গড়ে তোলার সিদ্ধান্ত গ্রহণ করা হয়।\\n\\nসবশেষে দশম কাউন্সিলের মধ্য দিয়ে সর্বসম্মতিক্রমে ১৭ সদস্য বিশিষ্ট দশম জেলা কমিটি গঠন করা হয়। জেলা কমিটির সদস্যদের পরিচয় করিয়ে দেন সদ্যবিদায়ী কমিটির সভাপতি আব্দুল্লাহ আল নাকিব। দশম জেলা কমিটি নিম্নরূপ:",
    showCommittee: true,
    committeeDesignations: [
      { role: "সভাপতি", name: "তানজিল হোসেন মুনিম" },
      { role: "সহ-সভাপতি", name: "আবির মোহাম্মদ আকাশ" },
      { role: "সাধারণ সম্পাদক", name: "চিত্রণ ভট্টাচার্য" },
      { role: "সাংগঠনিক সম্পাদক", name: "সাদমান এহসান অরিন্দম" },
      { role: "দপ্তর সম্পাদক", name: "আরিফুল ইসলাম বিজয়" },
      { role: "অর্থ সম্পাদক", name: "জ্যোতি রায়" },
      { role: "প্রচার ও প্রকাশনা সম্পাদক", name: "প্রশান্ত বাসফোর" },
      { role: "পাঠাগার বিষয়ক সম্পাদক", name: "পূজা সরকার বর্ষা" },
      { role: "স্কুল বিষয়ক সম্পাদক", name: "শ্রাবণ" }
    ],
    membersTitle: "সদস্য:",
    committeeMembers: [
      "ওয়ালিউল্লাহ",
      "সুজন দাস",
      "প্রশান্ত দাস",
      "পান্না",
      "রিতু আক্তার",
      "ফাহমিদ বিন অনয়",
      "জীবন সরকার",
      "জহিরুল ইসলাম রুকন"
    ],
    signatureLabel: "বার্তাপ্রেরকঃ",
    signatureName: "আরিফুল ইসলাম বিজয়",
    signatureRole: "দプター সম্পাদক",
    signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
    signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
    showSignatureContact: false,
    signatureContactPhone: "০১৭১৮-৫৬৪০৪৮",
    signatureContactEmail: "ssfmym@gmail.com"
  });

  const [activeTab, setActiveTab] = Q.useState("header");
  const [mobileMode, setMobileMode] = Q.useState("editor"); // "editor" | "preview"
  const [isExporting, setIsExporting] = Q.useState(false);
  const [zoomLevel, setZoomLevel] = Q.useState(100);
  const [selectedPreset, setSelectedPreset] = Q.useState("council_10th");
  const [showPublishModal, setShowPublishModal] = Q.useState(false);
  const [isPublishing, setIsPublishing] = Q.useState(false);

  // Publish Form State
  const [publishTitle, setPublishTitle] = Q.useState(data.headline || data.releaseTitle || "সংবাদ বিজ্ঞপ্তি");
  const [publishExcerpt, setPublishExcerpt] = Q.useState(data.bodyText ? data.bodyText.substring(0, 150) + "..." : "");
  const [publishCategory, setPublishCategory] = Q.useState("official");
  const [publishDate, setPublishDate] = Q.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [publishPrivacy, setPublishPrivacy] = Q.useState("public"); // "public" | "private"
  const [publishIsPasswordProtected, setPublishIsPasswordProtected] = Q.useState(false);
  const [publishPassword, setPublishPassword] = Q.useState("");
  const [publishConfirmPassword, setPublishConfirmPassword] = Q.useState("");
  const [publishAttachImage, setPublishAttachImage] = Q.useState(true);

  // Auto-sync publish fields when data changes
  Q.useEffect(() => {
    setPublishTitle(data.headline || data.releaseTitle || "সংবাদ বিজ্ঞপ্তি");
    setPublishExcerpt(data.bodyText ? data.bodyText.substring(0, 160) + "..." : "");
  }, [data.headline, data.releaseTitle, data.bodyText]);

  // Update handlers
  const updateData = (field, val) => setData(prev => ({ ...prev, [field]: val }));

  const handlePresetChange = (presetId) => {
    setSelectedPreset(presetId);
    if (presetId === "education_protest") {
      setData(prev => ({
        ...prev,
        releaseTitle: "সংবাদ বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        headline: "জাতীয় বিশ্ববিদ্যালয় ও ময়মনসিংহের বিভিন্ন কলেজে অযৌক্তিক ফি বৃদ্ধি প্রত্যাহার এবং সার্বজনীন শিক্ষার দাবিতে সমাজতান্ত্রিক ছাত্র ফ্রন্টের বিক্ষোভ সমাবেশ",
        bodyText: "আজ সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার উদ্যোগে নগরীর প্রাণকেন্দ্রে সাধারণ শিক্ষার্থীদের অংশগ্রহণে এক বিক্ষোভ সমাবেশ ও স্মারকলিপি প্রদান কর্মসূচি অনুষ্ঠিত হয়।\\n\\nসমাবেশে নেতৃবৃন্দ বলেন, শিক্ষা কোনো পণ্য নয়, শিক্ষা মানুষের মৌলিক অধিকার। অথচ ক্রমাগত ফি বৃদ্ধি ও প্রশাসনিক অব্যবস্থাপনার কারণে সাধারণ ও মেহনতী পরিবারের শিক্ষার্থীদের উচ্চশিক্ষা গ্রহণের পথ রুদ্ধ হয়ে পড়ছে। অবিলম্বে বর্ধিত সকল প্রকার ফি প্রত্যাহার করতে হবে এবং শিক্ষাঙ্গনে গণতান্ত্রিক পরিবেশ নিশ্চিত করতে হবে।\\n\\nবিক্ষোভ মিছিলটি নগরীর প্রধান প্রধান সড়ক প্রদক্ষিণ করে জেলা প্রশাসক কার্যালয়ের সামনে এসে প্রতিবাদী সমাবেশের মাধ্যমে শেষ হয়।",
        showCommittee: false,
        committeeDesignations: [],
        committeeMembers: [],
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "আরিফুল ইসলাম বিজয়",
        signatureRole: "দপ্তর সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা"
      }));
      toast.success("শিক্ষা আন্দোলনের টেমপ্লেট লোড হয়েছে!");
    } else if (presetId === "condemnation_statement") {
      setData(prev => ({
        ...prev,
        releaseTitle: "জরুরি প্রেস বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        headline: "শান্তিপূর্ণ ছাত্র সমাবেশে বর্বরোচিত হামলা ও নেতাকর্মীদের আহতের ঘটনায় সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা সংসদের তীব্র নিন্দা ও প্রতিবাদ",
        bodyText: "শিক্ষার্থীদের যৌক্তিক অধিকার আদায়ের শান্তিপূর্ণ গণতান্ত্রিক কর্মসূচিতে দুর্বৃত্তদের হামলার ঘটনায় গভীর ক্ষোভ ও তীব্র নিন্দা প্রকাশ করেছে সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখা।\\n\\nএক যৌথ বিবৃতিতে জেলা সংসদের সভাপতি তানজিল হোসেন মুনিম ও সাধারণ সম্পাদক চিত্রণ ভট্টাচার্য বলেন, যৌক্তিক দাবির আন্দোলনকে স্তব্ধ করতে হামলা-মামলার পথ বেছে নেওয়া হয়েছে। অবিলম্বে হামলাকারীদের চিহ্নিত করে দৃষ্টান্তমূলক শাস্তির আওতায় আনতে হবে।\\n\\nঅন্যথায় সাধারণ ছাত্র সমাজকে সাথে নিয়ে ময়মনসিংহের রাজপথে সর্বাত্মক ছাত্র ধর্মঘট ও তীব্র গণপ্রতিরোধ গড়ে তোলা হবে।",
        showCommittee: false,
        signatureLabel: "বিবৃতিদাতাবৃন্দঃ",
        signatureName: "তানজিল হোসেন মুনিম ও চিত্রণ ভট্টাচার্য",
        signatureRole: "সভাপতি ও সাধারণ সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা সংসদ"
      }));
      toast.success("প্রতিবাদ বিবৃতির টেমপ্লেট লোড হয়েছে!");
    } else if (presetId === "condolence_tribute") {
      setData(prev => ({
        ...prev,
        releaseTitle: "শোক প্রস্তাব",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        headline: "প্রগতিশীল ছাত্র আন্দোলনের অগ্রসেনানী কমরেডের প্রয়াণে সমাজতান্ত্রিক ছাত্র ফ্রন্টের গভীর শোক ও শ্রদ্ধাঞ্জলি",
        bodyText: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহের আজীবন সংগ্রামী কমরেডের আকস্মিক প্রয়াণে সংগঠনের সকল স্তরের নেতাকর্মীদের মাঝে গভীর শোকের ছায়া নেমে এসেছে।\\n\\nবিপ্লবী সমাজ পরিবর্তনের লড়াইয়ে ও মেহনতী মানুষের মুক্তির সংগ্রামে তাঁর আপোষহীন অবদান ছাত্রসমাজ চিরদিন শ্রদ্ধার সাথে স্মরণ করবে। আমরা তাঁর শোকসন্তপ্ত পরিবারের প্রতি গভীর সমবেদনা জ্ঞাপন করছি।\\n\\nকমরেডের অসমাপ্ত বিপ্লবী কাজ সমাপ্ত করাই হবে তাঁর প্রতি আমাদের সর্বোচ্চ শ্রদ্ধাঞ্জলি।",
        showCommittee: false,
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "দপ্তর সেল",
        signatureRole: "দপ্তর বিভাগ",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা"
      }));
      toast.success("শোকবার্তার টেমপ্লেট লোড হয়েছে!");
    } else {
      // 10th Council default
      setData(prev => ({
        ...prev,
        releaseTitle: "সংবাদ বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ০৬ ডিসেম্বর, ২০২৫ খ্রিঃ",
        headline: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত ; তানজিল হোসেন মুনিম কে সভাপতি ও চিত্রণ ভট্টাচার্য কে সাধারণ সম্পাদক করে ১৭ সদস্য বিশিষ্ট কমিটি গঠন",
        bodyText: "আজ ৬ ডিসেম্বর, ২০২৫ সমাজতান্ত্রিক ছাত্র ফ্রন্ট, ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত হয়। জেলা শাখার সভাপতি আব্দুল্লাহ আল নাকিবের সভাপতিত্বে কাউন্সিল সভায় আরও উপস্থিত ছিলেন সমাজতান্ত্রিক ছাত্র ফ্রন্ট কেন্দ্রীয় কমিটির সাংগঠনিক সম্পাদক কমরেড সুহাইল আহমেদ শুভ; বাসদ ৫ নং জোনের সমন্বয়ক কমরেড ইমাম হুসাইন খোকন এবং বাসদ ময়মনসিংহ জেলা শাখার নেতৃবৃন্দ।\\n\\nকাউন্সিলের শুরুতেই সাধারণ সম্পাদকের রিপোর্ট পর্যালোচনা করা হয়। জাতীয় রাজনৈতিক পরিস্থিতির মূল্যায়ন, শিক্ষার সংকট সহ বিবিধ বিষয়ে আলোচনা হয়। কাউন্সিল থেকে আগামী দিনে শিক্ষা বাণিজ্যিকীকরণ-শিক্ষা সংকোচন সহ শিক্ষার উপর সর্বগ্রাসী আক্রমণের বিরুদ্ধে জোরদার আন্দোলন গড়ে তোলার সিদ্ধান্ত গ্রহণ করা হয়।\\n\\nসবশেষে দশম কাউন্সিলের মধ্য দিয়ে সর্বসম্মতিক্রমে ১৭ সদস্য বিশিষ্ট দশম জেলা কমিটি গঠন করা হয়। জেলা কমিটির সদস্যদের পরিচয় করিয়ে দেন সদ্যবিদায়ী কমিটির সভাপতি আব্দুল্লাহ আল নাকিব। দশম জেলা কমিটি নিম্নরূপ:",
        showCommittee: true,
        committeeDesignations: [
          { role: "সভাপতি", name: "তানজিল হোসেন মুনিম" },
          { role: "সহ-সভাপতি", name: "আবির মোহাম্মদ আকাশ" },
          { role: "সাধারণ সম্পাদক", name: "চিত্রণ ভট্টাচার্য" },
          { role: "সাংগঠনিক সম্পাদক", name: "সাদমান এহসান অরিন্দম" },
          { role: "দপ্তর সম্পাদক", name: "আরিফুল ইসলাম বিজয়" },
          { role: "অর্থ সম্পাদক", name: "জ্যোতি রায়" },
          { role: "প্রচার ও প্রকাশনা সম্পাদক", name: "প্রশান্ত বাসফোর" },
          { role: "পাঠাগার বিষয়ক সম্পাদক", name: "পূজা সরকার বর্ষা" },
          { role: "স্কুল বিষয়ক সম্পাদক", name: "শ্রাবণ" }
        ],
        membersTitle: "সদস্য:",
        committeeMembers: [
          "ওয়ালিউল্লাহ",
          "সুজন দাস",
          "প্রশান্ত দাস",
          "পান্না",
          "রিতু আক্তার",
          "ফাহমিদ বিন অনয়",
          "জীবন সরকার",
          "জহিরুল ইসলাম রুকন"
        ],
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "আরিফুল ইসলাম বিজয়",
        signatureRole: "দপ্তর সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা"
      }));
      toast.success("১০ম কাউন্সিলের মূল টেমপ্লেট লোড হয়েছে!");
    }
  };

  // Safe Canvas Gradient & Export
  const generateCleanCanvas = async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    let html2canvas;
    if (window.html2canvas) {
      html2canvas = window.html2canvas;
    } else {
      const mod = await import('/assets/html2canvas.esm-QH1iLAAe.js');
      html2canvas = mod.default || mod;
    }
    const el = document.getElementById("ssf-pr-render-target");
    if (!el) throw new Error("Render target element not found");

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 850,
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        const target = clonedDoc.getElementById("ssf-pr-render-target");
        if (target) {
          target.style.transform = "none";
          target.style.transformOrigin = "top left";
          target.style.width = "850px";
          target.style.margin = "0";
          target.style.boxShadow = "none";
          if (target.parentElement) {
            target.parentElement.style.transform = "none";
            target.parentElement.style.width = "850px";
            target.parentElement.style.padding = "0";
          }
        }
      }
    });
    return canvas;
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateCleanCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanTitle = (data.releaseTitle || "SSF_Press_Release").replace(/[^a-zA-Z0-9\\u0980-\\u09FF]/g, "_");
      link.download = cleanTitle + "_" + Date.now() + ".png";
      link.href = dataUrl;
      link.click();
      toast.success("প্রেস রিলিজের HD PNG সফলভাবে ডাউনলোড হয়েছে!");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("PNG রেন্ডারিংয়ে সমস্যা হয়েছে: " + (err.message || "Unknown error"));
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let txt = "=====================================\\n";
    txt += (data.releaseTitle || "সংবাদ বিজ্ঞপ্তি") + "\\n";
    txt += (data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট") + ", " + (data.districtName || "ময়মনসিংহ জেলা শাখা") + "\\n";
    txt += (data.englishName || "Socialist Students' Front") + "\\n";
    txt += (data.releaseDate || "") + "\\n";
    if (data.showRefNumber && data.refNumber) {
      txt += data.refNumber + "\\n";
    }
    txt += "=====================================\\n\\n";
    txt += "【 " + (data.headline || "") + " 】\\n\\n";
    txt += (data.bodyText || "") + "\\n\\n";

    if (data.showCommittee) {
      txt += "--- সাংগঠনিক তালিকা ---\\n";
      (data.committeeDesignations || []).forEach(item => {
        txt += item.role + ": " + item.name + "\\n";
      });
      if (data.committeeMembers && data.committeeMembers.length > 0) {
        txt += "\\n" + (data.membersTitle || "সদস্য:") + "\\n" + data.committeeMembers.join(", ") + "\\n";
      }
      txt += "\\n";
    }

    txt += "-------------------------------------\\n";
    txt += (data.signatureLabel || "বার্তাপ্রেরকঃ") + "\\n";
    txt += (data.signatureName || "") + "\\n";
    txt += (data.signatureRole || "") + "\\n";
    txt += (data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট") + "\\n";
    txt += (data.signatureOrgLine2 || "ময়মনসিংহ জেলা শাখা") + "\\n";
    if (data.showSignatureContact) {
      if (data.signatureContactPhone) txt += "মোবাইল: " + data.signatureContactPhone + "\\n";
      if (data.signatureContactEmail) txt += "ইমেইল: " + data.signatureContactEmail + "\\n";
    }
    txt += "=====================================\\n";

    navigator.clipboard.writeText(txt);
    toast.success("প্রেস রিলিজের সম্পূর্ণ টেক্সট ক্লিপবোর্ডে কপি হয়েছে!");
  };

  const handlePublishCircular = async (e) => {
    e.preventDefault();
    if (!publishTitle.trim()) {
      toast.error("সার্কুলারের শিরোনাম দেওয়া আবশ্যক।");
      return;
    }

    const isPrivate = publishPrivacy === "private";
    if (isPrivate && publishIsPasswordProtected) {
      if (!publishPassword.trim()) {
        toast.error("পাসওয়ার্ড সুরক্ষা সক্রিয় থাকলে পাসওয়ার্ড দেওয়া বাধ্যতামূলক।");
        return;
      }
      if (publishPassword !== publishConfirmPassword) {
        toast.error("উভয় পাসওয়ার্ড একই হতে হবে। অনুগ্রহ করে যাচাই করুন।");
        return;
      }
    }

    setIsPublishing(true);
    try {
      let attachedImageUrl = "";
      if (publishAttachImage) {
        try {
          const canvas = await generateCleanCanvas();
          attachedImageUrl = canvas.toDataURL("image/png", 0.9);
        } catch (imgErr) {
          console.warn("Could not attach canvas snapshot:", imgErr);
        }
      }

      // Generate full formatted text content
      let fullContent = "";
      fullContent += (data.headline ? data.headline + "\\n\\n" : "");
      fullContent += (data.bodyText || "") + "\\n\\n";
      if (data.showCommittee) {
        fullContent += "সাংগঠনিক তালিকা:\\n";
        (data.committeeDesignations || []).forEach(d => {
          fullContent += d.role + ": " + d.name + "\\n";
        });
        if (data.committeeMembers && data.committeeMembers.length > 0) {
          fullContent += "\\n" + (data.membersTitle || "সদস্য:") + "\\n" + data.committeeMembers.join(", ") + "\\n";
        }
      }
      fullContent += "\\n\\n" + (data.signatureLabel || "বার্তাপ্রেরকঃ") + "\\n" +
        (data.signatureName || "") + "\\n" +
        (data.signatureRole || "") + "\\n" +
        (data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট") + ", " +
        (data.signatureOrgLine2 || "ময়মনসিংহ জেলা শাখা");

      const payload = {
        circular: {
          title: publishTitle.trim(),
          excerpt: publishExcerpt.trim(),
          content: fullContent,
          category: publishCategory,
          date: publishDate,
          isPrivate: isPrivate,
          isPasswordProtected: isPrivate && publishIsPasswordProtected,
          password: isPrivate && publishIsPasswordProtected ? publishPassword.trim() : void 0,
          pressReleaseData: data,
          image: attachedImageUrl || void 0
        },
        userEmail: userEmail || "chitronbhattacharjee@gmail.com"
      };

      const res = await fetch("/api/circulars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "সার্কুলার প্রকাশ করতে ব্যর্থ হয়েছে");
      }

      const savedCircular = await res.json();
      toast.success("প্রেস রিলিজটি সফলভাবে নোটিশ ও সার্কুলার বোর্ডে প্রকাশিত হয়েছে!");
      setShowPublishModal(false);
      
      if (setCurrentTab) {
        setCurrentTab("circulars");
      }
    } catch (err) {
      console.error("Publish circular error:", err);
      toast.error("সার্কুলার প্রকাশে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  // Committee designation row helpers
  const handleRoleChange = (idx, newRole) => {
    const updated = [...(data.committeeDesignations || [])];
    updated[idx].role = newRole;
    updateData("committeeDesignations", updated);
  };

  const handleNameChange = (idx, newName) => {
    const updated = [...(data.committeeDesignations || [])];
    updated[idx].name = newName;
    updateData("committeeDesignations", updated);
  };

  const addDesignation = () => {
    const updated = [...(data.committeeDesignations || []), { role: "সদস্য", name: "" }];
    updateData("committeeDesignations", updated);
  };

  const removeDesignation = (idx) => {
    const updated = [...(data.committeeDesignations || [])];
    updated.splice(idx, 1);
    updateData("committeeDesignations", updated);
  };

  const handleMembersTextChange = (text) => {
    const list = text.split(/[,\\n]/).map(s => s.trim()).filter(Boolean);
    updateData("committeeMembers", list);
  };

  return i.jsxs("div", {
    className: "min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-16",
    children: [
      // Top Institutional Command Bar
      i.jsx("div", {
        className: "bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-xs",
        children: i.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3",
          children: [
            i.jsxs("div", {
              className: "flex items-center space-x-3",
              children: [
                i.jsxs("button", {
                  onClick: onBack,
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-rose-600 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                    "ফিরে যান"
                  ]
                }),
                i.jsxs("div", {
                  className: "border-l border-zinc-300 dark:border-zinc-700 pl-3",
                  children: [
                    i.jsx("h1", { className: "text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-tight", children: "প্রেস রিলিজ ও সংবাদ বিজ্ঞপ্তি ক্রিয়েটর" }),
                    i.jsx("p", { className: "text-[11px] text-rose-600 dark:text-rose-400 font-medium", children: "অফিসিয়াল A4 ফরম্যাট ও তাৎক্ষণিক HD রেন্ডারিং ইঞ্জিন" })
                  ]
                })
              ]
            }),

            // Action Toolbar
            i.jsxs("div", {
              className: "flex flex-wrap items-center gap-2",
              children: [
                // Preset Selector
                i.jsxs("select", {
                  value: selectedPreset,
                  onChange: (e) => handlePresetChange(e.target.value),
                  className: "px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20",
                  children: [
                    i.jsx("option", { value: "council_10th", children: "১০ম কাউন্সিল ও জেলা কমিটি" }),
                    i.jsx("option", { value: "education_protest", children: "শিক্ষা আন্দোলন ও বিক্ষোভ" }),
                    i.jsx("option", { value: "condemnation_statement", children: "হামলার তীব্র নিন্দা ও প্রতিবাদ" }),
                    i.jsx("option", { value: "condolence_tribute", children: "শোকবার্তা ও শ্রদ্ধাঞ্জলি" })
                  ]
                }),
                // Copy Text
                i.jsxs("button", {
                  onClick: handleCopyText,
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold rounded-md transition-colors cursor-pointer",
                  title: "প্রেসের জন্য টেক্সট কপি করুন",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4 text-zinc-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) }),
                    "কপি টেক্সট"
                  ]
                }),
                // Print
                i.jsxs("button", {
                  onClick: handlePrint,
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold rounded-md transition-colors cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4 text-zinc-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }),
                    "প্রিন্ট / PDF"
                  ]
                }),
                // Publish as Circular
                i.jsxs("button", {
                  onClick: () => setShowPublishModal(true),
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-md shadow-sm transition-all cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                    "সার্কুলার হিসেবে প্রকাশ"
                  ]
                }),
                // Download PNG
                i.jsxs("button", {
                  onClick: handleExportPNG,
                  disabled: isExporting,
                  className: "inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-md shadow-sm transition-all cursor-pointer disabled:opacity-50",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                    isExporting ? "রেন্ডারিং..." : "PNG ডাউনলোড"
                  ]
                })
              ]
            })
          ]
        })
      }),

      // Mobile Mode Switcher (Editor vs Live Preview)
      i.jsx("div", {
        className: "lg:hidden max-w-7xl mx-auto px-4 mt-4",
        children: i.jsxs("div", {
          className: "grid grid-cols-2 bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg text-xs font-semibold",
          children: [
            i.jsx("button", {
              onClick: () => setMobileMode("editor"),
              className: "py-2 text-center rounded-md transition-all " + (mobileMode === "editor" ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-sm" : "text-zinc-600 dark:text-zinc-400"),
              children: "📝 এডিটর ফর্ম"
            }),
            i.jsx("button", {
              onClick: () => setMobileMode("preview"),
              className: "py-2 text-center rounded-md transition-all " + (mobileMode === "preview" ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-sm" : "text-zinc-600 dark:text-zinc-400"),
              children: "👁️ লাইভ A4 প্রিভিউ"
            })
          ]
        })
      }),

      // Main Workstage Grid
      i.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 mt-6",
        children: i.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
          children: [
            // Left Column: Visual Editor Tabs (6 Cols)
            i.jsxs("div", {
              className: (mobileMode === "editor" ? "block" : "hidden lg:block") + " lg:col-span-5 xl:col-span-5 space-y-4",
              children: [
                // Editor Navigation Pills
                i.jsx("div", {
                  className: "flex items-center gap-1 overflow-x-auto pb-1 bg-white dark:bg-zinc-900 p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs",
                  children: [
                    { id: "header", label: "হেডার ও তারিখ" },
                    { id: "headline", label: "শিরোনাম ও ব্যানার" },
                    { id: "body", label: "মূল বক্তব্য" },
                    { id: "committee", label: "কমিটি তালিকা" },
                    { id: "signature", label: "স্বাক্ষরকারী" }
                  ].map(tab => {
                    const isCur = activeTab === tab.id;
                    return i.jsx("button", {
                      key: tab.id,
                      onClick: () => setActiveTab(tab.id),
                      className: "px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all " + (
                        isCur
                          ? "bg-rose-600 text-white shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      ),
                      children: tab.label
                    }, tab.id);
                  })
                }),

                // Tab Content Panes
                i.jsxs("div", {
                  className: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-xs space-y-4 text-xs",
                  children: [
                    // Tab 1: Header
                    activeTab === "header" && i.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "বিজ্ঞপ্তির মূল ধরন / শিরোনাম" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.releaseTitle,
                              onChange: (e) => updateData("releaseTitle", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "প্রকাশের তারিখ (বাংলায়)" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.releaseDate,
                              onChange: (e) => updateData("releaseDate", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "শাখার নাম" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.districtName,
                              onChange: (e) => updateData("districtName", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "ইংরেজি প্রাতিষ্ঠানিক নাম" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.englishName,
                              onChange: (e) => updateData("englishName", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "pt-2 border-t border-zinc-200 dark:border-zinc-800",
                          children: [
                            i.jsxs("label", {
                              className: "flex items-center gap-2 cursor-pointer",
                              children: [
                                i.jsx("input", {
                                  type: "checkbox",
                                  checked: data.showRefNumber,
                                  onChange: (e) => updateData("showRefNumber", e.target.checked),
                                  className: "rounded text-rose-600 focus:ring-rose-500"
                                }),
                                i.jsx("span", { className: "font-semibold text-zinc-800 dark:text-zinc-200", children: "স্মারক নম্বর প্রদর্শন করুন" })
                              ]
                            }),
                            data.showRefNumber && i.jsx("input", {
                              type: "text",
                              value: data.refNumber,
                              onChange: (e) => updateData("refNumber", e.target.value),
                              placeholder: "স্মারক নং: সছফ্র/মজশা/২০২৬/০১",
                              className: "mt-2 w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-white"
                            })
                          ]
                        })
                      ]
                    }),

                    // Tab 2: Headline
                    activeTab === "headline" && i.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "লাল ব্যানার হেডলাইন (বোল্ড সংবাদ শিরোনাম)" }),
                            i.jsx("textarea", {
                              rows: 4,
                              value: data.headline,
                              onChange: (e) => updateData("headline", e.target.value),
                              placeholder: "কাউন্সিল বা সংবাদ বিজ্ঞপ্তির প্রধান শিরোনাম লিখুন...",
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white leading-relaxed"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            i.jsx("label", { className: "font-bold text-zinc-700 dark:text-zinc-300", children: "ব্যানারের পটভূমির রঙ:" }),
                            i.jsx("input", {
                              type: "color",
                              value: data.bannerBgColor || "#c90d15",
                              onChange: (e) => updateData("bannerBgColor", e.target.value),
                              className: "w-8 h-8 rounded border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                            }),
                            i.jsx("span", { className: "font-mono text-zinc-500", children: data.bannerBgColor || "#c90d15" })
                          ]
                        })
                      ]
                    }),

                    // Tab 3: Body
                    activeTab === "body" && i.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "প্রেস রিলিজের মূল বিবরণ ও বক্তব্য (অনুচ্ছেদসমূহ)" }),
                            i.jsx("textarea", {
                              rows: 10,
                              value: data.bodyText,
                              onChange: (e) => updateData("bodyText", e.target.value),
                              placeholder: "প্রেস রিলিজের বিস্তারিত বক্তব্য লিখুন। নতুন অনুচ্ছেদের জন্য ডাবল এন্টার চাপুন...",
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white leading-relaxed"
                            })
                          ]
                        })
                      ]
                    }),

                    // Tab 4: Committee
                    activeTab === "committee" && i.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        i.jsxs("label", {
                          className: "flex items-center gap-2 cursor-pointer pb-2 border-b border-zinc-200 dark:border-zinc-800",
                          children: [
                            i.jsx("input", {
                              type: "checkbox",
                              checked: data.showCommittee,
                              onChange: (e) => updateData("showCommittee", e.target.checked),
                              className: "rounded text-rose-600 focus:ring-rose-500"
                            }),
                            i.jsx("span", { className: "font-bold text-zinc-800 dark:text-zinc-200", children: "কমিটি বা পদাধিকারীদের তালিকা অন্তর্ভুক্ত করুন" })
                          ]
                        }),
                        data.showCommittee && i.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            i.jsx("div", { className: "font-bold text-zinc-700 dark:text-zinc-300", children: "পদবী ও দায়িত্বপ্রাপ্ত নেতৃবৃন্দ (বাম কলাম):" }),
                            (data.committeeDesignations || []).map((item, idx) => {
                              return i.jsxs("div", {
                                key: idx,
                                className: "flex items-center gap-2",
                                children: [
                                  i.jsx("input", {
                                    type: "text",
                                    value: item.role,
                                    onChange: (e) => handleRoleChange(idx, e.target.value),
                                    placeholder: "পদবী",
                                    className: "w-1/3 px-2 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                                  }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: item.name,
                                    onChange: (e) => handleNameChange(idx, e.target.value),
                                    placeholder: "নাম",
                                    className: "w-1/2 px-2 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                                  }),
                                  i.jsx("button", {
                                    type: "button",
                                    onClick: () => removeDesignation(idx),
                                    className: "p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded cursor-pointer",
                                    children: "✕"
                                  })
                                ]
                              }, idx);
                            }),
                            i.jsx("button", {
                              type: "button",
                              onClick: addDesignation,
                              className: "px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold rounded text-xs cursor-pointer",
                              children: "+ নতুন পদবী যোগ করুন"
                            }),
                            i.jsxs("div", {
                              className: "pt-4 border-t border-zinc-200 dark:border-zinc-800",
                              children: [
                                i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "সাধারণ সদস্য তালিকা (কমা দিয়ে পৃথককৃত):" }),
                                i.jsx("textarea", {
                                  rows: 3,
                                  value: (data.committeeMembers || []).join(", "),
                                  onChange: (e) => handleMembersTextChange(e.target.value),
                                  placeholder: "ওয়ালিউল্লাহ, সৃজন দাস, পান্না, রিতু...",
                                  className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    }),

                    // Tab 5: Signature
                    activeTab === "signature" && i.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "স্বাক্ষর লেবেল" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.signatureLabel,
                              onChange: (e) => updateData("signatureLabel", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "নাম" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.signatureName,
                              onChange: (e) => updateData("signatureName", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "পদবী" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.signatureRole,
                              onChange: (e) => updateData("signatureRole", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "সংগঠনের নাম (লাইন ১)" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.signatureOrgLine1,
                              onChange: (e) => updateData("signatureOrgLine1", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                            })
                          ]
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("label", { className: "block font-bold text-zinc-700 dark:text-zinc-300 mb-1", children: "শাখার নাম (লাইন ২)" }),
                            i.jsx("input", {
                              type: "text",
                              value: data.signatureOrgLine2,
                              onChange: (e) => updateData("signatureOrgLine2", e.target.value),
                              className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),

            // Right Column: Live A4 Visual Canvas (7 Cols)
            i.jsxs("div", {
              className: (mobileMode === "preview" ? "block" : "hidden lg:block") + " lg:col-span-7 xl:col-span-7 space-y-4",
              children: [
                // Zoom & Canvas Controls Bar
                i.jsxs("div", {
                  className: "flex items-center justify-between bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs text-xs font-mono",
                  children: [
                    i.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        i.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-600" }),
                        i.jsx("span", { className: "font-bold text-zinc-800 dark:text-zinc-200", children: "A4 ক্যানভাস রেন্ডারার" })
                      ]
                    }),
                    i.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        i.jsx("button", {
                          onClick: () => setZoomLevel(prev => Math.max(50, prev - 10)),
                          className: "px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 font-bold",
                          children: "−"
                        }),
                        i.jsxs("span", { className: "w-12 text-center text-zinc-600 dark:text-zinc-400", children: [zoomLevel, "%"] }),
                        i.jsx("button", {
                          onClick: () => setZoomLevel(prev => Math.min(150, prev + 10)),
                          className: "px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 font-bold",
                          children: "+"
                        }),
                        i.jsx("button", {
                          onClick: () => setZoomLevel(100),
                          className: "px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded hover:bg-zinc-200 text-[10px]",
                          children: "100%"
                        })
                      ]
                    })
                  ]
                }),

                // Interactive Scaled Stage (Supports Responsive Zoom & Exact 850px Dimensions)
                i.jsx("div", {
                  className: "overflow-auto bg-zinc-200 dark:bg-zinc-900/80 p-4 sm:p-6 rounded-xl border border-zinc-300 dark:border-zinc-800 flex justify-center items-start shadow-inner min-h-[600px]",
                  children: i.jsx("div", {
                    style: {
                      transform: "scale(" + (zoomLevel / 100) + ")",
                      transformOrigin: "top center",
                      transition: "transform 0.15s ease-out"
                    },
                    children: i.jsxs("div", {
                      id: "ssf-pr-render-target",
                      className: "ssf-pr-document bg-white text-black shadow-2xl relative select-text",
                      style: {
                        width: "850px",
                        minHeight: "1202px",
                        padding: "45px 55px 40px 55px",
                        boxSizing: "border-box",
                        fontFamily: "'Bornopata', 'Hind Siliguri', 'Tiro Bangla', sans-serif"
                      },
                      children: [
                        // Red Gradient Accent Stripe on top
                        i.jsx("div", {
                          style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "6px",
                            background: "linear-gradient(90deg, #c90d15, #e11d48, #c90d15)"
                          }
                        }),

                        // 1. Header Layout
                        i.jsxs("div", {
                          className: "ssf-pr-header flex justify-between items-start pb-4 border-b-[2px] border-zinc-900 mb-4",
                          children: [
                            // Left Brand Emblem & Texts
                            i.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                i.jsx("img", {
                                  src: data.logoUrl,
                                  alt: data.logoAlt,
                                  referrerPolicy: "no-referrer",
                                  style: { width: "65px", height: "65px", objectFit: "contain" }
                                }),
                                i.jsxs("div", {
                                  children: [
                                    i.jsx("img", {
                                      src: data.titleImageUrl,
                                      alt: data.titleImageAlt,
                                      referrerPolicy: "no-referrer",
                                      style: { height: "34px", objectFit: "contain", marginBottom: "2px" }
                                    }),
                                    i.jsx("div", {
                                      style: { fontSize: "14px", fontWeight: "700", color: "#18181b", fontFamily: "'Bornopata Bold', 'Bornopata', sans-serif" },
                                      children: data.districtName
                                    }),
                                    i.jsx("div", {
                                      style: { fontSize: "11px", fontWeight: "600", color: "#71717a", fontFamily: "sans-serif" },
                                      children: data.englishName
                                    })
                                  ]
                                })
                              ]
                            }),

                            // Right Meta Badges
                            i.jsxs("div", {
                              className: "text-right flex flex-col justify-between items-end h-[65px]",
                              children: [
                                i.jsx("div", {
                                  style: {
                                    display: "inline-block",
                                    padding: "4px 14px",
                                    backgroundColor: "#c90d15",
                                    color: "#ffffff",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    borderRadius: "3px",
                                    fontFamily: "'Bornopata Bold', 'Bornopata', sans-serif",
                                    letterSpacing: "0.5px"
                                  },
                                  children: data.releaseTitle
                                }),
                                i.jsxs("div", {
                                  children: [
                                    data.showRefNumber && data.refNumber && i.jsx("div", {
                                      style: { fontSize: "11px", color: "#52525b", fontFamily: "'Bornopata', monospace", marginBottom: "2px" },
                                      children: data.refNumber
                                    }),
                                    i.jsx("div", {
                                      style: { fontSize: "12px", fontWeight: "600", color: "#18181b", fontFamily: "'Bornopata', sans-serif" },
                                      children: data.releaseDate
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        }),

                        // 2. Headline Banner
                        i.jsx("div", {
                          className: "ssf-pr-headline-banner my-4 text-center text-white p-3 rounded-xs font-bold leading-relaxed",
                          style: {
                            backgroundColor: data.bannerBgColor || "#c90d15",
                            fontSize: "15.5px",
                            fontFamily: "'Bornopata Bold', 'Bornopata', sans-serif",
                            letterSpacing: "0.2px"
                          },
                          children: data.headline
                        }),

                        // 3. Body Text (Multi-paragraph formatted)
                        i.jsx("div", {
                          className: "ssf-pr-body-text my-5 text-zinc-900 leading-[1.8] text-justify space-y-3",
                          style: {
                            fontSize: "13.5px",
                            fontFamily: "'Bornopata', 'Hind Siliguri', 'Tiro Bangla', sans-serif"
                          },
                          children: (data.bodyText || "").split("\\n").map((para, pIdx) => {
                            if (!para.trim()) return null;
                            return i.jsx("p", { style: { margin: "0 0 10px 0", textIndent: "24px" }, children: para }, pIdx);
                          })
                        }),

                        // 4. Two-Column Committee Layout
                        data.showCommittee && i.jsxs("div", {
                          className: "ssf-pr-committee-section my-5 p-4 bg-zinc-50 border border-zinc-200 rounded-sm grid grid-cols-2 gap-6 items-start text-xs",
                          style: { fontFamily: "'Bornopata', 'Hind Siliguri', sans-serif" },
                          children: [
                            // Left Column: Designations
                            i.jsx("div", {
                              className: "space-y-1.5",
                              children: (data.committeeDesignations || []).map((item, dIdx) => {
                                return i.jsxs("div", {
                                  className: "flex items-baseline justify-between border-b border-zinc-200/60 pb-1 text-[12.5px]",
                                  children: [
                                    i.jsx("span", { style: { fontWeight: "700", color: "#18181b" }, children: item.role + ":" }),
                                    i.jsx("span", { style: { color: "#27272a" }, children: item.name })
                                  ]
                                }, dIdx);
                              })
                            }),

                            // Right Column: General Members
                            i.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                i.jsx("div", {
                                  style: { fontWeight: "700", color: "#18181b", fontSize: "13px" },
                                  children: data.membersTitle || "সদস্য:"
                                }),
                                i.jsx("div", {
                                  style: { color: "#27272a", fontSize: "12.5px", lineHeight: "1.8" },
                                  children: (data.committeeMembers || []).join(", ")
                                })
                              ]
                            })
                          ]
                        }),

                        // 5. Signatory Block
                        i.jsxs("div", {
                          className: "ssf-pr-signature-wrap mt-8 pt-4 flex justify-end items-end",
                          children: [
                            i.jsxs("div", {
                              className: "text-right space-y-0.5",
                              style: { fontFamily: "'Bornopata', sans-serif" },
                              children: [
                                i.jsx("div", { style: { fontSize: "12px", fontWeight: "700", color: "#52525b" }, children: data.signatureLabel }),
                                i.jsx("div", { style: { fontSize: "14px", fontWeight: "700", color: "#18181b" }, children: data.signatureName }),
                                i.jsx("div", { style: { fontSize: "12.5px", fontWeight: "600", color: "#3f3f46" }, children: data.signatureRole }),
                                i.jsx("div", { style: { fontSize: "12px", color: "#52525b" }, children: data.signatureOrgLine1 }),
                                i.jsx("div", { style: { fontSize: "12px", color: "#52525b" }, children: data.signatureOrgLine2 }),
                                data.showSignatureContact && i.jsxs("div", {
                                  className: "pt-1 text-[11px] text-zinc-500 font-mono",
                                  children: [
                                    data.signatureContactPhone && i.jsx("div", { children: "মোবাইল: " + data.signatureContactPhone }),
                                    data.signatureContactEmail && i.jsx("div", { children: "ইমেইল: " + data.signatureContactEmail })
                                  ]
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  })
                })
              ]
            })
          ]
        })
      }),

      // Publish as Circular Modal
      showPublishModal && i.jsx("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans",
        children: i.jsxs("div", {
          className: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 text-zinc-900 dark:text-white",
          children: [
            // Modal Header
            i.jsxs("div", {
              className: "flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("h2", { className: "text-lg font-bold text-zinc-900 dark:text-white", children: "প্রেস রিলিজকে সার্কুলার বোর্ডে প্রকাশ করুন" }),
                    i.jsx("p", { className: "text-xs text-zinc-500", children: "অফিসিয়াল সার্কুলার ও নোটিশ বোর্ডে সংযুক্ত করার জন্য তথ্য ও প্রাইভেসি নির্ধারণ করুন" })
                  ]
                }),
                i.jsx("button", {
                  onClick: () => setShowPublishModal(false),
                  className: "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-lg cursor-pointer",
                  children: "✕"
                })
              ]
            }),

            // Form
            i.jsxs("form", {
              onSubmit: handlePublishCircular,
              className: "space-y-4 text-xs",
              children: [
                // Title
                i.jsxs("div", {
                  children: [
                    i.jsx("label", { className: "block font-bold mb-1 text-zinc-700 dark:text-zinc-300", children: "সার্কুলারের শিরোনাম *" }),
                    i.jsx("input", {
                      type: "text",
                      required: true,
                      value: publishTitle,
                      onChange: (e) => setPublishTitle(e.target.value),
                      className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                    })
                  ]
                }),

                // Excerpt
                i.jsxs("div", {
                  children: [
                    i.jsx("label", { className: "block font-bold mb-1 text-zinc-700 dark:text-zinc-300", children: "সংক্ষিপ্ত বিবরণ / ভূমিকা" }),
                    i.jsx("textarea", {
                      rows: 3,
                      value: publishExcerpt,
                      onChange: (e) => setPublishExcerpt(e.target.value),
                      className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-rose-500/20 text-zinc-900 dark:text-white"
                    })
                  ]
                }),

                // Date & Category Grid
                i.jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", { className: "block font-bold mb-1 text-zinc-700 dark:text-zinc-300", children: "প্রকাশের তারিখ" }),
                        i.jsx("input", {
                          type: "date",
                          value: publishDate,
                          onChange: (e) => setPublishDate(e.target.value),
                          className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-white"
                        })
                      ]
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", { className: "block font-bold mb-1 text-zinc-700 dark:text-zinc-300", children: "ক্যাটাগরি" }),
                        i.jsxs("select", {
                          value: publishCategory,
                          onChange: (e) => setPublishCategory(e.target.value),
                          className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-white",
                          children: [
                            i.jsx("option", { value: "official", children: "অফিসিয়াল সার্কুলার" }),
                            i.jsx("option", { value: "notice", children: "সাধারণ নোটিশ" }),
                            i.jsx("option", { value: "resolution", children: "কমিটি রেজোলিউশন" }),
                            i.jsx("option", { value: "press-release", children: "প্রেস বিজ্ঞপ্তি" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // Privacy Mode Cards
                i.jsxs("div", {
                  className: "space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800",
                  children: [
                    i.jsx("label", { className: "block font-bold text-zinc-800 dark:text-zinc-200", children: "প্রাইভেসি মোড (অ্যাক্সেস কন্ট্রোল):" }),
                    i.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                      children: [
                        // Public Card
                        i.jsxs("div", {
                          onClick: () => { setPublishPrivacy("public"); setPublishIsPasswordProtected(false); },
                          className: "p-3 rounded-lg border cursor-pointer transition-all " + (
                            publishPrivacy === "public"
                              ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                          ),
                          children: [
                            i.jsxs("div", {
                              className: "flex items-center gap-2 font-bold text-zinc-900 dark:text-white",
                              children: [
                                i.jsx("span", { className: "text-base", children: "🌍" }),
                                "সবার জন্য উন্মুক্ত"
                              ]
                            }),
                            i.jsx("p", { className: "text-[11px] text-zinc-500 mt-1", children: "যেকোনো ভিজিটর বা সাধারণ শিক্ষার্থী সার্কুলারটি দেখতে পাবে।" })
                          ]
                        }),

                        // Member Only Card
                        i.jsxs("div", {
                          onClick: () => setPublishPrivacy("private"),
                          className: "p-3 rounded-lg border cursor-pointer transition-all " + (
                            publishPrivacy === "private"
                              ? "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 ring-1 ring-rose-500"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                          ),
                          children: [
                            i.jsxs("div", {
                              className: "flex items-center gap-2 font-bold text-zinc-900 dark:text-white",
                              children: [
                                i.jsx("span", { className: "text-base", children: "🔒" }),
                                "সদস্যদের জন্য সংরক্ষিত"
                              ]
                            }),
                            i.jsx("p", { className: "text-[11px] text-zinc-500 mt-1", children: "শুধুমাত্র অনুমোদিত ও নিবন্ধিত সদস্যরা দেখতে পাবে।" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // Password Protection Section (Only if Member-Only)
                publishPrivacy === "private" && i.jsxs("div", {
                  className: "p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg space-y-3",
                  children: [
                    i.jsxs("label", {
                      className: "flex items-center gap-2 cursor-pointer font-bold text-zinc-800 dark:text-zinc-200",
                      children: [
                        i.jsx("input", {
                          type: "checkbox",
                          checked: publishIsPasswordProtected,
                          onChange: (e) => setPublishIsPasswordProtected(e.target.checked),
                          className: "rounded text-rose-600 focus:ring-rose-500"
                        }),
                        "🔐 সার্কুলারটিতে অতিরিক্ত পাসওয়ার্ড সুরক্ষা যুক্ত করতে চান?"
                      ]
                    }),

                    publishIsPasswordProtected && i.jsxs("div", {
                      className: "space-y-3 pt-2",
                      children: [
                        i.jsx("p", { className: "text-[11px] text-zinc-500", children: "নিবন্ধিত সদস্যদেরও নথিটি উন্মুক্ত করতে এই পাসওয়ার্ডটি দিতে হবে। পাসওয়ার্ড সার্ভার-সাইডে এনক্রিপ্ট হয়ে সংরক্ষিত থাকে।" }),
                        i.jsxs("div", {
                          className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                          children: [
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", { className: "block font-semibold mb-1 text-zinc-700 dark:text-zinc-300", children: "পাসওয়ার্ড দিন *" }),
                                i.jsx("input", {
                                  type: "password",
                                  required: true,
                                  value: publishPassword,
                                  onChange: (e) => setPublishPassword(e.target.value),
                                  placeholder: "গোপন পাসওয়ার্ড",
                                  className: "w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                                })
                              ]
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("label", { className: "block font-semibold mb-1 text-zinc-700 dark:text-zinc-300", children: "পাসওয়ার্ড নিশ্চিত করুন *" }),
                                i.jsx("input", {
                                  type: "password",
                                  required: true,
                                  value: publishConfirmPassword,
                                  onChange: (e) => setPublishConfirmPassword(e.target.value),
                                  placeholder: "পুনরায় পাসওয়ার্ড দিন",
                                  className: "w-full px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-900 dark:text-white"
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // Attach HD Image toggle
                i.jsxs("label", {
                  className: "flex items-center gap-2 cursor-pointer pt-1",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: publishAttachImage,
                      onChange: (e) => setPublishAttachImage(e.target.checked),
                      className: "rounded text-rose-600 focus:ring-rose-500"
                    }),
                    i.jsx("span", { className: "font-semibold text-zinc-700 dark:text-zinc-300", children: "সার্কুলারের সাথে প্রেস রিলিজের HD ইমেজ স্ন্যাপশট সংযুক্ত করুন" })
                  ]
                }),

                // Modal Actions
                i.jsxs("div", {
                  className: "pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3",
                  children: [
                    i.jsx("button", {
                      type: "button",
                      onClick: () => setShowPublishModal(false),
                      className: "px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-md transition-colors cursor-pointer",
                      children: "বাতিল"
                    }),
                    i.jsx("button", {
                      type: "submit",
                      disabled: isPublishing,
                      className: "px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-md shadow-sm transition-all cursor-pointer disabled:opacity-50",
                      children: isPublishing ? "প্রকাশ করা হচ্ছে..." : "এখনই প্রকাশ করুন"
                    })
                  ]
                })
              ]
            })
          ]
        })
      })
    ]
  });
}
`;

fs.writeFileSync('pr_component_code.js', code, 'utf8');
console.log('Saved upgraded pr_component_code.js successfully!');
