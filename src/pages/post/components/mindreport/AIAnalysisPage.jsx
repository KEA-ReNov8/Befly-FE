import styled from 'styled-components';
import theme from '@app/styles/theme';
export const AIAnalysisPage = ({ totalComment }) => {
  return (
    <FullBox>
      <ReportTitle>
        나래의 분석
        <TitleDivider />
      </ReportTitle>
      <ReportContent>
        {totalComment ? <p>{totalComment}</p> : <p>분석 데이터를 불러오는 중입니다...</p>}
      </ReportContent>
    </FullBox>
  );
};

const FullBox = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
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
  white-space: pre-wrap;
`;
