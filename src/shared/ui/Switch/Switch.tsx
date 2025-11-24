import * as SwitchPrimitive from '@radix-ui/react-switch';
import { switchRootStyle, switchThumbStyle } from './Switch.style';

export const Switch = (props: SwitchPrimitive.SwitchProps) => (
  <SwitchPrimitive.Root css={switchRootStyle} {...props}>
    <SwitchPrimitive.Thumb css={switchThumbStyle} />
  </SwitchPrimitive.Root>
);
