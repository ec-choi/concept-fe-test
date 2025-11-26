import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';
import { typo } from '@/shared/styles/typo';

export const selectTriggerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 150px;
  padding: 8px 8px 8px 12px;
  border: 1px solid ${color.gray400};
  border-radius: 4px;

  color: ${color.gray900};
  ${typo.body2}

  cursor: pointer;
  &[data-placeholder] {
    color: ${color.gray600};
  }
`;

export const selectContentStyle = css`
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid ${color.gray400};
  background-color: ${color.white};
  z-index: 100;
  width: var(--radix-select-trigger-width);
`;

export const selectViewportStyle = css`
  max-height: 216px;
  overflow-y: auto;
`;

export const selectItemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  user-select: none;
  ${typo.body2}
  color: ${color.gray900};
  & + & {
    border-top: 1px solid ${color.gray300};
  }
  &[data-disabled] {
    color: ${color.gray500};
    pointer-events: none;
  }
`;

export const selectItemIndicatorStyle = css`
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background-color: ${color.gray900};
`;
