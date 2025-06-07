import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import theme from '@app/styles/theme';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  PostBox,
  CommentInputBox,
  CommentListBox,
  PageBottomBox,
  MindReportSection,
} from '../components/index';
import { useSharePostDetailQuery } from '@post/feature/hooks/useSharePostDetailQuery';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { useShareCommentsQuery } from '@post/feature/hooks/useShareCommentsQuery';
import { useCreateShareCommentMutation } from '@post/feature/hooks/useCreateShareCommentMutation';

export const SharePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { myInfo } = useMyInfoStore();
  const userNickname = myInfo?.nickName;
  const { postId } = useParams();
  const { data: post, isLoading, error } = useSharePostDetailQuery(postId);
  const { data: commentData } = useShareCommentsQuery(postId);
  const { mutate: createComment } = useCreateShareCommentMutation(postId);

  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const commentRef = useRef(null);

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    createComment(
      {
        shareId: Number(postId),
        postId: Number(postId),
        pcommentId: null,
        comment: commentInput,
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

  const handleReplyToggle = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleReplyInputChange = (e, commentId) => {
    setReplyInput({ ...replyInput, [commentId]: e.target.value });
  };

  const handleReplySubmit = (commentId) => {
    const input = replyInput[commentId];
    if (!input || !input.trim()) return;

    createComment(
      {
        shareId: Number(postId),
        postId: Number(postId),
        pcommentId: commentId,
        comment: input,
      },
      {
        onSuccess: () => {
          setReplyInput({ ...replyInput, [commentId]: '' });
          setReplyingTo(null);
        },
      },
    );
  };

  const handleGoList = () => {
    if (location.state?.from) {
      navigate(location.state.from, { state: { page: location.state.page } });
    } else {
      navigate('/share/page/1');
    }
  };

  return (
    <PageContainer>
      <TopBarWrapper>
        <TopBar />
        <Line>공유함</Line>
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
          postId={post.id}
          // MindReportSection을 PostBox 내부에 children으로 전달
        >
          <MindReportSection reportData={post.reportData} />
        </PostBox>
      )}

      <CommentInputBox
        value={commentInput}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        inputRef={commentRef}
      />
      <CommentListBox
        commentType="share"
        comments={commentData || []}
        replyInput={replyInput}
        replyingTo={replyingTo}
        onReplyToggle={handleReplyToggle}
        onReplyInputChange={handleReplyInputChange}
        onReplySubmit={handleReplySubmit}
        userNickname={userNickname}
      />
      <PageBottomBox onClick={handleGoList} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 1440px;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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
