import { ArrowLeftRight } from "lucide-react";

import { Converter } from "@/components/Converter";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { TonalIcon } from "@/components/ui/TonalIcon";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-app-bar text-on-app-bar shadow-e4">
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-4">
          <p className="flex items-baseline gap-2.5">
            <span className="text-xl font-medium">CMHR</span>
            <span className="text-sm opacity-80">订阅转换</span>
          </p>
          <ThemeSwitch />
        </div>
      </header>
      <main className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 pb-12 pt-6">
        <section className="flex items-center gap-4">
          <TonalIcon tone="blue" className="size-16 max-sm:size-14">
            <ArrowLeftRight className="size-7" />
          </TonalIcon>
          <div>
            <h1 className="text-2xl font-normal">订阅转换</h1>
            <p className="mt-1 text-[15px] leading-normal text-muted">把订阅链接转换成你的客户端能用的配置。</p>
          </div>
        </section>
        <Converter />
        <footer className="text-center text-xs text-muted">
          基于{" "}
          <a
            href="https://github.com/DyAxy/yet-another-sub-web"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            DyAxy/yet-another-sub-web
          </a>
          {" "}· MIT License
        </footer>
      </main>
    </>
  );
}
