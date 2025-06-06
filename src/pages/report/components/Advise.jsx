import styled from 'styled-components';
import theme from '@app/styles/theme';

const Advise = ({ adviseItems }) => {
  return (
    <AdviseContainer>
      <Title>나래의 제안</Title>
      {adviseItems ? (
        <AdviseContent>{adviseItems}</AdviseContent>
      ) : (
        <p>조언 데이터를 불러오는 중입니다...</p>
      )}
    </AdviseContainer>
  );
};

const AdviseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: ${theme.colors.green[800]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition: scale 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: scale 0.3s ease;
    scale: 1.01;
  }
`;

const Title = styled.h2`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.other.white};
  margin-bottom: 20px;
`;

const AdviseContent = styled.p`
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.other.white};
  line-height: 1.8;
  white-space: pre-wrap;
`;

export default Advise;
