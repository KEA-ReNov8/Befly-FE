import { useState } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import CategoryTag from './CategoryTag';
import { useNavigate } from 'react-router-dom';
import { useCreateNewChatMutation } from '@chat/feature/hooks/mutate/useCreateNewChatMutation';

const WorryModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [worryTitle, setWorryTitle] = useState(''); // 고민 제목
  const [selectedCategory, setSelectedCategory] = useState(''); // 고민카테고리

  const createNewChatMutation = useCreateNewChatMutation(
    (sessionInfo) => {
      console.log('세션 정보:', sessionInfo);
      onClose(); // 모달 닫기
      navigate(`/chat/${sessionInfo.session_id}`);
    },
    (error) => {
      console.log('세션 생성 실패:', error);
    }
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    console.log('선택된 카테고리:', cat);
  };

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!worryTitle.trim()) {
      alert('고민 제목을 입력해주세요.');
      return;
    }

    if (!selectedCategory) {
      alert('고민 카테고리를 선택해주세요.');
      return;
    }

    const requestData = {
      chat_title: worryTitle.trim(),
      worry_category: selectedCategory,
    };

    createNewChatMutation.mutate(requestData);
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
      <SubmitButton 
      onClick={handleSubmit} 
      disabled={createNewChatMutation.isPending || !worryTitle.trim() || !selectedCategory}>
        고민 생성하기
      </SubmitButton>
    </Container>
  );
};

export default WorryModal;

const Container = styled.div`
  position: absolute;
  top: 55px;
  right: 45%;
  transform: translateX(50%);

  width: 344px;
  height: 342px;
  padding: 36px 28px 24px;
  background-color: ${theme.colors.other.white};
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[400]};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  width: 100%;
  color: ${theme.colors.green.main};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 16px;
  border: 1.5px solid ${theme.colors.gray[300]};
  border-radius: 8px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};

  &:focus {
    outline: none;
    border-color: ${theme.colors.green.main};
  }

  &::placeholder {
    color: ${theme.colors.gray[600]};
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
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.green.main};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.other.white};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.green.hover};
  }

  &:disabled {
    background-color: ${theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;
