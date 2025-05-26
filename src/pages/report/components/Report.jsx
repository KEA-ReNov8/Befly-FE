import styled from 'styled-components';
import Analysis from './Analysis';
import ScoreSection from './ScoreSection';
import Advise from './Advise';
import { useNavigate } from 'react-router-dom';
import theme from '@app/styles/theme';

const Report = ({ reportData }) => {

  const { analysisData, scores, adviseItems, title, createdAt } = reportData || {};

  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/share/create-share');
  };

  const handleListClick = () => {
    navigate('/my/myworry');
  };
  
  return (
    <ReportContainer>
      <ReportHeader>
        <ReportTitle>{title}</ReportTitle>
      </ReportHeader>
      <ScoreSection scores={scores} />
      <Analysis data={analysisData} />
      <Advise adviseItems={adviseItems} />
      <ButtonContainer>
        <ListButton onClick={handleListClick}>목록으로 가기</ListButton>
        <ReportButton onClick={handleReportClick}>공유함 글 게시하기</ReportButton>
      </ButtonContainer>
    </ReportContainer>
  );
};

const ReportContainer = styled.div`
  max-width: 1042px;
  margin: 0 auto;
  padding: 5px;
  margin-top: 50px;
  background-color: transparent;

  animation: unfoldReport 1.5s ease forwards;

  @keyframes unfoldReport {
    0% {
      transform: scaleY(0.3) rotateX(-30deg);
      opacity: 0;
    }
    50% {
      transform: scaleY(1.05) rotateX(0deg);
      opacity: 0.7;
    }
    100% {
      transform: scaleY(1) rotateX(0deg);
      opacity: 1;
    }
  }

  transform-origin: top center; /* 위에서 아래로 펼쳐지는 느낌 */
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ReportTitle = styled.h1`
  display: inline-block;
  padding: 20px 50px;
  background-color: transparent;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.green.main};
  margin-bottom: 20px;
  text-align: center;

  word-break: keep-all;
  white-space: normal;
  max-width: 75%;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 50px;
  gap: 15px;
`;

const ReportButton = styled.button`
    width: 148px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    cursor: pointer;
    color: white;
    background-color: ${theme.colors.green.main};
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.regular};
    
    &:hover {
        background-color: ${theme.colors.green.hover};
    }
`;

const ListButton = styled.button`
    width: 134px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: white;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.regular};
    border: 1px solid ${theme.colors.gray[400]};

    &:hover {
        background-color: ${theme.colors.gray[500]};
    }
`;

export default Report;
