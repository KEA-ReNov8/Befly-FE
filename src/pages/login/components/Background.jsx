import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import theme from '@app/styles/theme';
import logo from '@shared/assets/imgs/main_logo.svg';
import door from '@shared/assets/imgs/door.svg';
import door2 from '@shared/assets/imgs/door2.svg';
import door3 from '@shared/assets/imgs/door3.svg';

const doors = [door, door2, door3];

const Background= ({children}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % doors.length);
        }, 6000); // 6초마다 전환
    
        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <LeftSide>
                {doors.map((door, index) => (
                    <DoorImage 
                    key={index}
                    src={door}
                    alt={`이미지 ${index + 1}`}
                    $isVisible={index === currentIndex} />
                ))}
            </LeftSide>
            <RightSide>
                <Logo>
                    <img src={logo} alt="BeFly" />
                </Logo>
                {children}
            </RightSide>
        </Container>
    )
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

const Container = styled.div`
    width: 74rem;
    height: 53.5rem;
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray.main};
    background-color: ${theme.colors.other.white};
    margin-top: 50px;
    margin-bottom: 50px;
    perspective: 2000px; /* 3D 회전을 위한 시점 */
`;

const DoorImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: ${({ $isVisible }) => ($isVisible ? fadeInOut : 'none')} 1s ease-in-out;
`;

const Logo = styled.h1`
    margin-bottom: 4rem;
`;

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 0.5rem 0 0 0.5rem;
    background-color: ${theme.colors.green.main};
    animation: openLeftPage 0.8s ease-out forwards;
    transform-origin: right center;

    @keyframes openLeftPage {
        0% {
            transform: rotateY(90deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(0deg);
            opacity: 1;
        }
    }

    h2 {
        color: white;
        font-size: ${theme.fontSize.xl};
        line-height: 1.2;
        margin-left: 1.5rem;
        margin-top: 1.5rem;
    } //배너 대체 예정
`;

const RightSide = styled.div`
    width: 50%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: openRightPage 0.8s ease-out forwards;
    transform-origin: left center;

    @keyframes openRightPage {
        0% {
            transform: rotateY(-90deg);
            opacity: 0;
        }
        100% {
            transform: rotateY(0deg);
            opacity: 1;
        }
    }
`;

export default Background;
