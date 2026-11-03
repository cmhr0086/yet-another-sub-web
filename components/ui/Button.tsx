import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variants = {
    contained: "h-11 bg-primary text-on-primary tracking-wide shadow-e2 hover:bg-primary-hover hover:shadow-e4 disabled:bg-muted/20 disabled:text-muted disabled:shadow-none",
    text: "h-11 px-2 text-primary hover:bg-primary/10 disabled:text-muted",
};

export const Button = ({
    variant = "contained",
    isLoading = false,
    className,
    children,
    disabled,
    type = "button",
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants,
    isLoading?: boolean,
}) => (
    <button
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded text-sm font-medium",
            "transition duration-150 disabled:cursor-not-allowed",
            variants[variant],
            className,
        )}
        {...props}
    >
        {isLoading ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
        {children}
    </button>
)
