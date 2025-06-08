import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, SectionTitleBar } from '@/pages/post/components/index';
import theme from '@app/styles/theme';
import { useFreePostsByPageQuery } from '@/pages/post/feature/hooks/useFreePostsByPageQuery';
import { useSearchFreePostsQuery } from '@/pages/post/feature/hooks/useSearchFreePostsQuery';

export const FreePostListPage = () => {
  const { page } = useParams();
  const pageNumFromParam = Number(page) || 1; // 사용자가 보는 페이지는 1부터 시작
  const pageNum = pageNumFromParam - 1; // 서버에 보낼 실제 페이지 인덱스 (0부터 시작)

  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const navigate = useNavigate();

  // 일반 게시글 조회
  const {
    data: normalData,
    isLoading: normalLoading,
    error: normalError,
  } = useFreePostsByPageQuery(pageNum, {
    enabled: !isSearchMode,
  });

  // 검색 결과 조회
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchFreePostsQuery(pageNum, searchKeyword);

  // 현재 모드에 따른 데이터 선택
  const data = isSearchMode ? searchData : normalData;
  const isLoading = isSearchMode ? searchLoading : normalLoading;
  const error = isSearchMode ? searchError : normalError;

  // 타임스탬프를 날짜 형태로 변환하는 함수
  const formatTimestamp = (timestamp) => {
    try {
      // 타임스탬프가 마이크로초 단위인 경우 밀리초로 변환
      const ms = timestamp.length > 13 ? Math.floor(timestamp / 1000) : timestamp;
      const date = new Date(parseInt(ms));
      return date.toLocaleDateString('ko-KR');
    } catch (error) {
      return timestamp; // 변환 실패 시 원본 반환
    }
  };

  // 검색 결과 데이터를 PostCard가 이해할 수 있는 형태로 변환
  const transformSearchPost = (post) => ({
    postId: post.freeId,
    title: post.freeTitle,
    content: post.freeContent,
    likes: post.likeCount,
    comments: post.commentCount,
    time: formatTimestamp(post.createdAt),
    nickname: post.nickname,
    cardImage: post.imageKeys?.[0] || null,
    type: 'free',
  });

  const rawPosts = data?.posts || [];
  const posts = isSearchMode ? rawPosts.map(transformSearchPost) : rawPosts;
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    navigate(`/free/page/${page}`);
  };

  const handleSearch = (keyword) => {
    console.log('🔍 검색 키워드:', keyword);
    setSearchKeyword(keyword);
    setIsSearchMode(!!keyword && keyword.trim().length > 0);
    // 검색 시 1페이지로 이동
    if (pageNumFromParam !== 1) {
      navigate('/free/page/1');
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setIsSearchMode(false);
  };

  return (
    <Container>
      <TopBar />
      <SectionTitleBar title="자유함" />
      <Wrapper>
        <SearchBar onSearch={handleSearch} />
        <WriteButton onClick={() => navigate('/free/create-free')}>글쓰기</WriteButton>
      </Wrapper>

      {/* 검색 모드일 때 검색 정보 표시 */}
      {isSearchMode && (
        <SearchInfo>
          <span>'{searchKeyword}' 검색 결과</span>
          <ClearButton onClick={handleClearSearch}>전체 보기</ClearButton>
        </SearchInfo>
      )}

      {isLoading && <div>로딩 중...</div>}
      {error && <div>에러 발생!</div>}
      {!isLoading && !error && !posts.length && (
        <div>{isSearchMode ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}</div>
      )}
      {!isLoading && !error && posts.length > 0 && (
        <BoardGrid>
          {posts.map((post) => (
            <PostCard
              key={post.postId || post.freeId}
              type="free"
              title={post.title}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              time={post.time}
              nickname={post.nickname}
              postId={post.postId}
              currentPage={pageNumFromParam}
              cardImage={post.cardImage}
            />
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
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
`;

// 검색 정보 표시 영역
const SearchInfo = styled.div`
  width: 1044px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 10px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.gray[700]};
`;

const ClearButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  background: ${theme.colors.other.white};
  color: ${theme.colors.gray[700]};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

// 자유글 작성 버튼 스타일
const WriteButton = styled.button`
  padding: 0 20px;
  margin-top: 18px;
  margin-right: 10px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[400]};
  background: ${theme.colors.other.white};
  color: ${theme.colors.other.black};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${theme.colors.gray[300]};
    transition: background 0.3s ease-in-out;
    border: 1px solid ${theme.colors.gray[400]};
  }
`;
