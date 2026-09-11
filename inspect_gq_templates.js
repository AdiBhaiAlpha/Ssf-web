const fs = require('fs');

if (fs.existsSync('generate_gq.js')) {
  const content = fs.readFileSync('generate_gq.js', 'utf8');
  console.log('generate_gq.js line count:', content.split('\n').length);
  // Find where templates array is defined
  const tPos = content.indexOf('const templates = [');
  if (tPos !== -1) {
    console.log(content.slice(tPos, tPos + 3000));
  } else {
    console.log('No `const templates = [` found, searching for templates:');
    const matches = content.match(/templates\s*=\s*\[[\s\S]*?\];/);
    if (matches) {
      console.log(matches[0].slice(0, 2000));
    }
  }
}

if (fs.existsSync('apply-templates.js')) {
  console.log('--- ALL OF apply-templates.js ---');
  console.log(fs.readFileSync('apply-templates.js', 'utf8'));
}
