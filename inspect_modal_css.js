const fs = require('fs');

const gq = fs.readFileSync('upgraded_gq.js', 'utf8');

// Find the modal return statement
const retIdx = gq.indexOf('return i.jsxs("div", {');
console.log('Return statement and container hierarchy:');
console.log(gq.slice(retIdx, retIdx + 2000));
