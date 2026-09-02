const fs = require('fs');

const bundle = fs.readFileSync('bundle_with_28_templates.js', 'utf8');

const gqIndex = bundle.indexOf('function GQ({');
if (gqIndex === -1) {
  console.log('GQ not found!');
} else {
  console.log('Found function GQ({ at index', gqIndex);
  console.log('=== Preceding 500 chars ===');
  console.log(bundle.slice(Math.max(0, gqIndex - 500), gqIndex));
  console.log('=== Succeeding 500 chars ===');
  console.log(bundle.slice(gqIndex, gqIndex + 500));
}
