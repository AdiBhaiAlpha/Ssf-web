const fs = require('fs');

const original = fs.readFileSync('public/jante-chai.js', 'utf8');

let updated = original.replace(
  /const observer = new MutationObserver\(\(\) => \{[\s\S]*?\}\);/,
  `const observer = new MutationObserver(() => {
    const qaRoot = document.getElementById('qa-react-root');
    const homeRoot = document.getElementById('jante-chai-app-root');
    
    if (qaRoot && !qaRoot.hasChildNodes()) {
      renderView();
    } else if (!qaRoot && activeTab !== 'home') {
      activeTab = 'home';
      renderView();
    } else if (homeRoot && !homeRoot.hasChildNodes() && activeTab === 'home') {
      renderView();
    }
  });`
);

fs.writeFileSync('public/jante-chai.js', updated);
console.log('Successfully updated MutationObserver in jante-chai.js');
