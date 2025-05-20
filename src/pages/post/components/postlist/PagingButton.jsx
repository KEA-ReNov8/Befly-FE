import styled from 'styled-components';

export const PagingButton = ({ page, isActive, onClick }) => {
  return (
    <Wrapper
      onClick={() => onClick(page)}
      style={{
        color: isActive ? '#21C5A7' : '#666',
        borderBottom: isActive ? '2px solid #21C5A7' : 'none',
      }}
    >
      {page}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 9px;
  height: 17px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
