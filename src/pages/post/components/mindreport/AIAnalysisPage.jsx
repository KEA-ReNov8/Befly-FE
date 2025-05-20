import styled from 'styled-components';
import theme from '@app/styles/theme';
export const AIAnalysisPage = () => {
  return (
    <FullBox>
      <ReportTitle>
        나래의 분석
        <TitleDivider />
      </ReportTitle>
      <ReportContent>
        AI가 분석한 결과, 최근 감정의 변화가 뚜렷하게 나타나고 있습니다.
        <br />
        불안과 스트레스 지수가 높으며, 긍정적인 감정은 다소 낮은 편입니다.
        <br />
        일상에서의 작은 성공 경험을 쌓는 것이 도움이 될 수 있습니다.
      </ReportContent>
    </FullBox>
  );
};

const FullBox = styled.div`
  width: 100%;
  min-height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportTitle = styled.div`
  width: 165px;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #3cc1a1;
  font-weight: 700;
  margin-top: 70px;
  margin-bottom: 40px;
`;

const TitleDivider = styled.div`
  width: 165px;
  height: 2px;
  background: ${theme.colors.green.main};
  margin: 16px auto 0 auto;
`;

const ReportContent = styled.div`
  font-size: 14px;
  width: 750px;
  padding: 0 40px;
  color: #222;
  line-height: 1.7;
  text-align: flex-start;
`;
