# yet-another-sub-web 又一个订阅转换前端

![Website](https://img.shields.io/website?url=https%3A%2F%2Fyet-another-sub-web.vercel.app&style=flat-square&label=DEMO) ![Vercel](https://vercelbadge.vercel.app/api/DyAxy/yet-another-sub-web?style=flat-square) ![GitHub License](https://img.shields.io/github/license/DyAxy/yet-another-sub-web?style=flat-square)

又一个 [sub-web](https://github.com/CareyWang/sub-web)，基于 React、Next.JS 实现前端，需要搭配 [tindy2013/subconverter](https://github.com/tindy2013/subconverter) 后端来实现订阅配置。

## 快速部署

### 使用 Vercel 服务

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDyAxy%2Fyet-another-sub-web&env=NEXT_PUBLIC_SHORTURL,NEXT_PUBLIC_BACKENDS&envDescription=%E5%A6%82%E6%9E%9C%E4%B8%8D%E4%BC%9A%E5%A1%AB%E7%82%B9%E5%8F%B3%E8%BE%B9%20%20Learn%20More&envLink=https%3A%2F%2Fgithub.com%2FDyAxy%2Fyet-another-sub-web%2Fblob%2Fmaster%2F.env&project-name=yet-another-sub-web&repository-name=yet-another-sub-web)

### 本地使用 Docker
- Docker run方式部署
```
docker run -d -p 127.0.0.1:3000:3000 --name yet-another-sub-web --restart=always moefaq/yet-another-sub-web:latest -e NEXT_PUBLIC_SHORTURL=https://suo.yt/ -e NEXT_PUBLIC_BACKENDS=http://127.0.0.1:25500/sub?
# 替换后端或短链接服务
```

- Docker compose方式部署
```
curl -LO https://raw.githubusercontent.com/DyAxy/yet-another-sub-web/master/docker-compose.yml
# 你可以修改 docker-compose.yml 中的 env
docker compose up -d
```

### 环境变量
| NEXT_PUBLIC_SHORTURL | NEXT_PUBLIC_BACKENDS        |
| -------------------- | --------------------------- |
| 短链接服务，记得带 /   | 后端完整地址                 |
| https://suo.yt/      | http://127.0.0.1:25500/sub? |


## 常规部署

首先你需要 [Node.js](https://nodejs.org/en/download/package-manager/all) 20 或以上版本和 [Bun](https://bun.sh/) 环境

```
# Clone 库 并跳转至该文件夹
git clone https://github.com/DyAxy/yet-another-sub-web.git
cd yet-another-sub-web
# 当然你可以修改配置在 .env
# NEXT_PUBLIC_SHORTURL 为短链接服务
# NEXT_PUBLIC_BACKENDS 为后端，请使用|分隔
# 安装依赖环境并测试
bun install --frozen-lockfile
bun run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000/) 来查看是否正常运行.

当一切就绪后，你可以打包构建它，默认静态导出到 `out/` 目录，可部署到任意静态托管服务或用任意 Web 服务器托管

```
bun run build
bunx serve out -l 3000
```

此时打开 [http://localhost:3000](http://localhost:3000/) 即可正常使用。

如果想用 Node.js 运行，可以在构建时设置 `NEXT_OUTPUT=standalone`，然后运行生成的服务（`next start` 不支持静态导出模式）：

```
NEXT_OUTPUT=standalone bun run build
cp -r .next/static .next/standalone/.next/static
PORT=3000 node .next/standalone/server.js
```

需要**常驻进程**，可使用：`screen`，`pm2`，`nohup`，`systemctl`

可能你还需要反代，推荐使用 `Caddy` 轻量化反代，仅需加入到 `CaddyFile` 这些即可使用：

```
你的域名.com {
  encode gzip
  reverse_proxy 127.0.0.1:3000
}
```

## 静态导出

在常规部署 `npm run dev` 之后，测试没问题的情况下，修改文件：`next.config.mjs`，添加一行：`nextConfig.output = 'export'`
则会将html及其js文件静态导出至out文件夹，使用 `Caddy`、`nginx` 之类即可使用。


## 感谢

[CareyWang/sub-web](https://github.com/CareyWang/sub-web)  
[CareyWang/MyUrls](https://github.com/CareyWang/MyUrls)  
[tindy2013/subconverter](https://github.com/tindy2013/subconverter)  
