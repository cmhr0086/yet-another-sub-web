/** @type {import('next').NextConfig} */
const nextConfig = {
  // 默认静态导出到 out/，Docker 镜像构建时通过 NEXT_OUTPUT=standalone 覆盖
  output: process.env.NEXT_OUTPUT || 'export',
};

export default nextConfig;
