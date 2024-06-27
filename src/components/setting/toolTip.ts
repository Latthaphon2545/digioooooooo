export default function generateTooltip(title: string): string[] {
  const tooltip: string[] = [];
  if (title === "Email") {
    tooltip.push("If you want to change your email, please contact admin.");
  } else if (title === "Role") {
    tooltip.push("You can't change your role.");
  } else if (title === "Status") {
    tooltip.push("You can't change your status.");
  } else if (title === "Password") {
    tooltip.push(
      "Please enter at least 8 characters password and at most 30 characters"
    );
    tooltip.push(
      "Required mix case (uppercase, lowercase, number, and special character)"
    );
    tooltip.push("Cannot be easy password (e.g. 12345678, password, etc.)");
    tooltip.push("Cannot be the same as your email");
    tooltip.push("Cannot use your name in email");
  } else if (title === "Contact") {
    tooltip.push("Please enter your 10 digits phone number");
  }
  return tooltip;
}
