import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState } from 'react';
import KakaoLoginButton from './KakaoLoginButton';

const LoginForm = () => {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };

    return(
        <FormContainer>
            <Form onSubmit = {handleSubmit}>
                <Input type = "text" placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} />
                <Input type = "password" placeholder="비밀번호를 입력하세요" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                <Button type = "submit">로그인</Button>
                <KakaoLoginButton />
            </Form>
            <FormFooter>
                <Link href="/signup">회원가입</Link>
                <Divider>|</Divider>
                <Link href="/reset-pwd">비밀번호초기화</Link>
            </FormFooter>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    width: 28.375rem;
    height: 21.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 0.5rem;
    padding: 1rem;
    outline: none;

    &:focus {
    border-color: ${theme.colors.green.main};
  }
`;

const Button = styled.button`
    display: flex;
    background-color: ${theme.colors.green.main};
    color: white;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    width: 28.375rem;
    height: 3.125rem;
    transition: background-color 0.2s;
    font-size: ${theme.fontSize.small};
    font-family: ${theme.fontFamily.pretendard};
    font-weight: 500;

    &:hover {
    background-color: ${theme.colors.green.light};
  }
`;

const FormFooter = styled.div`
    display: flex;
    margin-top: 3rem;
    align-items: center;
    gap: 1rem;
`;

const Link = styled.a`
    color: ${theme.colors.gray[600]};
    text-decoration: none;
    cursor: pointer;
`;

const Divider = styled.div`
    color: ${theme.colors.gray[600]};
    margin: 0 0.5rem;
`;

export default LoginForm;
