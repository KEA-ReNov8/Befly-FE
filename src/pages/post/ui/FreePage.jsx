import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import theme from '@app/styles/theme';
import { useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { PostBox, CommentInputBox, CommentListBox, PageBottomBox } from '../components/index';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { useFreePostDetailQuery } from '@post/feature/hooks/useFreePostDetailQuery';
import { useFreeCommentsQuery } from '@post/feature/hooks/useFreeCommentsQuery';
import { useCreateFreeCommentMutation } from '@post/feature/hooks/useCreateFreeCommentMutation';
import {
  useCheckFreeEmpathyQuery,
  useToggleFreeEmpathyMutation,
} from '@post/feature/hooks/useFreeEmpathy';

export const FreePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { myInfo } = useMyInfoStore();
  const userId = myInfo?.clientId;
  const { postId } = useParams();

  const { data: post, isLoading, error } = useFreePostDetailQuery(postId);
  const { data: commentData } = useFreeCommentsQuery(postId);
  const { data: isLiked } = useCheckFreeEmpathyQuery(postId);
  const { mutate: createComment } = useCreateFreeCommentMutation(postId);
  const { mutate: toggleLike } = useToggleFreeEmpathyMutation(postId, isLiked);

  const [commentInput, setCommentInput] = useState(''); // 댓글 입력창의 값 상태
  const [replyInput, setReplyInput] = useState({}); // 답글 입력창의 값 상태 (댓글 id별로 관리)
  const [replyingTo, setReplyingTo] = useState(null); // 현재 답글 입력창이 열려있는 댓글 id (하나만 열림)
  const commentRef = useRef(null); // 댓글 입력창 textarea DOM 참조 (높이 자동 조절용)

  // 댓글 입력창 값 변경 핸들러 (textarea 높이 자동 조절 포함)
  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
    if (commentRef.current) {
      commentRef.current.style.height = 'auto'; // 높이 초기화
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`; // 내용에 맞게 조정
    }
  };

  // 댓글 등록 버튼 클릭 시 실행되는 함수
  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    createComment(
      {
        freeId: Number(postId), // path variable
        postId: Number(postId), // request body 내부 postId
        pcommentId: null, // 최상위 댓글 (부모 없음)
        comment: commentInput, // 실제 댓글 내용
      },
      {
        onSuccess: () => {
          setCommentInput('');
          if (commentRef.current) {
            commentRef.current.style.height = '40px';
          }
        },
      },
    );
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
  const handleReplySubmit = (commentId) => {
    const input = replyInput[commentId];
    if (!input || !input.trim()) return;
    createComment(
      {
        freeId: Number(postId),
        postId: Number(postId),
        pcommentId: commentId,
        comment: input,
      },
      {
        onSuccess: () => {
          // 입력창 초기화 및 답글창 닫기
          setReplyInput({ ...replyInput, [commentId]: '' });
          setReplyingTo(null);
        },
      },
    );
  };

  // '목록으로 돌아가기' 버튼 클릭 시 실행 (진입 경로가 있으면 해당 경로로, 없으면 /free로 이동)
  const handleGoList = () => {
    if (location.state?.from) {
      navigate(location.state.from, { state: { page: location.state.page } });
    } else {
      navigate('/free');
    }
  };

  const handleLikeClick = () => {
    toggleLike();
  };

  return (
    <PageContainer>
      <TopBarWrapper>
        <TopBar />
        <Line>자유함</Line>
      </TopBarWrapper>
      {isLoading && <div>로딩중...</div>}
      {error && <div>에러가 발생했습니다.</div>}
      {!isLoading && !error && !post && <div>게시글이 없습니다.</div>}
      {!isLoading && !error && post && (
        <PostBox
          title={post.title}
          author={post.nickname}
          date={post.createdAt}
          content={post.content}
          stats={{ like: post.likes, comment: post.comments }}
          postId={post.postId}
          isLiked={isLiked}
          onToggleLike={handleLikeClick}
        />
      )}

      {/* 댓글 입력창 */}
      <CommentInputBox
        value={commentInput}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        inputRef={commentRef}
      />
      {/* 댓글/답글 리스트 및 답글 입력창 */}
      <CommentListBox
        comments={commentData || []}
        replyInput={replyInput}
        replyingTo={replyingTo}
        onReplyToggle={handleReplyToggle}
        onReplyInputChange={handleReplyInputChange}
        onReplySubmit={handleReplySubmit}
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
