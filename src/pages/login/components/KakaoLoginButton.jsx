import styled from 'styled-components';
import kakaobutton from '@shared/assets/icons/KakaoLoginButton.svg';

const KakaoLoginButton = () => {
    const link = 'none';//`${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;

    return (
        <Link href={link}>
            <Button>
                <Img src={kakaobutton} alt='카카오 로그인' />
            </Button>
        </Link>
    )
};

const Link = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

const Button = styled.button`
    display: flex;
    background-color: transparent;
    cursor: pointer;
    border: none;
    border-radius: 5rem;
    width: 28.375rem;
    height: 3.125rem;
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
