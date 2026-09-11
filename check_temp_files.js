const fs = require('fs');

const files = ['apply-templates.js', 'fix-jante.js', 'fix-jante3.js', 'patch-export.js', 'patch-fonts.js', 'patch-react.js', 'patch-server.js', 'update-jante-obs.js', 'update-jante.js', 'update-jante2.js', 'update-jante3.js', 'upgrade-editor.js', 'gq_component.js', 'vq_extracted.js'];

for (const f of files) {
  if (fs.existsSync(f)) {
    const st = fs.statSync(f);
    console.log(f, 'size:', st.size);
  }
}
