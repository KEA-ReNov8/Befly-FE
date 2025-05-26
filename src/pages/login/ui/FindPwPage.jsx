import styled from 'styled-components';
import FindPw from '@login/components/FindPw';
import Footer from '@shared/ui/Footer';

export const FindPwPage = () => {

    return (
        <Wrapper>
            <FindPw />
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 12%;
`;