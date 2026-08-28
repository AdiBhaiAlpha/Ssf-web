const fs = require('fs');

const origBundle = fs.readFileSync('assets/index-DkKEx6Oj.js.bak', 'utf8');
const vqReplacement = fs.readFileSync('vq_replacement.js', 'utf8');
const gqReplacement = fs.readFileSync('gq_replacement.js', 'utf8');

console.log('Original backup bundle size:', origBundle.length);

// 1. Locate VQ
const vqStart = origBundle.indexOf('class VQ{');
const p5Start = origBundle.indexOf('class P5{', vqStart);
const opStart = origBundle.indexOf('class op{', vqStart);
const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : opStart;

console.log('VQ range:', vqStart, 'to', vqEnd);

let step1 = origBundle.slice(0, vqStart) + vqReplacement + '\n' + origBundle.slice(vqEnd);

// 2. Locate GQ in step1
const gqStart = step1.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = step1.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);

console.log('GQ range in step1:', gqStart, 'to', wqStart);

let finalBundle = step1.slice(0, gqStart) + gqReplacement + '\n' + step1.slice(wqStart);

fs.writeFileSync('assets/index-DkKEx6Oj.js', finalBundle, 'utf8');
console.log('Successfully written assets/index-DkKEx6Oj.js, new length:', finalBundle.length);
