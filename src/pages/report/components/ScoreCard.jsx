import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';

const ScoreCard = ({ title, value, content, maxValue = 100 }) => {
  // 점수를 백분율로 계산
  const percentage = Math.round((value / maxValue) * 100);

  // 긍정적인 감정들 (높을수록 좋음)
  const positiveCategories = ['안정감', '자존감', '대인관계'];
  const isPositiveCategory = positiveCategories.includes(title);

  // 색상 결정 함수
  const getColor = (value) => {
    if (isPositiveCategory) {
      // 긍정적 감정: 높으면 초록, 낮으면 빨강
      return value >= 70
        ? theme.colors.green.main
        : value >= 30
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    } else {
      // 부정적 감정: 낮으면 초록, 높으면 빨강
      return value <= 30
        ? theme.colors.green.main
        : value <= 70
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    }
  };

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
          <ScoreTitle data-color={animatedPercentage} data-positive={isPositiveCategory}>{title}</ScoreTitle>
          <ScoreValue data-color={animatedPercentage} data-positive={isPositiveCategory}>{animatedValue}</ScoreValue>
        </Stat>
        <ProgressBar>
          <Progress data-percentage={animatedPercentage} data-positive={isPositiveCategory} />
        </ProgressBar>
      </CardHeader>
      <ContentContainer>
        <Content>{content}</Content>
      </ContentContainer>
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
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.md};
`;

const ScoreTitle = styled.h3`
  color: ${props => {
    const percentage = props['data-color'];
    const isPositive = props['data-positive'];
    
    if (isPositive) {
      return percentage >= 70
        ? theme.colors.green.main
        : percentage >= 30
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    } else {
      return percentage <= 30
        ? theme.colors.green.main
        : percentage <= 70
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    }
  }};
`;

const ScoreValue = styled.div`  
  color: ${props => {
    const percentage = props['data-color'];
    const isPositive = props['data-positive'];
    
    if (isPositive) {
      return percentage >= 70
        ? theme.colors.green.main
        : percentage >= 30
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    } else {
      return percentage <= 30
        ? theme.colors.green.main
        : percentage <= 70
          ? theme.colors.other.yellow
          : theme.colors.red.main;
    }
  }};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.colors.gray[300]};
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
`;

const Progress = styled.div.attrs(props => {
  const percentage = props['data-percentage'];
  const isPositive = props['data-positive'];
  
  let backgroundColor;
  if (isPositive) {
    // 긍정적 감정: 높으면 초록, 낮으면 빨강
    backgroundColor = percentage >= 70
      ? theme.colors.green.main
      : percentage >= 30
        ? theme.colors.other.yellow
        : theme.colors.red.main;
  } else {
    // 부정적 감정: 낮으면 초록, 높으면 빨강
    backgroundColor = percentage <= 30
      ? theme.colors.green.main
      : percentage <= 70
        ? theme.colors.other.yellow
        : theme.colors.red.main;
  }

  return {
    style: {
      width: `${percentage}%`,
      backgroundColor
    }
  };
})`
  height: 100%;
  transition: width 0.5s ease;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 10px;
  padding: 3px;
  height: 100%;
  line-height: 1.5;
  color: ${theme.colors.other.black};
  font-weight: ${theme.fontWeight.light};
  font-size: ${theme.fontSize.smMd};
`;

export default ScoreCard;
