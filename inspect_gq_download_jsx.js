const fs = require('fs');

const gq = fs.readFileSync('upgraded_gq.js', 'utf8');

const p = gq.indexOf('onClick: handleDownload');
console.log('Download button JSX area:');
console.log(gq.slice(p - 1000, p + 800));
