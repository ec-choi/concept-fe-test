import { color } from '@/shared/styles/color';
import { css } from '@emotion/react';

export const achievementSectionStyle = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border: 1px solid ${color.gray400};
  border-radius: 8px;
  background: ${color.white};
`;
