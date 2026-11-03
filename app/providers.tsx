'use client'

import { ThemeProvider } from "next-themes";

import { Snackbar } from "@/components/ui/Snackbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Snackbar />
      {children}
    </ThemeProvider>
  )
}
