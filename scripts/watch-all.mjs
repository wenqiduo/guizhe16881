/**
 * 并行：webpack --watch（酒馆脚本/界面） + 手机 Vite watch 并同步 dist/手机。
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const children = [];

function run(npmScript) {
  const child = spawn('pnpm', ['run', npmScript], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  });
  children.push(child);
  return child;
}

run('watch:webpack');
run('watch:phone');

function shutdown() {
  for (const c of children) {
    try {
      c.kill('SIGTERM');
    } catch {
      /* ignore */
    }
  }
}

['SIGINT', 'SIGTERM'].forEach(sig => {
  process.on(sig, () => {
    shutdown();
    process.exit(0);
  });
});
