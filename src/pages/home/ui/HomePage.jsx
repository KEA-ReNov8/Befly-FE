import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BannerPlaceHolder, SectionsContainer } from '../index';
import TopBar from './../../../shared/ui/TopBar';

export const HomePage = () => {
  const navigate = useNavigate();
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
  width: 1440px;
  margin: 0 auto;
  background-color: grey;
`;
