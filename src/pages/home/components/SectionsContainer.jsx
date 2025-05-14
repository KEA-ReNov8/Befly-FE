import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LatestPosts } from './LatestPosts';
import { freePosts, sharePosts } from '../mock/homeMockData';

export const SectionsContainer = () => {
  const navigate = useNavigate();
  return (
    <SectionsBg>
      <FirstSectionWrapper>
        <LatestPosts
          title="새로운 자유함"
          type="free"
          posts={freePosts}
          bg="#fff"
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
  background: #e6f6f3;
  min-height: 900px;
  padding-bottom: 60px;
`;

const FirstSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom-right-radius: 250px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const SecondSectionWrapper = styled.div`
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
`;
