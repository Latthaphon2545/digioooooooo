export const handleShowManyCheckInstock = (
  description: string,
  manyCheckInstock: number
) => {
  if (description === "Check stock") {
    return "Check stock" + ` (${manyCheckInstock - 1})`;
  }
  return description;
};
