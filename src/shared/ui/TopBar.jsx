import styled from 'styled-components';
import theme from '@app/styles/theme';

const TopBar = () => {
  return (
    <Container>
      <Logo>Be, Fly</Logo>
      <Nav>
        <NavButton>자유함</NavButton>
        <NavButton>공유함</NavButton>
        <NavButton>고민함</NavButton>
        <NavButton>마이페이지</NavButton>
      </Nav>
      <RightSection>
        <WorryButton>고민 생성 +</WorryButton>
        <NotificationButton />
      </RightSection>
    </Container>
  );
};

export default TopBar;

const Container = styled.header`
  width: 100%;
  height: 171px;
  padding: 40px 220px 0 220px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 70px;
`;
const Logo = styled.div`
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
  gap: 80px;
  align-items: center;
  justify-content: flex-end;
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
