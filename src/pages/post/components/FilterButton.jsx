import styled from 'styled-components';
import theme from '@app/styles/theme';
const FilterButton = ({ selected, onClick, children }) => {
  return (
    <StyledButton className={selected ? 'selected' : ''} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default FilterButton;

const StyledButton = styled.button`
  width: 73px;
  height: 30px;
  border-radius: 50px;
  font-size: 14px;
  background-color: #fff;
  color: #222;
  border: 1.5px solid #ddd;
  cursor: pointer;
  margin-right: 10px;
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;

  &.selected {
    background-color: #d3f3ed;
    color: #222;
    border: 1.5px solid #3cc1a1;
  }
`;
