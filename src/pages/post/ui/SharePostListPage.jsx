import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, FilterButton, SectionTitleBar } from '../components/index';
import { SharedummyPosts } from '../data/DummyPosts';
import theme from '@app/styles/theme';

const categories = ['전체', '불안', '상처', '스트레스', '학업', '외로움', '우울', '관계', '진로'];

export const SharePostListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = SharedummyPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(SharedummyPosts.length / postsPerPage);

  useEffect(() => {
    // URL state에서 페이지 번호를 읽어와서 설정
    if (location.state?.page) {
      setCurrentPage(location.state.page);
    }
  }, [location.state]);
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
        {currentPosts.map((post) => (
          <PostCard key={post.postId} {...post} currentPage={currentPage} />
        ))}
      </BoardGrid>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
