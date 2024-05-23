import { useEffect, useState } from 'react';

const usePagination = (items: any[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const pageCount = Math.ceil(items?.length / pageLimit);

  // Reset back to First Page
  useEffect(() => {
    setCurrentPage(1);
  }, [pageLimit, items]);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const changePageLimit = (pageLimit: number) => {
    setPageLimit(pageLimit);
  };

  const pageData = () => {
    // Items are zero-indexed
    const pageIndex = currentPage - 1;
    const start = pageIndex * pageLimit;
    const end = start + pageLimit;
    console.log('items', items);
    return items.slice(start, end);
  };

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, pageCount - 1));
  };

  const previousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  return {
    currentPage,
    pageCount,
    changePage,
    pageLimit,
    changePageLimit,
    pageData: pageData(),
    nextPage,
    previousPage,
  };
};

export default usePagination;
