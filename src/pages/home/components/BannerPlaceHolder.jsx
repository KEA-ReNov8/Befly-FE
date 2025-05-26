import styled from 'styled-components';
import theme from '@app/styles/theme';

export const BannerPlaceHolder = () => {
  return (
    <BannerWrapper>
      <BannerImg src="/sample-banner.jpg" alt="배너 위치" />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  height: 380px;
  background: ${theme.colors.gray[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
