import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import { AnalysisCardsPage } from './AnalysisCardsPage';
import { AIAnalysisPage } from './AIAnalysisPage';
import { AIOpinionPage } from './AIOpinionPage';

export const MindReportSection = () => {
  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setPage((prev) => (prev < 2 ? prev + 1 : prev));
  };

  return (
    <SectionWrapper>
      <LeftNavButton onClick={handlePrev} disabled={page === 0}>
        &lt;
      </LeftNavButton>
      <ContentArea>
        <ReportHeader>OOO님의 분석 리포트</ReportHeader>
        {page === 0 && <AnalysisCardsPage />}
        {page === 1 && <AIAnalysisPage />}
        {page === 2 && <AIOpinionPage />}
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
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #fff;
  font-size: 20px;
  font-weight: 500;
  position: relative;
  padding: 48px 0 0 0;
`;

const ReportHeader = styled.div`
  position: absolute;
  top: 35px;
  left: 45px;
  font-size: 20px;
  color: ${theme.colors.green.main};
  font-weight: 600;
  letter-spacing: -0px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: none;
  border: none;
  font-size: 40px;
  color: ${theme.colors.green.main};
  cursor: pointer;
  transition: color 0.2s;
  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;

const LeftNavButton = styled(NavButton)`
  left: -32px;
`;

const RightNavButton = styled(NavButton)`
  right: -32px;
`;
