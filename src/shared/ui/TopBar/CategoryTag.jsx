import styled from 'styled-components';
import theme from '@app/styles/theme';

const CategoryTag = ({ category, onClick, isSelected }) => {
  const categoryColor = theme.colors.category[category];
  return (
    <Wrapper
      onClick={onClick}
      style={{
        backgroundColor: categoryColor,
        border: isSelected ? '2px solid #000' : 'none',
        boxShadow: isSelected ? '0px 0px 2px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {category}
    </Wrapper>
  );
};

export default CategoryTag;

const Wrapper = styled.div`
  width: 62px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 6px 4px;
  font-size: 12px;
`;
