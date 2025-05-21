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
import { mockFreePostData, dummyComments } from '../data/DummyPosts';

export const SharePage = () => {
  const userId = 123;
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [replyInput, setReplyInput] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const commentRef = useRef(null);

  useEffect(() => {
    const foundPost = mockFreePostData.find((p) => p.id === parseInt(postId));
    if (foundPost) {
      setPost(foundPost);
      setComments(
        dummyComments.map((comment) => ({
          id: comment.id,
          author: comment.writer,
          authorId: Math.floor(Math.random() * 1000),
          content: comment.content,
          date: comment.createdAt,
          replies: [],
        })),
      );
    } else {
      navigate('/share');
    }
  }, [postId, navigate]);

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: '닉네임',
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
    if (commentRef.current) commentRef.current.style.height = '40px';
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
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  author: '닉네임',
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
    setReplyInput({ ...replyInput, [commentId]: '' });
    setReplyingTo(null);
  };
  const handleGoList = () => {
    if (location.state?.from) {
      navigate(location.state.from, { state: { page: location.state.page } });
    } else {
      navigate('/share');
    }
  };
  return (
    <PageContainer>
      <TopBarWrapper>
        <TopBar />
      </TopBarWrapper>
      {post && (
        <PostBox
          title={post.title}
          author={post.nickname}
          date={post.createdAt}
          content={post.content}
          stats={{ like: post.likes, comment: post.comments }}
          onEdit={() => {}}
          // MindReportSection을 PostBox 내부에 children으로 전달
        >
          <MindReportSection />
        </PostBox>
      )}
      <CommentInputBox
        value={commentInput}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        inputRef={commentRef}
      />
      <CommentListBox
        comments={comments}
        replyInput={replyInput}
        replyingTo={replyingTo}
        onReplyToggle={handleReplyToggle}
        onReplyInputChange={handleReplyInputChange}
        onReplySubmit={handleReplySubmit}
        userId={userId}
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
