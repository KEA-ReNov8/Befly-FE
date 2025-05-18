import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import CategoryTag from './CategoryTag';

const WorryModal = () => {
  // 나중에 고민생성하기 버튼 누르면 데이터 넘겨주는 과정 추가하면 될듯
  const [worryTitle, setWorryTitle] = useState(''); // 고민 제목
  const [selectedCategory, setSelectedCategory] = useState(''); // 고민카테고리
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    console.log('선택된 카테고리:', cat);
  };

  return (
    <Container>
      <Title>어떤 고민이 있으신가요?</Title>
      <Input
        placeholder="고민 제목"
        value={worryTitle}
        onChange={(e) => setWorryTitle(e.target.value)}
      />
      <CategoryList>
        {['불안', '상처', '스트레스', '학업', '외로움', '우울', '관계', '진로'].map(
          (category, i) => (
            <CategoryTag
              key={i}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => {
                handleCategoryClick(category);
              }}
            />
          ),
        )}
      </CategoryList>
      <SubmitButton>고민 생성하기</SubmitButton>
    </Container>
  );
};

export default WorryModal;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 45%;
  transform: translateX(50%);

  width: 344px;
  height: 342px;
  padding: 36px 28px 24px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  width: 100%;
  color: ${theme.colors.green.main};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  border: 1.5px solid ${theme.colors.gray[300]};
  border-radius: 10px;
  font-size: 16px;
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`;

const CategoryList = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 10px;
  margin-bottom: 12px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 49px;
  background-color: ${theme.colors.green.main};
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;
