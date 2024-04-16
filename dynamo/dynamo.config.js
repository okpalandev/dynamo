// dynamo.config.js

import { defineConfig } from 'dynamo';

import environments from './modules/environments';
import * as fs from 'fs';

export default defineConfig(function ({ command }) {
  const runner = new CommandRunner(createCommand);
  runner.execute(command);
});
