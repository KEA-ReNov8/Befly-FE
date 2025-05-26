import styled from 'styled-components';
import { BannerPlaceHolder, SectionsContainer } from '../index';
import TopBar from '@/shared/ui/TopBar/TopBar';
import theme from '@/app/styles/theme';

export const HomePage = () => {

  return (
    <HomeContainer>
      <TopBar />
      <BannerPlaceHolder />
      <SectionsContainer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: ${theme.colors.other.white};

  ::-webkit-scrollbar {
    display: none;
  } //스크롤바 여부
`;
