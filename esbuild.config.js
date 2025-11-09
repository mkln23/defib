const esbuildPluginPino = require('esbuild-plugin-pino');
module.exports = [esbuildPluginPino({ transports: ['pino-pretty'] })];
