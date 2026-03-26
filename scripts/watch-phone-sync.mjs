/**
 * Vite 监听构建 src/手机 → src/手机/dist，并在产物变化时同步到 dist/手机（与 pnpm build:phone 一致）。
 */
import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const phoneDist = path.join(root, 'src', '手机', 'dist');

function sync() {
  const indexHtml = path.join(phoneDist, 'index.html');
  if (!fs.existsSync(indexHtml)) {
    return;
  }
  try {
    execSync(`node "${path.join(root, 'scripts', 'sync-phone-dist.mjs')}"`, {
      cwd: root,
      stdio: 'inherit',
      shell: true,
    });
  } catch {
    /* 首轮 Vite 尚未写完时可能失败，下一轮仍会重试 */
  }
}

const vite = spawn('npm', ['run', 'build', '--prefix', 'src/手机', '--', '--watch'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

let debounceTimer;
let watcher;

function startWatcher() {
  if (!fs.existsSync(phoneDist)) {
    setTimeout(startWatcher, 400);
    return;
  }
  watcher = chokidar.watch(phoneDist, {
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 250 },
  });
  watcher.on('all', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sync, 200);
  });
}

startWatcher();

function shutdown() {
  clearTimeout(debounceTimer);
  watcher?.close().catch(() => {});
  vite.kill('SIGTERM');
}

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});
process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

vite.on('close', code => {
  watcher?.close().catch(() => {});
  process.exit(code ?? 0);
});
