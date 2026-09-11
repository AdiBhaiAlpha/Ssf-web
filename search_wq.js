const fs = require('fs');

const rootFiles = fs.readdirSync('.');
for (const f of rootFiles) {
  if (f.endsWith('.js')) {
    const text = fs.readFileSync(f, 'utf8');
    if (text.includes('function WQ') || text.includes('WQ({') || text.includes('WQ =') || text.includes('WQ,')) {
      console.log('Found in', f);
    }
  }
}
