const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const p = 2010735;
console.log(bundle.slice(p - 100, p + 4000));
