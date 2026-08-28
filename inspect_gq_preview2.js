const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

const returnPos = gq.indexOf('return i.jsxs(') !== -1 ? gq.indexOf('return i.jsxs(') : gq.indexOf('return i.jsx(');

console.log('--- PREVIEW PANEL (Right side) JSX - Part 2 ---');
console.log(gq.slice(returnPos + 22000, returnPos + 35000));
