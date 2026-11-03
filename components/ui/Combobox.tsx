'use client'

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { Field, fieldInput, fieldMono, messageId } from "@/components/ui/Field";

export interface ComboboxGroup {
    title?: string
    items: string[]
}

export const Combobox = ({
    id,
    label,
    value,
    onValueChange,
    groups,
    allowCustom = false,
    placeholder,
    hint,
    error,
    mono,
}: {
    id: string,
    label: string,
    value: string,
    onValueChange: (value: string) => void,
    groups: ComboboxGroup[],
    allowCustom?: boolean,
    placeholder?: string,
    hint?: string,
    error?: string,
    mono?: boolean,
}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(value);
    const [filtering, setFiltering] = useState(false);
    const [active, setActive] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const listId = `${id}-list`;

    useEffect(() => setText(value), [value]);

    const visibleGroups = useMemo(() => {
        const query = text.trim().toLowerCase();
        if (!filtering || !query) return groups;
        return groups
            .map(group => ({ ...group, items: group.items.filter(item => item.toLowerCase().includes(query)) }))
            .filter(group => group.items.length > 0);
    }, [groups, text, filtering]);
    const options = useMemo(() => visibleGroups.flatMap(group => group.items), [visibleGroups]);

    useEffect(() => {
        if (active >= 0) listRef.current?.querySelector(`#${CSS.escape(`${id}-option-${active}`)}`)?.scrollIntoView({ block: 'nearest' });
    }, [active, id]);

    const show = () => {
        setFiltering(false);
        setActive(-1);
        setOpen(true);
    };

    const select = (item: string) => {
        setText(item);
        onValueChange(item);
        setOpen(false);
    };

    const handleBlur = () => {
        setOpen(false);
        if (allowCustom) return;
        if (!text) {
            onValueChange('');
        } else if (groups.some(group => group.items.includes(text))) {
            onValueChange(text);
        } else {
            setText(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!open) return show();
            if (options.length === 0) return;
            const step = e.key === 'ArrowDown' ? 1 : -1;
            setActive(current => (current + step + options.length) % options.length);
        } else if (e.key === 'Enter' && open) {
            e.preventDefault();
            if (active >= 0 && options[active]) select(options[active]);
            else setOpen(false);
        } else if (e.key === 'Escape' && open) {
            e.preventDefault();
            setOpen(false);
        }
    };

    const showList = open && (options.length > 0 || !allowCustom);
    let optionIndex = -1;

    return (
        <div className="relative">
            <Field id={id} label={label} hint={hint} error={error} className="h-14 pr-11">
                <input
                    ref={inputRef}
                    id={id}
                    role="combobox"
                    aria-expanded={showList}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={showList && active >= 0 ? `${id}-option-${active}` : undefined}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error || hint ? messageId(id) : undefined}
                    autoComplete="off"
                    spellCheck={false}
                    value={text}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setText(e.target.value);
                        setFiltering(true);
                        setActive(-1);
                        setOpen(true);
                        if (allowCustom) onValueChange(e.target.value);
                    }}
                    onClick={() => { if (!open) show(); }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={cn(fieldInput, mono && fieldMono)}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        inputRef.current?.focus();
                        if (open) setOpen(false);
                        else show();
                    }}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted"
                >
                    <ChevronDown className={cn("size-5 transition-transform duration-150", open && "rotate-180")} />
                </button>
            </Field>
            <div
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label={label}
                hidden={!showList}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute inset-x-0 top-14 z-20 mt-1 max-h-72 overflow-y-auto rounded bg-panel py-2 shadow-e8"
            >
                {options.length === 0 ? <p className="px-4 py-3 text-[15px] text-muted">没有匹配项</p> : null}
                {visibleGroups.map(group => (
                    <div key={group.title ?? 'default'} role="group" aria-label={group.title}>
                        {group.title ? <p className="px-4 pb-1 pt-3 text-xs font-medium text-muted">{group.title}</p> : null}
                        {group.items.map(item => {
                            optionIndex += 1;
                            const index = optionIndex;
                            return (
                                <div
                                    key={item}
                                    id={`${id}-option-${index}`}
                                    role="option"
                                    aria-selected={item === value}
                                    onClick={() => select(item)}
                                    onMouseMove={() => setActive(index)}
                                    className={cn(
                                        "flex min-h-12 cursor-pointer items-center justify-between gap-2 px-4 py-2 text-[15px]",
                                        mono && "break-all font-mono text-sm",
                                        item === value && "bg-tonal-blue",
                                        index === active && item !== value && "bg-container",
                                    )}
                                >
                                    {item}
                                    {item === value ? <Check aria-hidden className="size-[18px] shrink-0 text-primary" /> : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
