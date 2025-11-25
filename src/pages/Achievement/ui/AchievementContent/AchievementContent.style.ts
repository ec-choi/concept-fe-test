import { css } from '@emotion/react';
import { HEIGHT_TOKEN } from '../styleToken';

export const achievementContentStyle = css`
  flex: 1;
  height: calc(
    100% - ${HEIGHT_TOKEN.FILTER}px - ${HEIGHT_TOKEN.FOOTER}px -
      ${HEIGHT_TOKEN.CHIP_FILTER}px
  );
`;

export const achievementScrollRootStyle = css`
  height: calc(100% - ${HEIGHT_TOKEN.TABLE_HEADER}px);
`;
