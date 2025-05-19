import styled from 'styled-components';
import theme from '@app/styles/theme';

const FreePageBottom = ({ onClick }) => (
  <PageBottom>
    <ToListButton onClick={onClick}>목록으로 돌아가기</ToListButton>
  </PageBottom>
);

export default FreePageBottom;

const PageBottom = styled.div`
  height: 52px;
  flex-shrink: 0;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ToListButton = styled.button`
  width: 333px;
  height: 50px;
  background-color: ${theme.colors.green.main};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
`;
