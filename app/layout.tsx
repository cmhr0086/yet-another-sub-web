import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "CMHR · 订阅转换",
  description: "把订阅链接转换成各客户端可用的配置",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
