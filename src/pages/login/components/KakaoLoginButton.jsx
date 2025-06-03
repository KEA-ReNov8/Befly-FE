import styled from 'styled-components';
import kakaobutton from '@shared/assets/icons/KakaoLoginButton.svg';

const KakaoLoginButton = () => {
    
    const handleKakaoLogin = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`;
    };

    return (
         <Button onClick={handleKakaoLogin}>
            <Img src={kakaobutton} alt='카카오 로그인' />
        </Button>
    )
};

const Button = styled.button`
    width: 28.375rem;
    height: 3.125rem;
    display: flex;
    background-color: transparent;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;
    }
`;

const Img = styled.img`
    width: 28.375rem;
    height: 3.125rem;
`;

export default KakaoLoginButton;
