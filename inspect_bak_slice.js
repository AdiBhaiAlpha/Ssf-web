const fs = require('fs');

const bak = fs.readFileSync('assets/index-DkKEx6Oj.js.bak');
console.log('Bak buffer length:', bak.length);

const tailStr = bak.slice(945000, 950000).toString('utf8');
console.log('Tail before binary:', tailStr.slice(-500));
