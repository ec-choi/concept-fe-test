import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';
import { fontWeight, typo } from '@/shared/styles/typo';

export const navScrollRootStyle = css`
  width: 192px;
  border: 1px solid ${color.gray400};
  background: ${color.white};
  border-radius: 8px;
`;

export const navButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background: ${color.white};
  ${typo.body2}
  + .nav-item {
    border-top: 1px solid ${color.gray400};
  }
  &[aria-current='page'] {
    color: ${color.sky400};
    ${fontWeight.bold}
  }
`;
