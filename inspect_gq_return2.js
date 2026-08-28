const fs = require('fs');

const gq = fs.readFileSync('current_gq_code.js', 'utf8');

const returnPos = gq.indexOf('return i.jsxs(') !== -1 ? gq.indexOf('return i.jsxs(') : gq.indexOf('return i.jsx(');

console.log('--- RETURN JSX: 3500 to 12000 ---');
console.log(gq.slice(returnPos + 3500, returnPos + 12000));
