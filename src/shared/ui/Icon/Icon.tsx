import * as icons from '@/shared/assets/icons';
import { color as _color } from '@/shared/styles/color';
export type IconName = keyof typeof icons;

export const Icon = ({
  name,
  color,
  size = 16,
}: {
  name: IconName;
  color?: keyof typeof _color;
  size?: number;
}) => {
  const SVGIcon = icons[name];
  const iconColor = color ? _color[color] : _color.gray500;
  return <SVGIcon style={{ color: iconColor, width: size, height: size }} />;
};
