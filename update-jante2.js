const fs = require('fs');
let content = fs.readFileSync('public/jante-chai.js', 'utf8');

// Catch any errors in renderView and display them on the screen
content = content.replace(
  'function renderView() {',
  `function renderView() {
    try {
      _renderViewInternal();
    } catch (err) {
      const debug = document.createElement('div');
      debug.style.color = 'red';
      debug.style.padding = '20px';
      debug.style.fontSize = '20px';
      debug.innerText = 'Error in renderView: ' + err.stack;
      document.body.prepend(debug);
    }
  }
  function _renderViewInternal() {
`
);

fs.writeFileSync('public/jante-chai.js', content);
