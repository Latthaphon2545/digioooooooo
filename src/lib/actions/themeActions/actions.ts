"use server";

import { setCookieTheme, getCookieTheme } from "@/lib/theme";

export async function updateTheme(theme: string) {
  await setCookieTheme(theme);
}

export const getTheme = async () => {
  const theme = await getCookieTheme();
  return theme;
};
