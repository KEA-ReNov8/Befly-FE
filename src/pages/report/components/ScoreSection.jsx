import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import theme from '@app/styles/theme';

const ScoreSection = ({ scores }) => {
  return (
    <ScoreSectionContainer>
      <Title>점수 분석</Title>
      <ScoresGrid>
        {scores && scores.length > 0 ? (
          scores.map((score, index) => (
            <ScoreCard 
              key={index}
              title={score.title}
              value={score.value}
              maxValue={score.maxValue || 100}
              content={score.content}
            />
          ))
        ) : (
          <p>점수 데이터를 불러오는 중입니다...</p>
        )}
      </ScoresGrid>
      <LegendContainer>
        <LegendItem color="#dc3545">0~29점</LegendItem>
        <LegendItem color="#fd7e14">30~59점</LegendItem>
        <LegendItem color="#ffc107">60~79점</LegendItem>
        <LegendItem color="#28a745">80~100점</LegendItem>
      </LegendContainer>
    </ScoreSectionContainer>
  );
};

const ScoreSectionContainer = styled.div`
  padding: 40px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: ${theme.font.semibold.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 1.5rem;
  color: black;
  margin-bottom: 20px;
`;

const ScoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.small};
  font-family: ${theme.fontFamily.pretendard};

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: ${props => props.color};
    border-radius: 3px;
  }
`;

export default ScoreSection;
