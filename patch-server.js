const fs = require('fs');
let code = fs.readFileSync('server.cjs', 'utf8');
if (!code.includes('import_express.default.static(import_path2.default.join(process.cwd(), "public"))')) {
  code = code.replace(
    'app.use(import_express.default.static(distPath, {',
    'app.use(import_express.default.static(import_path2.default.join(process.cwd(), "public")));\n    app.use(import_express.default.static(distPath, {'
  );
  fs.writeFileSync('server.cjs', code);
  console.log('Patched server.cjs');
} else {
  console.log('Already patched');
}
