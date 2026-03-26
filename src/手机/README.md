# 小手机 UI（Vite + React）

独立构建的手机桌面界面，由 **`src/小手机壳`** 脚本以 iframe 加载；勿与酒馆模板根目录的 `pnpm build` 混为同一产物。

## 本地开发

```bash
cd src/手机
npm install
npm run dev
```

浏览器访问开发服务器地址；单独打开时无壳层，仅用于调试 UI。

## 生产构建与部署

```bash
cd src/手机
npm run build
```

默认 `base` 为 `./`，便于静态托管子路径。将 **`dist/`** 整目录部署到 HTTPS（GitHub Pages、Cloudflare Pages 等），得到可访问的 **`index.html` URL**。

在酒馆中配置 **`src/小手机壳`** 脚本变量 **`phone_ui_url`** 为该 `index.html` 的完整地址。

## 与壳脚本通信

见 `src/tavernPhoneBridge.ts`：可向父页面发送 `tavern-phone:request-close` 以关闭整个小手机浮层（壳脚本处理）。
