'use client'

import * as Switch from "@radix-ui/react-switch";

export const SwitchRow = ({
    id,
    title,
    description,
    checked,
    onCheckedChange,
}: {
    id: string,
    title: string,
    description: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void,
}) => (
    <div className="flex min-h-16 items-center justify-between gap-4 border-b border-outline py-2.5 last:border-b-0">
        <label htmlFor={id} className="flex-1 cursor-pointer">
            <span className="block text-[15px]">{title}</span>
            <span id={`${id}-description`} className="mt-0.5 block text-[13px] text-muted">{description}</span>
        </label>
        <Switch.Root
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-describedby={`${id}-description`}
            className="relative h-3.5 w-9 shrink-0 cursor-pointer rounded-full bg-switch-off transition-colors duration-150 before:absolute before:-inset-x-1 before:-inset-y-4 data-[state=checked]:bg-switch-on"
        >
            <Switch.Thumb className="absolute -top-[3px] left-0 size-5 rounded-full bg-switch-thumb-off shadow-e1 transition duration-150 data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary" />
        </Switch.Root>
    </div>
)
