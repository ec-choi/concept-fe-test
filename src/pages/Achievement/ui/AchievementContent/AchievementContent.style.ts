import { css } from '@emotion/react';
import { HEIGHT_TOKEN } from '../styleToken';
import { typo } from '@/shared/styles/typo';
import { color } from '@/shared/styles/color';

export const achievementContentStyle = css`
  flex: 1;
  height: calc(
    100% - ${HEIGHT_TOKEN.FILTER}px - ${HEIGHT_TOKEN.FOOTER}px -
      ${HEIGHT_TOKEN.CHIP_FILTER}px
  );
`;

export const tableHeaderStyle = css`
  display: flex;
  align-items: center;
  height: ${HEIGHT_TOKEN.TABLE_HEADER}px;
  border-bottom: 1px solid ${color.gray400};
  .first-column {
    max-width: 300px;
  }
  .table-header-item {
    flex: 1;
    padding: 8px 10px;
    ${typo.caption1}
    color: ${color.gray600};
    &.is-basic-empty,
    &.is-intermediate-empty,
    &.is-advanced-empty {
      display: none;
    }
  }
`;

export const achievementScrollRootStyle = css`
  height: calc(100% - ${HEIGHT_TOKEN.TABLE_HEADER}px);
`;

export const middleChapterHeaderStyle = css`
  padding: 16px 20px;
  background-color: ${color.gray100};
  border-bottom: 1px solid ${color.gray300};
  ${typo.heading5}
  font-weight: 700;
  color: ${color.gray900};
`;

export const accordionRootStyle = css`
  width: 100%;
  color: ${color.gray900};
  ${typo.body2}
`;

export const accordionHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid ${color.gray300};
  background: ${color.gray100};
`;

export const accordionTriggerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 6px;
  width: 100%;
  .accordion-trigger-icon {
    transform: rotate(-90deg);
    transition: transform 0.1s;
  }
  &[data-state='open'] .accordion-trigger-icon {
    transform: rotate(0);
  }
`;

export const accordionContentStyle = css`
  overflow: hidden;

  &[data-state='open'] {
    animation: slideDown 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: slideUp 200ms ease-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

export const littleChapterSectionStyle = css`
  display: flex;
  border-bottom: 1px solid ${color.gray300};
  .first-column {
    max-width: 300px;
  }

  .content-item {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px;
    &.little-chapter {
      padding: 14px 14px 14px 44px;
    }
    + .content-item {
      border-left: 1px solid ${color.gray300};
    }
    &.is-basic-empty,
    &.is-intermediate-empty,
    &.is-advanced-empty {
      display: none;
    }
  }
  .chip-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;
