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
    display: flex;
    margin: 10px auto;
    width: 74rem;
    height: 53.5rem;
    border-radius: 0.5rem;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    margin-bottom: 50px;
`;

const Logo = styled.h1`
    margin-bottom: 4rem;
    color: ${theme.colors.green.main};
    font-size: 80px;
    font-family: ${theme.fontFamily.pretendard};
    font-weight: 700;
`;

const LeftSide = styled.div`
    flex: 1;
    display: flex;
    border-radius: 0.5rem 0 0 0.5rem;
    flex-direction: column;
    background-color: ${theme.colors.green.main};
    
    h2 {
        color: white;
        font-size: ${theme.fontSize.large};
        font-family: ${theme.fontFamily.pretendard};
        line-height: 1.2;
        margin-left: 1.5rem;
        margin-top: 1.5rem;
    }
`;

const RightSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

export default Background;
