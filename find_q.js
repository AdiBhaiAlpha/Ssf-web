const fs = require('fs');
['reconstructed_bundle.js', 'bundle_with_28_templates.js', 'assets/index-DkKEx6Oj.js'].forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('$Q')) {
        console.log(`${f}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
