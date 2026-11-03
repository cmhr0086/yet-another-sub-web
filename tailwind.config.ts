import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;
const tokens = (...names: string[]) => Object.fromEntries(names.map(name => [name, token(name)]));

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: tokens(
        "surface", "panel", "container", "container-hover", "outline",
        "on", "muted",
        "primary", "primary-hover", "on-primary",
        "app-bar", "on-app-bar",
        "error", "warning", "on-warning",
        "snackbar", "on-snackbar", "snackbar-action",
        "switch-off", "switch-thumb-off", "switch-on",
        "tonal-blue", "on-tonal-blue",
        "tonal-cyan", "on-tonal-cyan",
        "tonal-indigo", "on-tonal-indigo",
        "tonal-slate", "on-tonal-slate",
        "tonal-teal", "on-tonal-teal",
      ),
      boxShadow: {
        e1: "0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f",
        e2: "0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f",
        e4: "0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f",
        e6: "0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f",
        e8: "0 5px 5px -3px #0003, 0 8px 10px 1px #00000024, 0 3px 14px 2px #0000001f",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
};
export default config;
