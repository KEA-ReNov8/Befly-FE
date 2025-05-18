import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useState, useEffect } from 'react';

const ProgressBar = ({ onProgressChange }) => {
  const [progress, setProgress] = useState(0);
  //test
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // progress 값이 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  return (
    <Container>
      <ProgressContainer>
        <ProgressIndicator data-progress={progress} />
      </ProgressContainer>
      <CountContainer>
        <Count>{progress}%</Count>
      </CountContainer>
    </Container>
  );
};

const Container = styled.div`
    width: 300px;
    height: 10px;
    background-color: ${theme.colors.gray[200]};
    border-radius: 5px;
`;

const ProgressContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.gray[200]};
    border-radius: 5px;
`;

const ProgressIndicator = styled.div`
    height: 100%;
    background-color: ${theme.colors.green.main};
    border-radius: 5px;
    width: ${(props) => props['data-progress']}%;
    transition: width 0.3s ease-in-out;
`;

const CountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
`;

const Count = styled.p`
    font-family: ${theme.fontFamily.pretendard};
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.black};
`;

export default ProgressBar;
