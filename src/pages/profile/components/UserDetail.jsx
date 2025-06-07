import styled from 'styled-components';
import theme from '@app/styles/theme';
import defaultProfile from '@shared/assets/icons/defaultUser.svg';
import { badgeSystem } from '@my/util/badgeSystem';

const UserDetail = ({userData}) => {
    console.log('UserDetail userData:', userData);
    
    // userData가 없으면 로딩 상태 표시
    if (!userData) {
        return (
            <ProfileSection>
                <div>사용자 정보를 불러오는 중...</div>
            </ProfileSection>
        );
    }
    
    const isDefaultProfile = !userData?.profileImg;
    
    return (
        <ProfileSection>
            <ProfileImage $isDefault={isDefaultProfile}>
                <img src={userData?.profileImg || defaultProfile} alt="profile" />
            </ProfileImage>
            <NameSection>
                <UserName>{userData?.nickName}</UserName>
                <Badge src={badgeSystem(userData?.badge)} alt="badge" />
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
    cursor: pointer;
`;

const ProfileImage = styled.div`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.gray[200]};
    object-fit: cover;

    img {
        width: ${props => props.$isDefault ? '80px' : '170px'};
        height: ${props => props.$isDefault ? '80px' : '170px'};
        border-radius: ${props => props.$isDefault ? '0' : '50%'};
        object-fit: ${props => props.$isDefault ? 'contain' : 'cover'};
    }
`;

const NameSection = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

const UserName = styled.p`
    margin-left: 30px;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
`;

const Badge = styled.img`
    width: 25px;
    height: 25px;
`;

export default UserDetail;
