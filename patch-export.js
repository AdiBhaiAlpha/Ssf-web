const fs = require('fs');

console.log('--- Applying Photo Card Export / Rendering Pipeline Fix ---');

const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundleCode = fs.readFileSync(bundlePath, 'utf8');

// 1. Update memory limit to allow crisp 4K 1:1 rendering (3780x3780)
const oldMemory = 'c1.MAX_PIXELS=12*1024*1024,c1.MAX_DIMENSION=4096';
const newMemory = 'c1.MAX_PIXELS=24*1024*1024,c1.MAX_DIMENSION=8192';

if (bundleCode.includes(oldMemory)) {
  bundleCode = bundleCode.replace(oldMemory, newMemory);
  console.log('Updated c1.MAX_PIXELS and c1.MAX_DIMENSION for high-res 4K support.');
} else {
  console.log('Memory limits already updated or target string modified.');
}

// 2. Fix the export pipeline in Rs to export dedicated offscreen target canvas
const oldRsSection = 'const an=rr.current;if(!an)throw new Error("প্রিভিউ ক্যানভাস খুঁজে পাওয়া যায়নি (Preview canvas not found)");const It=an.width,Qt=an.height;let xn=1;if(qt==="retina"?xn=2:qt==="4k"&&(xn=3.5),xn>1){zt.log(`রেজোলিউশন স্কেল আপগ্রেড ট্রিগার হয়েছে: ${xn}x. ইমেজ পিক্সেল বুস্টিং করা হচ্ছে...`),an.width=Math.round(It*xn),an.height=Math.round(Qt*xn);const Xn={...Wt},xs=await op.renderPhotoCard(n,ot,xn,Xn),li=an.getContext("2d");li&&li.drawImage(xs,0,0)}Se="blob",zt.setStep("blob","running"),zt.log("ধাপ ৫: ক্যানভাস পিক্সেল ডাটা থেকে অবজেক্ট ফাইল তৈরি করা হচ্ছে...");const mn=tn,Fs=`SSF_PhotoCard_${n.id}_${Date.now()}.${mn}`,{Exporter:As}=await ux(async()=>{const{Exporter:Xn}=await Promise.resolve().then(()=>qQ);return{Exporter:Xn}},void 0),Ei=await As.exportCanvas(an,{format:mn,filename:Fs});if(zt.log(`এক্সপোর্ট টাইপ: ${mn.toUpperCase()}. বাইনারি ফাইল জেনারেট সম্পন্ন।`),zt.setStep("blob","success"),Se="prepare_download",zt.setStep("prepare_download","running"),zt.log("ধাপ ৬: ফাইল রিসোর্স ব্রাউজার লিংকে কানেক্ট করা হচ্ছে..."),Ei instanceof Blob){const Xn=URL.createObjectURL(Ei);zt.setStep("prepare_download","success"),Se="download_started",zt.setStep("download_started","running"),zt.log("ধাপ ৭: লোকাল ড্রাইভে ফাইল রাইটিং সিগন্যাল পাঠানো হচ্ছে...");const xs=document.createElement("a");xs.href=Xn,xs.download=Fs,document.body.appendChild(xs),xs.click(),document.body.removeChild(xs),URL.revokeObjectURL(Xn)}else zt.setStep("prepare_download","success"),Se="download_started",zt.setStep("download_started","running"),zt.log("ধাপ ৭: লোকাল ড্রাইভে পিডিএফ রাইটিং সিগন্যাল পাঠানো হচ্ছে..."),Ei.pdf.save(Ei.filename);if(xn>1){an.width=It,an.height=Qt;const Xn=await op.renderPhotoCard(n,ot,1,ks.current||void 0),xs=an.getContext("2d");xs&&xs.drawImage(Xn,0,0)}';

const newRsSection = 'let xn=1;qt==="retina"?xn=2:qt==="4k"&&(xn=3.5);zt.log(`রেজোলিউশন স্কেল সেট করা হয়েছে: ${xn}x. হাই-কোয়ালিটি ফটোকার্ড রেন্ডারিং শুরু হচ্ছে...`);const Xn={...Wt},exportTargetCanvas=await op.renderPhotoCard(n,ot,xn,Xn);Se="blob",zt.setStep("blob","running"),zt.log("ধাপ ৫: ক্যানভাস পিক্সেল ডাটা থেকে অবজেক্ট ফাইল তৈরি করা হচ্ছে...");const mn=tn,Fs=`SSF_PhotoCard_${n.id}_${Date.now()}.${mn}`,{Exporter:As}=await ux(async()=>{const{Exporter:Cn}=await Promise.resolve().then(()=>qQ);return{Exporter:Cn}},void 0),Ei=await As.exportCanvas(exportTargetCanvas,{format:mn,filename:Fs});if(zt.log(`এক্সপোর্ট টাইপ: ${mn.toUpperCase()}. বাইনারি ফাইল জেনারেট সম্পন্ন।`),zt.setStep("blob","success"),Se="prepare_download",zt.setStep("prepare_download","running"),zt.log("ধাপ ৬: ফাইল রিসোর্স ব্রাউজার লিংকে কানেক্ট করা হচ্ছে..."),Ei instanceof Blob){const Cn=URL.createObjectURL(Ei);Y(Cn),zt.setStep("prepare_download","success"),Se="download_started",zt.setStep("download_started","running"),zt.log("ধাপ ৭: লোকাল ড্রাইভে ফাইল রাইটিং সিগন্যাল পাঠানো হচ্ছে...");const xs=document.createElement("a");xs.href=Cn,xs.download=Fs,document.body.appendChild(xs),xs.click(),document.body.removeChild(xs)}else zt.setStep("prepare_download","success"),Se="download_started",zt.setStep("download_started","running"),zt.log("ধাপ ৭: লোকাল ড্রাইভে পিডিএফ রাইটিং সিগন্যাল পাঠানো হচ্ছে..."),Ei.pdf.save(Ei.filename);const prevCan=rr.current;if(prevCan){const pr=await op.renderPhotoCard(n,ot,1,ks.current||void 0);prevCan.width=pr.width,prevCan.height=pr.height;const px=prevCan.getContext("2d");px&&px.drawImage(pr,0,0)}';

if (bundleCode.includes(oldRsSection)) {
  bundleCode = bundleCode.replace(oldRsSection, newRsSection);
  console.log('Successfully patched export pipeline in Rs.');
} else {
  console.error('ERROR: oldRsSection target string not found in bundleCode!');
}

// 3. Cache buster in index.html
const indexPath = 'index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/\/assets\/index-DkKEx6Oj\.js(\?v=\d+)?/g, '/assets/index-DkKEx6Oj.js?v=9');
indexHtml = indexHtml.replace(/\/assets\/index-BWvdgNyb\.css(\?v=\d+)?/g, '/assets/index-BWvdgNyb.css?v=9');
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated cache buster to v=9 in index.html');

fs.writeFileSync(bundlePath, bundleCode, 'utf8');
console.log('Bundle written successfully.');
