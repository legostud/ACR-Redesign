import { twMerge } from 'tailwind-merge';
import { SkipLinkProps } from './SkipLink.props';

import cn from 'classnames';

const SkipLink = (props: SkipLinkProps) => {
  const { id, anchorId, text, styleClasses } = props;

  return (
    <a
      href={`#${anchorId}`}
      id={id}
      className={twMerge(cn('button text-assistive z-10', styleClasses))}
    >
      {text}
    </a>
  );
};

export default SkipLink;
