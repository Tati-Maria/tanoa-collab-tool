import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#631A86", "#F46036", "#157F1F", "#3B28CC", "#F0C808"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
