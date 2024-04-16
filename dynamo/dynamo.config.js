// dynamo.config.js

import { defineConfig } from 'dynamo';

export default defineConfig(function ({ command }) {
  const runner = new CommandRunner(createCommand);
  runner.execute(command);
});
