const fs = require('fs');

const code = fs.readFileSync('vq_extracted.js', 'utf8');
console.log('vq_extracted.js length:', code.length);
console.log('vq_extracted.js start:', code.slice(0, 100));
console.log('vq_extracted.js end:', code.slice(-300));
