export const pathMenu = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Home";
    case "/users":
      return "Users";
    case "/products":
      return "Products";
    case "/products/models":
      return "Models";
    case "/merchants":
      return "Merchants";
    case "/banks":
      return "Banks";
    case "/action/checkStock":
      return "Check Stock";
    case "/action/changeStatus":
      return "Change Status";
    case "/users/add":
      return "Add User";
    case "/products/add":
      return "Add Product";
    case "/products/models/add":
      return "Add Model";
    case "/merchants/add":
      return "Add Merchant";
    case "/setting":
      return "Account";
    default:
      if (pathname.startsWith("/products/history/")) {
        return "History";
      }
      return "Page";
  }
};