import type { RoleId } from "./roles";

const KEY = "ba_auth";

export interface Session {
  role: RoleId;
  identifier: string;
}

export function saveSession(s: Session) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(s));
}
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
export function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export const mockDelay = (ms = 900) => new Promise((r) => setTimeout(r, ms));
