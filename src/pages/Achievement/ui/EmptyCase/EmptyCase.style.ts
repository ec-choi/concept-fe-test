import { color } from '@/shared/styles/color';
import { typo } from '@/shared/styles/typo';
import { css } from '@emotion/react';

export const emptyCaseStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${typo.body2}
  color: ${color.gray600};
  text-align: center;
`;
