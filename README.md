# 开发

1. 安装依赖
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm config set save-prefix=''
pnpm i
```

2. 修改 `.env.development` 文件中 `VITE_APP_API_BASEURL`

3. 运行

```bash
pnpm dev:mp-weixin
```
用微信开发者工具打开 `dist\dev\mp-weixin\app.wxss`

# 部署

```bash
pnpm build:mp-weixin
```
用微信开发者工具打开 `dist\build\mp-weixin\app.wxss`
