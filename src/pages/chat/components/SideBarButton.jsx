import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBarButton = ({sessionId, title, status}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname.includes(sessionId);

    const handleClick = () => {
        navigate(`/chat/${sessionId}`);
    };

    const getStatusText = (status) => {
        return status ? '고민중' : '완료';
    };

    return (
        <Container>
            <Button data-active={isActive} onClick={handleClick}>
                <TitleContainer>
                    <Title>{title}</Title>
                </TitleContainer>
                <Status data-active={isActive}>{getStatusText(status)}</Status>
            </Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border: none;
    cursor: pointer;
    border-radius: 8px;

    background-color: ${(props) => 
    props['data-active'] ? theme.colors.green.light : 'transparent'};

    &:hover {
        background-color: ${theme.colors.green.light};
    }
`;

const TitleContainer = styled.div`
    width: 215px;
    display: flex;
`;


const Title = styled.p`
    padding-left: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.regular};
    color: ${theme.colors.black};
`;

const Status = styled.div`
    width: 55px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: ${theme.fontSize.smMd};
    font-weight: ${theme.fontWeight.regular};
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
