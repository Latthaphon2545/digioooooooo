import { cookies } from "next/headers";

export async function setCookieTheme(theme: string) {
  cookies().set("theme", theme);
}

export async function getCookieTheme() {
  const theme = cookies().get("theme")?.value;
  if (!theme) return "";
  return theme;
}

export async function getSession() {
  const session = cookies().get("theme")?.value;
  if (!session) return null;
  return session;
}
