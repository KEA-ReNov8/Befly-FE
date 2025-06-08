import styled, { keyframes } from 'styled-components';
import theme from '@app/styles/theme';
import banner from '@shared/assets/imgs/banner.svg';

export const BannerPlaceHolder = () => {
  return (
    <BannerWrapper>
      <BannerImg src={banner} alt="배너" />
    </BannerWrapper>
  );
};

// 페이드인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 380px;
  background: ${theme.colors.gray[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  // 페이지 로드 시 애니메이션
  animation: ${fadeIn} 0.8s ease-out;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
