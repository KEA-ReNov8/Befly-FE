import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import WorryList from '@my/components/WorryList';

export const MyWorryPage = () => {
    return (
        <Wrapper>
            <TopBar />
            <Line>고민함</Line>
            <WorryList />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1440px;
    margin: 0 auto;
    background-color: ${theme.colors.gray[100]};
`;

const Line = styled.div`
    margin-bottom: 20px;
    width: 100%;
    height: 66px;
    background-color: ${theme.colors.green.main};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    padding-left: 220px;
    color: ${theme.colors.other.white};
`;