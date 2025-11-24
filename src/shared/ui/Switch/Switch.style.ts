import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';

export const switchRootStyle = css`
  width: 42px;
  height: 25px;
  background-color: ${color.gray500};
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  &[data-state='checked'] {
    background-color: ${color.gray900};
  }
`;

export const switchThumbStyle = css`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${color.white};
  border-radius: 9999px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;
