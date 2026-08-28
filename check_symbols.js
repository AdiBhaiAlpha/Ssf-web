const fs = require('fs');
const files = ['bundle_with_28_templates.js', 'assets/index-DkKEx6Oj.js'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    ['$Q', 'exportAndValidate', 'zC', 'HQ', 'Sn'].forEach(sym => {
      const count = (content.match(new RegExp(sym.replace('$', '\\$'), 'g')) || []).length;
      console.log(`${f} contains ${sym}: ${count} times`);
    });
  }
});
