interface TableProps {
  totalLength: number;
  setTotalPages: (value: number) => void;
  setCurrentPage: (value: number) => void;
  action?: () => void;
  itemPage: number;
}

export const getLengthTable = ({
  totalLength,
  setTotalPages,
  setCurrentPage,
  action,
  itemPage,
}: TableProps) => {
  if (totalLength === 0) {
    setTotalPages(0);
    return;
  }
  const totalPages = Math.ceil(totalLength / itemPage);
  setTotalPages(totalPages);
  action && action();
  setCurrentPage(1);
};

export const currentPageCal = ({
  itemPage,
  skip,
}: {
  itemPage: number;
  skip: number;
}) => {
  const totalPages = skip === 0 ? 1 : Math.ceil(skip / itemPage) + 1;
  return totalPages;
};
