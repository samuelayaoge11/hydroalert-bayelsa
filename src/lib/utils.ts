import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWaterLevel(level: number): string {
  return `${level.toFixed(2)}m`;
}

export function getStatusColor(level: number, warning: number, critical: number): string {
  if (level >= critical) return "bg-red-500";
  if (level >= warning) return "bg-yellow-500";
  return "bg-green-500";
}

export function getStatusText(level: number, warning: number, critical: number): string {
  if (level >= critical) return "CRITICAL";
  if (level >= warning) return "WARNING";
  return "NORMAL";
}
