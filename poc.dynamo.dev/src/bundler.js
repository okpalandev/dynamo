const fs = require('fs');
const path = require('path');
function bundle(projectPath, entryPoint) {
    // Define an object to store module exports
    const modules = {};

    // Define a function to resolve dependencies
    function _require(modulePath) {
        // Check if the module is already loaded
        if (modules[modulePath]) {
            return modules[modulePath];
        }

        // Define a new module object
        const module = { exports: {} };
        // Execute the module code and pass the _require function
        // as well as the module and exports objects
        const moduleFunction = modules[modulePath] = new Function('require', 'module', 'exports', `
            ${fs.readFileSync(path.resolve(projectPath, modulePath), 'utf8')}
        `);

        // Call the module function with the _require function and
        // module and exports objects as arguments
        moduleFunction(_require, module, module.exports);

        // Return the module's exports
        return module.exports;
    }

    // Load the entry point module
    _require(entryPoint);

    // Create the bundle
    const bundledCode = Object.keys(modules)
        .map(modulePath => {
            const moduleName = JSON.stringify(path.relative(projectPath, modulePath));
            const moduleContent = modules[modulePath]?.exports?.toString() || '';
            return `// ${moduleName}\n${moduleContent}`;
        })
        .join('\n\n');

    return bundledCode;
}

module.exports = bundle;
