import { TestProps } from 'types/Test.props';
import { StyleProps } from 'types/Style.props';

export type PaginationBaseProps = TestProps &
  StyleProps & {
    items: any[];
    setPageItems: (items: any[]) => void;
  };
