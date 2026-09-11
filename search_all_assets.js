const fs = require('fs');

const files = fs.readdirSync('assets');
for (const f of files) {
  if (f.endsWith('.js')) {
    const content = fs.readFileSync('assets/' + f, 'utf8');
    console.log(`File: ${f}, size: ${content.length}`);
    const banglaMatches = (content.match(/সমাজতান্ত্রিক/g) || []).length;
    console.log(`  সমাজতান্ত্রিক matches: ${banglaMatches}`);
  }
}
