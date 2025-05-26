import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';

const ScoreCard = ({ title, value, content, maxValue = 100 }) => {
  // 점수를 백분율로 계산
  const percentage = Math.round((value / maxValue) * 100);

  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    let valueFrame = 0;
    let percentFrame = 0;

    const valueInterval = setInterval(() => {
      valueFrame += 1;
      if (valueFrame <= value) {
        setAnimatedValue(valueFrame);
      } else {
        clearInterval(valueInterval);
      }
    }, 10); // 숫자 애니메이션 속도 조절

    const percentInterval = setInterval(() => {
      percentFrame += 1;
      if (percentFrame <= percentage) {
        setAnimatedPercentage(percentFrame);
      } else {
        clearInterval(percentInterval);
      }
    }, 20); // 프로그래스바 속도 조절

    return () => {
      clearInterval(valueInterval);
      clearInterval(percentInterval);
    };
  }, [value, percentage]);
  
  return (
    <Card>
      <CardHeader>
        <Stat>
          <ScoreTitle data-color={animatedPercentage}>{title}</ScoreTitle>
          <ScoreValue data-color={animatedPercentage}>{animatedValue}</ScoreValue>
        </Stat>
        <ProgressBar>
          <Progress data-percentage={animatedPercentage} />
        </ProgressBar>
      </CardHeader>
      <Content>{content}</Content>
    </Card>
  );
};

const Card = styled.div`
  padding: 15px;
  height: 100%;
  background-color: ${theme.colors.other.white};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: scale 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: scale 0.3s ease;
    scale: 1.02;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  height: 100%;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.md};
`;

const ScoreTitle = styled.h3`
  color: ${props => props['data-color'] >= 70
    ? theme.colors.green.main        // 초록색
    : props['data-color'] >= 30
      ? theme.colors.other.yellow      // 노란색 
        : theme.colors.red.main    // 빨간색 
  };
`;

const ScoreValue = styled.div`  
  color: ${props => props['data-color'] >= 70
    ? theme.colors.green.main        // 초록색
    : props['data-color'] >= 30
      ? theme.colors.other.yellow      // 노란색 
        : theme.colors.red.main    // 빨간색 
  };
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.colors.gray[300]};
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
`;

const Progress = styled.div.attrs(props => ({
  style: {
    width: `${props['data-percentage']}%`,
    backgroundColor: props['data-percentage'] >= 70
      ? theme.colors.green.main        // 초록색
      : props['data-percentage'] >= 30
        ? theme.colors.other.yellow      // 노란색
          : theme.colors.red.main    // 빨간색 
  }
}))`
  height: 100%;
  transition: width 0.5s ease;
`;

const Content = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  height: 100%;
  color: ${theme.colors.other.black};
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.md};
`;

export default ScoreCard;
