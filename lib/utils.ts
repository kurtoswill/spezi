import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Alias for cn
export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

// Focus input styles
export const focusInput: string[] = [
  "focus:ring-2",
  "focus:ring-indigo-200 focus:dark:ring-indigo-700/30",
  "focus:border-indigo-500 focus:dark:border-indigo-700",
]

// Focus ring styles
export const focusRing: string[] = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-indigo-500 dark:outline-indigo-500",
]

// Error styles
export const hasErrorInput: string[] = [
  "ring-2",
  "border-red-500 dark:border-red-700",
  "ring-red-200 dark:ring-red-700/30",
]

// US number formatter
export const usNumberformatter = (number: number, decimals: number = 0): string =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number)

// Percent formatter with optional "+" prefix
export const percentageFormatter = (number: number, decimals: number = 1): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)

  const prefix = number > 0 && number !== Infinity ? "+" : ""
  return `${prefix}${formatted}`
}

// Formatter for millions
export const millionFormatter = (number: number, decimals: number = 1): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)

  return `${formatted}M`
}

// Formatter function type
type CurrencyFormatter = (value: number, currency?: string) => string
type UnitFormatter = (value: number) => string

export const formatters: {
  currency: CurrencyFormatter
  unit: UnitFormatter
} = {
  currency: (value, currency = "USD") =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value),

  unit: (value) => usNumberformatter(value),
}
