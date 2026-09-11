const fs = require('fs');

const gq = fs.readFileSync('upgraded_gq.js', 'utf8');

// Search for the grid and right panel
const gridIdx = gq.indexOf('lg:grid-cols-12');
console.log('Grid and columns:');
console.log(gq.slice(gridIdx - 100, gridIdx + 3000));
