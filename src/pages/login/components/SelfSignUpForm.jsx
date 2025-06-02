import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState, useEffect } from 'react';
import TermModal from './TermModal';
import Message from './Message';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInfoSchema } from '@login/feature/schema';
import { useSignupMutation } from '@login/feature/hooks/useSignupMutation';
import { handleOnSubmitSelf } from '@login/feature/utils/handleOnSubmitSelf';
//import { useSignupStore } from '@login/feature/store/useSignupStore';
import defaultProfile from '@shared/assets/icons/defaultUser.svg';

const SelfSignUpForm = ({ onSuccess }) => {
    //const { setClientId, setPassword, setNickName } = useSignupStore();

    const { 
        register, 
        getValues,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(UserInfoSchema),
        mode: 'onChange',
    });

    const signupMutation = useSignupMutation({
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
    });

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
            handleOnSubmitSelf(e, getValues, signupMutation);
        }}>
            <Title>회원가입을 위해 <br/> 정보를 입력해주세요.</Title>
            <Profile>
                {/*<ImageInput id="image-upload"type='file' accept="image/*" {...register('image')} />*/}
                {/*<ProfileImage src="https://objectstorage.kr-central-2.kakaocloud.com/v1/af4c072eeaf845b5be29839350a03250/belfy-object-storage/profile_img/default-user-icon.png" />*/}
                <img src={defaultProfile} alt="defaultProfile" />
                {/*<AddLabel htmlFor="image-upload">+</AddLabel>*/} 
            </Profile>
            <Input>
                <EmailContainer>
                    <Email type="text" placeholder="이메일" {...register('clientId')} isValid={isValid || !errors.clientId} />
                    {/*<CheckButton>중복확인</CheckButton>*/}
                </EmailContainer>
                <Message isValid={!errors.clientId} message={errors.clientId?.message} />
                <NicknameContainer>
                    <Nickname type ="text" placeholder="닉네임" maxLength={10} {...register('nickName')} isValid={isValid || !errors.nickName}/>
                </NicknameContainer>
                <Message isValid={!errors.nickName} message={errors.nickName?.message} />
                <Password type="password" placeholder="비밀번호" {...register('password')} isValid={isValid || !errors.password}/>
                <Message isValid={!errors.password} message={errors.password?.message} />
                <PasswordCheck type="password" placeholder="비밀번호 확인" {...register('passwordConfirm')} isValid={isValid || !errors.passwordConfirm}/>
                <Message isValid={!errors.passwordConfirm} message={errors.passwordConfirm?.message} />
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
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray[100]};

    img {
        width: 60%;
        height: 60%;
    }
`;

const ProfileImage = styled.img`
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background-color: ${theme.colors.gray[100]};
    padding: 40px 40px 40px 40px;
`;

const ImageInput = styled.input`
  display: none;
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
    margin-top: 1.5rem;
    gap: 0.5rem;
`;

const EmailContainer = styled.div`
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
const Email = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: none;
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

const Password = styled.input`
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

const PasswordCheck = styled.input`
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

export default SelfSignUpForm;

   //이미지 변환 코드
    /*const imgFile = watch('image');
    const [imagePreview, setImagePreview] = useState(undefined);

    useEffect(() => {
        if(imgFile && imgFile[0]) {
            const file = imgFile[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue('previewImage', reader.result);
            };
        }
    }, [imgFile]);*/

/*const Gender = styled.div`
    display: flex;
    margin-top: 2rem;
    gap: 5rem;
`;

const GenderText = styled.label`
    font-size: 1rem;
    color: ${theme.colors.black};
`;

const GenderOption = styled.div`
    align-items: center;
`;

const GenderButton = styled.input`
    appearance: auto;
    accent-color: ${theme.colors.green.main};
    margin-right: 0.5rem;
    cursor: pointer;
`;*/ //성별 추가 시 필요
/*<Gender>
<GenderOption>
    <GenderButton type="radio" id="male" name="gender" required/>
    <GenderText htmlFor="male">남성</GenderText>
</GenderOption>
<GenderOption>
    <GenderButton type="radio" id="female" name="gender" />
    <GenderText htmlFor="female">여성</GenderText>
</GenderOption>
</Gender>*/
