import { StyleProps } from 'src/types/Style.props';

export type SkipLinkProps = StyleProps & {
  text: string;
  anchorId: string;
  id: string;
  onClick?: React.MouseEvent<HTMLButtonElement>;
};
