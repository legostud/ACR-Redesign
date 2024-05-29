import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

type LoadingWrapperProps = {
  loading: boolean;
  className?: string;
  children: React.ReactNode;
};

const LoadingWrapper = (props: LoadingWrapperProps): JSX.Element => {
  const { loading, children } = props;

  return (
    <div className="relative">
      <div
        aria-live="polite"
        className={twMerge(
          cn('absolute z-10 hidden h-full w-full', {
            'flex items-start justify-center': loading,
          })
        )}
      >
        <div className="fixed top-0 h-full w-full bg-t-background opacity-75"></div>
        <div
          className="absolute top-1/2 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-primary border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default LoadingWrapper;

