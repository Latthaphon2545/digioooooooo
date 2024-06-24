export const copylink = (
  e: React.MouseEvent<HTMLButtonElement>,
  itemId: string,
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  navigator.clipboard
    .writeText(itemId)
    .then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};
