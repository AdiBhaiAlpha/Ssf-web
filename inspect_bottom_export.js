const fs = require('fs');

const gq = fs.readFileSync('upgraded_gq.js', 'utf8');

// Search for the export section and end of right panel
const expIdx = gq.indexOf('handleDownload');
console.log('Right panel export controls and bottom:');
console.log(gq.slice(expIdx, expIdx + 3500));
