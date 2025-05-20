import styled from 'styled-components';

export const AnalysisCardsPage = () => {
  return (
    <FullBox>
      <CardGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <AnalysisCard key={i}>분석카드 {i + 1}</AnalysisCard>
        ))}
      </CardGrid>
    </FullBox>
  );
};

const FullBox = styled.div`
  width: 100%;
  height: 100%;
  min-height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #d3f3ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #3cc1a1;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(60, 193, 161, 0.06);
`;
