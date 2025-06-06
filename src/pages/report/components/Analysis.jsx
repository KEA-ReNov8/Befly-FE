import styled from 'styled-components';
import theme from '@app/styles/theme';

const Analysis = ({ data }) => {
  return (
    <AnalysisContainer>
      <Title>나래의 분석</Title>
      <Content>
        {data ? (
          <p>{data}</p>
        ) : (
          <p>분석 데이터를 불러오는 중입니다...</p>
        )}
      </Content>
    </AnalysisContainer>
  );
};

const AnalysisContainer = styled.div`
  padding: 40px;
  background-color: ${theme.colors.other.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
  transition: scale 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: scale 0.3s ease;
    scale: 1.01;
  }
`;

const Title = styled.h2`
  font-weight: ${theme.fontWeight.semibold};
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.green.main};
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.gray[900]};
  border-radius: 8px;
  //border-left: 4px solid ${theme.colors.green.light};
  padding-left: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

export default Analysis;
