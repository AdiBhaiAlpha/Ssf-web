const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

console.log('class VQ pos:', bundle.indexOf('class VQ{'));
console.log('class op pos:', bundle.indexOf('class op{'));
console.log('class P5 pos:', bundle.indexOf('class P5{'));
console.log('class HQ pos:', bundle.indexOf('class HQ{'));
console.log('class $Q pos:', bundle.indexOf('class $Q{'));
console.log('function GQ pos:', bundle.indexOf('function GQ('));
console.log('function WQ pos:', bundle.indexOf('function WQ('));
