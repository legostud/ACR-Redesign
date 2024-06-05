import { ForwardedRef, forwardRef } from 'react';
import { TextField } from '@radix-ui/themes';

import { InputsProps } from './Inputs.props';

import { twMerge } from 'tailwind-merge';
import cn from 'classnames';

type InputProps = InputsProps & {
  placeholder?: string;
  slot?: JSX.Element;
  type?:
    | 'number'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'tel'
    | 'url'
    | 'week';
};

const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  const {
    id,
    name,
    type = 'text',
    label,
    placeholder,
    className,
    slot,
    onChange,
    disabled,
    ...rest
  } = props;

  return (
    <label className={twMerge(cn('flex w-fit flex-col gap-2 text-t-body', className))}>
      {label}
      <TextField.Root
        size="3"
        id={id}
        name={name}
        ref={ref}
        type={type}
        radius="large"
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...rest}
        className={twMerge(
          cn(
            'body-sm group h-[56px] bg-white shadow-[inset_0_0_0_1px] shadow-indigo-100 outline-2 outline-offset-2 outline-t-primary [&>input]:px-4 [&>input]:indent-0',
            { 'bg-gray-20': disabled }
          )
        )}
      >
        {slot && (
          <TextField.Slot
            side="right"
            className={cn('text-black', {
              'text-gray-70': disabled,
            })}
            pr="5"
          >
            {slot}
          </TextField.Slot>
        )}
      </TextField.Root>
    </label>
  );
});

Input.displayName = 'Input';

export default Input;
