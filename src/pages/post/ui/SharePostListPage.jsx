import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import PostCard from '@shared/ui/PostCard';
import { SearchBar, Pagination, FilterButton, SectionTitleBar } from '../components/index';
import theme from '@app/styles/theme';
import { useSharePostsByPageQuery } from '@/pages/post/feature/hooks/useSharePostsByPageQuery';
import { useSearchSharePostsQuery } from '@/pages/post/feature/hooks/useSearchSharePostsQuery';

const categories = ['전체', '불안', '상처', '스트레스', '학업', '외로움', '우울', '관계', '진로'];

export const SharePostListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { page } = useParams();
  const pageNumFromParam = Number(page) || 1; // 사용자가 보는 페이지는 1부터 시작
  const pageNum = pageNumFromParam - 1; // 서버에 보낼 실제 페이지 인덱스 (0부터 시작)

  const navigate = useNavigate();

  // 일반 게시글 조회
  const {
    data: normalData,
    isLoading: normalLoading,
    error: normalError,
  } = useSharePostsByPageQuery(pageNum, {
    enabled: !isSearchMode,
  });

  // 검색 결과 조회
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchSharePostsQuery(pageNum, searchKeyword, selectedCategory);

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
    postId: post.solvedId,
    title: post.solvedTitle,
    content: post.solvedContent,
    likes: post.likeCount,
    comments: post.commentCount,
    time: formatTimestamp(post.createdAt),
    nickname: post.nickname,
    categoryName: post.category,
    cardImage: post.imageKeys?.[0] || null,
    type: 'shared',
  });

  const rawPosts = data?.posts || [];
  const posts = isSearchMode ? rawPosts.map(transformSearchPost) : rawPosts;
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    navigate(`/share/page/${page}`);
  };

  const handleSearch = (keyword) => {
    console.log('🔍 공유글 검색 키워드:', keyword);
    setSearchKeyword(keyword);
    setIsSearchMode(!!(keyword?.trim() || selectedCategory !== '전체'));
    // 검색 시 1페이지로 이동
    if (pageNumFromParam !== 1) {
      navigate('/share/page/1');
    }
  };

  const handleCategoryChange = (category) => {
    console.log('🏷️ 카테고리 선택:', category);
    setSelectedCategory(category);
    setIsSearchMode(!!(searchKeyword?.trim() || category !== '전체'));
    // 카테고리 변경 시 1페이지로 이동
    if (pageNumFromParam !== 1) {
      navigate('/share/page/1');
    }
  };

  const handleClearFilter = () => {
    setSearchKeyword('');
    setSelectedCategory('전체');
    setIsSearchMode(false);
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
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </CategoryBar>
        <SearchBar onSearch={handleSearch} />
      </Wrapper>

      {/* 검색/필터 모드일 때 필터 정보 표시 */}
      {isSearchMode && (
        <FilterInfo>
          <FilterText>
            {searchKeyword && `'${searchKeyword}' 검색 결과`}
            {searchKeyword && selectedCategory !== '전체' && ' | '}
            {selectedCategory !== '전체' && `카테고리: ${selectedCategory}`}
          </FilterText>
          <ClearButton onClick={handleClearFilter}>전체 보기</ClearButton>
        </FilterInfo>
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
              key={post.postId || post.solvedId}
              type="shared"
              title={post.title}
              content={post.content}
              likes={post.likes}
              comments={post.comments}
              time={post.time}
              nickname={post.nickname}
              categoryName={post.categoryName}
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

// 필터 정보 표시 영역
const FilterInfo = styled.div`
  width: 1044px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 10px;
`;

const FilterText = styled.span`
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
