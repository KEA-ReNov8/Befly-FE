import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import theme from '@app/styles/theme';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { PostBox, CommentInputBox, CommentListBox, PageBottomBox } from '../components/index';
import { mockFreePostData, dummyComments } from '../data/DummyPosts';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { useFreePostDetailQuery } from '@post/feature/hooks/useFreePostDetailQuery';

export const FreePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인한 유저의 id를 Zustand store에서 가져옴
  const { myInfo } = useMyInfoStore();
  const userId = myInfo?.clientId;

  const { postId } = useParams();
  const { data: post, isLoading, error } = useFreePostDetailQuery(postId);

  // 댓글 입력창의 값 상태
  const [commentInput, setCommentInput] = useState('');
  // 댓글 및 답글(대댓글) 전체 리스트 상태
  const [comments, setComments] = useState([]);
  // 답글 입력창의 값 상태 (댓글 id별로 관리)
  const [replyInput, setReplyInput] = useState({});
  // 현재 답글 입력창이 열려있는 댓글 id (하나만 열림)
  const [replyingTo, setReplyingTo] = useState(null);
  // 댓글 입력창 textarea DOM 참조 (높이 자동 조절용)
  const commentRef = useRef(null);

  // 로딩/에러/데이터 없음 처리
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post || !post.result) return <div>게시글이 없습니다.</div>;

  // post.result에서 실제 데이터 추출
  const postData = post.result;

  // 댓글 입력창 값 변경 핸들러 (textarea 높이 자동 조절 포함)
  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
    if (commentRef.current) {
      commentRef.current.style.height = 'auto'; // 높이 초기화
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`; // 내용에 맞게 조정
    }
  };

  // 댓글 등록 버튼 클릭 시 실행되는 함수
  // 새 댓글을 comments 배열에 추가하고 입력창을 초기화함
  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return; // 빈 값 방지
    setComments([
      ...comments,
      {
        id: Date.now(), // 임시 id (실제 서비스에서는 백엔드에서 받아오는 id 사용)
        author: '닉네임', // 실제 닉네임으로 교체 필요
        authorId: userId,
        content: commentInput,
        date: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        replies: [],
      },
    ]);
    setCommentInput('');
    if (commentRef.current) commentRef.current.style.height = '40px'; // 댓글 입력 창 높이 초기화
  };

  // 답글 입력창 토글 함수 (같은 댓글을 다시 누르면 닫힘)
  const handleReplyToggle = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  // 답글 입력창 값 변경 핸들러 (댓글 id별로 값 관리)
  const handleReplyInputChange = (e, commentId) => {
    setReplyInput({ ...replyInput, [commentId]: e.target.value });
  };

  // 답글 등록 버튼 클릭 시 실행되는 함수
  // 해당 댓글의 replies 배열에 새 답글을 추가함
  const handleReplySubmit = (commentId) => {
    const input = replyInput[commentId];
    if (!input || !input.trim()) return; // 빈 값 방지
    setComments(
      // 댓글 목록 중 해당 댓글의 id와 일치하는 댓글을 찾아서 답글을 추가
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(), // 임시 id
                  author: '닉네임', // 실제 닉네임으로 교체 필요
                  authorId: userId,
                  content: input,
                  date: new Date().toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                },
              ],
            }
          : comment,
      ),
    );
    setReplyInput({ ...replyInput, [commentId]: '' }); // 답글 입력창 초기화
    setReplyingTo(null); // 답글 입력창 닫기
  };

  // '목록으로 돌아가기' 버튼 클릭 시 실행 (진입 경로가 있으면 해당 경로로, 없으면 /free로 이동)
  const handleGoList = () => {
    if (location.state?.from) {
      navigate(location.state.from, { state: { page: location.state.page } });
    } else {
      navigate('/free');
    }
  };

  return (
    <PageContainer>
      {/* 상단 네비게이션 바 */}
      <TopBarWrapper>
        <TopBar />
        <Line>자유함</Line>
      </TopBarWrapper>
      {/* 게시글 상세 데이터 렌더링 */}
      <PostBox
        title={postData.freeTitle}
        author={postData.userId} // 필요시 닉네임으로 변환
        date={postData.createdAt || '-'}
        content={postData.freeContent}
        imageUrl={postData.imageUrl}
        postId={postData.freeId}
      />
      {/* 댓글 입력창 */}
      <CommentInputBox
        value={commentInput}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        inputRef={commentRef}
      />
      {/* 댓글/답글 리스트 및 답글 입력창 */}
      <CommentListBox
        comments={comments}
        replyInput={replyInput}
        replyingTo={replyingTo}
        onReplyToggle={setReplyingTo}
        onReplyInputChange={setReplyInput}
        onReplySubmit={() => {}}
        userId={userId}
      />
      {/* 하단 '목록으로 돌아가기' 버튼 */}
      <PageBottomBox onClick={handleGoList} />
    </PageContainer>
  );
};

// 전체 페이지 컨테이너 스타일
const PageContainer = styled.div`
  width: 1440px;
  min-height: 100vh;
  background-color: ${theme.colors.other.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 상단 TopBar 래퍼 스타일
const TopBarWrapper = styled.div`
  flex-shrink: 0;
`;

const Line = styled.div`
  width: 100%;
  height: 66px;
  background-color: ${theme.colors.green.main};
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  padding-left: 220px;
  color: ${theme.colors.other.white};
`;
