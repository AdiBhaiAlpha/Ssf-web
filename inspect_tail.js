const fs = require('fs');

const code = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

console.log('Total length:', code.length);
console.log('Starts with:', code.slice(0, 200));
console.log('Ends with:', code.slice(-300));
