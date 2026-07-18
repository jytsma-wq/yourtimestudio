/* eslint-disable @typescript-eslint/no-require-imports */

const { existsSync } = require('node:fs');
const { join } = require('node:path');

const standaloneServer = join(__dirname, '.next', 'standalone', 'server.js');

process.env.HOSTNAME ||= '0.0.0.0';
process.env.PORT ||= '3000';

if (!existsSync(standaloneServer)) {
  console.error(
    'Missing .next/standalone/server.js. Run `pnpm build` before starting the app.'
  );
  process.exit(1);
}

require(standaloneServer);
