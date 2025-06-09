import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import { AnalysisCardsPage } from './AnalysisCardsPage';
import { AIAnalysisPage } from './AIAnalysisPage';
import { AIOpinionPage } from './AIOpinionPage';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';

export const MindReportSection = ({ reportData }) => {
  const { myInfo: userInfo } = useMyInfoStore();

  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setPage((prev) => (prev < 2 ? prev + 1 : prev));
  };

  const { analytics, totalComment, suggest, userNickname } = reportData || {};

  return (
    <SectionWrapper>
      <LeftNavButton onClick={handlePrev} disabled={page === 0}>
        &lt;
      </LeftNavButton>
      <ContentArea>
        <ReportHeader>{userNickname}님의 분석 리포트</ReportHeader>
        <SliderContainer>
          <SliderWrapper style={{ transform: `translateX(-${page * 33.333}%)` }}>
            <SliderPage>
              <AnalysisCardsPage analytics={analytics} />
            </SliderPage>
            <SliderPage>
              <AIAnalysisPage totalComment={totalComment} />
            </SliderPage>
            <SliderPage>
              <AIOpinionPage suggest={suggest} />
            </SliderPage>
          </SliderWrapper>
        </SliderContainer>
      </ContentArea>
      <RightNavButton onClick={handleNext} disabled={page === 2}>
        &gt;
      </RightNavButton>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentArea = styled.div`
  width: 100%;
  min-height: 582px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  background: ${theme.colors.other.white};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  position: relative;
  padding: 48px 0 0 0;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 300%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
`;

const SliderPage = styled.div`
  width: 33.333%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const ReportHeader = styled.div`
  margin-left: 40px;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.green.main};
  font-weight: ${theme.fontWeight.semibold};
  letter-spacing: -0px;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: none;
  border: none;
  font-size: ${theme.fontSize.title};
  color: ${theme.colors.green.main};
  cursor: pointer;
  transition: color 0.2s;
  &:disabled {
    color: ${theme.colors.gray[400]};
    cursor: default;
  }
`;

const LeftNavButton = styled(NavButton)`
  left: -32px;
`;

const RightNavButton = styled(NavButton)`
  right: -32px;
`;
