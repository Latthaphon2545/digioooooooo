export const encodeToBase64Client = (str: string) => {
  return btoa(str);
};

export const decodeFromBase64 = (str: string) => {
  return Buffer.from(str, "base64").toString("utf-8");
};
