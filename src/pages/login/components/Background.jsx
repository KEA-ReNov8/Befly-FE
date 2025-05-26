import styled from 'styled-components';
import theme from '@app/styles/theme';

const Background= ({children}) => {
    return (
        <Container>
            <LeftSide>
                <h2>당신의 고민을 함께 나누고,</h2>
                <h2>가벼운 마음으로 날아보세요.</h2>
            </LeftSide>
            <RightSide>
                <Logo>Be, Fly</Logo>
                {children}
            </RightSide>
        </Container>
    )
};

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

const Logo = styled.h1`
    margin-bottom: 4rem;
    font-size: 80px;
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.green.main};
`; //로고 대체 예정

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
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
