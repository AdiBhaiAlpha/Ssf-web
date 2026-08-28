const fs = require('fs');

const code = fs.readFileSync('gq_component.js', 'utf8');
console.log('gq_component.js length:', code.length);
console.log('gq_component.js start:', code.slice(0, 100));
console.log('gq_component.js end:', code.slice(-300));
