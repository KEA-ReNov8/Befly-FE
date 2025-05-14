import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BannerPlaceHolder, SectionsContainer } from '../index';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <div>공통상단바 들어갈 자리 </div>
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
  height: 1024px;
  margin: 0 auto;
  background-color: grey;
`;
