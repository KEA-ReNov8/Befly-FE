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
  max-height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ReportTitle = styled.div`
  width: 165px;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.green.main};
  font-weight: ${theme.fontWeight.bold};
  margin-top: 10px;
  margin-bottom: 40px;
`;

const TitleDivider = styled.div`
  width: 165px;
  height: 2px;
  background: ${theme.colors.green.main};
  margin: 20px auto 0 auto;
`;

const ReportContent = styled.div`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  width: 900px;
  padding: 0 40px;
  color: ${theme.colors.other.black};
  line-height: 1.7;
  text-align: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
`;
