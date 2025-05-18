import { useState } from 'react';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import { SectionTitleBar } from '../components/SectionTitleBar';
import { SearchBar } from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { FreedummyPosts } from '../data/DummyPosts';
import PostCard from '@shared/ui/PostCard';
import theme from '@app/styles/theme';
export const FreePostListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = FreedummyPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(FreedummyPosts.length / postsPerPage);

  return (
    <Container>
      <TopBar />
      <SectionTitleBar title="자유함" />
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>
      <BoardGrid>
        {currentPosts.map((post) => (
          <PostCard key={post.postId} {...post} />
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

const SearchBarWrapper = styled.div`
  width: 480px;
  align-self: flex-start;
  margin: 10px 0 10px 200px;
`;
