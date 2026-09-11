const fs = require('fs');

const serverCode = fs.readFileSync('server.cjs', 'utf8');
console.log('Server code length:', serverCode.length);
console.log('Contains static:', serverCode.includes('static'));
console.log('Contains assets:', serverCode.includes('assets'));
console.log('Contains index.html:', serverCode.includes('index.html'));
