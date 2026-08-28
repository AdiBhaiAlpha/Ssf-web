const fs = require('fs');

const bundle = fs.readFileSync('reconstructed_bundle.js', 'utf8');
console.log('Reconstructed length:', bundle.length);

const vqPos = bundle.indexOf('class VQ{');
const p5Pos = bundle.indexOf('class P5{', vqPos);
const opPos = bundle.indexOf('class op{', vqPos);
const gqPos = bundle.indexOf('function GQ({item:n,onClose:e}){');
const wqPos = bundle.indexOf('function WQ({item:n,db:e,onClose:t,onRefresh:s', gqPos);

console.log('VQ pos:', vqPos);
console.log('P5 pos:', p5Pos);
console.log('op pos:', opPos);
console.log('GQ pos:', gqPos);
console.log('WQ pos:', wqPos);
