import { Role } from "./types";

export const checkFormatInput = (input: string) => {
  return input.trim().replace(/ +/g, "").toLowerCase();
};

export const formatRoles = (role: Role) => {
  if (role === "CALLCENTER") {
    return "Call Center";
  }
  return role.charAt(0) + role.slice(1).toLowerCase();
};

export const isFormEmpty = (formValues: any[]) => {
  return formValues.every((formValue) => {
    return Object.values(formValue).every(
      (value) => value === "" || value === null
    );
  });
};
