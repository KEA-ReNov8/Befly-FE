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
  background-color: ${theme.colors.green.light};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: ${theme.font.semibold.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 1.5rem;
  color: black;
  margin-bottom: 30px;
`;

const AdviseItem = styled.div`
  margin-bottom: 15px;
  padding: 16px;
  //background-color: ${theme.colors.other.white};
  //border-left: 4px solid ${theme.colors.green.main};
  border-radius: 8px;
`;

const AdviseTitle = styled.h3`
  font-weight: ${theme.font.regular.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 1.1rem;
  color: black;
  margin-bottom: 8px;
`;

const AdviseContent = styled.p`
  font-weight: ${theme.font.regular.fontWeight};
  font-family: ${theme.fontFamily.pretendard};
  font-size: 0.95rem;
  color: ${theme.colors.gray[700]};
  line-height: 1.8;
`;

export default Advise;
