import { footerStyle } from '@/pages/Achievement/ui/Footer/Footer.style';
import { useContentStore } from '@/pages/Achievement/store/context';

export const Footer = () => {
  const selectedChipIds = useContentStore((state) => state.selectedChipIds);
  const selectedCount = selectedChipIds.size;

  return (
    <footer css={footerStyle}>
      <div className="selected-count">
        선택한 유형 <span className="count">{selectedCount}</span> 개
      </div>
      <div className="button-wrapper">
        <button className="button" disabled={selectedCount === 0}>
          학습지 만들기
        </button>
      </div>
    </footer>
  );
};
