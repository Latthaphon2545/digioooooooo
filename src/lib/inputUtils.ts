export const checkFormatInput = (input: string) => {
  return input.trim().replace(/ +/g, "").toLowerCase();
};
