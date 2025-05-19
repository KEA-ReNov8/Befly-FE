export const FreedummyPosts = Array.from({ length: 100 }, (_, i) => ({
  postId: i + 1,
  type: 'free',
  title: `자유글 제목 ${i + 1}`,
  content: `자유게시판 내용 ${i + 1} 입니다.`,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
  time: `${Math.floor(Math.random() * 24)}시간 전`,
  nickname: `작성자${i + 1}`,
  categoryName: '',
}));
export const SharedummyPosts = Array.from({ length: 100 }, (_, i) => ({
  postId: i + 1,
  type: 'shared',
  title: `공유글 제목 ${i + 1}`,
  content: `공유게시판 내용 ${i + 1} 입니다.`,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
  time: `${Math.floor(Math.random() * 24)}시간 전`,
  nickname: `작성자${i + 1}`,
  categoryName: '학업',
}));

export const mockFreePostData = [
  {
    id: 1,
    title: '이런식으로 해결했어요!',
    content:
      '<p>비밀번호에 나름의 규칙을 세웠답니다. 내용을 정하는 것만으로도 큰 도움이 되었어요.</p><img src="https://via.placeholder.com/200"/><p>이런식으로 이미지도 들어갈 수 있어요.</p>',
    nickname: '홍길동',
    createdAt: '2025-05-18',
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    title: '학교 과제를 효율적으로 끝내는 법',
    content:
      '<p>마감 3일 전에 계획을 세우고, 하루씩 나눠서 끝냈어요. 중요한 건 계획과 집중입니다!</p>',
    nickname: '이영희',
    createdAt: '2025-05-16',
    likes: 8,
    comments: 2,
  },
  {
    id: 3,
    title: '친구와의 갈등을 해결한 경험',
    content:
      '<p>오해가 있었지만 대화를 통해 풀 수 있었어요. 먼저 용기내어 말 거는 게 중요하더라고요.</p>',
    nickname: '박철수',
    createdAt: '2025-05-14',
    likes: 5,
    comments: 1,
  },
  {
    id: 4,
    title: '면접에서 자주 나오는 질문 모음',
    content:
      '<p>자기소개, 지원 동기, 장단점 등은 꼭 준비하세요. 실제 질문과 답변 예시도 첨부할게요.</p>',
    nickname: '김하늘',
    createdAt: '2025-05-10',
    likes: 14,
    comments: 5,
  },
  {
    id: 5,
    title: '하루 루틴을 정리해서 삶의 질 높이기',
    content: '<p>아침 루틴과 저녁 루틴을 정리했더니 하루가 훨씬 체계적이게 흘러가더라고요!</p>',
    nickname: '최지훈',
    createdAt: '2025-05-07',
    likes: 20,
    comments: 6,
  },
];

export const dummyComments = [
  {
    id: 1,
    writer: '홍길동',
    content: '좋아보이네요! 저도 써봐야겠어요!',
    createdAt: '2025.05.18 17:28',
  },
  {
    id: 2,
    writer: '이영희',
    content: '감사합니다. 큰 도움이 됐어요.',
    createdAt: '2025.05.18 17:30',
  },
  {
    id: 3,
    writer: '이영희',
    content: '감사합니다. 큰 도움이 됐어요.',
    createdAt: '2025.05.18 17:30',
  },
  {
    id: 4,
    writer: '이영희',
    content: '감사합니다. 큰 도움이 됐어요.',
    createdAt: '2025.05.18 17:30',
  },
];
