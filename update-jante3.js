const fs = require('fs');
let content = fs.readFileSync('public/jante-chai.js', 'utf8');

content = content.replace(
  'function getListHtml() {',
  `function getListHtml() {
    console.log("Generating list HTML", { qLen: questionsData.length });
    return \`
      <div style="background: red; color: white; padding: 50px; font-size: 30px; z-index: 9999; position: relative;">HELLO I AM RENDERING</div>
    \` + `
);

fs.writeFileSync('public/jante-chai.js', content);
