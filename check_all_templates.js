const fs = require('fs');

const bundle = fs.readFileSync('assets/index-DkKEx6Oj.js', 'utf8');

const p = 1977761;
const vqSlice = bundle.slice(p, p + 30000);

// Search for templateMode or tplId in vqSlice
const matches = vqSlice.match(/tplId\s*===?\s*\d+/g);
console.log('tplId matches in VQ:', [...new Set(matches)]);

const modes = vqSlice.match(/templateMode\s*===?\s*"[^"]+"/g);
console.log('templateMode matches in VQ:', [...new Set(modes)]);

// Also let's search if any other files mention templates
console.log('Search for any template definitions across other scripts:');
const scripts = ['apply-templates.js', 'generate_gq.js', 'upgrade-editor.js', 'vq_replacement.js'];
scripts.forEach(s => {
  if (fs.existsSync(s)) {
    const text = fs.readFileSync(s, 'utf8');
    const m = text.match(/\{id:\s*\d+,\s*name:\s*"[^"]+"/g);
    if (m) {
      console.log(s, m);
    }
  }
});
