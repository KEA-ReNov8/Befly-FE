import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import theme from '@app/styles/theme';

const ScoreSection = ({ scores }) => {
  return (
    <ScoreSectionContainer>
      <LegendContainer>
        <LegendItem color={theme.colors.green.main}>양호</LegendItem>
        <LegendItem color={theme.colors.other.yellow}>경계</LegendItem>
        <LegendItem color={theme.colors.red.main}>주의</LegendItem>
      </LegendContainer>
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
    </ScoreSectionContainer>
  );
};

const ScoreSectionContainer = styled.div`
  margin-bottom: 40px;
`;

const ScoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const LegendContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: ${(props) => props.color};
    border-radius: 3px;
  }
`;

export default ScoreSection;
