import { defineConfig } from 'dynamo';
import {CommandRunner,createCommand} from "dynamo/cli";

export default defineConfig(function ({ command }) {
  const runner = new CommandRunner(createCommand);
  runner.execute(command);
});
