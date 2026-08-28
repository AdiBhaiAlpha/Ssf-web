const fs = require('fs');

if (fs.existsSync('apply_full_editor_upgrade.js')) {
  console.log('--- apply_full_editor_upgrade.js (first 2000 chars) ---');
  console.log(fs.readFileSync('apply_full_editor_upgrade.js', 'utf8').slice(0, 2000));
}

if (fs.existsSync('generate_gq.js')) {
  console.log('--- generate_gq.js (first 1000 chars) ---');
  console.log(fs.readFileSync('generate_gq.js', 'utf8').slice(0, 1000));
}

if (fs.existsSync('vq_replacement.js')) {
  console.log('--- vq_replacement.js (first 1000 chars) ---');
  console.log(fs.readFileSync('vq_replacement.js', 'utf8').slice(0, 1000));
}
