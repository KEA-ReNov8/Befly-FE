import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState, useEffect } from 'react';
import TermModal from './TermModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialUserInfoSchema } from '@login/feature/schema';
import { useSocialSignupMutation } from '@pages/login/feature/hooks/useSocialSignupMutation';
import { handleOnSubmit } from '@login/feature/utils/handleOnSubmit';
import Message from './Message';
import defaultProfile from '@shared/assets/icons/defaultUser.svg';
//import { useSocialSignupStore } from '@login/feature/store/useSocialSignupStore';

const SignUpForm = ({ onSuccess }) => {
    //document.cookie = "tempClientId=4286064884; path=/; max-age=3600";

    //const { setClientId, setNickname, setPhotoUrl } = useSocialSignupStore();

    const { 
        register, 
        getValues,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(SocialUserInfoSchema),
        mode: 'onChange',
    });

    const signupMutation = useSocialSignupMutation({
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
    });

    useEffect(() => {
        const cookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('tempClientId='));
        if (cookie) {
          const clientId = cookie.split('=')[1];
          setValue('clientId', clientId);
        }
      }, [setValue]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);   
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return(
        <Container onSubmit = {(e) => {
            e.preventDefault();
            handleOnSubmit(e, getValues, signupMutation);
        }}>
            <Title>회원가입을 위해 <br/> 정보를 입력해주세요.</Title>
            <Profile>
                {/*<ImageInput id="image-upload"type='file' accept="image/*" {...register('image')} />*/}
                {/*<ProfileImage src="https://objectstorage.kr-central-2.kakaocloud.com/v1/af4c072eeaf845b5be29839350a03250/belfy-object-storage/profile_img/default-user-icon.png" />*/}
                <img src={defaultProfile} alt="defaultProfile" />
                {/*<AddLabel htmlFor="image-upload">+</AddLabel>*/}
            </Profile>
            <Input>
                <Email type="text" placeholder="Client ID" disabled {...register('clientId')} isValid={isValid || !errors.clientId}/>
                <NicknameContainer>
                    <Nickname type ="text" placeholder="닉네임" maxLength={10} {...register('nickName')} isValid={isValid || !errors.nickName}/>
                    {/*<CheckButton>중복확인</CheckButton>*/}
                </NicknameContainer>
                <Message isValid={!errors.nickName} message={errors.nickName?.message} />
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
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray[100]};
    margin-bottom: 2rem;

    img {
        width: 60%;
        height: 60%;
    }
`;

const ImageInput = styled.input`
  display: none;
`;

const ProfileImage = styled.img`
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray[100]};
    object-fit: cover;
    padding: 40px 40px 40px 40px;
`;

const AddLabel = styled.label`
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
    gap: 0.5rem;
`;

const Email = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.medium};
    display: none;
    
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
    
    &:focus-within {
        border-color: ${theme.colors.green.main};
    }
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
