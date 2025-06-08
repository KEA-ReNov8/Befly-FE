import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, FilterButton, SectionTitleBar } from '../components/index';
import theme from '@app/styles/theme';
import { useSharePostsByPageQuery } from '@/pages/post/feature/hooks/useSharePostsByPageQuery';
import Wait from '@shared/ui/lottieComp/wait';

const categories = ['전체', '불안', '상처', '스트레스', '학업', '외로움', '우울', '관계', '진로'];

export const SharePostListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { page } = useParams();
  const pageNumFromParam = Number(page) || 1; // 사용자가 보는 페이지는 1부터 시작
  const pageNum = pageNumFromParam - 1; // 서버에 보낼 실제 페이지 인덱스 (0부터 시작)

  const navigate = useNavigate();

  const { data, isLoading, error } = useSharePostsByPageQuery(pageNum);
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    navigate(`/share/page/${page}`);
  };

  return (
    <Container>
      <TopBar />
      <SectionTitleBar title="공유함" />
      <Wrapper>
        <CategoryBar>
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </CategoryBar>
        <SearchBar />
      </Wrapper>
      {isLoading && (
        <LoadingContainer>
          <Wait />
        </LoadingContainer>
      )}
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

const LoadingContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
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
  margin: 10px 0 0 0;
`;
const CategoryBar = styled.div`
  width: 785px;
  height: 30px;
  display: flex;
  gap: 8px;
  margin: 20px 0 10px 0;
`;
