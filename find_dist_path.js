const fs = require('fs');

const server = fs.readFileSync('server.cjs', 'utf8');
const lines = server.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('distPath') || lines[i].includes('indexPath')) {
    console.log(`Line ${i+1}:`, lines[i]);
  }
}
