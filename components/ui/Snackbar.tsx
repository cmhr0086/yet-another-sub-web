'use client'

import { Toaster } from "sonner";

export const Snackbar = () => (
    <Toaster
        position="bottom-left"
        toastOptions={{
            unstyled: true,
            classNames: {
                toast: "flex min-h-12 w-full items-center justify-between gap-3 rounded bg-snackbar py-1.5 pl-4 pr-2 text-sm text-on-snackbar shadow-e6",
                actionButton: "h-9 shrink-0 rounded px-2 font-medium text-snackbar-action hover:bg-on-snackbar/10",
            },
        }}
    />
)
