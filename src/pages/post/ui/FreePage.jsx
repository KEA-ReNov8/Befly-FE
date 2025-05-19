import styled from 'styled-components';
import TopBar from '@shared/ui/TopBar/TopBar';
import theme from '@app/styles/theme';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FreePost from './FreePost';
import FreeCommentInput from './FreeCommentInput';
import FreeCommentList from './FreeCommentList';
import FreePageBottom from './FreePageBottom';

export const FreePage = () => {
  // 로그인한 유저의 id (실제 서비스에서는 context나 props로 받아올 수 있음)
  const userId = 123;
  const navigate = useNavigate();
  const location = useLocation();
  // 댓글 입력창의 값 상태
  const [commentInput, setCommentInput] = useState('');
  // 댓글 및 답글(대댓글) 전체 리스트 상태 (초기값은 예시, 실제로는 백엔드에서 받아올 수 있음)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '닉네임',
      authorId: 123,
      content: '좋아요! 저도 써봐야겠어요!',
      date: '2023.05.21 17:28',
      replies: [
        {
          id: 11,
          author: '닉네임',
          authorId: 123,
          content: '좋아요! 저도 써봐야겠어요!',
          date: '2023.05.21 17:28',
        },
      ],
    },
    {
      id: 2,
      author: '닉네임',
      authorId: 456,
      content: '좋아요! 저도 써봐야겠어요!',
      date: '2023.05.21 17:28',
      replies: [],
    },
  ]);
  // 답글 입력창의 값 상태 (댓글 id별로 관리)
  const [replyInput, setReplyInput] = useState({});
  // 현재 답글 입력창이 열려있는 댓글 id (하나만 열림)
  const [replyingTo, setReplyingTo] = useState(null);
  // 댓글 입력창 textarea DOM 참조 (높이 자동 조절용)
  const commentRef = useRef(null);

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
      </TopBarWrapper>
      {/* 게시글 본문 영역 */}
      <FreePost
        title="이런식으로 해결했어요"
        author="닉네임"
        date="생성일"
        content={'내용 쌸라쌸라내용 쌸라쌸라내용 쌸라쌸라내용 쌸라쌸라내용 쌸라쌸라'}
        stats={{ like: 100, comment: comments.length }}
        onEdit={() => {}}
      />
      {/* 댓글 입력창 */}
      <FreeCommentInput
        value={commentInput}
        onChange={handleInputChange}
        onSubmit={handleCommentSubmit}
        inputRef={commentRef}
      />
      {/* 댓글/답글 리스트 및 답글 입력창 */}
      <FreeCommentList
        comments={comments}
        replyInput={replyInput}
        replyingTo={replyingTo}
        onReplyToggle={handleReplyToggle}
        onReplyInputChange={handleReplyInputChange}
        onReplySubmit={handleReplySubmit}
        userId={userId}
      />
      {/* 하단 '목록으로 돌아가기' 버튼 */}
      <FreePageBottom onClick={handleGoList} />
    </PageContainer>
  );
};

// 전체 페이지 컨테이너 스타일
const PageContainer = styled.div`
  width: 1440px;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 상단 TopBar 래퍼 스타일
const TopBarWrapper = styled.div`
  flex-shrink: 0;
`;
