import { closeSync, existsSync, mkdirSync, openSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl?.startsWith('file:')) {
  console.error('DATABASE_URL must be a SQLite file: URL before migrations can run.');
  process.exit(1);
}

const configuredPath = decodeURIComponent(databaseUrl.slice('file:'.length).split('?', 1)[0]);
if (!configuredPath) {
  console.error('DATABASE_URL must include a SQLite database path.');
  process.exit(1);
}

// Prisma resolves relative SQLite URLs next to prisma/schema.prisma.
const databasePath = isAbsolute(configuredPath)
  ? configuredPath
  : resolve(process.cwd(), 'prisma', configuredPath);

mkdirSync(dirname(databasePath), { recursive: true, mode: 0o700 });

if (!existsSync(databasePath)) {
  const descriptor = openSync(databasePath, 'wx', 0o600);
  closeSync(descriptor);
  console.log(`Created SQLite database file at ${databasePath}`);
}
