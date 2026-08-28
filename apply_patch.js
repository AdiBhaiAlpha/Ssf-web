const fs = require('fs');

const bundlePath = 'assets/index-DkKEx6Oj.js';
let bundle = fs.readFileSync(bundlePath, 'utf8');

const vqReplacement = fs.readFileSync('vq_replacement.js', 'utf8');
const gqReplacement = fs.readFileSync('gq_replacement.js', 'utf8');

console.log('Original bundle size:', bundle.length);

// 1. Locate VQ boundaries
const vqStart = bundle.indexOf('class VQ{');
const p5Start = bundle.indexOf('class P5{', vqStart);
const opStart = bundle.indexOf('class op{', vqStart);
const vqEnd = (p5Start !== -1 && p5Start > vqStart) ? p5Start : opStart;

if (vqStart === -1 || vqEnd === -1) {
  console.error('Could not find VQ boundaries!');
  process.exit(1);
}

console.log('Replacing VQ from', vqStart, 'to', vqEnd);
bundle = bundle.slice(0, vqStart) + vqReplacement + '\n' + bundle.slice(vqEnd);

// 2. Locate GQ boundaries
const gqStart = bundle.indexOf('function GQ({item:n,onClose:e}){');
const wqStart = bundle.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqStart);

if (gqStart === -1 || wqStart === -1) {
  console.error('Could not find GQ boundaries!');
  process.exit(1);
}

console.log('Replacing GQ from', gqStart, 'to', wqStart);
bundle = bundle.slice(0, gqStart) + gqReplacement + '\n' + bundle.slice(wqStart);

fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log('Successfully patched bundle! New size:', bundle.length);
