const fs = require('fs');

const gq = fs.readFileSync('upgraded_gq.js', 'utf8');

// Search for the right panel
const rightIdx = gq.indexOf('lg:col-span-7');
console.log('Right panel layout:');
console.log(gq.slice(rightIdx - 50, rightIdx + 2500));
