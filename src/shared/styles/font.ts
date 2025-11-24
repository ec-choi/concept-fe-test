import { css } from '@emotion/react';

export const font = css`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src:
      local('Pretendard Regular'),
      url('/fonts/pretendard/Pretendard-Regular.woff2') format('woff2'),
      url('/fonts/pretendard/Pretendard-Regular.woff') format('woff'),
      url('/fonts/pretendard/Pretendard-Regular.ttf') format('truetype'),
      url('/fonts/pretendard/Pretendard-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src:
      local('Pretendard Bold'),
      url('/fonts/pretendard/Pretendard-Bold.woff2') format('woff2'),
      url('/fonts/pretendard/Pretendard-Bold.woff') format('woff'),
      url('/fonts/pretendard/Pretendard-Bold.ttf') format('truetype'),
      url('/fonts/pretendard/Pretendard-Bold.otf') format('opentype');
  }
`;
