import type { ACHIEVEMENT_GRADE } from '@/entities/achievement/model/types';
import { color } from '@/shared/styles/color';
import { css } from '@emotion/react';

const COLORS: Record<ACHIEVEMENT_GRADE, keyof typeof color> = {
  WHITE: 'white',
  GRAY: 'gray400',
  SAD: 'red400',
  RED: 'red400',
  YELLOW: 'yellow400',
  GREEN: 'green400',
  SMILE: 'green400',
};

export const chipStyle = ({ grade }: { grade: ACHIEVEMENT_GRADE }) => css`
  position: relative;
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .chip-label {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid ${color.gray300};
    background: ${color[COLORS[grade]]};

    cursor: pointer;
  }

  .chip-overlay {
    content: '';
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;

export const chipStarStyle = css`
  position: absolute;
  z-index: 2;
  top: -6px;
  right: -6px;
`;
