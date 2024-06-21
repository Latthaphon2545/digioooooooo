export const copylink = (e: any, item: any, setCopySuccess: any) => {
  e.preventDefault();
  navigator.clipboard.writeText(item.id);
  setCopySuccess(true);
  setTimeout(() => {
    setCopySuccess(false);
  }, 2000);
};
