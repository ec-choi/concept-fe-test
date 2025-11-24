import { css } from '@emotion/react';
import { color } from '@/shared/styles/color';

export const selectTriggerStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: ${color.white};
  color: ${color.gray900};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${color.gray500};
  cursor: pointer;
  &:hover {
    background-color: ${color.gray100};
  }
  &:focus {
    box-shadow: 0 0 0 2px ${color.gray900};
  }
  &[data-placeholder] {
    color: ${color.gray600};
  }
`;

export const selectContentStyle = css`
  overflow: hidden;
  background-color: ${color.white};
  border-radius: 6px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  border: 1px solid ${color.gray400};
  z-index: 100;
`;

export const selectViewportStyle = css`
  padding: 5px;
`;

export const selectItemStyle = css`
  font-size: 13px;
  line-height: 1;
  color: ${color.gray900};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    color: ${color.gray500};
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: ${color.gray900};
    color: ${color.white};
  }
`;

export const selectScrollButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: ${color.white};
  color: ${color.gray900};
  cursor: default;
`;
