import { useEffect } from 'react';
import { InputsProps } from './Inputs.props';

import { Text } from '@radix-ui/themes';
import Icon from '../Icon/Icon';
import { IconName } from 'src/enumerations/Icon.enum';

import { useSelect } from 'downshift';
import { twMerge } from 'tailwind-merge';
import cn from 'classnames';

export type SelectItem = { value: string; label: string };

type DropdropProps = Omit<InputsProps, 'onChange'> & {
  items: SelectItem[];
  value?: SelectItem | null;
  defaultSelectedItem?: SelectItem;
  placeholder: string;
  onChange?: (selectedItem: SelectItem | null) => void;
};

const Dropdown = (props: DropdropProps) => {
  const { label, items, value, placeholder, className, defaultSelectedItem, onChange, disabled } =
    props;

  const selectState = useSelect({
    items,
    defaultSelectedItem,
    selectedItem: value,
    onSelectedItemChange: (changes) => {
      onChange && changes.selectedItem !== undefined && onChange(changes.selectedItem);
    },
  });

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    toggleMenu,
    closeMenu,
    reset,
  } = selectState;

  useEffect(() => reset(), [label, reset]);

  return (
    <div className={twMerge('flex flex-col gap-2 text-indigo-100', className)}>
      {label && (
        <Text as="label" className="text-t-body" {...getLabelProps()}>
          {label}
        </Text>
      )}
      <div className="relative rounded-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-t-primary">
        <button
          type="button"
          className={cn(
            'body-sm inline-flex h-[56px] w-full items-center justify-between gap-[5px] rounded-[8px] border-[1px] border-indigo-100 bg-white px-[15px] outline-none',
            {
              'rounded-bl-none rounded-br-none': isOpen,
            },
            { 'border-gray-100 bg-gray-20 text-gray-100': disabled }
          )}
          onClick={toggleMenu}
          {...getToggleButtonProps({
            disabled,
            'aria-label': selectedItem?.label || placeholder,
            onKeyDown: (event) => {
              if (event.key === 'Escape') {
                closeMenu();
              }
            },
          })}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedItem?.label ?? placeholder}
          </span>
          <Icon
            className={cn('justify-self-end transition-all', { 'rotate-180': isOpen })}
            iconName={IconName.CHEVRON_DOWN}
            isAriaHidden={true}
          />
        </button>
        <ul
          className={cn(
            'absolute z-10 max-h-96 w-full overflow-y-auto rounded-md rounded-b-[8px] border-[1px] border-t-0 border-indigo-100 bg-white',
            { hidden: !(isOpen && items?.length) },
            { 'rounded-t-none': isOpen }
          )}
          {...getMenuProps()}
        >
          {isOpen &&
            items?.map((item: SelectItem, index) => (
              <li
                key={`select-item_${index}`}
                className={cn('body-sm cursor-pointer px-[15px] py-[10px]', {
                  'bg-gray-20': highlightedIndex === index || item.value === selectedItem?.value,
                })}
                {...getItemProps({ index, item })}
              >
                {item?.label}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
