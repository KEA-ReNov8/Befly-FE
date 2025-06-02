import styled from 'styled-components';
import theme from '@app/styles/theme';

const CategoryTag = ({ category, onClick, isSelected }) => {
  const categoryColor = theme.colors.category[category];
  return (
    <Wrapper
      onClick={onClick}
      data-isSelected={isSelected}
      data-borderColor={categoryColor}
      data-bgColor={categoryColor}
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
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.other.white};

  background-color: ${(props) =>props['data-bgColor'] ? props['data-bgColor'] : 'transparent'};
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: ${(props) => (props['data-isSelected'] ? 'scale(1.2)' : 'scale(1)')};

  &:hover {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;
