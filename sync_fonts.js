const fs = require('fs');
const path = require('path');

console.log('--- Verifying Font Files in All Locations ---');

const fontFiles = [
  'Bornopata-Regular.ttf',
  'Bornopata-Bold.ttf',
  'Li Alinur Sangbadpatra2 Unicode.ttf',
  'Li Alinur Sangbadpatra2 Unicode Italic.ttf',
  'Li-Alinur-Sangbadpatra2-Unicode.ttf',
  'Li-Alinur-Sangbadpatra2-Unicode-Italic.ttf'
];

const dirs = ['.', 'public', 'assets/fonts', 'public/fonts', 'fonts'];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

for (const font of fontFiles) {
  // Find source
  let src = null;
  for (const d of ['.', 'public', 'assets/fonts']) {
    const p = path.join(d, font);
    if (fs.existsSync(p)) {
      src = p;
      break;
    }
  }
  if (src) {
    const buf = fs.readFileSync(src);
    for (const d of dirs) {
      const dest = path.join(d, font);
      if (!fs.existsSync(dest) || fs.statSync(dest).size !== buf.length) {
        fs.writeFileSync(dest, buf);
        console.log(`Copied ${font} to ${dest}`);
      }
    }
  } else {
    console.warn('Could not find source for font:', font);
  }
}
console.log('Fonts synced across all static directories.');
