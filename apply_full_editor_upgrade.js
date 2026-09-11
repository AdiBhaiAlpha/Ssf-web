const fs = require('fs');
const path = require('path');

const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Original bundle size:', bundle.length);

// 1. Locate VQ boundaries
const vqStart = bundle.indexOf('class VQ{');
const p5Start = bundle.indexOf('class P5{', vqStart);
const opStart = bundle.indexOf('class op{', vqStart);
const zcStart = bundle.indexOf('class zC{', vqStart);
const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : (zcStart !== -1 ? zcStart : opStart);

console.log('VQ range:', vqStart, 'to', vqEnd);

// 2. Locate GQ boundaries
const gqStart = bundle.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = bundle.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);

console.log('GQ range:', gqStart, 'to', wqStart);

if (vqStart === -1 || gqStart === -1 || wqStart === -1) {
  console.error('Failed to locate symbols in bundle!');
  process.exit(1);
}
