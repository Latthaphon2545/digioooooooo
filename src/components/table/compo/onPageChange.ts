export const onPageChange = ({
  setCurrentPage,
  pageNumber,
}: {
  setCurrentPage: (value: number) => void;
  pageNumber: number;
}) => {
  setCurrentPage(pageNumber);
};
