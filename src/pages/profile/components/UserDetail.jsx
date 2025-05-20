import styled from 'styled-components';
import theme from '@app/styles/theme';

const UserDetail = ({ userData }) => {
    return (
        <ProfileSection>
            <ProfileImage />
                <NameSection>
                    <UserName>{userData.username}</UserName>
                    <Badge />
                </NameSection>
            <Email>{userData.email}</Email>
        </ProfileSection>
    );
};

const ProfileSection = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    background-color: ${theme.colors.gray[200]};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const NameSection = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const UserName = styled.p`
    font-size: ${theme.fontSize.large};
    font-family: ${theme.fontFamily.pretendard};
`;

const Badge = styled.img`
    width: 18px;
    height: 18px;
`;

const Email = styled.p`
    margin-top: 20px;
    font-size: ${theme.fontSize.small};
    font-family: ${theme.fontFamily.pretendard};
`;

export default UserDetail;
