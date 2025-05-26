import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, SectionTitleBar } from '@/pages/post/components/index';
import { FreedummyPosts } from '@post/data/DummyPosts';
import theme from '@app/styles/theme';

export const FreePostListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = FreedummyPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(FreedummyPosts.length / postsPerPage);

  useEffect(() => {
    // URL state에서 페이지 번호를 읽어와서 설정
    if (location.state?.page) {
      setCurrentPage(location.state.page);
    }
  }, [location.state]);

  // 자유글 작성 버튼 클릭 시 FreePostPage로 이동
  const handleWriteClick = () => {
    navigate('/free/create-free');
  };

  return (
    <Container>
      <TopBar />
      <SectionTitleBar title="자유함" />
      <Wrapper>
        <WriteButton onClick={handleWriteClick}>글쓰기</WriteButton>
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
