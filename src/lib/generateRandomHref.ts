export const encode = (path: string) => {
  return encodeURIComponent(path);
};

export const decode = (str: string) => {
  const pathSring = decodeURIComponent(str);
  const params = new URLSearchParams(pathSring);
  const filter = params.get("filter") || "";
  const search = params.get("search") || "";
  let skip = params.get("skip") || "";
  skip = parseInt(skip).toString();
  let take = params.get("take") || "";
  take = parseInt(take).toString();
  const email = params.get("email") || "";
  const password = params.get("password") || "";
  const id = params.get("id") || "";
  const name = params.get("name") || "";
  const type = params.get("type") || "";
  return { filter, search, skip, take, email, password, id, name, type };
};

export const stringToHex = (str: string) => {
  return Buffer.from(str, "utf8").toString("hex");
};

export const hexToString = (str: string) => {
  return Buffer.from(str, "hex").toString("utf8");
};
