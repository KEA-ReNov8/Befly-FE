import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, FilterButton, SectionTitleBar } from '../components/index';
import theme from '@app/styles/theme';
import { useSharePostsQuery } from '@post/feature/hooks/useSharePostsQuery';

const categories = ['전체', '불안', '상처', '스트레스', '학업', '외로움', '우울', '관계', '진로'];

export const SharePostListPage = () => {
  const { page } = useParams();
  const pageNum = Number(page) || 0;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const { data, isLoading, error } = useSharePostsQuery(pageNum);
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    navigate(`/share/page/${page - 1}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!posts.length) return <div>게시글이 없습니다.</div>;

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
      <BoardGrid>
        {posts.map((post) => (
          <PostCard key={post.postId} {...post} currentPage={pageNum} />
        ))}
      </BoardGrid>
      <Pagination
        currentPage={pageNum + 1}
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
  margin-botton: 20px;
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
