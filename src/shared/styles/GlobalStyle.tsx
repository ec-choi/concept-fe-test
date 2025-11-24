import { font } from '@/shared/styles/font';
import { init } from '@/shared/styles/init';
import { reset } from '@/shared/styles/reset';
import { css, Global } from '@emotion/react';

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${font}
        ${reset}
        ${init}
      `}
    />
  );
};
