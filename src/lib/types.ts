export type DataItem = {
  email?: string | undefined;
  name?: string | undefined;
  contact?: string | undefined;
  role?: Role | null | undefined;
  sn?: string | undefined;
  model?: string | undefined;
  address?: string | undefined;
};

export enum Role {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  CALLCENTER = "CALLCENTER",
}

export type Model = {
  id: string;
  series: string;
  information: {
    operatiingSystem: string;
    processor: string;
    display: string;
    connectivity: string;
    battery: string;
    cameras: string;
    payment_features: string;
  };
  imageUrl: string;
  status: StatusProduct;
};

export type User = {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
  contact: string;
  role: Role;
  status: StatusUser;
  token?: JSON;
};

export type History = {
  id: string;
  description: string;
  category: StatusProduct;
  imageProve: string[];
  createdAt: Date;
};

export enum StatusUser {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  RESTRICTED = "RESTRICTED",
  PENDING = "PENDING",
}

export enum StatusProduct {
  INSTOCK = "INSTOCK",
  LOST = "LOST",
  DAMAGED = "DAMAGED",
  REPARING = "REPARING",
  WAITREPAIR = "WAITREPAIR",
  INSTALLED = "INSTALLED",
  INSTALLING = "INSTALLING",
}
