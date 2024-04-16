class Command {
  execute() {}
}

export class BuildCommand extends Command {
  execute() {}
}

export class ServeCommand extends Command {
  execute() {
    console.log('Executing serve command...');
  }
}

export class CommandRunner {
  constructor() {
    this.commands = {};
  }

  register(commandName, command) {
    this.commands[commandName] = command;
  }

  execute(commandName) {
    const command = this.commands[commandName];
    if (command) {
      command.execute();
    } else {
      console.log(`Command '${commandName}' not found.`);
    }
  }
}
