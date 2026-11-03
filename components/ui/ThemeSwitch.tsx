'use client'

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const options = [
    { key: 'light', label: '浅色主题', Icon: Sun },
    { key: 'dark', label: '深色主题', Icon: Moon },
    { key: 'system', label: '跟随系统', Icon: Monitor },
];

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <div role="group" aria-label="主题" className="flex gap-0.5 rounded-full bg-white/[.14] p-[3px]">
            {options.map(({ key, label, Icon }) => {
                const selected = mounted && theme === key;
                return (
                    <button
                        key={key}
                        type="button"
                        aria-label={label}
                        aria-pressed={selected}
                        title={label}
                        onClick={() => setTheme(key)}
                        className={cn(
                            "flex size-9 items-center justify-center rounded-full text-on-app-bar transition-colors duration-150 hover:bg-white/10",
                            selected && "bg-white/25 hover:bg-white/25",
                        )}
                    >
                        <Icon aria-hidden className="size-[18px]" />
                    </button>
                );
            })}
        </div>
    );
}
