import { SvgProps, sharedAttributes } from '../Icon.props';

const ChevronLeftIcon = (props: SvgProps): JSX.Element => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 8 13"
      className={className}
      {...sharedAttributes(props)}
    >
      <path
        fill="currentColor"
        d="m6.5 12.0649-6-5.99996 6-5.9999986L7.9 1.46494l-4.6 4.6 4.6 4.59996-1.4 1.4Z"
      />
    </svg>
  );
};

export default ChevronLeftIcon;
