import { SvgProps, sharedAttributes } from '../Icon.props';

const CloseIcon = (props: SvgProps): JSX.Element => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 17"
      className={className}
      {...sharedAttributes(props)}
    >
      =
      <path
        fill="currentColor"
        d="m4.26666 13.1473-.93333-.9333 3.73333-3.73337L3.33333 4.7473l.93333-.93334L8 7.5473l3.7333-3.73334.9334.93334-3.73337 3.73333L12.6667 12.214l-.9334.9333L8 9.41397 4.26666 13.1473Z"
      />
    </svg>
  );
};

export default CloseIcon;
