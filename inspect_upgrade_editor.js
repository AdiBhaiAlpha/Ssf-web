const fs = require('fs');

const code = fs.readFileSync('upgrade-editor.js', 'utf8');
console.log('upgrade-editor.js length:', code.length);
console.log(code.slice(0, 500));
