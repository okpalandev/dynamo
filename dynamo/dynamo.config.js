// dynamo.config.js

import { defineConfig } from 'dynamo';
import environments from './modules/environments';
import * as fs from 'fs';

export default defineConfig(function ({ command }) {
  switch (command) {
    case 'serve':

      break;
    case 'build':

      break;
    default:
      break;
  }
});
