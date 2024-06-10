export type InputsProps = {
  id?: string;
  label?: string;
  name?: string;
  value?: string | number;
  className?: string;
  inputClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};
