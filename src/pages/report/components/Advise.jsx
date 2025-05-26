import styled from 'styled-components';
import theme from '@app/styles/theme';

const Advise = ({ adviseItems }) => {
  return (
    <AdviseContainer>
      <Title>나래의 제안</Title>
      {adviseItems && adviseItems.length > 0 ? (
        adviseItems.map((item, index) => (
          <AdviseItem key={index}>
            <AdviseTitle>{item.title}</AdviseTitle>
            <AdviseContent>{item.content}</AdviseContent>
          </AdviseItem>
        ))
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
`;

const Title = styled.h2`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.other.white};
  margin-bottom: 20px;
`;

const AdviseItem = styled.div`
  margin-bottom: 15px;
  padding: 16px;
  //background-color: ${theme.colors.other.white};
  //border-left: 4px solid ${theme.colors.green.main};
  border-radius: 8px;
`;

const AdviseTitle = styled.h3`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.lgMd};
  color: ${theme.colors.other.white};
  margin-bottom: 8px;
`;

const AdviseContent = styled.p`
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.other.white};
  line-height: 1.8;
`;

export default Advise;
