const fs = require('fs');

if (fs.existsSync('apply-templates.js')) {
  console.log(fs.readFileSync('apply-templates.js', 'utf8'));
}
