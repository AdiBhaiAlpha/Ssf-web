const fs = require('fs');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak', 'utf8');
console.log('Bak length:', bak.length);
console.log('Bak start:', bak.slice(0, 300));
console.log('Bak end:', bak.slice(-300));
