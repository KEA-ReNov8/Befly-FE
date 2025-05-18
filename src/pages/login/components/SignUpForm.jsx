import styled from 'styled-components';
import theme from '@app/styles/theme';
//reactform, zod, store 예정

const SignUpForm = ({ onSubmit }) => {
    
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
                {/*필요시 컨테이너 분리*/}
                <Nickname type ="text" placeholder="닉네임" maxLength={10} required/>
                <CheckButton>중복확인</CheckButton>
            </Input>
            <Gender>
                <GenderOption>
                    <GenderButton type="radio" id="male" name="gender" required/>
                    <GenderText htmlFor="male">남성</GenderText>
                </GenderOption>
                <GenderOption>
                    <GenderButton type="radio" id="female" name="gender" />
                    <GenderText htmlFor="female">여성</GenderText>
                </GenderOption>
            </Gender>
            <TermContainer>
                <Term type="checkbox" id="term" required />
                <TermText>이용약관 개인정보 수집 및 정보이용에 동의합니다.</TermText>
            </TermContainer>
            <SubmitButton type="submit">시작하기</SubmitButton>
        </Container>
    );
};

const Container = styled.form`
    display: flex;
    flex-direction: column;
    width: 24.375rem;
    height: 42.3125rem;
    align-items: center;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.pretendard};
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    margin-right: 8rem;
    line-height: 1.3;
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
    background-color: ${theme.colors.gray[500]};
`;

const AddButton = styled.button`
    position: absolute;
    top: 80%;
    left: 78%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${theme.colors.green.main};
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
    padding-bottom: 0.2rem;

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const Input = styled.div`
    display: flex;
    position: relative;
    width: 335.7px;
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
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 5px;
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const Nickname = styled.input`
    flex: 1;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: ${theme.colors.green.main};
    }
`;

const CheckButton = styled.button`
    position: absolute;
    top: 65%;
    left: 78%;
    width: 66px;
    height: 30px;
    background-color: ${theme.colors.green.main};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const Gender = styled.div`
    display: flex;
    margin-top: 2rem;
    gap: 5rem;
`;

const GenderOption = styled.div`
    align-items: center;
`;

const GenderButton = styled.input`
    appearance: auto;
    accent-color: ${theme.colors.green.main};
    margin-right: 0.5rem;
    cursor: pointer;
`;

const GenderText = styled.label`
    font-size: 1rem;
    color: ${theme.colors.black};
`;

const TermContainer = styled.div`
    display: flex;
    margin-top: 2rem;
`;

const Term = styled.input`
    appearance: auto;
    align-items: center;
    cursor: pointer;
    accent-color: ${theme.colors.green.main};
    color: ${theme.colors.gray[700]};
`;

const TermText = styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.black};
    padding-top: 0.2rem;
    margin-left: 0.5rem;
`;

const SubmitButton = styled.button`
    width: 335.7px;
    height: 59px;
    padding 1rem;
    margin-top: 1.5rem;
    background-color: ${theme.colors.green.main};
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.green[80]};
    }
`;

export default SignUpForm;