import styled from 'styled-components';

export const BannerPlaceHolder = () => {
  return (
    <BannerWrapper>
      <BannerImg src="/sample-banner.jpg" alt="나중에 사진으로 채울겁니다" />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  height: 380px;
  background: #e0e0e0;
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
