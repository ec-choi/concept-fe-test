import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { checkboxRootStyle, checkboxIndicatorStyle } from './Checkbox.style';
import { Icon } from '@/shared/ui/Icon/Icon';

export const Checkbox = (props: CheckboxPrimitive.CheckboxProps) => (
  <CheckboxPrimitive.Root css={checkboxRootStyle} {...props}>
    <CheckboxPrimitive.Indicator css={checkboxIndicatorStyle}>
      {props.checked === 'indeterminate' ? (
        <Icon name="icon_dashed" size={16} />
      ) : (
        <Icon name="icon_checked" size={16} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
