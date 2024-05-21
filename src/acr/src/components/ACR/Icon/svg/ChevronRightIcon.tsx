import { SvgProps, sharedAttributes } from '../Icon.props';

const ChevronRightIcon = (props: SvgProps): JSX.Element => {
  const { className } = props;

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...sharedAttributes(props)}
    >
      <path d="M9.45 9L6 5.55L7.05 4.5L11.55 9L7.05 13.5L6 12.45L9.45 9Z" fill="currentColor" />
    </svg>
  );
};

export default ChevronRightIcon;

