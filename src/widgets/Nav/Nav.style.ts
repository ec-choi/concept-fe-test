import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';
import { fontWeight, typo } from '@/shared/styles/typo';

export const scrollRootStyle = css`
  width: 192px;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${color.gray400};
  background: ${color.white};
  border-radius: 12px;
  --scrollbar-size: 10px;
`;

export const scrollViewportStyle = css`
  width: 100%;
  height: 100%;
`;

export const scrollbarStyle = css`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 2px;
  // background: ${color.gray100};
  transition: background 160ms ease-out;
  &:hover {
    background: ${color.gray200};
  }
  &[data-orientation='vertical'] {
    width: var(--scrollbar-size);
  }
  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
`;

export const thumbStyle = css`
  position: relative;
  flex: 1;
  background: ${color.gray400};
  border-radius: var(--scrollbar-size);
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
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
