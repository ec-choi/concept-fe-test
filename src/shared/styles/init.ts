import { fontWeight, typo } from '@/shared/styles/typo';
import { css } from '@emotion/react';

export const init = css`
  overflow: hidden;
  html {
    height: 100%;
  }
  body {
    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    ${typo.body2};
    ${fontWeight.regular};
  }

  *:not(text) {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
    -webkit-text-size-adjust: none;
  }

  #root {
    display: flex;
    min-height: 600px;
    flex-direction: column;
    height: 100%;
  }

  [role='button'] {
    cursor: pointer;
  }

  button {
    ${typo.body2};
    ${fontWeight.regular};
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
  }

  svg {
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
