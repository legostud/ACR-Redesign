import { TestProps } from 'types/Test.props';
import { StyleProps } from 'types/Style.props';
import { Pagination } from 'src/hooks/usePagination';

export type PaginationBaseProps<T> = TestProps &
  StyleProps & {
    pagination: Pagination<T>;
    items: T[];
  };
