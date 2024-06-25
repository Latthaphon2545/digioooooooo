export const encode = (path: string) => {
  return encodeURIComponent(path);
};

export const decode = (str: string) => {
  const pathSring = decodeURIComponent(str);
  const params = new URLSearchParams(pathSring);
  const filter = params.get("filter") || "";
  const search = params.get("search") || "";
  const skip = params.get("skip") || "";
  const take = params.get("take") || "";
  return { filter, search, skip, take };
};

export const stringToHex = (str: string) => {
  return Buffer.from(str, "utf8").toString("hex");
};

export const hexToString = (str: string) => {
  return Buffer.from(str, "hex").toString("utf8");
};
