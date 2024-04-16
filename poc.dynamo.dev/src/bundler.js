const fs = require('fs');
const path = require('path');

function bundle(projectPath, entryPoint) {
  const entryFile = path.resolve(projectPath, entryPoint);
  const entryContent = fs.readFileSync(entryFile, 'utf8');
  const modules = {};

  function _require(modulePath) {
    const fullPath = path.resolve(projectPath, modulePath);
    if (modules[fullPath]) {
      return modules[fullPath].exports;
    }

    const module = { exports: {} };
    modules[fullPath] = module;

    // Execute the module code with `_require`, `module`, and `exports`
    // available as local variables.
    const moduleCode = fs.readFileSync(fullPath, 'utf8');
    const wrappedCode = `(function (require, module, exports, __dirname, __filename) { ${moduleCode} })(require, module, module.exports, "${path.dirname(fullPath)}", "${fullPath}")`;
    eval(wrappedCode);

    return module.exports;
  }

  _require(entryPoint);

  // Create the bundle
  const bundledCode = Object.keys(modules)
    .map(modulePath => {
      const moduleName = JSON.stringify(path.relative(projectPath, modulePath));
      const moduleContent = modules[modulePath].exports.toString();
      return `// ${moduleName}\n${moduleContent}`;
    })
    .join('\n\n');

  return bundledCode;
}

module.exports = bundle;
