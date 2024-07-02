export const handleChange = (
  inputValue: string,
  setValue: (value: string) => void,
  onChange?: (value: string) => void
) => {
  setValue(inputValue);
  if (onChange) {
    onChange(inputValue);
  }
};
