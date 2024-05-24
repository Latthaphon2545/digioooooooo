export type DataItem = {
  email?: string | undefined;
  name?: string | undefined;
  contact?: string | undefined;
  sn?: string | undefined;
  model?: string | undefined;
};

export enum Role {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  CALLCENTER = "CALLCENTER",
}
