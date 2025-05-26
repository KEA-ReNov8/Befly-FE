import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LatestPosts } from './LatestPosts';
import { freePosts, sharePosts } from '../mock/homeMockData';
import theme from '@app/styles/theme';

export const SectionsContainer = () => {
  const navigate = useNavigate();
  return (
    <SectionsBg>
      <FirstSectionWrapper>
        <LatestPosts
          title="새로운 자유함"
          type="free"
          posts={freePosts}
          bg={theme.colors.other.white}
          onMore={() => navigate('/free')}
        />
      </FirstSectionWrapper>
      <SecondSectionWrapper>
        <LatestPosts
          title="새로운 공유함"
          type="shared"
          posts={sharePosts}
          bg="transparent"
          onMore={() => navigate('/share')}
        />
      </SecondSectionWrapper>
    </SectionsBg>
  );
};

const SectionsBg = styled.div`
  width: 100%;
  height: 1156px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme.colors.green.light};
  padding-bottom: 60px;
`;

const FirstSectionWrapper = styled.div`
  width: 100%;
  height: 566px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.other.white};
  border-bottom-right-radius: 250px;
  padding: 20px;
  margin-bottom: 12px;
`;

const SecondSectionWrapper = styled.div`
  width: 100%;
  height: 590px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
`;
