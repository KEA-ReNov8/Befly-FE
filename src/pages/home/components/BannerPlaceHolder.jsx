import styled from 'styled-components';
import theme from '@app/styles/theme';
import banner from '@shared/assets/imgs/banner.svg';

export const BannerPlaceHolder = () => {
  return (
    <BannerWrapper>
      <BannerImg src={banner} alt="배너" />
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

/*const banners = [banner, banner2];

export const BannerPlaceHolder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 10000); // 4초마다 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <BannerWrapper>
      {banners.map((banner, index) => (
        <BannerImg
          key={index}
          src={banner}
          alt={`배너 ${index + 1}`}
          $isVisible={index === currentIndex}
        />
      ))}
    </BannerWrapper>
  );
};

// 애니메이션 정의
const fadeInOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  position: relative;
`;

const BannerImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: ${({ $isVisible }) => ($isVisible ? fadeInOut : 'none')} 1s ease-in-out;
`;*/
