import styled from 'styled-components';
import theme from '@app/styles/theme';

const SideBarButton = ({active}) => {
    return (
        <Container>
            <Button data-active={active}>
                <Title>새로운 대화</Title>
                <Status data-active={active}>고민중</Status>
            </Button>
        </Container>
    );
};
//커스텀 prop 전달은 data- 로 전달
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
`;

const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    background-color: ${(props) => 
    props['data-active'] ? theme.colors.green.light : 'transparent'};

    &:hover {
        background-color: ${theme.colors.green.light};
    }
`;

const Title = styled.p`
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    font-size: ${theme.fontSize.small};
    font-family: ${theme.fontFamily.pretendard};
    color: ${theme.colors.black};
`;

const Status = styled.div`
    width: 65px;
    height: 23px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20%;
    right: 5%;
    border-radius: 10px;
    font-size: ${theme.fontSize.xsmall};
    font-family: ${theme.fontFamily.pretendard};
    color: ${theme.colors.other.white};

    background-color: ${props => 
    props['data-active'] ? 'white' : theme.colors.green.main};
    color: ${props => 
    props['data-active'] ? theme.colors.green.main : theme.colors.white};

    ${Button}:hover & {
        background-color: white;
        color: ${theme.colors.green.main};
`;

export default SideBarButton;
