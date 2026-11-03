import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
    blue: "bg-tonal-blue text-on-tonal-blue",
    cyan: "bg-tonal-cyan text-on-tonal-cyan",
    indigo: "bg-tonal-indigo text-on-tonal-indigo",
    slate: "bg-tonal-slate text-on-tonal-slate",
    teal: "bg-tonal-teal text-on-tonal-teal",
};

export type Tone = keyof typeof tones;

export const TonalIcon = ({ tone, className, children }: { tone: Tone, className?: string, children: ReactNode }) => (
    <span aria-hidden className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", tones[tone], className)}>
        {children}
    </span>
)
