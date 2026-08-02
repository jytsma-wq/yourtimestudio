import { existsSync, statSync } from 'node:fs';
import { cp, lstat, mkdir, readdir, readlink, rm, symlink } from 'node:fs/promises';
import path from 'node:path';

const standaloneDir = '.next/standalone';

if (!existsSync(`${standaloneDir}/server.js`)) {
  throw new Error(
    'Next.js did not create .next/standalone/server.js. The production server cannot start without it.'
  );
}

await mkdir(`${standaloneDir}/.next`, { recursive: true });

if (existsSync('.next/static')) {
  await cp('.next/static', `${standaloneDir}/.next/static`, {
    recursive: true,
    force: true,
  });
}

if (existsSync('public')) {
  await cp('public', `${standaloneDir}/public`, {
    recursive: true,
    force: true,
  });
}

async function repairWindowsDirectorySymlinks(root) {
  if (process.platform !== 'win32' || !existsSync(root)) {
    return;
  }

  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(root, entry.name);
    const stats = await lstat(entryPath);

    if (stats.isSymbolicLink()) {
      const target = await readlink(entryPath);
      const resolvedTarget = path.resolve(path.dirname(entryPath), target);

      try {
        if (statSync(resolvedTarget).isDirectory()) {
          await rm(entryPath, { force: true });
          await symlink(resolvedTarget, entryPath, 'junction');
        }
      } catch {
        // Leave generated links untouched if the target cannot be inspected.
      }

      continue;
    }

    if (stats.isDirectory()) {
      await repairWindowsDirectorySymlinks(entryPath);
    }
  }
}

await repairWindowsDirectorySymlinks(`${standaloneDir}/node_modules`);

const requiredStandalonePaths = [
  `${standaloneDir}/server.js`,
  `${standaloneDir}/.next/BUILD_ID`,
  `${standaloneDir}/.next/required-server-files.json`,
  `${standaloneDir}/.next/server/app`,
  `${standaloneDir}/.next/static`,
  `${standaloneDir}/public`,
];
const missingStandalonePaths = requiredStandalonePaths.filter(
  (requiredPath) => !existsSync(requiredPath),
);

if (missingStandalonePaths.length > 0) {
  throw new Error(
    `Standalone artifact is incomplete. Missing: ${missingStandalonePaths.join(', ')}`,
  );
}
