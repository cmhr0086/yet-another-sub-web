import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export const messageId = (id: string) => `${id}-message`;

// MD2 Filled 文本框：聚焦或出错时底线加粗到 2px
export const Field = ({
    id,
    label,
    hint,
    error,
    className,
    children,
}: {
    id: string,
    label: string,
    hint?: string,
    error?: string,
    className?: string,
    children: ReactNode,
}) => (
    <div>
        <div
            className={cn(
                "group/field relative rounded-t border-b border-muted bg-container px-3 pb-1.5 pt-2 transition-colors duration-150",
                "hover:bg-container-hover focus-within:bg-container-hover",
                error
                    ? "border-error shadow-[inset_0_-1px_0_rgb(var(--error))]"
                    : "focus-within:border-primary focus-within:shadow-[inset_0_-1px_0_rgb(var(--primary))]",
                className,
            )}
        >
            <label
                htmlFor={id}
                className={cn("mb-1 block text-xs", error ? "text-error" : "text-muted group-focus-within/field:text-primary")}
            >
                {label}
            </label>
            {children}
        </div>
        {error || hint ? (
            <p id={messageId(id)} className={cn("mx-3 mt-1 text-xs leading-normal", error ? "text-error" : "text-muted")}>
                {error || hint}
            </p>
        ) : null}
    </div>
)

export const fieldInput = "block w-full border-0 bg-transparent p-0 text-[15px] text-on outline-none placeholder:text-muted";
export const fieldMono = "font-mono text-sm";

type TextControlProps = {
    id: string,
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    placeholder?: string,
    hint?: string,
    error?: string,
    mono?: boolean,
}

export const TextField = ({ id, label, value, onValueChange, placeholder, hint, error, mono }: TextControlProps) => (
    <Field id={id} label={label} hint={hint} error={error} className="h-14">
        <input
            id={id}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error || hint ? messageId(id) : undefined}
            className={cn(fieldInput, mono && fieldMono)}
        />
    </Field>
)

export const TextareaField = ({ id, label, value, onValueChange, placeholder, hint, error, mono }: TextControlProps) => (
    <Field id={id} label={label} hint={hint} error={error}>
        <textarea
            id={id}
            rows={3}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error || hint ? messageId(id) : undefined}
            className={cn(fieldInput, "resize-y leading-normal", mono && fieldMono)}
        />
    </Field>
)
