import { footerStyle } from '@/pages/Achievement/ui/Footer/Footer.style';

export const Footer = () => {
  return (
    <footer css={footerStyle}>
      <div className="selected-count">
        선택한 유형 <span className="count">0</span> 개
      </div>
      <div className="button-wrapper">
        <button className="button" disabled>
          학습지 만들기
        </button>
      </div>
    </footer>
  );
};
