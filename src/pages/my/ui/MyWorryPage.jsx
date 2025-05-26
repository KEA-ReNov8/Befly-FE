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
`;

const Line = styled.div`
    width: 100%;
    height: 66px;
    background-color: ${theme.colors.green.main};
    display: flex;
    align-items: center;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
    padding-left: 220px;
    color: ${theme.colors.other.white};
`;
