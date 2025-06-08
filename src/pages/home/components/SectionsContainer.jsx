import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LatestPosts } from './LatestPosts';
import theme from '@app/styles/theme';
import { useLatestFreePostsQuery } from '@home/feature/hooks/useLatestFreePostsQuery';
import { useLatestSharePostsQuery } from '@home/feature/hooks/useLatestSharePostsQuery';
import { useState, useEffect, useRef, useCallback } from 'react';
import Wait from '@shared/ui/lottieComp/wait';

export const SectionsContainer = () => {
  const navigate = useNavigate();
  const { data: freeData, isLoading: freeLoading, error: freeError } = useLatestFreePostsQuery();
  const {
    data: shareData,
    isLoading: shareLoading,
    error: shareError,
  } = useLatestSharePostsQuery();

  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const secondSectionRef = useRef(null);

  // 두 번째 섹션이 화면에 나타났는지 확인
  const handleScroll = useCallback(() => {
    if (!secondSectionRef.current || isSecondSectionVisible) return;
    
    const rect = secondSectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 요소의 상단이 화면의 80% 지점에 도달하면 애니메이션 시작
    if (rect.top <= windowHeight * 1) {
      setIsSecondSectionVisible(true);
    }
  }, [isSecondSectionVisible]);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 초기 계산
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <SectionsBg>
      <FirstSectionWrapper>
        {freeLoading && (
          <LoadingContainer>
            <Wait />
          </LoadingContainer>
        )}
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
      <SecondSectionWrapper 
        ref={secondSectionRef} 
        $isVisible={isSecondSectionVisible}
      >
        {shareLoading && (
          <LoadingContainer>
            <Wait />
          </LoadingContainer>
        )}
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

// 첫 번째 섹션용 애니메이션 (접속 시 나타남)
const slideUpFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionsBg = styled.div`
  width: 100%;
  height: 1156px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme.colors.green.light};
  padding-bottom: 60px;
`;

const LoadingContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  
  // 페이지 로드 시 애니메이션 (배너 다음에 실행)
  animation: ${slideUpFade} 0.8s ease-out 0.3s both;
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
  
  // 스크롤 시 한 번만 나타나는 애니메이션
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? 0 : 50}px);
  transition: all 0.8s ease-out;
`;
