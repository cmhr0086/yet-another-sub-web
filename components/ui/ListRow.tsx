import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { TonalIcon, type Tone } from "@/components/ui/TonalIcon";

export const ListRow = ({
    tone,
    icon,
    title,
    description,
    mono = false,
    isStale = false,
    action,
}: {
    tone: Tone,
    icon: ReactNode,
    title: string,
    description: string,
    mono?: boolean,
    isStale?: boolean,
    action?: ReactNode,
}) => (
    <div className="flex items-center gap-4 border-b border-outline py-3.5 pl-4 pr-2 last:border-b-0 sm:pr-4">
        <TonalIcon tone={tone}>{icon}</TonalIcon>
        <div className="min-w-0 flex-1">
            <h3 className="text-base font-medium">{title}</h3>
            <p className={cn("mt-0.5 text-[13px] text-muted", mono && "truncate font-mono", isStale && "line-through")}>
                {description}
            </p>
        </div>
        {action}
    </div>
)
