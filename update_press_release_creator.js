// Script to cleanly replace/inject PressReleaseCreatorComp in assets/index-DkKEx6Oj.js
const fs = require('fs');

const bundlePath = './assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Current bundle length:', bundle.length);

const prCompCode = fs.readFileSync('./pr_component_code.js', 'utf8').trim();

// Check if PressReleaseCreatorComp is already in bundle
const prFuncStart = 'function PressReleaseCreatorComp({';
const xqFuncStart = 'function XQ(){';

if (bundle.includes(prFuncStart)) {
  console.log('Found existing PressReleaseCreatorComp in bundle, replacing with latest version...');
  const startIdx = bundle.indexOf(prFuncStart);
  const endIdx = bundle.indexOf(xqFuncStart, startIdx);
  if (endIdx > startIdx) {
    bundle = bundle.slice(0, startIdx) + prCompCode + '\n' + bundle.slice(endIdx);
    console.log('Successfully replaced existing PressReleaseCreatorComp!');
  } else {
    console.error('Could not find end boundary for PressReleaseCreatorComp');
    process.exit(1);
  }
} else if (bundle.includes(xqFuncStart)) {
  console.log('Injecting PressReleaseCreatorComp before XQ()...');
  bundle = bundle.replace(xqFuncStart, prCompCode + '\n' + xqFuncStart);
  console.log('Successfully injected PressReleaseCreatorComp!');
} else {
  console.error('Neither PressReleaseCreatorComp nor XQ() found!');
  process.exit(1);
}

// Ensure GH header and signature are patched
const ghTarget = 'function GH({circulars:n,isVerifiedMember:e=!1,onSelectItem:t}){';
if (bundle.includes(ghTarget)) {
  bundle = bundle.replace(
    ghTarget,
    'function GH({circulars:n,isVerifiedMember:e=!1,onSelectItem:t,isAdmin:lAdmin=!1,onOpenPressReleaseCreator:lOpenPR=null}){'
  );
  console.log('Patched GH function signature.');
}

const ghHeaderOriginal = 'i.jsxs("div",{className:"border-b border-zinc-200 dark:border-zinc-805 pb-5 mb-8",children:[i.jsxs("h1",{className:"text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white flex items-center space-x-2",children:[i.jsx(pd,{className:"text-rose-600 w-7 h-7"}),i.jsx("span",{children:"অফিসিয়াল সার্কুলার ও নোটিশ বোর্ড"})]}),i.jsx("p",{className:"text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono",children:"ময়মনসিংহ জেলা সংসদ ও সংশ্লিষ্ট থানা/কলেজ শাখার নির্দেশাবলী এবং রেজোলিউশন আর্কাইভ"})]})';

const ghHeaderReplacement = 'i.jsxs("div",{className:"border-b border-zinc-200 dark:border-zinc-805 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[i.jsxs("div",{children:[i.jsxs("h1",{className:"text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white flex items-center space-x-2",children:[i.jsx(pd,{className:"text-rose-600 w-7 h-7"}),i.jsx("span",{children:"অফিসিয়াল সার্কুলার ও নোটিশ বোর্ড"})]}),i.jsx("p",{className:"text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-mono",children:"ময়মনসিংহ জেলা সংসদ ও সংশ্লিষ্ট থানা/কলেজ শাখার নির্দেশাবলী এবং রেজোলিউশন আর্কাইভ"})]}),(lAdmin||lOpenPR)&&i.jsx("button",{onClick:()=>{lOpenPR?lOpenPR():(window.location.hash="#press-release-creator")},className:"inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-all cursor-pointer select-none self-start sm:self-auto shrink-0",children:[i.jsx(pd,{className:"w-4 h-4 shrink-0"}),i.jsx("span",{children:"প্রেস রিলিজ তৈরি করুন"})]})]})';

if (bundle.includes(ghHeaderOriginal)) {
  bundle = bundle.replace(ghHeaderOriginal, ghHeaderReplacement);
  console.log('Patched GH header button.');
}

// In XQ router
const circOriginal = 'case"circulars":return ve.showCirculars?i.jsx(GH,{circulars:h.circulars,isVerifiedMember:ke,onSelectItem:(_e,Ye)=>u({type:_e,id:Ye})}):i.jsx("div",{className:"py-16 text-center text-zinc-500 text-xs sm:text-sm",children:"সার্কুলার বোর্ড সাময়িকভাবে নিষ্ক্রিয় করা আছে।"})';

const circReplacement = 'case"circulars":{const isAdm=(a&&a.trim().toLowerCase()==="chitronbhattacharjee@gmail.com")||((h&&h.invitations)||[]).some(inv=>inv.email&&inv.email.toLowerCase()===(a||"").trim().toLowerCase()&&inv.status==="accepted");return ve.showCirculars?i.jsx(GH,{circulars:h.circulars,isVerifiedMember:ke,onSelectItem:(_e,Ye)=>u({type:_e,id:Ye}),isAdmin:isAdm,onOpenPressReleaseCreator:()=>t("press-release-creator")}):i.jsx("div",{className:"py-16 text-center text-zinc-500 text-xs sm:text-sm",children:"সার্কুলার বোর্ড সাময়িকভাবে নিষ্ক্রিয় করা আছে।"})}';

if (bundle.includes(circOriginal)) {
  bundle = bundle.replace(circOriginal, circReplacement);
  console.log('Patched GH call in XQ router.');
}

const prCaseSnippet = 'case"press-release-creator":case"press-release":{const isAdm=(a&&a.trim().toLowerCase()==="chitronbhattacharjee@gmail.com")||((h&&h.invitations)||[]).some(inv=>inv.email&&inv.email.toLowerCase()===(a||"").trim().toLowerCase()&&inv.status==="accepted");if(!isAdm){return i.jsxs("div",{className:"max-w-md mx-auto my-20 p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-center shadow-lg",children:[i.jsx("h2",{className:"text-xl font-bold text-zinc-900 dark:text-white",children:"অননুমোদিত প্রবেশাধিকার"}),i.jsx("p",{className:"text-sm text-zinc-500 mt-2",children:"দুঃখিত, প্রেস রিলিজ ক্রিয়েটর শুধুমাত্র অনুমোদিত এডমিনদের জন্য সংরক্ষিত।"}),i.jsx("button",{onClick:()=>t("circulars"),className:"mt-6 inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer",children:[i.jsx(D5,{className:"w-4 h-4"}),"সার্কুলার বোর্ডে ফিরুন"]})]})}return i.jsx(PressReleaseCreatorComp,{userEmail:a,onBack:()=>t("circulars"),setCurrentTab:t})};';

const switchAnchor = 'case"circulars":';
if (bundle.includes(switchAnchor) && !bundle.includes('case"press-release-creator":')) {
  bundle = bundle.replace(switchAnchor, prCaseSnippet + '\n' + switchAnchor);
  console.log('Injected case "press-release-creator" in XQ router!');
}

fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log('Bundle successfully updated! Final length:', bundle.length);
