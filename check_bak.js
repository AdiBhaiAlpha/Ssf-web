const fs = require('fs');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak', 'utf8');
console.log('Bak size:', bak.length);
console.log('Bak has VQ:', bak.includes('VQ'));
console.log('Bak has GQ:', bak.includes('GQ'));
console.log('Bak has WQ:', bak.includes('WQ'));
console.log('Bak has P5:', bak.includes('P5'));
console.log('Bak has op:', bak.includes('op'));
