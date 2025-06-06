import styled from 'styled-components';
import theme from '@app/styles/theme';
import { useEffect } from 'react';

const ProgressBar = ({ progress = 0, onProgressChange }) => {
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
    width: 450px; //상황에 따라 조절 가능
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
    transition: width 0.5s ease-in-out;
`;

const CountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
`;

const Count = styled.p`
    margin-top: 5px;
    font-size: ${theme.fontSize.lgMd};
    font-weight: ${theme.fontWeight.medium};
    color: ${theme.colors.black};
`;

export default ProgressBar;
