import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState } from 'react';
import TermModal from './TermModal';
//reactform, zod, store 예정

const SignUpForm = ({ onSubmit }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);   
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
        }

    return(
        <Container onSubmit = {handleSubmit}>
            <Title>회원가입을 위해 <br/> 정보를 입력해주세요.</Title>
            <Profile>
                <ProfileImage />
                <AddButton>+</AddButton>
            </Profile>
            <Input>
                <Email type="email" placeholder="이메일" required/>
                <NicknameContainer>
                    <Nickname type ="text" placeholder="닉네임" maxLength={10} required/>
                    <CheckButton>중복확인</CheckButton>
                </NicknameContainer>
            </Input>
            <TermContainer>
                <Term type="checkbox" id="term" required />
                <TermText onClick={handleModalOpen}>이용약관 개인정보 수집 및 정보이용에 동의합니다.</TermText>
            </TermContainer>
            <SubmitButton type="submit">시작하기</SubmitButton>
            {isModalOpen && <TermModal onClose={handleModalClose} />}
        </Container>
    );
};

const Container = styled.form`
    width: 24.375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray.main};
    margin-bottom: 80px;
    padding-bottom: 30px;
`;

const Title = styled.h2`
    line-height: 1.5;
    color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.semibold};
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    margin-right: 9rem;
`;

const Profile = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray.main};
`;

const AddButton = styled.button`
    position: absolute;
    top: 80%;
    left: 78%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: ${theme.fontSize.title};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};
    background-color: ${theme.colors.green.main};
    padding-bottom: 0.35rem;
    padding-left: 0.05rem;
    
    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const Input = styled.div`
    width: 335.7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1rem;
`;

const Email = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const NicknameContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    gap: 1rem;
    border: 1px solid ${theme.colors.gray.main};
`;

const Nickname = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const CheckButton = styled.button`
    width: 66px;
    height: 30px;
    margin-right: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.other.white};
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.medium};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const TermContainer = styled.div`
    display: flex;
    margin-top: 1.5rem;
`;

const Term = styled.input`
    appearance: auto;
    align-items: center;
    cursor: pointer;
    accent-color: ${theme.colors.green.main};
    color: ${theme.colors.gray[700]};
`;

const TermText = styled.p`
    cursor: pointer;
    color: ${theme.colors.other.black};
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.medium};
    padding-top: 0.2rem;
    margin-left: 0.5rem;

    &:hover {
        color: ${theme.colors.gray.sub};
    }
`;

const SubmitButton = styled.button`
    width: 335.7px;
    height: 59px;
    margin-top: 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.other.white};

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

export default SignUpForm;
