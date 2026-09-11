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
            justify-content: center !important;
            padding: 11px !important;
            margin-top: 15px !important;
            box-sizing: border-box !important;
            flex-shrink: 0 !important;
          }
          .ssf-pr-logo {
            width: 120% !important;
            height: 120% !important;
            object-fit: contain !important;
            position: relative !important;
            z-index: 2 !important;
            display: block !important;
            max-width: none !important;
          }
          .ssf-pr-logo-frame::before {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 36px !important;
            height: 36px !important;
            border-top: 2px solid #222222 !important;
            border-left: 2px solid #222222 !important;
            pointer-events: none !important;
          }
          .ssf-pr-logo-frame::after {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            width: 36px !important;
            height: 36px !important;
            border-top: 2px solid #222222 !important;
            border-right: 2px solid #222222 !important;
            pointer-events: none !important;
          }
          .ssf-pr-logo-corner-bl {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 36px !important;
            height: 36px !important;
            border-bottom: 2px solid #222222 !important;
            border-left: 2px solid #222222 !important;
            pointer-events: none !important;
          }
          .ssf-pr-logo-corner-br {
            position: absolute !important;
            bottom: 0 !important;
            right: 0 !important;
            width: 36px !important;
            height: 36px !important;
            border-bottom: 2px solid #222222 !important;
            border-right: 2px solid #222222 !important;
            pointer-events: none !important;
          }
          .ssf-pr-org-details {
            flex: 1 !important;
            min-width: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .ssf-pr-title-image {
            width: 100% !important;
            max-width: 465px !important;
            max-height: 78px !important;
            height: auto !important;
            object-fit: contain !important;
            object-position: left center !important;
            display: block !important;
            margin-bottom: 3px !important;
          }
          .ssf-pr-english-name {
            font-family: "Roboto Slab", Georgia, serif !important;
            color: #a70910 !important;
            font-size: 15.5pt !important;
            line-height: 1.2 !important;
            font-weight: 600 !important;
            letter-spacing: 0.1px !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .ssf-pr-district-name {
            font-family: "Tiro Bangla", serif !important;
            color: #a70910 !important;
            font-size: 13.5pt !important;
            line-height: 1.35 !important;
            font-weight: 700 !important;
            margin-top: 1px !important;
            margin-bottom: 0 !important;
            padding: 0 !important;
          }
          .ssf-pr-divider {
            width: 100% !important;
            height: 4px !important;
            margin-top: 2px !important;
            margin-bottom: 14px !important;
            position: relative !important;
          }
          .ssf-pr-divider::before {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            border-top: 1.5px solid #a70910 !important;
          }
          .ssf-pr-divider::after {
            content: "" !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            border-bottom: 1px solid #555555 !important;
            opacity: 0.65 !important;
          }
          .ssf-pr-meta {
            position: relative !important;
            min-height: 58px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 8px 0 10px !important;
            margin: 0 !important;
          }
          .ssf-pr-ref {
            position: absolute !important;
            left: 0 !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 10.5pt !important;
            color: #333333 !important;
            font-family: "Tiro Bangla", serif !important;
            margin: 0 !important;
            white-space: nowrap !important;
          }
          .ssf-pr-release-title {
            display: inline-block !important;
            font-size: 16pt !important;
            line-height: 1.15 !important;
            font-weight: 700 !important;
            padding: 0 10px 4px !important;
            border-bottom: 2px solid #171717 !important;
            letter-spacing: 0.2px !important;
            margin: 0 !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-date {
            position: absolute !important;
            right: 0 !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            color: #333333 !important;
            white-space: nowrap !important;
            font-family: "Tiro Bangla", serif !important;
            margin: 0 !important;
          }
          .ssf-pr-headline-banner {
            background: #c90d15 !important;
            color: #ffffff !important;
            text-align: center !important;
            padding: 15px 32px 16px !important;
            margin-bottom: 20px !important;
            position: relative !important;
            box-sizing: border-box !important;
          }
          .ssf-pr-headline-banner::before, .ssf-pr-headline-banner::after {
            content: "" !important;
            position: absolute !important;
            left: 12px !important;
            right: 12px !important;
            height: 1px !important;
            background: rgba(255, 255, 255, 0.24) !important;
          }
          .ssf-pr-headline-banner::before { top: 7px !important; }
          .ssf-pr-headline-banner::after { bottom: 7px !important; }
          .ssf-pr-headline-banner p {
            font-size: 14pt !important;
            line-height: 1.52 !important;
            font-weight: 700 !important;
            position: relative !important;
            z-index: 1 !important;
            margin: 0 !important;
            padding: 0 !important;
            color: #ffffff !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-article {
            font-size: 12pt !important;
            line-height: 1.65 !important;
            font-weight: 400 !important;
            text-align: justify !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
            margin: 0 !important;
          }
          .ssf-pr-article p {
            margin: 0 0 12px 0 !important;
            text-align: justify !important;
            font-size: 12pt !important;
            line-height: 1.65 !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-article p:last-child {
            margin-bottom: 0 !important;
          }
          .ssf-pr-committee-section {
            margin-top: 16px !important;
            padding-top: 12px !important;
            border-top: 1px solid #d5d5d5 !important;
          }
          .ssf-pr-committee-grid {
            display: grid !important;
            grid-template-columns: 1.18fr 0.82fr !important;
            align-items: start !important;
          }
          .ssf-pr-committee-col {
            font-size: 12pt !important;
            line-height: 1.65 !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-committee-col p {
            margin: 0 !important;
            line-height: 1.65 !important;
            font-size: 12pt !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-committee-col strong {
            font-weight: 700 !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-members-col {
            padding-left: 35px !important;
            border-left: 1px solid #d0d0d0 !important;
          }
          .ssf-pr-members-title {
            display: inline-block !important;
            font-weight: 700 !important;
            border-bottom: 1px solid #c90d15 !important;
            margin-bottom: 4px !important;
            padding-bottom: 1px !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-signature-wrap {
            margin-top: 30px !important;
            display: flex !important;
            justify-content: flex-end !important;
          }
          .ssf-pr-signature {
            width: 255px !important;
            min-width: 255px !important;
            max-width: 255px !important;
            padding-top: 12px !important;
            border-top: 2px solid #c90d15 !important;
            text-align: left !important;
            font-size: 11pt !important;
            line-height: 1.55 !important;
            color: #333333 !important;
            font-family: "Tiro Bangla", serif !important;
            box-sizing: border-box !important;
          }
          .ssf-pr-signature p {
            margin: 0 !important;
            line-height: 1.55 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-signature-label {
            font-weight: 700 !important;
            color: #171717 !important;
            margin-bottom: 3px !important;
            font-family: "Tiro Bangla", serif !important;
          }
          .ssf-pr-signature-name {
            font-weight: 700 !important;
            color: #171717 !important;
            font-family: "Tiro Bangla", serif !important;
          }
          @media print {
            @page {
              size: A4;
              margin: 1in;
            }
            body {
              background: #ffffff !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .ssf-pr-document {
              width: 100% !important;
              max-width: none !important;
              padding: 0 !important;
              margin: 0 !important;
              box-shadow: none !important;
            }
            .ssf-pr-document::before {
              display: none !important;
            }
            .ssf-pr-headline-banner, .ssf-pr-committee-section, .ssf-pr-signature-wrap {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `
        }
      }),

      // Top Navigation Bar
      i.jsx("div", {
        className: "bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm",
        children: i.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3",
          children: [
            // Left: Back button & Title
            i.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                i.jsxs("button", {
                  type: "button",
                  onClick: t,
                  className: "p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer",
                  children: [
                    i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                    i.jsx("span", { children: "ফিরে যান" })
                  ]
                }),
                i.jsxs("div", {
                  children: [
                    i.jsx("h1", {
                      className: "text-base sm:text-lg font-bold text-zinc-900 dark:white flex items-center gap-2",
                      children: [
                        i.jsx("span", { className: "text-rose-600 font-extrabold", children: "প্রেস রিলিজ ক্রিয়েটর" }),
                        i.jsx("span", { className: "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono", children: "A4 ক্যানভাস" })
                      ]
                    }),
                    i.jsx("p", {
                      className: "text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block",
                      children: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট অফিসিয়াল প্রেস বিজ্ঞপ্তি জেনারেটর"
                    })
                  ]
                })
              ]
            }),

            // Center / Mobile Tab Switcher
            i.jsxs("div", {
              className: "flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg lg:hidden",
              children: [
                i.jsx("button", {
                  type: "button",
                  onClick: () => setActiveTab("editor"),
                  className: "px-3 py-1 text-xs font-medium rounded-md transition-all " + (activeTab === "editor" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm font-semibold" : "text-zinc-600 dark:text-zinc-400"),
                  children: "✏️ ফরম এডিটর"
                }),
                i.jsx("button", {
                  type: "button",
                  onClick: () => setActiveTab("preview"),
                  className: "px-3 py-1 text-xs font-medium rounded-md transition-all " + (activeTab === "preview" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm font-semibold" : "text-zinc-600 dark:text-zinc-400"),
                  children: "📄 লাইভ প্রিভিউ"
                })
              ]
            }),

            // Right: Presets & Action Buttons
            i.jsxs("div", {
              className: "flex items-center flex-wrap gap-2",
              children: [
                // Preset Dropdown
                i.jsxs("select", {
                  onChange: (e) => handleApplyPreset(e.target.value),
                  defaultValue: "council",
                  className: "text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg px-2.5 py-2 font-medium focus:ring-1 focus:ring-rose-500 focus:outline-none cursor-pointer",
                  children: [
                    i.jsx("option", { value: "", disabled: true, children: "📋 রেডিমেড টেমপ্লেট নির্বাচন..." }),
                    PRESETS.map(p => i.jsx("option", { key: p.id, value: p.id, children: p.name }))
                  ]
                }),

                // Copy Text Button
                i.jsxs("button", {
                  type: "button",
                  onClick: handleCopyText,
                  className: "px-3 py-2 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm",
                  title: "ক্লিপবোর্ডে কপি করুন",
                  children: [
                    i.jsx("span", { children: copied ? "✅" : "📋" }),
                    i.jsx("span", { children: copied ? "কপি হয়েছে!" : "টেক্সট কপি" })
                  ]
                }),

                // Print Button
                i.jsxs("button", {
                  type: "button",
                  onClick: handlePrint,
                  className: "px-3 py-2 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm hidden sm:flex",
                  title: "A4 পেপারে সরাসরি প্রিন্ট করুন",
                  children: [
                    i.jsx("span", { children: "🖨️" }),
                    i.jsx("span", { children: "প্রিন্ট" })
                  ]
                }),

                // Export PNG Button
                i.jsxs("button", {
                  type: "button",
                  onClick: handleExportPNG,
                  disabled: isExporting,
                  className: "px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                  children: [
                    isExporting ? i.jsx("svg", { className: "animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white", fill: "none", viewBox: "0 0 24 24", children: [i.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), i.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }) : i.jsx("span", { children: "⬇️" }),
                    i.jsx("span", { children: isExporting ? "রেন্ডারিং হচ্ছে..." : "PNG ডাউনলোড" })
                  ]
                })
              ]
            })
          ]
        })
      }),

      // Main Content Grid (Left Form Editor, Right Live A4 Canvas)
      i.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
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
                          type: "button",
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
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 focus:ring-1 focus:ring-rose-500 focus:outline-none leading-relaxed font-sans"
                          })
                        ]
                      }),
                      i.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [
                          i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "ব্যানারের পটভূমি রঙ:" }),
                          i.jsx("input", {
                            type: "color",
                            value: data.bannerBgColor || "#c90d15",
                            onChange: (e) => setData({ ...data, bannerBgColor: e.target.value }),
                            className: "w-8 h-8 rounded border border-zinc-300 cursor-pointer"
                          }),
                          i.jsx("span", { className: "text-xs font-mono text-zinc-500", children: data.bannerBgColor || "#c90d15" })
                        ]
                      })
                    ]
                  }),

                  // 3. SECTION: BODY TEXT
                  activeSection === "body" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৩. মূল প্রেস রিলিজের বক্তব্য (Body Content)" }),
                      i.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          i.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "বিস্তারিত বিবরণ / প্যারাগ্রাফসমূহ" }),
                              i.jsxs("span", { className: "text-[10px] text-zinc-400", children: [paragraphs.length, " টি প্যারাগ্রাফ"] })
                            ]
                          }),
                          i.jsx("textarea", {
                            rows: 9,
                            value: data.bodyText,
                            onChange: (e) => setData({ ...data, bodyText: e.target.value }),
                            placeholder: "প্রেস রিলিজের বিস্তারিত বক্তব্য লিখুন। নতুন প্যারার জন্য Enter বাটন চাপুন...",
                            className: "w-full text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 focus:ring-1 focus:ring-rose-500 focus:outline-none leading-relaxed font-sans"
                          }),
                          i.jsx("p", { className: "text-[11px] text-zinc-400", children: "টিপস: প্রতিটি নতুন অনুচ্ছেদের জন্য Enter চেপে খালি লাইন তৈরি করুন।" })
                        ]
                      })
                    ]
                  }),

                  // 4. SECTION: COMMITTEE
                  activeSection === "committee" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৪. কমিটি ও পদবী তালিকা (Committee Structure)" }),
                          i.jsxs("label", {
                            className: "flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer select-none",
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
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "স্বাক্ষরকারীর নাম" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureName,
                                onChange: (e) => setData({ ...data, signatureName: e.target.value }),
                                placeholder: "যেমন: চিত্রণ ভট্টাচার্য",
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
                                placeholder: "যেমন: সাধারণ সম্পাদক",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "সংগঠনের নাম (লাইন ১)" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureOrgLine1,
                                onChange: (e) => setData({ ...data, signatureOrgLine1: e.target.value }),
                                placeholder: "যেমন: সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1 sm:col-span-2",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "শাখার নাম (লাইন ২)" }),
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
                      // Optional contact phone & email toggle
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
                              i.jsx("span", { children: "যোগাযোগ মোবাইল ও ইমেইল যুক্ত করুন (ঐচ্ছিক)" })
                            ]
                          }),
                          data.showSignatureContact && i.jsxs("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2",
                            children: [
                              i.jsx("input", {
                                type: "text",
                                value: data.signatureContactPhone,
                                onChange: (e) => setData({ ...data, signatureContactPhone: e.target.value }),
                                placeholder: "মোবাইল নম্বর",
                                className: "w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded p-2"
                              }),
                              i.jsx("input", {
                                type: "email",
                                value: data.signatureContactEmail,
                                onChange: (e) => setData({ ...data, signatureContactEmail: e.target.value }),
                                placeholder: "ইমেইল এড্রেস",
                                className: "w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded p-2"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // 6. SECTION: LOGO & HEADER
                  activeSection === "header" && i.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      i.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-mono", children: "৬. লোগো ও হেডার কাস্টমাইজেশন (Header Customization)" }),
                      i.jsxs("div", {
                        className: "space-y-3",
                        children: [
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "লোগো ইমেজ লিঙ্ক (URL)" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.logoUrl,
                                onChange: (e) => setData({ ...data, logoUrl: e.target.value }),
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "হেডার বাংলা টাইটেল ইমেজ লিঙ্ক (URL)" }),
                              i.jsx("input", {
                                type: "text",
                                value: data.titleImageUrl,
                                onChange: (e) => setData({ ...data, titleImageUrl: e.target.value }),
                                className: "w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2 focus:ring-1 focus:ring-rose-500 font-mono"
                              })
                            ]
                          }),
                          i.jsxs("div", {
                            className: "space-y-1",
                            children: [
                              i.jsx("label", { className: "text-xs font-semibold text-zinc-700 dark:text-zinc-300", children: "ইংরেজি সাব-টাইটেল" }),
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

            // RIGHT COLUMN: Live Template Preview (Canonical A4 Layout with visual scaling)
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
                        [
                          { label: "ফিট", val: "fit" },
                          { label: "৫০%", val: "50" },
                          { label: "৭৫%", val: "75" },
                          { label: "৯০%", val: "90" },
                          { label: "১০০%", val: "100" }
                        ].map(z => (
                          i.jsx("button", {
                            key: z.val,
                            type: "button",
                            onClick: () => setZoom(z.val),
                            className: "px-2 py-1 rounded text-[11px] font-mono transition-colors " + (zoom === z.val ? "bg-rose-600 text-white font-bold" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"),
                            children: z.label
                          })
                        ))
                      ]
                    })
                  ]
                }),

                // Render Container / Scaled Viewport
                i.jsx("div", {
                  ref: previewContainerRef,
                  className: "overflow-x-auto bg-zinc-200 dark:bg-zinc-900/80 p-4 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-center shadow-inner min-h-[500px]",
                  children: i.jsx("div", {
                    style: {
                      width: 850 * currentScale,
                      height: docHeight * currentScale,
                      position: "relative",
                      overflow: "hidden",
                      transition: "width 0.15s ease, height 0.15s ease"
                    },
                    children: i.jsx("div", {
                      style: {
                        transform: "scale(" + currentScale + ")",
                        transformOrigin: "top left",
                        width: 850,
                        position: "absolute",
                        top: 0,
                        left: 0
                      },
                      children: (
                        // ==========================================
                        // THE EXACT SSF DOCUMENT MATCHING ssfpr.html
                        // ==========================================
                        i.jsxs("main", {
                          ref: docRef,
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
                                  i.jsx("p", { className: "ssf-pr-signature-label", children: data.signatureLabel || "বার্তাপ্রেরকঃ" }),
                                  i.jsx("p", { className: "ssf-pr-signature-name", children: data.signatureName }),
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
                })
              ]
            })
          ]
        })
      })
    ]
  });
}
