const fs = require('fs');
let content = fs.readFileSync('public/jante-chai.js', 'utf8');

// Add debug logs to renderView
content = content.replace(
  'function renderView() {',
  `function renderView() {
    console.log("renderView called", { activeTab, qaRoot: !!document.getElementById('qa-react-root'), homeRoot: !!document.getElementById('jante-chai-app-root') });`
);

fs.writeFileSync('public/jante-chai.js', content);
