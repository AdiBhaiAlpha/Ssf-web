const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

console.log('zS with space:', bundle.indexOf('const zS ='));
console.log('zS without space:', bundle.indexOf('const zS='));
console.log('GQ start:', bundle.indexOf('function GQ({'));
console.log('WQ start:', bundle.indexOf('function WQ('));
