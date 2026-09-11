const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const gqStart = bundle.indexOf('function GQ({');
const wqStart = bundle.indexOf('function WQ({', gqStart);

console.log('GQ length:', wqStart - gqStart);

const gqCode = bundle.slice(gqStart, wqStart);
fs.writeFileSync('current_gq_code.js', gqCode, 'utf8');
console.log('Saved current_gq_code.js');
