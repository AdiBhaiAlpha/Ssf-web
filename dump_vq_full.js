const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const vqStart = bundle.indexOf('class VQ{');
const opStart = bundle.indexOf('class op{', vqStart);

const vqCode = bundle.slice(vqStart, opStart);
fs.writeFileSync('extracted_vq_full.js', vqCode, 'utf8');
console.log('Saved extracted_vq_full.js, length:', vqCode.length);
