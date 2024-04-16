// environments.ts

import PropertiesReader from 'properties-reader';
let config: PropertiesReader | null = null;

process.argv.forEach((val) => {
  const arg = val.split('=');
  if (arg.length > 0 && arg[0] === 'env') {
    const env = require(`./config/${arg[1]}.properties`);
    config = PropertiesReader(env);
  }
});

export default config;
