export const ColorUserStatus = (status: string) => {
  status = status.toLocaleLowerCase();
  let color = "";
  if (status === "active") {
    color = "success";
  } else if (status === "inactive") {
    color = "";
  } else if (status === "restricted") {
    color = "error";
  } else if (status === "pending") {
    color = "secondary";
  }

  return color;
};

export const ColorProductStatus = (status: string) => {
  status = status.toLocaleLowerCase();
  let color = "";
  if (status === "installed") {
    color = "primary";
  } else if (status === "in stock") {
    color = "success";
  } else if (status === "lost") {
    color = "";
  } else if (status === "damaged") {
    color = "error";
  } else if (status === "reparing") {
    color = "warning";
  } else if (status === "waiting for repair") {
    color = "secondary";
  } else if (status === "installing") {
    color = "accent";
  }
  return color;
};
