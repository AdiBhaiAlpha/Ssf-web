const fs = require('fs');

const bundlePath = 'assets/index-DkKEx6Oj.js';
let code = fs.readFileSync(bundlePath, 'utf8');

// Backup original bundle if not already backed up
if (!fs.existsSync('assets/index-DkKEx6Oj.js.bak')) {
  fs.writeFileSync('assets/index-DkKEx6Oj.js.bak', code, 'utf8');
}

// 1. New Templates array to append
const newTemplates = `,{id:22,name:"স্কয়ার ব্র্যান্ড রেড (Brand Red Solid)",tag:"SQ_SPLIT_RED",theme:"dark",bg:"solid",color:"#b91c1c",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:23,name:"স্কয়ার ডিপ মেরুন (Deep Maroon Solid)",tag:"SQ_SPLIT_MAROON",theme:"dark",bg:"solid",color:"#580c1f",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:24,name:"স্কয়ার ডার্ক চারকোল (Dark Charcoal Solid)",tag:"SQ_SPLIT_CHARCOAL",theme:"dark",bg:"solid",color:"#18181b",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:25,name:"স্কয়ার ক্লিন হোয়াইট (Clean White Solid)",tag:"SQ_SPLIT_WHITE",theme:"light",bg:"solid",color:"#ffffff",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:26,name:"স্কয়ার লাইট গ্রে (Light Gray Solid)",tag:"SQ_SPLIT_GRAY",theme:"light",bg:"solid",color:"#f4f4f5",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:27,name:"স্কয়ার রয়্যাল নেভি (Royal Navy Solid)",tag:"SQ_SPLIT_NAVY",theme:"dark",bg:"solid",color:"#0f172a",font:"sans",img:"top",border:"none",align:"center",slogan:""},{id:28,name:"স্কয়ার বটল গ্রিন (Forest Green Solid)",tag:"SQ_SPLIT_GREEN",theme:"dark",bg:"solid",color:"#064e3b",font:"sans",img:"top",border:"none",align:"center",slogan:""}`;

const zSTarget = `{id:21,name:"📊 রিপোর্ট ও তথ্যচিত্র (Insights)",tag:"INSIGHTS",theme:"dark",bg:"gradient",color:"#16a34a",font:"sans",img:"top",border:"none",align:"left",slogan:"পরিসংখ্যান ও বিশ্লেষণ"}]`;
const zSReplacement = `{id:21,name:"📊 রিপোর্ট ও তথ্যচিত্র (Insights)",tag:"INSIGHTS",theme:"dark",bg:"gradient",color:"#16a34a",font:"sans",img:"top",border:"none",align:"left",slogan:"পরিসংখ্যান ও বিশ্লেষণ"}${newTemplates}]`;

if (code.includes(zSTarget)) {
  code = code.replace(zSTarget, zSReplacement);
  console.log('1. Successfully added 7 new templates to zS!');
} else {
  console.log('1. zS target not found or already patched.');
}

// 2. Update UI label count
const labelTarget = 'children:"ডিজাইন টেমপ্লেট নির্বাচন (২১টি প্রি-সেট)"';
const labelReplacement = 'children:"ডিজাইন টেমপ্লেট নির্বাচন (২৮টি প্রি-সেট)"';
if (code.includes(labelTarget)) {
  code = code.replace(labelTarget, labelReplacement);
  console.log('2. Successfully updated UI template count to 28!');
}

// 3. Update F branch selection logic in VQ.drawLayers
const targetF = `F=a.selectedTemplate===15?"EVENT_COV":a.selectedTemplate===16?"AWARENESS":a.selectedTemplate===17?"STUDENT_ACT":a.selectedTemplate===18?"LIBRARY":a.selectedTemplate===19?"RESEARCH":a.selectedTemplate===20?"ANNOUNCEMENT":a.selectedTemplate===21?"INSIGHTS":a.selectedTemplate===1?"BREAKING":a.selectedTemplate===2?"MAGAZINE":[3,4,5,6,15,16].includes(a.selectedTemplate)?"SOCIAL_SQ":[7,8,9,10,11,18,19,21].includes(a.selectedTemplate)?"MINIMAL":"PROCLAMATION";`;
const replacementF = `F=[22,23,24,25,26,27,28].includes(a.selectedTemplate)?"SQ_HALF_SPLIT":a.selectedTemplate===15?"EVENT_COV":a.selectedTemplate===16?"AWARENESS":a.selectedTemplate===17?"STUDENT_ACT":a.selectedTemplate===18?"LIBRARY":a.selectedTemplate===19?"RESEARCH":a.selectedTemplate===20?"ANNOUNCEMENT":a.selectedTemplate===21?"INSIGHTS":a.selectedTemplate===1?"BREAKING":a.selectedTemplate===2?"MAGAZINE":[3,4,5,6,15,16].includes(a.selectedTemplate)?"SOCIAL_SQ":[7,8,9,10,11,18,19,21].includes(a.selectedTemplate)?"MINIMAL":"PROCLAMATION";`;

if (code.includes(targetF)) {
  code = code.replace(targetF, replacementF);
  console.log('3. Successfully updated F selector logic!');
}

// 4. Implement SQ_HALF_SPLIT drawing block in VQ.drawLayers
const sqSplitBlock = `if(F==="SQ_HALF_SPLIT"){
e.save();
let solidBg="#b91c1c",titleColor="#ffffff",catBadgeBg="rgba(255,255,255,0.18)",catBadgeBorder="rgba(255,255,255,0.3)",catTextColor="#ffffff",footerDivider="rgba(255,255,255,0.22)",footerOrgColor="#ffffff",footerBranchColor="#fecaca";
if(a.selectedTemplate===22||a.accentColor==="#b91c1c"||a.accentColor==="#dc2626"||a.accentColor==="#B3002D"){solidBg="#b91c1c";titleColor="#ffffff";catBadgeBg="rgba(255,255,255,0.18)";catBadgeBorder="rgba(255,255,255,0.3)";catTextColor="#ffffff";footerDivider="rgba(255,255,255,0.22)";footerOrgColor="#ffffff";footerBranchColor="#fecaca";}
else if(a.selectedTemplate===23||a.accentColor==="#580c1f"||a.accentColor==="#881337"||a.accentColor==="#70091e"){solidBg="#580c1f";titleColor="#ffffff";catBadgeBg="rgba(254,240,138,0.18)";catBadgeBorder="rgba(254,240,138,0.4)";catTextColor="#fef08a";footerDivider="rgba(255,255,255,0.2)";footerOrgColor="#ffffff";footerBranchColor="#fecdd3";}
else if(a.selectedTemplate===24||a.accentColor==="#18181b"||a.accentColor==="#09090b"||a.accentColor==="#111827"){solidBg="#18181b";titleColor="#ffffff";catBadgeBg="rgba(225,29,72,0.2)";catBadgeBorder="rgba(225,29,72,0.5)";catTextColor="#fb7185";footerDivider="rgba(255,255,255,0.15)";footerOrgColor="#ffffff";footerBranchColor="#a1a1aa";}
else if(a.selectedTemplate===25||a.accentColor==="#ffffff"||(a.bgTheme==="light"&&a.selectedTemplate===25)){solidBg="#ffffff";titleColor="#09090b";catBadgeBg="#fff1f2";catBadgeBorder="#fecdd3";catTextColor="#b91c1c";footerDivider="#e4e4e7";footerOrgColor="#b91c1c";footerBranchColor="#52525b";}
else if(a.selectedTemplate===26||a.accentColor==="#f4f4f5"){solidBg="#f4f4f5";titleColor="#18181b";catBadgeBg="#ffffff";catBadgeBorder="#e4e4e7";catTextColor="#b91c1c";footerDivider="#d4d4d8";footerOrgColor="#b91c1c";footerBranchColor="#52525b";}
else if(a.selectedTemplate===27||a.accentColor==="#0f172a"||a.accentColor==="#1e293b"){solidBg="#0f172a";titleColor="#ffffff";catBadgeBg="rgba(56,189,248,0.18)";catBadgeBorder="rgba(56,189,248,0.4)";catTextColor="#38bdf8";footerDivider="rgba(255,255,255,0.15)";footerOrgColor="#ffffff";footerBranchColor="#94a3b8";}
else if(a.selectedTemplate===28||a.accentColor==="#064e3b"||a.accentColor==="#065f46"){solidBg="#064e3b";titleColor="#ffffff";catBadgeBg="rgba(251,191,36,0.18)";catBadgeBorder="rgba(251,191,36,0.4)";catTextColor="#fde68a";footerDivider="rgba(255,255,255,0.2)";footerOrgColor="#ffffff";footerBranchColor="#a7f3d0";}
else{solidBg=a.accentColor||"#b91c1c";titleColor=a.bgTheme==="light"?"#09090b":"#ffffff";catBadgeBg=a.bgTheme==="light"?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.18)";catBadgeBorder=a.bgTheme==="light"?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.3)";catTextColor=a.bgTheme==="light"?"#b91c1c":"#ffffff";footerDivider=a.bgTheme==="light"?"#e4e4e7":"rgba(255,255,255,0.2)";footerOrgColor=a.bgTheme==="light"?"#b91c1c":"#ffffff";footerBranchColor=a.bgTheme==="light"?"#52525b":"rgba(255,255,255,0.75)";}
const imgHeight=Math.round(s*0.50);
if(h&&a.imagePosition!=="hidden"){
e.save();e.beginPath();e.rect(0,0,t,imgHeight);e.clip();
const ne=cu.calculateFit(h.width,h.height,0,0,t,imgHeight,!0);
e.drawImage(h,ne.x,ne.y,ne.width,ne.height);
e.restore();
if(p)p.imageBounds={x:0,y:0,w:t,h:imgHeight};
}else{
e.fillStyle=solidBg==="#ffffff"||solidBg==="#f4f4f5"?"#e4e4e7":"#111827";
e.fillRect(0,0,t,imgHeight);
if(d&&a.showLogo){e.save();e.globalAlpha=0.15;const ph=m*44;e.drawImage(d,(t-ph)/2,(imgHeight-ph)/2,ph,ph);e.restore();}
}
e.fillStyle=solidBg;
e.fillRect(0,imgHeight,t,s-imgHeight);
if(p){p.objectCount++;p.layerOrder.push("lower_solid_panel");p.objectCoordinates.lower_solid_panel={x:0,y:imgHeight,w:t,h:s-imgHeight};}
const footerH=m*30,footerY=s-footerH,contentTop=imgHeight+m*6,contentBottom=footerY-m*4;
let catH=0;
if(a.showCategory&&(a.customCategory||a.customSlogan)){
const catText=(a.customCategory||a.customSlogan||"").trim();
if(catText){
e.font=\`bold \${m*7.5}px \${b}\`;
const catW=e.measureText(catText).width+m*16,catBadgeH=m*13.5,catBadgeY=contentTop+m*2;
e.fillStyle=catBadgeBg;
this.fillRoundedRect(e,t/2-catW/2,catBadgeY,catW,catBadgeH,m*2);
if(catBadgeBorder){e.strokeStyle=catBadgeBorder;e.lineWidth=1;this.strokeRoundedRect(e,t/2-catW/2,catBadgeY,catW,catBadgeH,m*2);}
e.fillStyle=catTextColor;e.textAlign="center";e.textBaseline="middle";
e.fillText(catText,t/2,catBadgeY+catBadgeH/2);
catH=catBadgeH+m*6;
}
}
const titleAreaTop=contentTop+catH,titleAreaH=contentBottom-titleAreaTop,maxTitleW=t-m*36,rawTitle=(a.customTitle||r.title||"").trim();
let titleFontSize=m*17.5;
if(rawTitle.length<=35)titleFontSize=m*20;
else if(rawTitle.length<=65)titleFontSize=m*17;
else if(rawTitle.length<=100)titleFontSize=m*15;
else titleFontSize=m*13;
e.font=\`bold \${titleFontSize}px \${b}\`;
let titleLines=this.wrapTextWithParagraphs(e,rawTitle,maxTitleW),lineHeight=titleFontSize*1.35;
if(titleLines.length*lineHeight>titleAreaH-m*8&&titleFontSize>m*11){
titleFontSize=m*12;lineHeight=titleFontSize*1.3;
e.font=\`bold \${titleFontSize}px \${b}\`;
titleLines=this.wrapTextWithParagraphs(e,rawTitle,maxTitleW);
}
const totalTitleH=titleLines.length*lineHeight,titleStartY=titleAreaTop+(titleAreaH-totalTitleH)/2+(lineHeight/2);
e.fillStyle=titleColor;
e.font=\`bold \${titleFontSize}px \${b}\`;
e.textAlign="center";
e.textBaseline="middle";
for(let i=0;i<titleLines.length;i++){
e.fillText(titleLines[i],t/2,titleStartY+i*lineHeight);
}
if(p){p.objectCount++;p.layerOrder.push("title");p.objectCoordinates.title={x:m*18,y:titleAreaTop,w:maxTitleW,h:titleAreaH};p.fontMetrics={fontSize:titleFontSize,lineCount:titleLines.length,titleHeight:totalTitleH};}
e.strokeStyle=footerDivider;
e.lineWidth=m*0.8;
e.beginPath();
e.moveTo(m*18,footerY);
e.lineTo(t-m*18,footerY);
e.stroke();
if(a.showLogo&&d){
const logoSize=m*17,logoGap=m*6;
e.font=\`bold \${m*8}px \${b}\`;
const line1W=e.measureText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট").width;
e.font=\`600 \${m*6.2}px \${b}\`;
const line2W=e.measureText("ময়মনসিংহ জেলা শাখা").width;
const maxTextW=Math.max(line1W,line2W),totalBrandW=logoSize+logoGap+maxTextW,brandStartX=(t-totalBrandW)/2,brandLogoY=footerY+m*5;
e.drawImage(d,brandStartX,brandLogoY,logoSize,logoSize);
const textStartX=brandStartX+logoSize+logoGap;
e.textAlign="left";e.textBaseline="top";
e.fillStyle=footerOrgColor;
e.font=\`bold \${m*8}px \${b}\`;
e.fillText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট",textStartX,brandLogoY+m*0.8);
e.fillStyle=footerBranchColor;
e.font=\`600 \${m*6.2}px \${b}\`;
e.fillText("ময়মনসিংহ জেলা শাখা",textStartX,brandLogoY+m*9.5);
}else{
e.textAlign="center";e.textBaseline="top";
e.fillStyle=footerOrgColor;
e.font=\`bold \${m*8.5}px \${b}\`;
e.fillText("সমাজতান্ত্রিক ছাত্র ফ্রন্ট",t/2,footerY+m*5);
e.fillStyle=footerBranchColor;
e.font=\`600 \${m*6.5}px \${b}\`;
e.fillText("ময়মনসিংহ জেলা শাখা",t/2,footerY+m*15);
}
if(p){p.objectCount++;p.layerOrder.push("footer");p.objectCoordinates.footer={x:m*18,y:footerY,w:t-m*36,h:footerH};}
e.restore();
}else `;

const targetBreaking = 'if(F==="BREAKING"){';
if (code.includes(targetBreaking)) {
  code = code.replace(targetBreaking, sqSplitBlock + targetBreaking);
  console.log('4. Successfully added SQ_HALF_SPLIT drawing block to VQ.drawLayers!');
}

fs.writeFileSync(bundlePath, code, 'utf8');
console.log('Bundle successfully written!');
