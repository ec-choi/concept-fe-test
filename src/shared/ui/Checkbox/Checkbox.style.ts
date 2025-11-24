import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';

export const checkboxRootStyle = css`
  background-color: ${color.white};
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${color.gray500};
  cursor: pointer;
  &:hover {
    background-color: ${color.gray100};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${color.gray900};
  }
  &[data-state='checked'] {
    background-color: ${color.gray900};
    border-color: ${color.gray900};
    color: ${color.white};
  }
`;

export const checkboxIndicatorStyle = css`
  color: currentColor;
`;
