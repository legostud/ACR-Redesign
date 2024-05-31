import { useEffect } from 'react';
import { PaginationBaseProps } from './Pagination.props';

import { paginationRange, isFirstPage, isLastPage } from './Pagination.util';
import usePagination from 'src/hooks/usePagination';

import { Flex, Text } from '@radix-ui/themes';
import Icon from 'components/ACR/Icon/Icon';
import { IconName } from 'src/enumerations/Icon.enum';

import cn from 'classnames';

const RESULTS_PER_PAGE = [10, 20, 30];

/**
 * SUN-243 - Pagination
 * @param props The UI data coming from the parent component
 * @returns
 */
const PaginationBase = (props: PaginationBaseProps): JSX.Element => {
  const { items, setPageItems, testId } = props;

  const { pageData, pageLimit, changePage, changePageLimit, currentPage, pageCount } =
    usePagination(items);

  const pages = paginationRange(pageCount, currentPage);

  // Assumes parent will handle pagination logic
  const handlePageChange = (page: number) => {
    changePage(page);
  };

  useEffect(() => {
    setPageItems(pageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageLimit, items]);

  if (!items || items?.length === 0) {
    return <></>;
  }

  return (
    <Flex
      data-ref="pagination"
      data-testid={testId}
      wrap="wrap"
      justify="center"
      className="mt-6 gap-[30px] font-medium"
    >
      <Flex>
        <button
          className="px-[15px] py-2 disabled:text-gray-100"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage(currentPage)}
          aria-label="Previous page"
        >
          <Icon iconName={IconName.CHEVRON_LEFT} className="h-3 w-3" />
        </button>
        <Flex asChild align="center" className="gap-[5px]">
          <ul>
            {pages.map((pageNumber, index) => {
              return (
                <li key={index} className="body-xs">
                  <button
                    className={cn('rounded-[4px] px-[15px] py-2 font-medium', {
                      ['bg-t-primary text-t-btn-text']: currentPage === pageNumber,
                    })}
                    onClick={() => changePage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
          </ul>
        </Flex>
        <button
          className="px-[15px] py-2 disabled:text-gray-100"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage(items?.length, pageLimit, currentPage)}
          aria-label="Next page"
        >
          <Icon iconName={IconName.CHEVRON_RIGHT} className="h-3 w-3" />
        </button>
      </Flex>
      <Flex align="center" className="gap-[5px] md:ml-auto">
        <Text as="p" className="px-[5px]">
          Results Per Page
        </Text>
        {RESULTS_PER_PAGE?.map((numPerPage, index) => (
          <button
            key={index}
            className={cn('rounded-[4px] px-[11px] py-2 font-medium', {
              ['bg-t-primary text-t-btn-text']: numPerPage === pageLimit,
            })}
            onClick={() => changePageLimit(numPerPage)}
            aria-label={`${numPerPage} Results Per Page`}
          >
            {numPerPage}
          </button>
        ))}
      </Flex>
    </Flex>
  );
};

export default PaginationBase;
