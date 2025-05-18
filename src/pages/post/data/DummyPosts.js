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
