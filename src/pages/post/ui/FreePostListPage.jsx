import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, SectionTitleBar } from '@/pages/post/components/index';
import theme from '@app/styles/theme';
import { useFreePostsByPageQuery } from '@/pages/post/feature/hooks/useFreePostsByPageQuery';

export const FreePostListPage = () => {
  const { page } = useParams();
  const pageNumFromParam = Number(page) || 1; // 사용자가 보는 페이지는 1부터 시작
  const pageNum = pageNumFromParam - 1; // 서버에 보낼 실제 페이지 인덱스 (0부터 시작)

  const navigate = useNavigate();

  const { data, isLoading, error } = useFreePostsByPageQuery(pageNum);
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    navigate(`/free/page/${page}`);
  };

  return (
    <Container>
      <TopBar />
      <SectionTitleBar title="자유함" />
      <Wrapper>
        <WriteButton onClick={() => navigate('/free/create-free')}>글쓰기</WriteButton>
        <SearchBar />
      </Wrapper>
      {isLoading && <div>로딩 중...</div>}
      {error && <div>에러 발생!</div>}
      {!isLoading && !error && !posts.length && <div>게시글이 없습니다.</div>}
      {!isLoading && !error && posts.length > 0 && (
        <BoardGrid>
          {posts.map((post) => (
            <PostCard key={post.postId} {...post} currentPage={pageNumFromParam} />
          ))}
        </BoardGrid>
      )}
      <Pagination
        currentPage={pageNumFromParam}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[200]};
`;

const BoardGrid = styled.div`
  width: 1044px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 1044px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
`;

// 자유글 작성 버튼 스타일
const WriteButton = styled.button`
  padding: 0 20px;
  margin-top: 18px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: ${theme.colors.green.main};
  color: ${theme.colors.other.white};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${theme.colors.green.hover};
    transition: background 0.3s ease-in-out;
  }
`;
