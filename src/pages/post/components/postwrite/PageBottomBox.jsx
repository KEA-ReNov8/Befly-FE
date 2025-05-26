import styled from 'styled-components';
import theme from '@app/styles/theme';

export const PageBottomBox = ({ onClick }) => (
  <PageBottom>
    <ToListButton onClick={onClick}>목록으로 돌아가기</ToListButton>
  </PageBottom>
);

const PageBottom = styled.div`
  height: 52px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const ToListButton = styled.button`
  width: 336px;
  height: 58px;
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.other.white};
  border: none;
  border-radius: 8px;
  font-size: ${theme.fontSize.lgMd};
  font-weight: ${theme.fontWeight.medium};

  &:hover {
    background-color: ${theme.colors.green.hover};
  }
`;
