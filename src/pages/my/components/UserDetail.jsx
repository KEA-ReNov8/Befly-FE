import styled from 'styled-components';
import theme from '@app/styles/theme';

const UserDetail = ({ handleProfileClick, userData }) => {
    return (
        <ProfileSection>
            <ProfileImage onClick={handleProfileClick} />
                <NameSection>
                    <UserName>{userData.username}</UserName>
                    <Badge />
                </NameSection>
        </ProfileSection>
    );
};

const ProfileSection = styled.div`
    width: 100%;
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
    border: none;
    background-color: ${theme.colors.gray[300]};
`;

const NameSection = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const UserName = styled.p`
    margin-left: 30px;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.semibold};
`;

const Badge = styled.img`
    width: 18px;
    height: 18px;
`;

export default UserDetail;
