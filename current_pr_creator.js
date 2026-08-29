function PressReleaseCreatorComp({ userEmail: a, onBack: t, setCurrentTab: s }) {
  const DEFAULT_DATA = {
    logoUrl: "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
    logoAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
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
    bodyText: "আজ ৬ ডিসেম্বর, ২০২৫ সমাজতান্ত্রিক ছাত্র ফ্রন্ট, ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত হয়। জেলা শাখার সভাপতি আব্দুল্লাহ আল নাকিবের সভাপতিত্বে কাউন্সিল সভায় আরও উপস্থিত ছিলেন সংগঠনের কেন্দ্রীয় সাধারণ সম্পাদক রাফিকুজ্জামান ফরিদ, সাংগঠনিক সম্পাদক প্রীতম দাশ প্রমুখ নেতৃবৃন্দ।",
    showCommittee: true,
    committeeDesignations: [
      { role: "সভাপতি", name: "তানজিল হোসেন মুনিম" },
      { role: "সহ-সভাপতি", name: "রাতুল দাস" },
      { role: "সাধারণ সম্পাদক", name: "চিত্রণ ভট্টাচার্য" },
      { role: "যুগ্ম সাধারণ সম্পাদক", name: "অনন্যা ভট্টাচার্য" },
      { role: "সাংগঠনিক সম্পাদক", name: "আরিফুল ইসলাম" },
      { role: "দপ্তর সম্পাদক", name: "সুমিত রায়" },
      { role: "অর্থ সম্পাদক", name: "মেহেদী হাসান" },
      { role: "প্রচার ও প্রকাশনা সম্পাদক", name: "সায়মা আক্তার" },
      { role: "স্কুল ও মাদ্রাসা বিষয়ক সম্পাদক", name: "ফাহিম আহমেদ" }
    ],
    membersTitle: "সদস্য:",
    committeeMembers: [
      "১. আব্দুল্লাহ আল নাকিব",
      "২. সজীব হোসেন",
      "৩. নুসরাত জাহান",
      "৪. তৌফিক এলাহী",
      "৫. জয়ন্ত বর্মণ",
      "৬. মারুফ হাসান",
      "৭. সুমাইয়া ইসলাম",
      "৮. অমিত কুমার দাস"
    ],
    signatureLabel: "বার্তাপ্রেরকঃ",
    signatureName: "চিত্রণ ভট্টাচার্য",
    signatureRole: "সাধারণ সম্পাদক",
    signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
    signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
    showSignatureContact: false,
    signatureContactPhone: "০১৭১১-XXXXXX",
    signatureContactEmail: "ssf.mymensingh@gmail.com"
  };

  const PRESETS = [
    {
      id: "council",
      name: "১০ম জেলা কাউন্সিল ও ১৭ সদস্যের কমিটি ঘোষণা (ডিফল্ট)",
      data: DEFAULT_DATA
    },
    {
      id: "general_pr",
      name: "সাধারণ প্রেস বিজ্ঞপ্তি (কমিটি ব্যতীত)",
      data: {
        ...DEFAULT_DATA,
        releaseTitle: "প্রেস বিজ্ঞপ্তি",
        releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
        showRefNumber: false,
        headline: "ময়মনসিংহে শিক্ষার্থীদের বর্ধিত বাস ভাড়া প্রত্যাহারের দাবিতে সমাজতান্ত্রিক ছাত্র ফ্রন্টের বিক্ষোভ সমাবেশ",
        bodyText: "ময়মনসিংহ শহরের বিভিন্ন রুটে শিক্ষার্থীদের হাফ ভাড়া নিশ্চিতকরণ এবং অন্যায়ভাবে বর্ধিত বাস ভাড়া প্রত্যাহারের দাবিতে আজ সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার উদ্যোগে বিক্ষোভ মিছিল ও সমাবেশ অনুষ্ঠিত হয়েছে।\n\nসমাবেশে নেতৃবৃন্দ বলেন, সাধারণ শিক্ষার্থীদের সাথে পরিবহন মালিকদের স্বেচ্ছাচারিতা কোনোভাবেই মেনে নেওয়া হবে না। অবিলম্বে শিক্ষার্থীদের জন্য হাফ পাশ কার্যকর করতে হবে, অন্যথায় বৃহত্তর ছাত্র আন্দোলন গড়ে তোলা হবে।",
        showCommittee: false,
        committeeDesignations: [],
        committeeMembers: [],
        signatureLabel: "বার্তাপ্রেরকঃ",
        signatureName: "চিত্রণ ভট্টাচার্য",
        signatureRole: "সাধারণ সম্পাদক",
        signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
        signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
        showSignatureContact: false
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
  const [zoom, setZoom] = Q.useState("fit");
  const [autoScale, setAutoScale] = Q.useState(0.7);
  const [docHeight, setDocHeight] = Q.useState(1202);
  const [isExporting, setIsExporting] = Q.useState(false);
  const [copied, setCopied] = Q.useState(false);
  const [membersBulkText, setMembersBulkText] = Q.useState(DEFAULT_DATA.committeeMembers.join("\n"));

  const previewContainerRef = Q.useRef(null);
  const docRef = Q.useRef(null);

  // ResizeObserver for auto-fit scaling and document height tracking
  Q.useEffect(() => {
    const updateSize = () => {
      if (previewContainerRef.current) {
        const availableW = previewContainerRef.current.clientWidth - 48;
        if (availableW > 0) {
          const fit = Math.min(1, Math.max(0.35, availableW / 850));
          setAutoScale(fit);
        }
      }
      if (docRef.current) {
        setDocHeight(Math.max(1202, docRef.current.scrollHeight));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [data, activeTab]);

  Q.useEffect(() => {
    if (docRef.current) {
      setDocHeight(Math.max(1202, docRef.current.scrollHeight));
    }
  }, [data]);

  const currentScale = zoom === "fit" ? autoScale : (Number(zoom) / 100);

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
      const el = document.getElementById("ssf-pr-render-target");
      if (!el) throw new Error("Render target element not found");

      // Wait for all images inside to load completely
      const imgs = Array.from(el.querySelectorAll("img"));
      await Promise.all(imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      let html2canvas;
      if (window.html2canvas) {
        html2canvas = window.html2canvas;
      } else {
        const mod = await import('/assets/html2canvas.esm-QH1iLAAe.js');
        html2canvas = mod.default || mod;
      }

      const canvas = await html2canvas(el, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("ssf-pr-render-target");
          if (clonedEl) {
            clonedEl.style.transform = "none";
            if (clonedEl.parentElement) {
              clonedEl.parentElement.style.transform = "none";
              clonedEl.parentElement.style.width = "850px";
              clonedEl.parentElement.style.height = "auto";
            }
          }
        }
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
    if (data.showRefNumber && data.refNumber) txt += data.refNumber + "\n";
    txt += "=====================================\n\n";
    if (data.headline) txt += "【 " + data.headline + " 】\n\n";
    txt += (data.bodyText || "") + "\n\n";
    if (data.showCommittee) {
      txt += "--- কমিটি তালিকা ---\n";
      (data.committeeDesignations || []).forEach(c => {
        txt += (c.role ? c.role + ": " : "") + c.name + "\n";
      });
      txt += "\n" + (data.membersTitle || "সদস্য:") + "\n";
      (data.committeeMembers || []).forEach(m => {
        txt += m + "\n";
      });
      txt += "\n";
    }
    txt += "--- " + (data.signatureLabel || "বার্তাপ্রেরকঃ") + " ---\n";
    txt += (data.signatureName || "") + "\n";
    if (data.signatureRole) txt += data.signatureRole + "\n";
    if (data.signatureOrgLine1) txt += data.signatureOrgLine1 + "\n";
    if (data.signatureOrgLine2) txt += data.signatureOrgLine2 + "\n";

    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const addDesignation = () => {
    setData(prev => ({
      ...prev,
      committeeDesignations: [
        ...prev.committeeDesignations,
        { role: "সদস্য", name: "" }
      ]
    }));
  };

  const updateDesignation = (idx, field, val) => {
    const updated = [...data.committeeDesignations];
    updated[idx][field] = val;
    setData(prev => ({ ...prev, committeeDesignations: updated }));
  };

  const removeDesignation = (idx) => {
    const updated = data.committeeDesignations.filter((_, i) => i !== idx);
    setData(prev => ({ ...prev, committeeDesignations: updated }));
  };

  const handleMembersBulkChange = (e) => {
    const val = e.target.value;
    setMembersBulkText(val);
    const list = val.split("\n").map(s => s.trim()).filter(Boolean);
    setData(prev => ({ ...prev, committeeMembers: list }));
  };

  const paragraphs = (data.bodyText || "").split("\n").map(p => p.trim()).filter(Boolean);

  return i.jsxs("div", {
    className: "min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-16",
    children: [
      // ISOLATED SSF PR DOCUMENT STYLES MATCHING ssfpr.html EXACTLY
      i.jsx("style", {
        dangerouslySetInnerHTML: {
          __html: `
          :root {
            --brand-red: #c90d15;
            --brand-dark: #a70910;
            --deep-black: #171717;
            --soft-black: #333333;
            --paper: #ffffff;
          }
          .ssf-pr-document {
            width: 850px !important;
            min-height: 1202px !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            padding: 1in !important;
            position: relative !important;
            font-family: "Tiro Bangla", serif !important;
            color: #171717 !important;
            text-align: left !important;
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05) !important;
          }
          .ssf-pr-document * {
            box-sizing: border-box !important;
          }
          .ssf-pr-document::before {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 4px !important;
            background: linear-gradient(to right, transparent 0%, #c90d15 12%, #c90d15 88%, transparent 100%) !important;
          }
          .ssf-pr-header {
            display: flex !important;
            align-items: center !important;
            gap: 22px !important;
            padding-bottom: 18px !important;
            position: relative !important;
            margin: 0 !important;
          }
          .ssf-pr-logo-frame {
            width: 138px !important;
            min-width: 138px !important;
            max-width: 138px !important;
            height: 150px !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
