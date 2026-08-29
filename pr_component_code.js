
function PressReleaseCreatorComp({ userEmail: a, onBack: t, setCurrentTab: s }) {
  const DEFAULT_DATA = {
    logoUrl: "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
    logoAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্টের লোগো",
    titleImageUrl: "https://i.ibb.co/R4BCPZ0B/20250130-143124.png",
    titleImageAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
    englishName: "Socialist Students' Front",
    districtName: "ময়মনসিংহ জেলা শাখা",
    releaseTitle: "সংবাদ বিজ্ঞপ্তি",
    releaseDate: "তারিখঃ ০৬ ডিসেম্বর, ২০২৫ খ্রিঃ",
    showRefNumber: false,
    refNumber: "স্মারক নং: সছফ্র/মজশা/২০২৫/১০",
    headline: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত ; তানজিল হোসেন মুনিম কে সভাপতি ও চিত্রণ ভট্টাচার্য কে সাধারণ সম্পাদক করে ১৭ সদস্য বিশিষ্ট কমিটি গঠন",
    bannerBgColor: "#c90d15",
    bodyText: "আজ ৬ ডিসেম্বর, ২০২৫ সমাজতান্ত্রিক ছাত্র ফ্রন্ট, ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত হয়। জেলা শাখার সভাপতি আব্দুল্লাহ আল নাকিবের সভাপতিত্বে কাউন্সিল সভায় আরও উপস্থিত ছিলেন সমাজতান্ত্রিক ছাত্র ফ্রন্ট কেন্দ্রীয় কমিটির সাংগঠনিক সম্পাদক কমরেড সুহাইল আহমেদ শুভ; বাসদ ৫ নং জোনের সমন্বয়ক কমরেড ইমাম হুসাইন খোকন এবং বাসদ ময়মনসিংহ জেলা শাখার নেতৃবৃন্দ।\n\nকাউন্সিলের শুরুতেই সাধারণ সম্পাদকের রিপোর্ট পর্যালোচনা করা হয়। জাতীয় রাজনৈতিক পরিস্থিতির মূল্যায়ন, শিক্ষার সংকট সহ বিবিধ বিষয়ে আলোচনা হয়। কাউন্সিল থেকে আগামী দিনে শিক্ষা বাণিজ্যিকীকরণ-শিক্ষা সংকোচন সহ শিক্ষার উপর সর্বগ্রাসী আক্রমণের বিরুদ্ধে জোরদার আন্দোলন গড়ে তোলার সিদ্ধান্ত গ্রহণ করা হয়।\n\nসবশেষে দশম কাউন্সিলের মধ্য দিয়ে সর্বসম্মতিক্রমে ১৭ সদস্য বিশিষ্ট দশম জেলা কমিটি গঠন করা হয়। জেলা কমিটির সদস্যদের পরিচয় করিয়ে দেন সদ্যবিদায়ী কমিটির সভাপতি আব্দুল্লাহ আল নাকিব। দশম জেলা কমিটি নিম্নরূপ:",
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
    signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
    showSignatureContact: false,
    signatureContactPhone: "০১৭১৮-৫৬৪০৪৮",
    signatureContactEmail: "ssfmym@gmail.com"
  };

  const PRESETS = [
    {
      id: "council_10th",
      name: "১০ম কাউন্সিল ও ১৭ সদস্যের জেলা কমিটি (ডিফল্ট)",
      data: { ...DEFAULT_DATA }
    },
    {
      id: "education_movement",
      name: "শিক্ষা অধিকার ও ফি বৃদ্ধির প্রতিবাদে বিক্ষোভ",
      data: {
        ...DEFAULT_DATA,
        releaseTitle: "সংবাদ বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        showRefNumber: true,
        refNumber: "স্মারক নং: সছফ্র/মজশা/২০২৬/২৪",
        headline: "অযৌক্তিক বর্ধিত ফি অবিলম্বে প্রত্যাহার ও সার্বজনীন শিক্ষার দাবিতে সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার বিক্ষোভ সমাবেশ",
        bodyText: "আজ সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার উদ্যোগে সাধারণ শিক্ষার্থীদের অংশগ্রহণে এক বিক্ষোভ সমাবেশ ও স্মারকলিপি পেশ কর্মসূচি অনুষ্ঠিত হয়।\n\nসমাবেশে নেতৃবৃন্দ বলেন, শিক্ষা কোনো বাণিজ্যিক পণ্য নয়, শিক্ষা মানুষের মৌলিক সাংবিধানিক অধিকার। অথচ দফায় দফায় অযৌক্তিক ফি বৃদ্ধি এবং প্রশাসনিক অনিয়মের কারণে মেহনতী পরিবারের সন্তানদের শিক্ষা জীবন চরম হুমকির মুখে পড়েছে। অবিলম্বে বর্ধিত সকল ফি প্রত্যাহার করে শিক্ষার গণতান্ত্রিক পরিবেশ নিশ্চিত করতে হবে।\n\nবিক্ষোভ মিছিলটি নগরীর প্রধান প্রধান সড়ক প্রদক্ষিণ শেষে সমাবেশ অনুষ্ঠিত হয়। দাবি আদায় না হওয়া পর্যন্ত রাজপথে আপোষহীন আন্দোলন চালিয়ে যাওয়ার প্রত্যয় ব্যক্ত করেন নেতৃবৃন্দ।",
        showCommittee: false,
        committeeDesignations: [],
        committeeMembers: [],
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "আরিফুল ইসলাম বিজয়",
        signatureRole: "দপ্তর সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
        showSignatureContact: true,
        signatureContactPhone: "০১৭১৮-৫৬৪০৪৮",
        signatureContactEmail: "ssfmym@gmail.com"
      }
    },
    {
      id: "condemnation",
      name: "শান্তিপূর্ণ সমাবেশে হামলার তীব্র নিন্দা ও প্রতিবাদ",
      data: {
        ...DEFAULT_DATA,
        releaseTitle: "জরুরি প্রেস বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        showRefNumber: false,
        headline: "শিক্ষার্থীদের যৌক্তিক সমাবেশে দুর্বৃত্তদের হামলার ঘটনায় সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা সংসদের তীব্র নিন্দা ও প্রতিবাদ",
        bodyText: "শিক্ষার্থীদের ন্যায্য অধিকারের দাবিতে আয়োজিত শান্তিপূর্ণ কর্মসূচিতে দুর্বৃত্তদের কাপুরুষোচিত হামলার ঘটনায় গভীর ক্ষোভ ও তীব্র নিন্দা প্রকাশ করেছে সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখা।\n\nএক যৌথ বিবৃতিতে নেতৃবৃন্দ বলেন, দমন-পীড়ন চালিয়ে ছাত্র সমাজের যৌক্তিক আন্দোলনকে স্তব্ধ করা যাবে না। অবিলম্বে হামলাকারীদের গ্রেফতার ও দৃষ্টান্তমূলক বিচার করতে হবে। অন্যথায় সাধারণ শিক্ষার্থীদের ঐক্যবদ্ধ করে রাজপথে তীব্র গণপ্রতিরোধ গড়ে তোলা হবে।",
        showCommittee: false,
        committeeDesignations: [],
        committeeMembers: [],
        signatureLabel: "বিবৃতিদাতাবৃন্দঃ",
        signatureName: "তানজিল হোসেন মুনিম ও চিত্রণ ভট্টাচার্য",
        signatureRole: "সভাপতি ও সাধারণ সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা সংসদ",
        showSignatureContact: false
      }
    },
    {
      id: "tribute",
      name: "শোক প্রস্তাব ও বিপ্লবী শ্রদ্ধাঞ্জলি",
      data: {
        ...DEFAULT_DATA,
        releaseTitle: "শোক প্রস্তাব",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        showRefNumber: false,
        headline: "প্রগতিশীল ছাত্র আন্দোলনের নিবেদিতপ্রাণ কমরেডের প্রয়াণে সমাজতান্ত্রিক ছাত্র ফ্রন্টের গভীর শোক ও শ্রদ্ধাঞ্জলি",
        bodyText: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহের আজীবন সংগ্রামী কমরেডের আকস্মিক প্রয়াণে সংগঠনের সকল স্তরের নেতাকর্মীদের মাঝে গভীর শোকের ছায়া নেমে এসেছে।\n\nশোষণমুক্ত সমাজ বিনির্মাণের লড়াইয়ে ও ছাত্র অধিকার রক্ষার সংগ্রামে তাঁর অসামান্য অবদান ছাত্রসমাজ চিরকাল শ্রদ্ধার সাথে স্মরণ করবে। শোকসন্তপ্ত পরিবারের প্রতি আমরা আন্তরিক সমবেদনা জানাচ্ছি। কমরেডের আদর্শকে বুকে ধারণ করে মুক্তির লড়াই এগিয়ে নেওয়াই হবে তাঁর প্রতি প্রকৃত শ্রদ্ধাঞ্জলি।",
        showCommittee: false,
        committeeDesignations: [],
        committeeMembers: [],
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "দপ্তর সেল",
        signatureRole: "দপ্তর বিভাগ",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
        showSignatureContact: false
      }
    }
  ];

  const [data, setData] = Q.useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = Q.useState("editor");
  const [activeSection, setActiveSection] = Q.useState("meta");
  const [zoom, setZoom] = Q.useState(100);
  const [isExporting, setIsExporting] = Q.useState(false);
  const [copied, setCopied] = Q.useState(false);
  const [membersBulkText, setMembersBulkText] = Q.useState(DEFAULT_DATA.committeeMembers.join("\n"));

  const setBengaliToday = () => {
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const now = new Date();
    const dStr = String(now.getDate()).replace(/[0-9]/g, d => bnDigits[d]);
    const yStr = String(now.getFullYear()).replace(/[0-9]/g, d => bnDigits[d]);
    const mStr = months[now.getMonth()];
    setData(prev => ({ ...prev, releaseDate: "তারিখঃ " + dStr + " " + mStr + ", " + yStr + " খ্রিঃ" }));
  };

  const handleApplyPreset = (presetId) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setData({ ...preset.data });
      setMembersBulkText((preset.data.committeeMembers || []).join("\n"));
    }
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
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
      if (!el) throw new Error("Render target not found");
      const canvas = await html2canvas(el, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 850
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanDate = (data.releaseDate || "PR").replace(/[^০-৯0-9a-zA-Z]/g, "_");
      link.download = "SSF_Press_Release_" + cleanDate + ".png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export error:", err);
      alert("PNG রেন্ডারিংয়ে সমস্যা হয়েছে: " + (err.message || "Unknown error"));
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let txt = "=====================================\n";
    txt += (data.releaseTitle || "সংবাদ বিজ্ঞপ্তি") + "\n";
    txt += (data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট") + ", " + (data.districtName || "ময়মনসিংহ জেলা শাখা") + "\n";
    txt += (data.englishName || "Socialist Students' Front") + "\n";
    txt += (data.releaseDate || "") + "\n";
    if (data.showRefNumber && data.refNumber) {
      txt += data.refNumber + "\n";
    }
    txt += "=====================================\n\n";
    txt += "【 " + (data.headline || "") + " 】\n\n";
    txt += (data.bodyText || "") + "\n\n";
    if (data.showCommittee) {
      txt += "--- কমিটি তালিকা ---\n";
      (data.committeeDesignations || []).forEach(c => { txt += c.role + ": " + c.name + "\n"; });
      if (data.committeeMembers && data.committeeMembers.length > 0) {
        txt += "\n" + (data.membersTitle || "সদস্য:") + "\n" + data.committeeMembers.join(", ") + "\n\n";
      }
    }
    txt += "-------------------------------------\n";
    txt += (data.signatureLabel || "বার্তাপ্রেরকঃ") + "\n" + (data.signatureName || "") + "\n" + (data.signatureRole || "") + "\n" + (data.signatureOrgLine1 || "") + "\n" + (data.signatureOrgLine2 || "") + "\n";
    if (data.showSignatureContact) {
      if (data.signatureContactPhone) txt += "মোবাইল: " + data.signatureContactPhone + "\n";
      if (data.signatureContactEmail) txt += "ইমেইল: " + data.signatureContactEmail + "\n";
    }
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const addDesignation = () => {
    setData(prev => ({
      ...prev,
      committeeDesignations: [...(prev.committeeDesignations || []), { role: "নতুন পদবী", name: "কমরেডের নাম" }]
    }));
  };

  const updateDesignation = (idx, field, val) => {
    setData(prev => {
      const list = [...(prev.committeeDesignations || [])];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, committeeDesignations: list };
    });
  };

  const removeDesignation = idx => {
    setData(prev => ({
      ...prev,
      committeeDesignations: prev.committeeDesignations.filter((_, i) => i !== idx)
    }));
  };

  const handleMembersBulkChange = (e) => {
    const val = e.target.value;
    setMembersBulkText(val);
    const list = val.split("\n").map(s => s.trim()).filter(Boolean);
    setData(prev => ({ ...prev, committeeMembers: list }));
  };

  const handleFileUpload = (e, targetField) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setData(prev => ({ ...prev, [targetField]: uploadEvent.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const paragraphs = (data.bodyText || "").split(/\n+/).map(p => p.trim()).filter(Boolean);

  return i.jsxs("div", {
    className: "min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-16 font-sans antialiased",
    children: [
      i.jsx("style", {
        children: `
          .ssf-pr-document {
            font-family: "Tiro Bangla", serif;
            color: #171717;
            width: 100%;
            max-width: 850px;
            margin: 0 auto;
            background: #ffffff;
            padding: 1in;
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05);
            position: relative;
            box-sizing: border-box;
            text-align: left;
          }
          .ssf-pr-document::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, transparent 0%, #c90d15 12%, #c90d15 88%, transparent 100%);
          }
          .ssf-pr-header {
            display: flex;
            align-items: center;
            gap: 22px;
            padding-bottom: 18px;
            position: relative;
          }
          .ssf-pr-logo-frame {
            width: 138px;
            min-width: 138px;
            height: 150px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 11px;
            margin-top: 15px;
            box-sizing: border-box;
          }
          .ssf-pr-logo {
            width: 120%;
            height: 120%;
            object-fit: contain;
            position: relative;
            z-index: 2;
          }
          .ssf-pr-logo-frame::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 36px;
            height: 36px;
            border-top: 2px solid #222;
            border-left: 2px solid #222;
          }
          .ssf-pr-logo-frame::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 36px;
            height: 36px;
            border-top: 2px solid #222;
            border-right: 2px solid #222;
          }
          .ssf-pr-logo-corner-bl, .ssf-pr-logo-corner-br {
            position: absolute;
            bottom: 0;
            width: 36px;
            height: 36px;
          }
          .ssf-pr-logo-corner-bl {
            left: 0;
            border-bottom: 2px solid #222;
            border-left: 2px solid #222;
          }
          .ssf-pr-logo-corner-br {
            right: 0;
            border-bottom: 2px solid #222;
            border-right: 2px solid #222;
          }
          .ssf-pr-org-details {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .ssf-pr-title-image {
            width: 100%;
            max-width: 465px;
            max-height: 78px;
            height: auto;
            object-fit: contain;
            object-position: left center;
            display: block;
            margin-bottom: 3px;
          }
          .ssf-pr-english-name {
            font-family: "Roboto Slab", Georgia, serif;
            color: #a70910;
            font-size: 15.5pt;
            line-height: 1.2;
            font-weight: 600;
            letter-spacing: 0.1px;
          }
          .ssf-pr-district-name {
            color: #a70910;
            font-size: 13.5pt;
            line-height: 1.35;
            font-weight: 700;
            margin-top: 1px;
          }
          .ssf-pr-divider {
            width: 100%;
            height: 4px;
            margin-top: 2px;
            margin-bottom: 14px;
            position: relative;
          }
          .ssf-pr-divider::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border-top: 1.5px solid #a70910;
          }
          .ssf-pr-divider::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #555;
            opacity: 0.65;
          }
          .ssf-pr-meta {
            position: relative;
            min-height: 58px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 0 10px;
          }
          .ssf-pr-ref {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10.5pt;
            color: #333333;
            font-family: "Tiro Bangla", serif;
          }
          .ssf-pr-release-title {
            display: inline-block;
            font-size: 16pt;
            line-height: 1.15;
            font-weight: 700;
            padding: 0 10px 4px;
            border-bottom: 2px solid #171717;
            letter-spacing: 0.2px;
            margin: 0;
          }
          .ssf-pr-date {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 11pt;
            line-height: 1.4;
            color: #333333;
            white-space: nowrap;
          }
          .ssf-pr-headline-banner {
            background: #c90d15;
            color: #ffffff;
            text-align: center;
            padding: 15px 32px 16px;
            margin-bottom: 20px;
            position: relative;
          }
          .ssf-pr-headline-banner::before, .ssf-pr-headline-banner::after {
            content: "";
            position: absolute;
            left: 12px;
            right: 12px;
            height: 1px;
            background: rgba(255, 255, 255, 0.24);
          }
          .ssf-pr-headline-banner::before { top: 7px; }
          .ssf-pr-headline-banner::after { bottom: 7px; }
          .ssf-pr-headline-banner p {
            font-size: 14pt;
            line-height: 1.52;
            font-weight: 700;
            position: relative;
            z-index: 1;
            margin: 0;
          }
          .ssf-pr-article {
            font-size: 12pt;
            line-height: 1.65;
            font-weight: 400;
            text-align: justify;
            color: #171717;
          }
          .ssf-pr-article p {
            margin: 0 0 12px 0;
            text-align: justify;
          }
          .ssf-pr-article p:last-child {
            margin-bottom: 0;
          }
          .ssf-pr-committee-section {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid #d5d5d5;
          }
          .ssf-pr-committee-grid {
            display: grid;
            grid-template-columns: 1.18fr 0.82fr;
            align-items: start;
          }
          .ssf-pr-committee-col {
            font-size: 12pt;
            line-height: 1.65;
          }
          .ssf-pr-committee-col p { margin: 0; }
          .ssf-pr-committee-col strong { font-weight: 700; }
          .ssf-pr-members-col {
            padding-left: 35px;
            border-left: 1px solid #d0d0d0;
          }
          .ssf-pr-members-title {
            display: inline-block;
            font-weight: 700;
            border-bottom: 1px solid #c90d15;
            margin-bottom: 4px !important;
            padding-bottom: 1px;
          }
          .ssf-pr-signature-wrap {
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
          }
          .ssf-pr-signature {
            width: 255px;
            padding-top: 12px;
            border-top: 2px solid #c90d15;
            text-align: left;
            font-size: 11pt;
            line-height: 1.55;
            color: #333333;
          }
          .ssf-pr-signature p { margin: 0; }
          .ssf-pr-signature-label {
            font-weight: 700;
            color: #171717;
            margin-bottom: 3px !important;
          }
          .ssf-pr-signature-name {
            font-weight: 700;
            color: #171717;
          }
          @media print {
            @page { size: A4; margin: 1in; }
            body { background: #ffffff !important; padding: 0 !important; margin: 0 !important; }
            .ssf-pr-document { width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
            .ssf-pr-document::before { display: none !important; }
            .ssf-pr-headline-banner, .ssf-pr-committee-section, .ssf-pr-signature-wrap { break-inside: avoid; page-break-inside: avoid; }
          }
        `
      }),

      // Top Navigation Bar
      i.jsx("div", {
        className: "bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm",
        children: i.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3",
          children: [
            i.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                i.jsxs("button", {
                  onClick: t,
                  className: "p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                    i.jsx("span", { className: "hidden sm:inline", children: "সার্কুলার বোর্ডে ফিরুন" })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("h1", { className: "text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2", children: "অফিসিয়াল প্রেস রিলিজ ক্রিয়েটর" }),
                    i.jsx("p", { className: "text-[11px] text-rose-600 dark:text-rose-400 font-medium font-mono", children: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা সংসদ" })
                  ]
                })
              ]
            }),

            // Preset selector + Action buttons
            i.jsxs("div", {
              className: "flex items-center gap-2 flex-wrap",
              children: [
                i.jsxs("select", {
                  onChange: (e) => handleApplyPreset(e.target.value),
                  className: "text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer max-w-[200px] sm:max-w-none truncate",
                  children: [
                    i.jsx("option", { value: "", children: "⚡ রেডিমেড টেমপ্লেট বেছে নিন..." }),
                    PRESETS.map(p => i.jsx("option", { key: p.id, value: p.id, children: p.name }))
                  ]
                }),
                i.jsxs("button", {
                  onClick: handleCopyText,
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) }),
                    copied ? "কপি হয়েছে!" : "টেক্সট কপি"
                  ]
                }),
                i.jsxs("button", {
                  onClick: handlePrint,
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }),
                    "প্রিন্ট / PDF"
                  ]
                }),
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
              onClick: () => setActiveTab("editor"),
              className: "py-2 rounded-md transition-all " + (activeTab === "editor" ? "bg-white dark:bg-zinc-900 shadow-sm text-rose-600 font-bold" : "text-zinc-600 dark:text-zinc-400"),
              children: "📝 ইনপুট ফর্ম (এডিটর)"
            }),
            i.jsx("button", {
              onClick: () => setActiveTab("preview"),
              className: "py-2 rounded-md transition-all " + (activeTab === "preview" ? "bg-white dark:bg-zinc-900 shadow-sm text-rose-600 font-bold" : "text-zinc-600 dark:text-zinc-400"),
              children: "👁️ লাইভ প্রিভিউ (A4)"
            })
          ]
        })
      }),

      // Main Container (Split Screen on LG+)
      i.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6",
        children: i.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
          children: [

            // LEFT COLUMN: Auto-Generated Input Form
            i.jsx("div", {
              className: "lg:col-span-6 space-y-4 " + (activeTab === "preview" ? "hidden lg:block" : "block"),
              children: i.jsxs("div", {
                className: "bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-6",
                children: [
                  // Form Section Tabs
                  i.jsxs("div", {
                    className: "flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 no-scrollbar",
                    children: [
                      [
                        { id: "meta", label: "১. তারিখ ও ধরন" },
                        { id: "headline", label: "২. হেডলাইন ব্যানার" },
                        { id: "body", label: "৩. মূল বক্তব্য" },
                        { id: "committee", label: "৪. কমিটি তালিকা" },
                        { id: "signature", label: "৫. বার্তাপ্রেরক" },
                        { id: "header", label: "৬. লোগো ও হেডার" }
                      ].map(tab => (
                        i.jsx("button", {
                          key: tab.id,
                          onClick: () => setActiveSection(tab.id),
                          className: "px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors " + (activeSection === tab.id ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800")
                          ,
                          children: tab.label
                        })
                      ))
                    ]
                  }),

                  // 1. SECTION: META & DATE
                  activeSection === "meta" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "১. সাধারণ তথ্য ও তারিখ (Metadata)" }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "প্রেস রিলিজের ধরণ / শিরোনাম" }),
                          i.jsx("input", {
                            type: "text",
                            value: data.releaseTitle,
                            onChange: (e) => setData({ ...data, releaseTitle: e.target.value }),
                            placeholder: "যেমন: সংবাদ বিজ্ঞপ্তি, জরুরি প্রেস বিজ্ঞপ্তি, শোক বার্তা",
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "রিলিজের তারিখ" }),
                              i.jsx("button", {
                                type: "button",
                                onClick: setBengaliToday,
                                className: "text-[11px] font-bold text-rose-600 hover:underline cursor-pointer",
                                children: "⚡ আজকের বাংলা তারিখ দিন"
                              })
                            ]
                          }),
                          i.jsx("input", {
                            type: "text",
                            value: data.releaseDate,
                            onChange: (e) => setData({ ...data, releaseDate: e.target.value }),
                            placeholder: "যেমন: তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 focus:ring-1 focus:ring-rose-500 focus:outline-none font-sans"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2",
                        children: [
                          i.jsxs("label", {
                            className: "flex items-center gap-2 text-xs font-semibold cursor-pointer select-none",
                            children: [
                              i.jsx("input", {
                                type: "checkbox",
                                checked: data.showRefNumber,
                                onChange: (e) => setData({ ...data, showRefNumber: e.target.checked }),
                                className: "rounded text-rose-600 focus:ring-rose-500"
                              }),
                              i.jsx("span", { children: "স্মারক / রেফারেন্স নম্বর যুক্ত করুন (ঐচ্ছিক)" })
                            ]
                          }),
                          data.showRefNumber && i.jsx("input", {
                            type: "text",
                            value: data.refNumber,
                            onChange: (e) => setData({ ...data, refNumber: e.target.value }),
                            placeholder: "যেমন: স্মারক নং: সছফ্র/মজশা/২০২৬/০৮",
                            className: "w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 focus:outline-none mt-2"
                          })
                        ]
                      })
                    ]
                  }),

                  // 2. SECTION: HEADLINE BANNER
                  activeSection === "headline" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "২. ব্যানার হেডলাইন (Main Headline Banner)" }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "ব্যানারের মূল হেডলাইন টেক্সট" }),
                              i.jsxs("span", { className: "text-[10px] text-zinc-400 font-mono", children: [(data.headline || "").length, " অক্ষর"] })
                            ]
                          }),
                          i.jsx("textarea", {
                            rows: 4,
                            value: data.headline,
                            onChange: (e) => setData({ ...data, headline: e.target.value }),
                            placeholder: "ব্যানারে প্রদর্শনের জন্য মূল সংবাদ শিরোনাম বা সারসংক্ষেপ লিখুন...",
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 focus:ring-1 focus:ring-rose-500 focus:outline-none leading-relaxed font-serif"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "ব্যানারের ব্যাকগ্রাউন্ড কালার" }),
                          i.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              i.jsx("input", {
                                type: "color",
                                value: data.bannerBgColor || "#c90d15",
                                onChange: (e) => setData({ ...data, bannerBgColor: e.target.value }),
                                className: "w-8 h-8 rounded border border-zinc-300 dark:border-zinc-700 cursor-pointer p-0.5"
                              }),
                              [
                                { label: "লাল (#c90d15)", val: "#c90d15" },
                                { label: "গাঢ় লাল (#a70910)", val: "#a70910" },
                                { label: "কালো (#171717)", val: "#171717" }
                              ].map(col => (
                                i.jsx("button", {
                                  key: col.val,
                                  type: "button",
                                  onClick: () => setData({ ...data, bannerBgColor: col.val }),
                                  className: "text-[11px] px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 cursor-pointer",
                                  children: col.label
                                })
                              ))
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // 3. SECTION: BODY CONTENT
                  activeSection === "body" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৩. প্রেস রিলিজের মূল বক্তব্য (Body Paragraphs)" }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "সম্পূর্ণ বিস্তারিত বিবরণ ও প্যারাগ্রাফসমূহ" }),
                              i.jsxs("span", { className: "text-[10px] text-zinc-400 font-mono", children: [paragraphs.length, " টি প্যারাগ্রাফ | ", (data.bodyText || "").split(/\s+/).filter(Boolean).length, " টি শব্দ"] })
                            ]
                          }),
                          i.jsx("textarea", {
                            rows: 12,
                            value: data.bodyText,
                            onChange: (e) => setData({ ...data, bodyText: e.target.value }),
                            placeholder: "প্রেস রিলিজের পূর্ণাঙ্গ বক্তব্য লিখুন। নতুন প্যারাগ্রাফ তৈরি করতে এন্টার দিয়ে ফাঁকা লাইন দিন...",
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-3 focus:ring-1 focus:ring-rose-500 focus:outline-none leading-relaxed font-serif"
                          }),
                          i.jsx("p", { className: "text-[11px] text-zinc-500 italic", children: "💡 টিপস: প্রতি প্যারাগ্রাফের মাঝে এক লাইন ফাঁকা রাখুন। প্রিভিউতে এটি সুষমভাবে সাজানো হবে।" })
                        ]
                      })
                    ]
                  }),

                  // 4. SECTION: COMMITTEE & 2-COLUMN SECTION
                  activeSection === "committee" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৪. সাংগঠনিক কমিটি ও ২-কলাম তালিকা" }),
                          i.jsxs("label", {
                            className: "flex items-center gap-2 text-xs font-semibold cursor-pointer select-none",
                            children: [
                              i.jsx("input", {
                                type: "checkbox",
                                checked: data.showCommittee,
                                onChange: (e) => setData({ ...data, showCommittee: e.target.checked }),
                                className: "rounded text-rose-600 focus:ring-rose-500"
                              }),
                              i.jsx("span", { children: "কমিটি সেকশন সক্রিয়" })
                            ]
                          })
                        ]
                      }),
                      data.showCommittee ? i.jsxs("div", {
                        className: "space-y-5 border-t border-zinc-200 dark:border-zinc-800 pt-4",
                        children: [
                          // Left column: Designations
                          i.jsxs("div", {
                            className: "space-y-2",
                            children: [
                              i.jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  i.jsx("label", { className: "text-xs font-bold text-zinc-800 dark:text-zinc-200", children: "বাম কলাম: পদবী ও দায়িত্বপ্রাপ্তদের তালিকা" }),
                                  i.jsx("button", {
                                    type: "button",
                                    onClick: addDesignation,
                                    className: "text-[11px] font-bold text-rose-600 hover:text-rose-700 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer",
                                    children: "+ নতুন পদবী যোগ করুন"
                                  })
                                ]
                              }),
                              i.jsx("div", {
                                className: "space-y-2 max-h-60 overflow-y-auto pr-1",
                                children: (data.committeeDesignations || []).map((c, idx) => (
                                  i.jsxs("div", {
                                    key: idx,
                                    className: "flex items-center gap-2",
                                    children: [
                                      i.jsx("input", {
                                        type: "text",
                                        value: c.role,
                                        onChange: (e) => updateDesignation(idx, "role", e.target.value),
                                        placeholder: "পদবী (যেমন: সভাপতি)",
                                        className: "w-1/3 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-1.5 focus:ring-1 focus:ring-rose-500"
                                      }),
                                      i.jsx("input", {
                                        type: "text",
                                        value: c.name,
                                        onChange: (e) => updateDesignation(idx, "name", e.target.value),
                                        placeholder: "কমরেডের নাম",
                                        className: "flex-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-1.5 focus:ring-1 focus:ring-rose-500 font-medium"
                                      }),
                                      i.jsx("button", {
                                        type: "button",
                                        onClick: () => removeDesignation(idx),
                                        className: "p-1 text-zinc-400 hover:text-rose-600 rounded cursor-pointer",
                                        title: "মুছে ফেলুন",
                                        children: i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                                      })
                                    ]
                                  })
                                ))
                              })
                            ]
                          }),

                          // Right column: Members List
                          i.jsxs("div", {
                            className: "space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-4",
                            children: [
                              i.jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  i.jsx("label", { className: "text-xs font-bold text-zinc-800 dark:text-zinc-200", children: "ডান কলাম: সদস্যদের তালিকা" }),
                                  i.jsx("input", {
                                    type: "text",
                                    value: data.membersTitle || "সদস্য:",
                                    onChange: (e) => setData({ ...data, membersTitle: e.target.value }),
                                    placeholder: "কলাম শিরোনাম (যেমন: সদস্য:)",
                                    className: "w-28 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-1 focus:ring-1 focus:ring-rose-500 font-bold"
                                  })
                                ]
                              }),
                              i.jsx("textarea", {
                                rows: 6,
                                value: membersBulkText,
                                onChange: handleMembersBulkChange,
                                placeholder: "প্রতি লাইনে একজন সদস্যের নাম লিখুন...",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-sans"
                              })
                            ]
                          })
                        ]
                      }) : i.jsx("p", { className: "text-xs text-zinc-400 italic py-2", children: "কমিটি সেকশন নিষ্ক্রিয় রয়েছে। সাধারণ প্রেস রিলিজ বা বিবৃতির জন্য এটি বন্ধ রাখা যাবে।" })
                    ]
                  }),

                  // 5. SECTION: SIGNATURE / SENDER
                  activeSection === "signature" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৫. বার্তাপ্রেরক ও স্বাক্ষর (Signatory Block)" }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "স্বাক্ষর লেবেল" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureLabel,
                                onChange: (e) => setData({ ...data, signatureLabel: e.target.value }),
                                placeholder: "যেমন: বার্তাপ্রেরকঃ / বিবৃতিদাতাবৃন্দঃ",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "প্রেরকের নাম" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureName,
                                onChange: (e) => setData({ ...data, signatureName: e.target.value }),
                                placeholder: "যেমন: আরিফুল ইসলাম বিজয়",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-bold"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "পদবী" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureRole,
                                onChange: (e) => setData({ ...data, signatureRole: e.target.value }),
                                placeholder: "যেমন: দপ্তর সম্পাদক",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "শাখা / ইউনিট" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureOrgLine2,
                                onChange: (e) => setData({ ...data, signatureOrgLine2: e.target.value }),
                                placeholder: "যেমন: ময়মনসিংহ জেলা শাখা",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500"
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2",
                        children: [
                          i.jsxs("label", {
                            className: "flex items-center gap-2 text-xs font-semibold cursor-pointer select-none",
                            children: [
                              i.jsx("input", {
                                type: "checkbox",
                                checked: data.showSignatureContact,
                                onChange: (e) => setData({ ...data, showSignatureContact: e.target.checked }),
                                className: "rounded text-rose-600 focus:ring-rose-500"
                              }),
                              i.jsx("span", { children: "যোগাযোগ ফোন / ইমেইল প্রদর্শন করুন" })
                            ]
                          }),
                          data.showSignatureContact && i.jsxs("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureContactPhone,
                                onChange: (e) => setData({ ...data, signatureContactPhone: e.target.value }),
                                placeholder: "ফোন (যেমন: ০১৭১৮-৫৬৪০৪৮)",
                                className: "text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureContactEmail,
                                onChange: (e) => setData({ ...data, signatureContactEmail: e.target.value }),
                                placeholder: "ইমেইল (যেমন: ssfmym@gmail.com)",
                                className: "text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // 6. SECTION: HEADER & BRANDING
                  activeSection === "header" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৬. হেডার ও ব্র্যান্ডিং কাস্টমাইজেশন" }),
                      i.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "অফিসিয়াল লোগো (URL বা ফাইল আপলোড)" }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: data.logoUrl,
                                onChange: (e) => setData({ ...data, logoUrl: e.target.value }),
                                className: "flex-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              }),
                              i.jsx("label", {
                                className: "px-2.5 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded font-semibold cursor-pointer hover:bg-zinc-300",
                                children: ["ফাইল", i.jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileUpload(e, "logoUrl"), className: "hidden" })]
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "শিরোনাম ক্যালিগ্রাফি ইমেজ (URL বা ফাইল আপলোড)" }),
                          i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: data.titleImageUrl,
                                onChange: (e) => setData({ ...data, titleImageUrl: e.target.value }),
                                className: "flex-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              }),
                              i.jsx("label", {
                                className: "px-2.5 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded font-semibold cursor-pointer hover:bg-zinc-300",
                                children: ["ফাইল", i.jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileUpload(e, "titleImageUrl"), className: "hidden" })]
                              })
                            ]
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "ইংরেজি নাম (English Name)" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.englishName,
                                onChange: (e) => setData({ ...data, englishName: e.target.value }),
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-serif"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "শাখা বা জেলা নাম" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.districtName,
                                onChange: (e) => setData({ ...data, districtName: e.target.value }),
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-bold"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Reset Button
                  i.jsx("div", {
                    className: "border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between items-center",
                    children: [
                      i.jsx("button", {
                        type: "button",
                        onClick: () => {
                          if (confirm("আপনি কি ফরমের সকল তথ্য ডিফল্ট মান অনুযায়ী রিসেট করতে চান?")) {
                            setData({ ...DEFAULT_DATA });
                            setMembersBulkText(DEFAULT_DATA.committeeMembers.join("\n"));
                          }
                        },
                        className: "text-xs text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer",
                        children: "🔄 ডিফল্ট টেমপ্লেটে রিসেট করুন"
                      }),
                      i.jsx("span", { className: "text-[11px] text-zinc-400 font-mono", children: "সব তথ্য স্বয়ংক্রিয়ভাবে লাইভ আপডেট হচ্ছে" })
                    ]
                  })
                ]
              })
            }),

            // RIGHT COLUMN: Live Template Preview
            i.jsxs("div", {
              className: "lg:col-span-6 space-y-3 " + (activeTab === "editor" ? "hidden lg:block" : "block"),
              children: [
                // Preview Toolbar
                i.jsxs("div", {
                  className: "flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-xs font-semibold shadow-sm",
                  children: [
                    i.jsxs("div", {
                      className: "flex items-center gap-2 text-zinc-700 dark:text-zinc-300",
                      children: [
                        i.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                        i.jsx("span", { children: "লাইভ প্রিভিউ (A4 ফরম্যাট)" })
                      ]
                    }),
                    i.jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [
                        [75, 90, 100, 120].map(z => (
                          i.jsx("button", {
                            key: z,
                            onClick: () => setZoom(z),
                            className: "px-2 py-1 rounded text-[11px] font-mono transition-colors " + (zoom === z ? "bg-rose-600 text-white font-bold" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"),
                            children: z + "%"
                          })
                        ))
                      ]
                    })
                  ]
                }),

                // Render Container / Wrapper
                i.jsx("div", {
                  className: "overflow-x-auto bg-zinc-200 dark:bg-zinc-900/60 p-4 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-center shadow-inner",
                  children: i.jsx("div", {
                    style: { transform: "scale(" + (zoom / 100) + ")", transformOrigin: "top center", transition: "transform 0.15s ease" },
                    children: (
                      // ==========================================
                      // THE EXACT SSF DOCUMENT MATCHING ssfpr.html
                      // ==========================================
                      i.jsxs("main", {
                        id: "ssf-pr-render-target",
                        className: "ssf-pr-document",
                        children: [
                          // 1. ORGANIZATION HEADER
                          i.jsxs("header", {
                            className: "ssf-pr-header",
                            children: [
                              i.jsxs("div", {
                                className: "ssf-pr-logo-frame",
                                children: [
                                  i.jsx("img", {
                                    className: "ssf-pr-logo",
                                    src: data.logoUrl || "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
                                    alt: data.logoAlt || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                    referrerPolicy: "no-referrer"
                                  }),
                                  i.jsx("span", { className: "ssf-pr-logo-corner-bl" }),
                                  i.jsx("span", { className: "ssf-pr-logo-corner-br" })
                                ]
                              }),
                              i.jsxs("div", {
                                className: "ssf-pr-org-details",
                                children: [
                                  i.jsx("img", {
                                    className: "ssf-pr-title-image",
                                    src: data.titleImageUrl || "https://i.ibb.co/R4BCPZ0B/20250130-143124.png",
                                    alt: data.titleImageAlt || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                    referrerPolicy: "no-referrer"
                                  }),
                                  i.jsx("div", {
                                    className: "ssf-pr-english-name",
                                    children: data.englishName || "Socialist Students' Front"
                                  }),
                                  i.jsx("div", {
                                    className: "ssf-pr-district-name",
                                    children: data.districtName || "ময়মনসিংহ জেলা শাখা"
                                  })
                                ]
                              })
                            ]
                          }),

                          // 2. DOUBLE LETTERHEAD DIVIDER
                          i.jsx("div", { className: "ssf-pr-divider" }),

                          // 3. PRESS RELEASE META (Title + Date + Optional Ref)
                          i.jsxs("section", {
                            className: "ssf-pr-meta",
                            children: [
                              data.showRefNumber && data.refNumber && i.jsx("div", {
                                className: "ssf-pr-ref",
                                children: data.refNumber
                              }),
                              i.jsx("h1", {
                                className: "ssf-pr-release-title",
                                children: data.releaseTitle || "সংবাদ বিজ্ঞপ্তি"
                              }),
                              i.jsx("div", {
                                className: "ssf-pr-date",
                                children: data.releaseDate || ""
                              })
                            ]
                          }),

                          // 4. MAIN HEADLINE BANNER
                          data.headline && i.jsx("section", {
                            className: "ssf-pr-headline-banner",
                            style: { background: data.bannerBgColor || "#c90d15" },
                            children: i.jsx("p", {
                              children: data.headline
                            })
                          }),

                          // 5. PRESS RELEASE BODY PARAGRAPHS
                          i.jsx("article", {
                            className: "ssf-pr-article",
                            children: paragraphs.map((p, idx) => (
                              i.jsx("p", { key: idx, children: p })
                            ))
                          }),

                          // 6. COMMITTEE / 2-COLUMN SECTION (Toggleable)
                          data.showCommittee && i.jsx("section", {
                            className: "ssf-pr-committee-section",
                            children: i.jsxs("div", {
                              className: "ssf-pr-committee-grid",
                              children: [
                                // Left Column: Designations
                                i.jsx("div", {
                                  className: "ssf-pr-committee-col",
                                  children: (data.committeeDesignations || []).map((c, idx) => (
                                    i.jsxs("p", {
                                      key: idx,
                                      children: [
                                        i.jsx("strong", { children: (c.role ? c.role + ": " : "") }),
                                        c.name || ""
                                      ]
                                    })
                                  ))
                                }),

                                // Right Column: Members
                                i.jsxs("div", {
                                  className: "ssf-pr-committee-col ssf-pr-members-col",
                                  children: [
                                    i.jsx("p", {
                                      className: "ssf-pr-members-title",
                                      children: data.membersTitle || "সদস্য:"
                                    }),
                                    (data.committeeMembers || []).map((m, idx) => (
                                      i.jsx("p", { key: idx, children: m })
                                    ))
                                  ]
                                })
                              ]
                            })
                          }),

                          // 7. SIGNATORY / SENDER FOOTER
                          i.jsx("div", {
                            className: "ssf-pr-signature-wrap",
                            children: i.jsxs("footer", {
                              className: "ssf-pr-signature",
                              children: [
                                data.signatureLabel && i.jsx("p", { className: "ssf-pr-signature-label", children: data.signatureLabel }),
                                data.signatureName && i.jsx("p", { className: "ssf-pr-signature-name", children: data.signatureName }),
                                data.signatureRole && i.jsx("p", { children: data.signatureRole }),
                                data.signatureOrgLine1 && i.jsx("p", { children: data.signatureOrgLine1 }),
                                data.signatureOrgLine2 && i.jsx("p", { children: data.signatureOrgLine2 }),
                                data.showSignatureContact && data.signatureContactPhone && i.jsxs("p", { className: "text-[10pt] mt-1 text-zinc-600", children: ["মোবাইল: ", data.signatureContactPhone] }),
                                data.showSignatureContact && data.signatureContactEmail && i.jsxs("p", { className: "text-[10pt] text-zinc-600", children: ["ইমেইল: ", data.signatureContactEmail] })
                              ]
                            })
                          })
                        ]
                      })
                    )
                  })
                })
              ]
            })
          ]
        })
      })
    ]
  });
}
