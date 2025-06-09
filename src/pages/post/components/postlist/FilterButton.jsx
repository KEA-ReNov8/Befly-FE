import styled from 'styled-components';
import theme from '@app/styles/theme';

export const FilterButton = ({ selected, onClick, children }) => {
  return (
    <StyledButton className={selected ? 'selected' : ''} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 73px;
  height: 30px;
  border-radius: 50px;
  font-size: ${theme.fontSize.smMd};
  background-color: ${theme.colors.other.white};
  color: ${theme.colors.other.black};
  border: 1px solid ${theme.colors.gray[300]};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  margin-right: 10px;
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;

  &:hover {
    background-color: ${theme.colors.gray[300]};
  }

  &.selected {
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.other.white};
    border: 1px solid ${theme.colors.green.light};
    &:hover {
      background-color: ${theme.colors.green.hover};
    }
  }
`;
