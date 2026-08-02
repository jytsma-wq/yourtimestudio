/* eslint-disable @typescript-eslint/no-require-imports */

const { existsSync } = require('node:fs');
const { join } = require('node:path');

const standaloneServer = join(__dirname, '.next', 'standalone', 'server.js');

// Container platforms commonly provide HOSTNAME as a container identifier or
// an address that is not bindable from the application process. The standalone
// server must listen on all interfaces so the platform proxy can reach it.
process.env.HOSTNAME = '0.0.0.0';
process.env.PORT ||= '3000';

if (!existsSync(standaloneServer)) {
  console.error(
    'Missing .next/standalone/server.js. Run `pnpm build` before starting the app.'
  );
  process.exit(1);
}

require(standaloneServer);
