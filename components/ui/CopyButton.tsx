'use client'

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

import { copyText } from "@/lib/copyText";
import { notify } from "@/lib/notify";

export const CopyButton = ({ label, value, disabled }: { label: string, value: string, disabled?: boolean }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 1500);
        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <button
            type="button"
            disabled={disabled}
            aria-label={copied ? `${label}已复制` : `复制${label}`}
            onClick={async () => {
                if (!await copyText(value)) return notify('复制失败，请手动复制');
                setCopied(true);
                notify(`${label}已复制`);
            }}
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors duration-150 hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-muted"
        >
            {copied ? <Check aria-hidden className="size-5" /> : <Copy aria-hidden className="size-5" />}
        </button>
    );
}
