import styled from 'styled-components';
import theme from '@app/styles/theme';
import FindPw from '@login/components/FindPw';

export const FindPwPage = () => {

    return (
        <Wrapper>
            <FindPw />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 10%;
`;