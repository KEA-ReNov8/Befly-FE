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
      <NavButton onClick={handlePrev} disabled={page === 0}>
        &lt;
      </NavButton>
      <ContentArea>
        <ReportHeader>OOO님의 분석 리포트</ReportHeader>
        {page === 0 && <AnalysisCardsPage />}
        {page === 1 && <AIAnalysisPage />}
        {page === 2 && <AIOpinionPage />}
      </ContentArea>
      <NavButton onClick={handleNext} disabled={page === 2}>
        &gt;
      </NavButton>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
`;

const ContentArea = styled.div`
  width: 905px;
  min-height: 582px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #fafafa;
  font-size: 20px;
  font-weight: 500;
  position: relative;
  padding: 48px 0 0 0;
`;

const ReportHeader = styled.div`
  position: absolute;
  top: 32px;
  left: 48px;
  font-size: 18px;
  color: #3cc1a1;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  color: ${theme.colors.green.main};
  cursor: pointer;
  padding: 0 24px;
  transition: color 0.2s;
  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;
