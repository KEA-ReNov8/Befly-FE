import styled from 'styled-components';
import theme from '@app/styles/theme';

const EditProfileModal = ( {onClose}) => {

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <Profile>
                    <ProfileImage />
                    <AddButton>+</AddButton>
                </Profile>
                <Input>
                    <Nickname type ="text" placeholder="닉네임" maxLength={10} required/>
                    <CheckButton>중복확인</CheckButton>
                </Input>
                <ButtonContainer>
                    <ReturnButton onClick={onClose}>취소</ReturnButton>
                    <EditButton onClick={handleClick}>수정하기</EditButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 344px;
    height: 513px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    background-color: white;
`;

const Profile = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
    width: 247px;
    height: 247px;
    border-radius: 50%;
    background-color: ${theme.colors.gray[500]};
`;

const AddButton = styled.button`
    position: absolute;
    top: 80%;
    left: 78%;
    width: 50px;
    height: 50px;
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

const Nickname = styled.input`
    flex: 1;
    width: 85%;
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
    top: 15%;
    left: 70%;
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

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 40px;
    gap: 15px;
`;

const EditButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: ${theme.colors.green.main};
    color: white;
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const ReturnButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid ${theme.colors.gray[500]};
    font-family: ${theme.fontFamily.pretendard};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default EditProfileModal;
