import styled from 'styled-components';
import theme from '@app/styles/theme';
export const AIOpinionPage = () => {
  return (
    <FullBox>
      <ReportTitle>
        나래의 의견
        <TitleDivider />
      </ReportTitle>
      <ReportContent>
        최근 감정 기복이 심하다면, 하루 10분 명상이나 산책을 추천드려요.
        <br />
        주변 사람들과의 대화도 큰 힘이 될 수 있습니다.
        <br />
        힘들 때는 혼자 고민하지 말고, 가까운 사람에게 마음을 털어놓아 보세요. 최근 감정 기복이
        심하다면, 하루 10분 명상이나 산책을 추천드려요.
        <br />
        주변 사람들과의 대화도 큰 힘이 될 수 있습니다.
        <br />
        힘들 때는 혼자 고민하지 말고, 가까운 사람에게 마음을 털어놓아 보세요. 최근 감정 기복이
        심하다면, 하루 10분 명상이나 산책을 추천드려요.
        <br />
        주변 사람들과의 대화도 큰 힘이 될 수 있습니다.
        <br />
        힘들 때는 혼자 고민하지 말고, 가까운 사람에게 마음을 털어놓아 보세요.
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
