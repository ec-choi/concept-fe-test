import { color } from '@/shared/styles/color';
import { css } from '@emotion/react';

export const scrollRootStyle = css`
  overflow: hidden;
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
