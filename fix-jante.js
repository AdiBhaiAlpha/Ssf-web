const fs = require('fs');
let content = fs.readFileSync('public/jante-chai.js', 'utf8');

const correctRenderView = `  function renderView() {
    injectStyles();
    
    let reactQaRoot = document.getElementById('qa-react-root');
    let homeRoot = document.getElementById('jante-chai-app-root');
    
    if (reactQaRoot) {
      if (activeTab === 'home') activeTab = 'qa-list';
      
      let html = '';
      if (activeTab === 'qa-list') html = getListHtml();
      else if (activeTab === 'qa-detail') html = getDetailHtml();
      
      reactQaRoot.innerHTML = html;
      
      if (homeRoot) homeRoot.innerHTML = ''; // Clear home preview if on QA page
      return;
    }

    if (homeRoot) {
      if (activeTab === 'home') {
        homeRoot.innerHTML = getHomePreviewHtml();
      } else {
        homeRoot.innerHTML = '';
      }
    }
  }`;

content = content.replace(/function renderView\(\) \{[\s\S]*?\}[\s]*function getHomePreviewHtml/, correctRenderView + '\n\n  function getHomePreviewHtml');

fs.writeFileSync('public/jante-chai.js', content);
console.log('Fixed renderView in jante-chai.js');
