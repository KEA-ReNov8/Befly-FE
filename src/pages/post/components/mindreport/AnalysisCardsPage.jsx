import styled from 'styled-components';
import theme from '@app/styles/theme';
import ScoreSection from '@report/components/ScoreSection';

export const AnalysisCardsPage = ({ analytics }) => {
  // API 응답의 analytics 배열을 ScoreSection에서 필요한 형태로 변환
  const transformedScores = analytics
    ? analytics.map((item) => ({
        title: item.emotion, // "인지 행동 치료(CBT) 원리" 등
        value: item.score, // 30.0 등
        maxValue: 100, // 기본 최대값 100
        content: item.comment, // 상세 설명 텍스트
      }))
    : [];

  return (
    <FullBox>
      <ReportTitle>
        나래의 점수
        <TitleDivider />
      </ReportTitle>
      <ScoreSection scores={transformedScores} />
    </FullBox>
  );
};

const FullBox = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const ReportTitle = styled.div`
  width: 165px;
  height: 45px;
  display: flex;
  margin-left: 350px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.green.main};
  font-weight: ${theme.fontWeight.bold};
  margin-top: 10px;
  margin-bottom: 40px;
`;

const TitleDivider = styled.div`
  width: 165px;
  height: 2px;
  background: ${theme.colors.green.main};
  margin: 20px auto 0 auto;
`;
/*
<CardGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <AnalysisCard key={i}>분석카드 {i + 1}</AnalysisCard>
        ))}
      </CardGrid>
      
const CardGrid = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
`;

const AnalysisCard = styled.div`
  height: 160px;
  background: ${theme.colors.other.white};
  border-radius: 12px;
  border: 1px solid ${theme.colors.green.main};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.lgMd};
  color: ${theme.colors.green.main};
  font-weight: ${theme.fontWeight.semibold};
  box-shadow: 0 2px 8px rgba(60, 193, 161, 0.06);
`;*/
