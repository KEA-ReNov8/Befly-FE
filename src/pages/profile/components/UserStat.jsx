import styled from 'styled-components';
import theme from '@app/styles/theme';

const UserStat = ( {userData, postCount} ) => {
    return (
        <StatSection>
            <StatItem>
                <StatValue>{postCount?.solved || 0}</StatValue>
                <StatLabel>공유함</StatLabel>
            </StatItem>
            <StatItem>
                <StatValue>{postCount?.free || 0}</StatValue>
                <StatLabel>자유함</StatLabel>
            </StatItem>
            <StatItem>
                <StatValue>{userData?.wing || 0}</StatValue>
                <StatLabel>날개</StatLabel>
            </StatItem>
        </StatSection>
    );
};

const StatSection = styled.div`
    margin-top: 60px;
    margin-bottom: 20px;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

const StatValue = styled.p`
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.green.main};
`;

const StatLabel = styled.p`
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.gray[800]};
`;

export default UserStat;
