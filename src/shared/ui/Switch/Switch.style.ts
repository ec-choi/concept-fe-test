import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';

export const switchRootStyle = css`
  width: 40px;
  height: 20px;
  background-color: ${color.gray100};
  border-radius: 9999px;
  border: 1px solid ${color.gray400};
  cursor: pointer;
`;

export const switchThumbStyle = css`
  display: block;
  width: 20px;
  height: 20px;
  background-color: ${color.gray500};
  margin-top: -1px;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(0px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(19px);
    background-color: ${color.sky400};
  }
`;
