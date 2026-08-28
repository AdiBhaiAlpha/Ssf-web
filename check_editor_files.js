const fs = require('fs');

console.log('Files in directory:');
const files = fs.readdirSync('.').filter(f => f.endsWith('.js'));
console.log(files);

if (fs.existsSync('apply-templates.js')) {
  console.log('--- apply-templates.js ---');
  console.log(fs.readFileSync('apply-templates.js', 'utf8').slice(0, 1000));
}

if (fs.existsSync('upgrade-editor.js')) {
  console.log('--- upgrade-editor.js ---');
  console.log(fs.readFileSync('upgrade-editor.js', 'utf8').slice(0, 1000));
}
