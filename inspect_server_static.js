const fs = require('fs');

const server = fs.readFileSync('server.cjs', 'utf8');
console.log('server.cjs size:', server.length);
console.log('server has VQ:', server.includes('class VQ') || server.includes('VQ'));
console.log('server has PhotoCard:', server.includes('PhotoCard') || server.includes('photocard'));
console.log('server has express.static:', server.includes('express.static'));

const matchLines = server.split('\n').filter(l => l.includes('static(') || l.includes('sendFile('));
console.log('Serving lines:', matchLines);
