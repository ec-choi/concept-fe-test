import { color } from '@/shared/styles/color';
import { fontWeight, typo } from '@/shared/styles/typo';
import { css } from '@emotion/react';

export const footerStyle = css`
  flex-shrink: 0;
  .selected-count {
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    padding: 20px 24px;
    border-top: 1px solid ${color.gray300};
    background: ${color.gray200};
    color: ${color.gray900};
    ${typo.heading5}
    ${fontWeight.bold}
  }
  .count {
    color: ${color.sky400};
  }
  .button-wrapper {
    display: flex;
    padding: 12px 24px;
    justify-content: flex-end;
    align-items: center;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 4px;
    background: ${color.sky400};
    color: ${color.white};
    ${typo.body2};
    ${fontWeight.bold};
    &:disabled {
      background: ${color.gray200};
      color: ${color.gray500};
    }
  }
`;
