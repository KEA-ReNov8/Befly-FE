import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
import WorryModal from './WorryModal';
import NotificationModal from './NotificationModal';

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

  return (
    <Container>
      <Logo onClick={() => navigate('/home')}>Be, Fly</Logo>
      <Nav>
        <NavButton onClick={() => navigate('/free', { state: { from: location.pathname } })}>
          자유함
        </NavButton>
        <NavButton onClick={() => navigate('/share', { state: { from: location.pathname } })}>
          공유함
        </NavButton>
        <NavButton onClick={() => navigate('/worry')}>고민함</NavButton>
        <NavButton onClick={() => navigate('/my/myworry')}>마이페이지</NavButton>
      </Nav>
      <RightSection>
        <NotificationWrapper>
          <NotificationButton onClick={toggleNotificationModal} />
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
  width: 1440px;
  height: 106px;
  padding: 0 190px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
const Logo = styled.div`
  margin-right: 120px;
  color: ${theme.colors.green.main};
  font-size: 40px;
  font-family: ${theme.fontFamily.pretendard};
  font-weight: 800;
  cursor: pointer;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 70px;
  margin-right: 120px;
`;

const NavButton = styled.button`
  font-size: 20px;
  color: ${theme.colors.green.main};
  font-family: ${theme.fontFamily.pretendard};
  font-weight: 500;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 60px;
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
  background-color: ${theme.colors.green.main};
  color: #fff;
  font-family: ${theme.fontFamily.pretendard};
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px 20px;
`;

const NotificationButton = styled.div`
  width: 41px;
  height: 41px;
  border: 2px solid ${theme.colors.green.main};
  border-radius: 50%;
  background-color: ${theme.colors.gray[400]};
  cursor: pointer;
`;
