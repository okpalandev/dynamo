class Command {
  constructor(){
    if (this.constructor.name === Command)
      throw "Command is an Abstract Base Class!
    It is not intended to be used directly";
  }
  execute() {}
}

// Implement Concrete Commands
export class BuildCommand extends Command {
  execute() {

  }
}

export class ServeCommand extends Command {
  execute() {
    console.log('Executing serve command...');
  }
}

class BundleCommand {
    execute(options: { projectPath: string; entryPoint: string }): string {
        const { projectPath, entryPoint } = options;
        const entryFilePath = path.resolve(projectPath, entryPoint);
        const entryContent = fs.readFileSync(entryFilePath, 'utf8');
        const modules: { [key: string]: any } = {};

        function require(modulePath: string): any {
            const fullPath = path.resolve(__dirname, modulePath);
            if (modules[fullPath]) {
                return modules[fullPath].exports;
            }

            const module = { exports: {} };
            modules[fullPath] = module;

            // Execute the module code with `require`, `module`, and `exports`
            // available as local variables.
            const moduleCode = fs.readFileSync(fullPath, 'utf8');
            const wrappedCode = `(function (require, module, exports, __dirname, __filename) { ${moduleCode} })(require, module, module.exports, "${path.dirname(fullPath)}", "${fullPath}")`;
            new Function(wrappedCode);
            return module.exports;
        }

        require(entryFilePath);

        // Create the bundle
        const bundledCode = Object.keys(modules)
            .map(modulePath => {
                const moduleName = JSON.stringify(path.relative(__dirname, modulePath));
                const moduleContent = modules[modulePath].exports.toString();
                return `// ${moduleName}\n${moduleContent}`;
            })
            .join('\n\n');

        return bundledCode;
    }
}

// Create Command Runner
export class CommandRunner {
  constructor(commandFactory) {
    this.commandFactory = commandFactory;
  }

  execute(commandName) {
    const command = this.commandFactory(commandName);
    if (command) {
      command.execute();
    } else {
      console.log(`Command '${commandName}' not found.`);
    }
  }
}
