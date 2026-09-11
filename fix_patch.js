const fs = require('fs');

let gqContent = fs.readFileSync('gq_replacement.js', 'utf8');
// replace literal \n with actual newlines if any
if (gqContent.includes('\\n')) {
  gqContent = gqContent.replace(/\\n/g, '\n');
}
fs.writeFileSync('gq_replacement.js', gqContent, 'utf8');

// Now reapply patch from backup or clean source
let bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const vqReplacement = fs.readFileSync('vq_replacement.js', 'utf8');
const gqReplacement = fs.readFileSync('gq_replacement.js', 'utf8');

// 1. Locate VQ boundaries
const vqStart = bundle.indexOf('class VQ{');
const p5Start = bundle.indexOf('class P5{', vqStart);
const opStart = bundle.indexOf('class op{', vqStart);
const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : opStart;

if (vqStart !== -1 && vqEnd !== -1) {
  bundle = bundle.slice(0, vqStart) + vqReplacement + '\n' + bundle.slice(vqEnd);
}

// 2. Locate GQ boundaries
const gqStart = bundle.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = bundle.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);

if (gqStart !== -1 && wqStart !== -1) {
  bundle = bundle.slice(0, gqStart) + gqReplacement + '\n' + bundle.slice(wqStart);
}

fs.writeFileSync('assets/index-DkKEx6Oj.js', bundle, 'utf8');
console.log('Patch updated and saved.');
