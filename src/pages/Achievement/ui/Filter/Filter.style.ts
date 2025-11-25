import { HEIGHT_TOKEN } from '@/pages/Achievement/ui/styleToken';
import { color } from '@/shared/styles/color';
import { typo } from '@/shared/styles/typo';
import { css } from '@emotion/react';

export const filterStyle = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  .filter {
    display: flex;
    align-items: center;
    gap: 14px;

    height: ${HEIGHT_TOKEN.FILTER}px;
    padding: 0 0 0 24px;
    border-bottom: 1px solid ${color.gray400};
  }

  .switch {
    display: flex;
    align-items: center;
    gap: 8px;
    ${typo.body2}
    color: ${color.gray700};
  }

  .chip-filter {
    display: flex;
    align-items: center;
    gap: 6px;

    padding: 12px 24px;
    height: ${HEIGHT_TOKEN.CHIP_FILTER}px;
    border-bottom: 1px solid ${color.gray400};

    .title {
      padding-right: 2px;
      ${typo.body2}
      color: ${color.gray800};
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 4px;

      color: ${color.gray600};
      ${typo.body2}
    }
  }

  .chip {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${color.gray600};

    ${typo.body2};
  }
`;

export const resetButtonStyle = css`
  margin-left: auto;
  margin-right: 0;

  display: flex;
  align-items: center;
  gap: 4px;
  width: 99px;
  height: 100%;
  padding-left: 14px;
  border-left: 1px solid ${color.gray300};
  ${typo.body2}
  color: ${color.gray600};
`;
