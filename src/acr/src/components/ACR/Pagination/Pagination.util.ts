const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const getTotalPages = (totalPages: number, itemsPerPage: number) => {
  return Math.ceil(totalPages / itemsPerPage);
};

export const isFirstPage = (currentPage: number) => {
  return currentPage === 1;
};

export const isLastPage = (totalPages: number, itemsPerPage: number, currentPage: number) => {
  const numPages = getTotalPages(totalPages, itemsPerPage);
  return currentPage >= numPages;
};

export const paginationRange = (totalPages: number, currentPage: number) => {
  const perPage = 5;

  const leftSiblingIndex = Math.max(currentPage - 2, 1);
  const rightSiblingIndex = Math.min(currentPage + 2, totalPages);

  // if not enough pages
  if (totalPages < perPage) {
    return range(1, totalPages);
  }

  if (rightSiblingIndex < perPage) {
    // Beginning Range
    return range(leftSiblingIndex, perPage);
  } else if (rightSiblingIndex === totalPages) {
    // End Range
    return range(rightSiblingIndex - 4, rightSiblingIndex);
  } else {
    // Middle Range
    return range(leftSiblingIndex, rightSiblingIndex);
  }
};
