import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';

export const checkboxRootStyle = css`
  flex-shrink: 0;
  background-color: ${color.white};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${color.gray500};
  cursor: pointer;

  &[data-state='indeterminate'] {
    background-color: ${color.sky400};
    border-color: ${color.sky400};
    color: ${color.white};
  }
  &[data-state='checked'] {
    background-color: ${color.sky400};
    border-color: ${color.sky400};
    color: ${color.white};
  }
`;

export const checkboxIndicatorStyle = css`
  color: currentColor;
`;
