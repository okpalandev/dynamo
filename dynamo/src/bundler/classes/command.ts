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
