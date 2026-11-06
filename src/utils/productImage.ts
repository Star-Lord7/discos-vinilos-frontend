const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_ORIGIN = new URL(API_URL).origin;

export function getProductImageUrl(url?: string | null): string | null {
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return new URL(url.startsWith("/") ? url : `/${url}`, API_ORIGIN).toString();
}
