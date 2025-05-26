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
  max-height: 550px;
  min-height: 470px;
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
