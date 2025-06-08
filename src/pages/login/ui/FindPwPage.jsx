import styled from 'styled-components';
import FindPw from '@login/components/FindPw';
import Footer from '@shared/ui/Footer';
import { PageTransition } from '@/shared/ui/PageTransition';

export const FindPwPage = () => {

    return (
        <PageTransition>
            <Wrapper>
                <FindPwContainer>
                    <FindPw />
                </FindPwContainer>
            </Wrapper>
            <Footer />
        </PageTransition>
    );
};

const FindPwContainer = styled.div`
    margin-top: 15%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;
