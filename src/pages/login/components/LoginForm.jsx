import styled from 'styled-components';
import theme from '@app/styles/theme';
import KakaoLoginButton from './KakaoLoginButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@login/feature/schema';
import { useLoginMutation } from '@login/feature/hooks/useLoginMutation';
import Message from './Message';

const LoginForm = () => {
    const { 
        register,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onChange',
    });

    const loginMutation = useLoginMutation();

    return(
        <FormContainer>
            <Form onSubmit = {handleSubmit((data) => loginMutation.mutate(data))}>
                <Input type = "text" placeholder="아이디를 입력하세요" {...register('clientId')} isValid={isValid || !errors.clientId}/>
                <Message isValid={!errors.clientId} message={errors.clientId?.message} />
                <Input type = "password" placeholder="비밀번호를 입력하세요" {...register('password')} isValid={isValid || !errors.password}/>
                <Message isValid={!errors.password} message={errors.password?.message} />
                <Button type = "submit">로그인</Button>
                <KakaoLoginButton />
            </Form>
            <FormFooter>
                <Link href="/common-signup">회원가입하기</Link>
                <Divider>|</Divider>
                <Link href="/find-pw">비밀번호찾기</Link>
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
    gap: 0.5rem;
`;

const Input = styled.input`
    width: 454px;
    height: 54px;
    border: 1px solid ${theme.colors.gray.main};
    border-radius: 8px;
    padding: 1rem;
    outline: none;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.black};

    &:focus {
    border-color: ${theme.colors.green.main};
  }
`;

const Button = styled.button`
    width: 28.375rem;
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s;
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};
    margin-bottom: 10px;

    &:hover {
    background-color: ${theme.colors.green.hover};
  }
`;

const FormFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 1.8rem;
    margin-top: 3rem;
`;

const Link = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.gray.sub};
`;

const Divider = styled.div`
    margin: 0 0.5rem;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.gray.sub};
`;

export default LoginForm;
