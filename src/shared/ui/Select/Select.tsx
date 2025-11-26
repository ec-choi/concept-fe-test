import * as SelectPrimitive from '@radix-ui/react-select';
import { type ReactNode } from 'react';
import {
  selectContentStyle,
  selectItemIndicatorStyle,
  selectItemStyle,
  selectTriggerStyle,
  selectViewportStyle,
} from './Select.style';
import { Icon } from '@/shared/ui/Icon/Icon';

export const Select = ({
  children,
  placeholder,
  ...props
}: SelectPrimitive.SelectProps & {
  children: ReactNode;
  placeholder: string;
}) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger css={selectTriggerStyle}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <Icon name="icon_arrow_down" size={24} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          css={selectContentStyle}
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport css={selectViewportStyle}>
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export const SelectItem = ({
  children,
  ...props
}: SelectPrimitive.SelectItemProps & {
  children: ReactNode;
}) => {
  return (
    <SelectPrimitive.Item css={selectItemStyle} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <div css={selectItemIndicatorStyle} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export const SelectGroup = SelectPrimitive.Group;
export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;
