// Press Release Creator Engine for Socialist Students' Front (SSF)
// 100% faithful to ssfpr.html template structure, CSS styling, and typography

export const DEFAULT_SSF_PRESS_RELEASE = {
  // 1. Organization & Letterhead Header
  logoUrl: "https://i.ibb.co.com/F4MKM3R2/20260527-055637.png",
  logoAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্টের লোগো",
  titleImageUrl: "https://i.ibb.co/R4BCPZ0B/20250130-143124.png",
  titleImageAlt: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
  englishName: "Socialist Students' Front",
  districtName: "ময়মনসিংহ জেলা শাখা",

  // 2. Metadata
  releaseTitle: "সংবাদ বিজ্ঞপ্তি",
  releaseDate: "তারিখঃ ০৬ ডিসেম্বর, ২০২৫ খ্রিঃ",
  showRefNumber: false,
  refNumber: "স্মারক নং: সছফ্র/মজশা/২০২৫/১০",

  // 3. Headline Banner
  headline: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত ; তানজিল হোসেন মুনিম কে সভাপতি ও চিত্রণ ভট্টাচার্য কে সাধারণ সম্পাদক করে ১৭ সদস্য বিশিষ্ট কমিটি গঠন",
  bannerBgColor: "#c90d15",

  // 4. Body Content (Multi-paragraph supported)
  bodyText: `আজ ৬ ডিসেম্বর, ২০২৫ সমাজতান্ত্রিক ছাত্র ফ্রন্ট, ময়মনসিংহ জেলা শাখার ১০ম কাউন্সিল অনুষ্ঠিত হয়। জেলা শাখার সভাপতি আব্দুল্লাহ আল নাকিবের সভাপতিত্বে কাউন্সিল সভায় আরও উপস্থিত ছিলেন সমাজতান্ত্রিক ছাত্র ফ্রন্ট কেন্দ্রীয় কমিটির সাংগঠনিক সম্পাদক কমরেড সুহাইল আহমেদ শুভ; বাসদ ৫ নং জোনের সমন্বয়ক কমরেড ইমাম হুসাইন খোকন এবং বাসদ ময়মনসিংহ জেলা শাখার নেতৃবৃন্দ।

কাউন্সিলের শুরুতেই সাধারণ সম্পাদকের রিপোর্ট পর্যালোচনা করা হয়। জাতীয় রাজনৈতিক পরিস্থিতির মূল্যায়ন, শিক্ষার সংকট সহ বিবিধ বিষয়ে আলোচনা হয়। কাউন্সিল থেকে আগামী দিনে শিক্ষা বাণিজ্যিকীকরণ-শিক্ষা সংকোচন সহ শিক্ষার উপর সর্বগ্রাসী আক্রমণের বিরুদ্ধে জোরদার আন্দোলন গড়ে তোলার সিদ্ধান্ত গ্রহণ করা হয়।

সবশেষে দশম কাউন্সিলের মধ্য দিয়ে সর্বসম্মতিক্রমে ১৭ সদস্য বিশিষ্ট দশম জেলা কমিটি গঠন করা হয়। জেলা কমিটির সদস্যদের পরিচয় করিয়ে দেন সদ্যবিদায়ী কমিটির সভাপতি আব্দুল্লাহ আল নাকিব। দশম জেলা কমিটি নিম্নরূপ:`,

  // 5. Committee & 2-Column Section
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

  // 6. Signatory / Press Contact Block
  signatureLabel: "বার্তাপ্রেরকঃ",
  signatureName: "আরিফুল ইসলাম বিজয়",
  signatureRole: "দপ্তর সম্পাদক",
  signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
  signatureOrgLine2: "ময়মনসিংহ জেলা শাখা",
  showSignatureContact: false,
  signatureContactPhone: "০১৭১৮-৫৬৪০৪৮",
  signatureContactEmail: "ssfmym@gmail.com"
};

// Ready-made Template Presets
export const PRESS_RELEASE_PRESETS = [
  {
    id: "council_10th",
    name: "১০ম কাউন্সিল ও জেলা কমিটি ঘোষণা (অফিসিয়াল)",
    data: { ...DEFAULT_SSF_PRESS_RELEASE }
  },
  {
    id: "education_protest",
    name: "শিক্ষা সংকোচন ও বর্ধিত ফি প্রত্যাহারের দাবি",
    data: {
      ...DEFAULT_SSF_PRESS_RELEASE,
      releaseTitle: "সংবাদ বিজ্ঞপ্তি",
      releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
      headline: "জাতীয় বিশ্ববিদ্যালয় ও ময়মনসিংহের বিভিন্ন কলেজে অযৌক্তিক ফি বৃদ্ধি প্রত্যাহার এবং সার্বজনীন শিক্ষার দাবিতে সমাজতান্ত্রিক ছাত্র ফ্রন্টের বিক্ষোভ সমাবেশ",
      bodyText: `আজ সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখার উদ্যোগে নগরীর প্রাণকেন্দ্রে সাধারণ শিক্ষার্থীদের অংশগ্রহণে এক বিক্ষোভ সমাবেশ ও স্মারকলিপি প্রদান কর্মসূচি অনুষ্ঠিত হয়।

সমাবেশে নেতৃবৃন্দ বলেন, শিক্ষা কোনো পণ্য নয়, শিক্ষা মানুষের মৌলিক অধিকার। অথচ ক্রমাগত ফি বৃদ্ধি ও প্রশাসনিক অব্যবস্থাপনার কারণে সাধারণ ও মেহনতী পরিবারের শিক্ষার্থীদের উচ্চশিক্ষা গ্রহণের পথ রুদ্ধ হয়ে পড়ছে। অবিলম্বে বর্ধিত সকল প্রকার ফি প্রত্যাহার করতে হবে এবং শিক্ষাঙ্গনে গণতান্ত্রিক পরিবেশ নিশ্চিত করতে হবে।

বিক্ষোভ মিছিলটি নগরীর প্রধান প্রধান সড়ক প্রদক্ষিণ করে জেলা প্রশাসক কার্যালয়ের সামনে এসে প্রতিবাদী সমাবেশের মাধ্যমে শেষ হয়। দাবি আদায় না হওয়া পর্যন্ত সমাজতান্ত্রিক ছাত্র ফ্রন্ট শিক্ষার্থীদের সাথে নিয়ে আপোষহীন আন্দোলন চালিয়ে যাবে।`,
      showCommittee: false,
      committeeDesignations: [],
      committeeMembers: [],
      signatureLabel: "বার্তাপ্রেরকঃ",
      signatureName: "আরিফুল ইসলাম বিজয়",
      signatureRole: "দপ্তর সম্পাদক",
      signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
      signatureOrgLine2: "ময়মনসিংহ জেলা শাখা"
    }
  },
  {
    id: "condemnation_statement",
    name: "হামলার প্রতিবাদ ও বিচার দাবির বিবৃতি",
    data: {
      ...DEFAULT_SSF_PRESS_RELEASE,
      releaseTitle: "জরুরি প্রেস বিজ্ঞপ্তি",
      releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
      headline: "শান্তিপূর্ণ ছাত্র সমাবেশে বর্বরোচিত হামলা ও নেতাকর্মীদের আহতের ঘটনায় সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা সংসদের তীব্র নিন্দা ও প্রতিবাদ",
      bodyText: `শিক্ষার্থীদের যৌক্তিক অধিকার আদায়ের শান্তিপূর্ণ গণতান্ত্রিক কর্মসূচিতে দুর্বৃত্তদের হামলার ঘটনায় গভীর ক্ষোভ ও তীব্র নিন্দা প্রকাশ করেছে সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহ জেলা শাখা।

এক যৌথ বিবৃতিতে জেলা সংসদের সভাপতি তানজিল হোসেন মুনিম ও সাধারণ সম্পাদক চিত্রণ ভট্টাচার্য বলেন, যৌক্তিক দাবির আন্দোলনকে স্তব্ধ করতে হামলা-মামলার পথ বেছে নেওয়া হয়েছে। অবিলম্বে হামলাকারীদের চিহ্নিত করে দৃষ্টান্তমূলক শাস্তির আওতায় আনতে হবে।

অন্যথায় সাধারণ ছাত্র সমাজকে সাথে নিয়ে ময়মনসিংহের রাজপথে সর্বাত্মক ছাত্র ধর্মঘট ও তীব্র গণপ্রতিরোধ গড়ে তোলা হবে।`,
      showCommittee: false,
      signatureLabel: "বিবৃতিদাতাবৃন্দঃ",
      signatureName: "তানজিল হোসেন মুনিম ও চিত্রণ ভট্টাচার্য",
      signatureRole: "সভাপতি ও সাধারণ সম্পাদক",
      signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
      signatureOrgLine2: "ময়মনসিংহ জেলা সংসদ"
    }
  },
  {
    id: "condolence_tribute",
    name: "শোকবার্তা ও বিপ্লবী শ্রদ্ধাঞ্জলি",
    data: {
      ...DEFAULT_SSF_PRESS_RELEASE,
      releaseTitle: "শোক প্রস্তাব",
      releaseDate: "তারিখঃ ২৯ আগস্ট, ২০২৬ খ্রিঃ",
      headline: "প্রগতিশীল ছাত্র আন্দোলনের অগ্রসেনানী কমরেডের প্রয়াণে সমাজতান্ত্রিক ছাত্র ফ্রন্টের গভীর শোক ও শ্রদ্ধাঞ্জলি",
      bodyText: `সমাজতান্ত্রিক ছাত্র ফ্রন্ট ময়মনসিংহের আজীবন সংগ্রামী কমরেডের আকস্মিক প্রয়াণে সংগঠনের সকল স্তরের নেতাকর্মীদের মাঝে গভীর শোকের ছায়া নেমে এসেছে।

বিপ্লবী সমাজ পরিবর্তনের লড়াইয়ে ও মেহনতী মানুষের মুক্তির সংগ্রামে তাঁর আপোষহীন অবদান ছাত্রসমাজ চিরদিন শ্রদ্ধার সাথে স্মরণ করবে। আমরা তাঁর শোকসন্তপ্ত পরিবারের প্রতি গভীর সমবেদনা জ্ঞাপন করছি।

কমরেডের অসমাপ্ত বিপ্লবী কাজ সমাপ্ত করাই হবে তাঁর প্রতি আমাদের সর্বোচ্চ শ্রদ্ধাঞ্জলি। শোককে শক্তিতে পরিণত করে ছাত্র সমাজকে শোষণমুক্তির লড়াইয়ে ঐক্যবদ্ধ হওয়ার আহ্বান জানানো হচ্ছে।`,
      showCommittee: false,
      signatureLabel: "বার্তাপ্রেরকঃ",
      signatureName: "দপ্তর সেল",
      signatureRole: "দপ্তর বিভাগ",
      signatureOrgLine1: "সমাজতান্ত্রিক ছাত্র ফ্রন্ট",
      signatureOrgLine2: "ময়মনসিংহ জেলা শাখা"
    }
  }
];

// Helper to convert English digits to Bengali
export function toBengaliNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => bnDigits[d]);
}

// Generate formatted current date in Bengali
export function getBengaliTodayDateString() {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const now = new Date();
  const day = toBengaliNumber(now.getDate());
  const month = months[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  return `তারিখঃ ${day} ${month}, ${year} খ্রিঃ`;
}

// Generate Plain Text formatted output for clipboard
export function pressReleaseToPlainText(data) {
  let text = `=====================================\n`;
  text += `${data.releaseTitle || 'সংবাদ বিজ্ঞপ্তি'}\n`;
  text += `${data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"}, ${data.districtName || 'ময়মনসিংহ জেলা শাখা'}\n`;
  text += `${data.englishName || "Socialist Students' Front"}\n`;
  text += `${data.releaseDate || ''}\n`;
  if (data.showRefNumber && data.refNumber) {
    text += `${data.refNumber}\n`;
  }
  text += `=====================================\n\n`;
  text += `【 ${data.headline || ''} 】\n\n`;
  text += `${data.bodyText || ''}\n\n`;

  if (data.showCommittee) {
    text += `--- সাংগঠনিক তালিকা ---\n`;
    if (data.committeeDesignations && data.committeeDesignations.length > 0) {
      data.committeeDesignations.forEach(item => {
        text += `${item.role}: ${item.name}\n`;
      });
    }
    if (data.committeeMembers && data.committeeMembers.length > 0) {
      text += `\n${data.membersTitle || 'সদস্য:'}\n${data.committeeMembers.join(', ')}\n`;
    }
    text += `\n`;
  }

  text += `-------------------------------------\n`;
  text += `${data.signatureLabel || 'বার্তাপ্রেরকঃ'}\n`;
  text += `${data.signatureName || ''}\n`;
  text += `${data.signatureRole || ''}\n`;
  text += `${data.signatureOrgLine1 || "সমাজতান্ত্রিক ছাত্র ফ্রন্ট"}\n`;
  text += `${data.signatureOrgLine2 || "ময়মনসিংহ জেলা শাখা"}\n`;
  if (data.showSignatureContact) {
    if (data.signatureContactPhone) text += `মোবাইল: ${data.signatureContactPhone}\n`;
    if (data.signatureContactEmail) text += `ইমেইল: ${data.signatureContactEmail}\n`;
  }
  text += `=====================================\n`;
  return text;
}
