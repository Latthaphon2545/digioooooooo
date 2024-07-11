export const RequirePassword = (
  password: string,
  email: string,
  name: string,
  tooltip: boolean
) => {
  const checks = [
    password.length >= 8 && password.length <= 30,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    !/(password|12345678)/i.test(password),
    !password.includes(email),
    !password.includes(name),
  ];

  if (tooltip) {
    return checks;
  } else {
    return checks.every((check) => check === true);
  }
};
