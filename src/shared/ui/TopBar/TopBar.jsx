import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import WorryModal from './WorryModal';
import NotificationModal from './NotificationModal';
import logo from '@shared/assets/imgs/befly_logo.svg';
import defaultProfile from '@shared/assets/icons/defaultUser.svg';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWorryModalOpen, setWorryModalOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const toggleWorryModal = () => {
    setWorryModalOpen((prev) => !prev);
  };
  const toggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  const getUserInfo = () => {
    try {
      const myInfoStore = localStorage.getItem('myInfoStore');
      if (myInfoStore) {
        const parsed = JSON.parse(myInfoStore);
        return parsed?.state?.myInfo || null;
      }
      return null;
    } catch (error) {
      console.error('로컬스토리지 파싱 오류:', error);
      return null;
    }
  };
  const userInfo = getUserInfo();
  const isDefaultProfile = !userInfo?.profileImg;

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>
        <img src={logo} alt="Be, Fly" />
      </Logo>
      <Nav>
        <NavButton onClick={() => navigate('/free/page/1', { state: { from: location.pathname } })}>
          자유함
        </NavButton>
        <NavButton
          onClick={() => navigate('/share/page/1', { state: { from: location.pathname } })}
        >
          공유함
        </NavButton>
        <NavButton onClick={() => navigate('/my/myworry')}>고민함</NavButton>
        <NavButton onClick={() => navigate('/my')}>마이페이지</NavButton>
      </Nav>
      <RightSection>
        <NotificationWrapper>
          <NotificationButton onClick={toggleNotificationModal} $isDefault={isDefaultProfile}>
            <img src={userInfo?.profileImg || defaultProfile} alt="defaultProfile" />
          </NotificationButton>
          {isNotificationModalOpen && <NotificationModal />}
        </NotificationWrapper>
        <WorryWrapper>
          <WorryButton onClick={toggleWorryModal}>고민 생성 +</WorryButton>
          {isWorryModalOpen && <WorryModal />}
        </WorryWrapper>
      </RightSection>
    </Container>
  );
};

export default TopBar;

const Container = styled.header`
  width: 100%;
  height: 106px;
  padding: 0 190px;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.other.white};
`;

const Logo = styled.div`
  margin-right: 125px;
  margin-left: 10px;
  cursor: pointer;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 70px;
  margin-right: 120px;
`;

const NavButton = styled.button`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.green.main};
  font-weight: ${theme.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  transition: scale 0.3s ease;

  &:hover {
    color: ${theme.colors.green.hover};
    transition: color 0.3s ease;
    scale: 1.05;
    transition: scale 0.3s ease;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: flex-end;
`;

const WorryWrapper = styled.div`
  position: relative;
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const WorryButton = styled.button`
  width: 98px;
  height: 40px;
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.other.white};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  border: none;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.green.hover};
    transition: background-color 0.3s ease;
  }
`;

const NotificationButton = styled.div`
  width: 41px;
  height: 41px;
  border: 2px solid ${theme.colors.green.main};
  border-radius: 50%;
  background-color: ${theme.colors.gray[100]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease;
  object-fit: cover;

  img {
    width: ${props => props.$isDefault ? '18px' : '41px'};
    height: ${props => props.$isDefault ? '18px' : '41px'};
    border-radius: 50%;
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
`;
