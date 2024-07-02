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
  const email = params.get("email") || "";
  const password = params.get("password") || "";
  const id = params.get("id") || "";
  const name = params.get("name") || "";
  return { filter, search, skip, take, email, password, id, name };
};

export const stringToHex = (str: string) => {
  return Buffer.from(str, "utf8").toString("hex");
};

export const hexToString = (str: string) => {
  return Buffer.from(str, "hex").toString("utf8");
};
