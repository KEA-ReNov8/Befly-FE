import styled from 'styled-components';
import Footer from '@shared/ui/Footer';
import Background from '@pages/login/components/Background';
import LoginForm from '@pages/login/components/LoginForm';


export const LoginPage = () => {
    return (
        <Wrapper>
            <Background>
                <LoginForm />
            </Background>
            <Footer />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%; //화면 높이 여기서 수정
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;