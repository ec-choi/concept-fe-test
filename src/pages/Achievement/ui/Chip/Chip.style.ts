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
  input {
    display: none;
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
  input:checked + .chip-label:after {
    position: absolute;
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;

    border-radius: 7px;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const chipStarStyle = css`
  position: absolute;
  z-index: 2;
  top: -6px;
  right: -6px;
`;
