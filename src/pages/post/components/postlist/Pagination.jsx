import styled from 'styled-components';
import { PagingButton } from '@post/components/postlist/PagingButton';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // 총 페이지 수가 5 이상일 경우 5개만 노출 (현재 페이지 중심)
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  // 시작이 totalPages에서 너무 멀면 다시 조정
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <Wrapper>
      {pages.map((page) => (
        <PagingButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={onPageChange}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 50px 0 30px 0;
  align-items: center;
  width: 125px;
  height: 18px;
`;
