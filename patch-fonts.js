const fs = require('fs');
const path = require('path');

console.log('--- Starting Custom Fonts Patch ---');

// 1. Copy fonts to public and assets directories
const dirs = ['public', 'public/fonts', 'assets/fonts'];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const fontMap = [
  { src: 'Bornopata-Regular.ttf', dests: ['public/Bornopata-Regular.ttf', 'public/fonts/Bornopata-Regular.ttf', 'assets/fonts/Bornopata-Regular.ttf'] },
  { src: 'Bornopata-Bold.ttf', dests: ['public/Bornopata-Bold.ttf', 'public/fonts/Bornopata-Bold.ttf', 'assets/fonts/Bornopata-Bold.ttf'] },
  { src: 'Li Alinur Sangbadpatra2 Unicode.ttf', dests: ['public/Li Alinur Sangbadpatra2 Unicode.ttf', 'public/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf', 'assets/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf', 'public/Li-Alinur-Sangbadpatra2-Unicode.ttf'] },
  { src: 'Li Alinur Sangbadpatra2 Unicode Italic.ttf', dests: ['public/Li Alinur Sangbadpatra2 Unicode Italic.ttf', 'public/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf', 'assets/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf', 'public/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf'] }
];

fontMap.forEach(item => {
  if (fs.existsSync(item.src)) {
    const data = fs.readFileSync(item.src);
    item.dests.forEach(dest => {
      fs.writeFileSync(dest, data);
    });
    console.log(`Copied ${item.src} to destinations.`);
  } else {
    console.warn(`Font source ${item.src} not found in root!`);
  }
});

// 2. Update assets/index-BWvdgNyb.css with @font-face rules
const cssPath = 'assets/index-BWvdgNyb.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const fontFaceRules = `
@font-face {
  font-family: 'Bornopata Regular';
  src: url('/fonts/Bornopata-Regular.ttf') format('truetype'),
       url('/Bornopata-Regular.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Bornopata Bold';
  src: url('/fonts/Bornopata-Bold.ttf') format('truetype'),
       url('/Bornopata-Bold.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Bornopata';
  src: url('/fonts/Bornopata-Regular.ttf') format('truetype'),
       url('/Bornopata-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Bornopata';
  src: url('/fonts/Bornopata-Bold.ttf') format('truetype'),
       url('/Bornopata-Bold.ttf') format('truetype');
  font-weight: 600 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra 2 Unicode';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode.ttf') format('truetype'),
       url('/Li-Alinur-Sangbadpatra2-Unicode.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra2 Unicode';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra 2 Unicode Italic';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode%20Italic.ttf') format('truetype'),
       url('/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra 2 Unicode Italic';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode%20Italic.ttf') format('truetype');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra2 Unicode Italic';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode%20Italic.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Li Alinur Sangbadpatra2 Unicode Italic';
  src: url('/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf') format('truetype'),
       url('/Li%20Alinur%20Sangbadpatra2%20Unicode%20Italic.ttf') format('truetype');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`;

if (!cssContent.includes("font-family: 'Bornopata Regular'") && !cssContent.includes('font-family:"Bornopata Regular"')) {
  cssContent = fontFaceRules + '\n' + cssContent;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Appended @font-face rules to assets/index-BWvdgNyb.css');
} else {
  console.log('CSS already contains Bornopata font rules.');
}

// 3. Update index.html to add font preloading, font-face rules, and cache busting
const indexPath = 'index.html';
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Ensure script version is v=8 and css has ?v=8
htmlContent = htmlContent.replace(/\/assets\/index-DkKEx6Oj\.js(\?v=\d+)?/g, '/assets/index-DkKEx6Oj.js?v=8');
htmlContent = htmlContent.replace(/\/assets\/index-BWvdgNyb\.css(\?v=\d+)?/g, '/assets/index-BWvdgNyb.css?v=8');

if (!htmlContent.includes('Bornopata-Regular.ttf')) {
  const fontPreloadTags = `
    <!-- Custom Bangla Fonts Preload -->
    <link rel="preload" href="/fonts/Bornopata-Regular.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="/fonts/Bornopata-Bold.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf" as="font" type="font/ttf" crossorigin>
    <style>
${fontFaceRules}
    </style>
  `;
  htmlContent = htmlContent.replace('</head>', `${fontPreloadTags}\n  </head>`);
  fs.writeFileSync(indexPath, htmlContent, 'utf8');
  console.log('Added font preloads and styles to index.html');
} else {
  fs.writeFileSync(indexPath, htmlContent, 'utf8');
  console.log('Updated index.html cache busters.');
}

// 4. Update assets/index-DkKEx6Oj.js
const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundleCode = fs.readFileSync(bundlePath, 'utf8');

// Patch 4a: Dropdown options
const oldDropdown = 'children:[i.jsx("option",{value:"sans",children:"Inter (Sans)"}),i.jsx("option",{value:"serif",children:"Kalpurush (Serif)"}),i.jsx("option",{value:"mono",children:"JetBrains Mono"})]';
const newDropdown = 'children:[i.jsx("option",{value:"sans",children:"Inter (Sans)"}),i.jsx("option",{value:"serif",children:"Kalpurush (Serif)"}),i.jsx("option",{value:"mono",children:"JetBrains Mono"}),i.jsx("option",{value:"Bornopata Regular",children:"Bornopata Regular"}),i.jsx("option",{value:"Bornopata Bold",children:"Bornopata Bold"}),i.jsx("option",{value:"Li Alinur Sangbadpatra 2 Unicode",children:"Li Alinur Sangbadpatra 2 Unicode"}),i.jsx("option",{value:"Li Alinur Sangbadpatra 2 Unicode Italic",children:"Li Alinur Sangbadpatra 2 Unicode Italic"})]';

if (bundleCode.includes(oldDropdown)) {
  bundleCode = bundleCode.replace(oldDropdown, newDropdown);
  console.log('Patched UI dropdown options in bundle.');
} else {
  console.log('Dropdown already patched or target string modified.');
}

// Patch 4b: Font resolution in VQ.drawLayers
const oldFontRes = 'const m=t/400,x=m*14,b=a.fontFamily==="serif"?"Hind Siliguri, Georgia, serif":a.fontFamily==="mono"?"JetBrains Mono, monospace":"Hind Siliguri, Inter, sans-serif"';
const newFontRes = `const m=t/400,x=m*14,b=a.fontFamily==="Bornopata Regular"||a.fontFamily==="bornopata-regular"?"'Bornopata Regular', 'Bornopata', 'Hind Siliguri', sans-serif":a.fontFamily==="Bornopata Bold"||a.fontFamily==="bornopata-bold"?"'Bornopata Bold', 'Bornopata', 'Hind Siliguri', sans-serif":a.fontFamily==="Li Alinur Sangbadpatra 2 Unicode"||a.fontFamily==="sangbadpatra2"||a.fontFamily==="alinur-sangbadpatra2"?"'Li Alinur Sangbadpatra 2 Unicode', 'Li Alinur Sangbadpatra2 Unicode', 'Hind Siliguri', sans-serif":a.fontFamily==="Li Alinur Sangbadpatra 2 Unicode Italic"||a.fontFamily==="sangbadpatra2-italic"||a.fontFamily==="alinur-sangbadpatra2-italic"?"'Li Alinur Sangbadpatra 2 Unicode Italic', 'Li Alinur Sangbadpatra2 Unicode Italic', 'Li Alinur Sangbadpatra 2 Unicode', 'Hind Siliguri', sans-serif":a.fontFamily==="serif"?"Hind Siliguri, Georgia, serif":a.fontFamily==="mono"?"JetBrains Mono, monospace":"Hind Siliguri, Inter, sans-serif"`;

if (bundleCode.includes(oldFontRes)) {
  bundleCode = bundleCode.replace(oldFontRes, newFontRes);
  console.log('Patched VQ.drawLayers font resolution in bundle.');
} else {
  console.log('VQ.drawLayers font resolution already patched or target modified.');
}

// Patch 4c: Vw.loadFonts implementation
const oldVw = 'class Vw{static async loadFonts(){if(this.fontsLoaded)return!0;try{if(typeof document<"u"&&document.fonts)return await document.fonts.ready,this.fontsLoaded=!0,!0}catch(e){console.error("Failed waiting for document.fonts.ready:",e)}return!1}';
const newVw = `class Vw{static async loadFonts(){if(this.fontsLoaded)return!0;try{if(typeof document<"u"&&document.fonts){const cfs=[{n:"Bornopata Regular",u:"/fonts/Bornopata-Regular.ttf",w:"400",s:"normal"},{n:"Bornopata Bold",u:"/fonts/Bornopata-Bold.ttf",w:"700",s:"normal"},{n:"Bornopata Bold",u:"/fonts/Bornopata-Bold.ttf",w:"400",s:"normal"},{n:"Li Alinur Sangbadpatra 2 Unicode",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf",w:"400",s:"normal"},{n:"Li Alinur Sangbadpatra 2 Unicode",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf",w:"700",s:"normal"},{n:"Li Alinur Sangbadpatra 2 Unicode Italic",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf",w:"400",s:"normal"},{n:"Li Alinur Sangbadpatra 2 Unicode Italic",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf",w:"400",s:"italic"},{n:"Li Alinur Sangbadpatra 2 Unicode Italic",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf",w:"700",s:"normal"},{n:"Li Alinur Sangbadpatra 2 Unicode Italic",u:"/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf",w:"700",s:"italic"}];for(const f of cfs){try{const ff=new FontFace(f.n,\`url("\${f.u}")\`,{weight:f.w,style:f.s});await ff.load(),document.fonts.add(ff)}catch(err){console.warn("Font load:",f.n,err)}}await document.fonts.ready;this.fontsLoaded=!0;return!0}}catch(e){console.error("Failed waiting for document.fonts.ready:",e)}return!1}`;

if (bundleCode.includes(oldVw)) {
  bundleCode = bundleCode.replace(oldVw, newVw);
  console.log('Patched Vw.loadFonts in bundle.');
} else {
  console.log('Vw.loadFonts already patched or target modified.');
}

// Patch 4d: Ai.register for font assets
const oldAi = 'Ai.register({name:"বাংলা ও ইংরেজি ফন্ট (Inter & Noto Sans Bengali)",type:"font",originalUrl:"Google Fonts",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0})';
const newAi = `Ai.register({name:"বাংলা ও ইংরেজি ফন্ট (Inter & Noto Sans Bengali)",type:"font",originalUrl:"Google Fonts",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0}),Ai.register({name:"Bornopata Regular",type:"font",originalUrl:"/fonts/Bornopata-Regular.ttf",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0}),Ai.register({name:"Bornopata Bold",type:"font",originalUrl:"/fonts/Bornopata-Bold.ttf",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0}),Ai.register({name:"Li Alinur Sangbadpatra 2 Unicode",type:"font",originalUrl:"/fonts/Li-Alinur-Sangbadpatra2-Unicode.ttf",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0}),Ai.register({name:"Li Alinur Sangbadpatra 2 Unicode Italic",type:"font",originalUrl:"/fonts/Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf",resolvedUrl:"Document loaded fonts",isSameOrigin:!0,isCorsEnabled:!0,loaded:!0,decoded:!0})`;

if (bundleCode.includes(oldAi)) {
  bundleCode = bundleCode.replace(oldAi, newAi);
  console.log('Patched Ai.register in bundle.');
} else {
  console.log('Ai.register already patched or target modified.');
}

fs.writeFileSync(bundlePath, bundleCode, 'utf8');
console.log('Custom fonts patch successfully applied to bundle!');
