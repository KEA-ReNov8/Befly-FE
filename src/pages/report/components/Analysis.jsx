import styled from 'styled-components';
import theme from '@app/styles/theme';

const Analysis = ({ data }) => {
  return (
    <AnalysisContainer>
      <Title>나래의 분석</Title>
      <Content>
        {data ? (
          <>
            <p>{data.summary}</p>
            <p>{data.details}</p>
          </>
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: ${theme.font.semibold.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 1.5rem;
  color: black;
  margin-bottom: 15px;
`;

const Content = styled.div`
  font-weight: ${theme.font.regular.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 1rem;
  color: ${theme.colors.gray[700]};
  border-radius: 8px;
  //border-left: 4px solid ${theme.colors.green.light};
  padding-left: 16px;
  line-height: 1.8;
`;

export default Analysis;
