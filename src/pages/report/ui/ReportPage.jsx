import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import Report from '@report/components/Report';
import { useGetReportQuery } from '@report/feature/hook/useGetReportQuery';
import { useParams } from 'react-router-dom';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';

export const ReportPage = () => {
  const { myInfo: userInfo } = useMyInfoStore();

  const { sessionId } = useParams();

  const { data: reportReponse, isLoading, error } = useGetReportQuery(sessionId);

  const transformReportData = (apiData) => {
    if (!apiData?.data?.result) return null;

    const resultData = apiData.data.result;
    console.log(resultData);

    const cleanSuggestComment =
      resultData.suggest_comment?.replace(/\*\*/g, '') || '추가 제안이 없습니다.';
    const cleanTotalComment =
      resultData.total_comment?.replace(/\*\*/g, '') || '분석 내용이 없습니다.';

    return {
      title: resultData.chat_title || '제목 없음',
      analysisData: cleanTotalComment,
      scores:
        resultData.after_keyword?.map((item) => ({
          title: item.emotion,
          value: item.score,
          content: item.comment?.replace(/\*\*/g, '') || '코멘트가 없습니다.',
        })) || [],
      adviseItems: cleanSuggestComment,
      category: resultData.category,
    };
  };

  const reportData = transformReportData(reportReponse);

  return (
    <Wrapper>
      <TopBar />
      <Line>{userInfo?.nickName || '사용자'}님의 분석리포트</Line>
      <Report reportData={reportData} sessionId={sessionId} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1440px;
  margin: 0 auto;
  background-color: ${theme.colors.other.white};
  padding-bottom: 110px;
`;

const Line = styled.div`
  width: 100%;
  height: 66px;
  background-color: ${theme.colors.green.main};
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  padding-left: 220px;
  color: ${theme.colors.other.white};
`;
