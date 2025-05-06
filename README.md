# 开发

1. 安装依赖
```bash
pnpm i
```

2. 修改 `.env.development` 文件中 `VITE_APP_API_BASEURL`

3. 运行

```bash
pnpm run dev:mp-weixin
```
用微信开发者工具打开 `dist\dev\mp-weixin\app.wxss`

# 部署

```bash
pnpm run build:mp-weixin
```
用微信开发者工具打开 `dist\build\mp-weixin\app.wxss`
