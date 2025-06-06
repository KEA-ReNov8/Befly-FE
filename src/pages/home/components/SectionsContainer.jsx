import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LatestPosts } from './LatestPosts';
import theme from '@app/styles/theme';
import { useLatestFreePostsQuery } from '@home/feature/hooks/useLatestFreePostsQuery';
import { useLatestSharePostsQuery } from '@home/feature/hooks/useLatestSharePostsQuery';

export const SectionsContainer = () => {
  const navigate = useNavigate();
  const { data: freeData, isLoading: freeLoading, error: freeError } = useLatestFreePostsQuery();
  const {
    data: shareData,
    isLoading: shareLoading,
    error: shareError,
  } = useLatestSharePostsQuery();
  return (
    <SectionsBg>
      <FirstSectionWrapper>
        {freeLoading && <div>로딩 중...</div>}
        {freeError && <div>에러가 발생했습니다.</div>}
        {!freeLoading && !freeError && (
          <LatestPosts
            title="새로운 자유함"
            type="free"
            posts={freeData}
            bg={theme.colors.other.white}
            onMore={() => navigate('/free/page/1')}
          />
        )}
      </FirstSectionWrapper>
      <SecondSectionWrapper>
        {shareLoading && <div>로딩 중...</div>}
        {shareError && <div>에러가 발생했습니다.</div>}
        {!shareLoading && !shareError && (
          <LatestPosts
            title="새로운 공유함"
            type="shared"
            posts={shareData}
            bg="transparent"
            onMore={() => navigate('/share/page/1')}
          />
        )}
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
