export const handleEditToggle = (
  key: string,
  setIsEditing: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
) => {
  setIsEditing((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};
