// 공유글 관련 api 함수
import { apiInstance } from '@shared/apis/instance';

export const getSharePosts = async (page = 0) => {
  try {
    console.log('/community/solved/page/ 요청 전송 중');
    const response = await apiInstance.get(`/community/solved/page/${page}`);
    console.log('/communityshare/page/ 요청 응답:', response);
    console.log('응답 데이터: ', response.data);

    return {
      posts: response.data.result.content.map((post) => ({
        ...post,
        cardImage: post.imgUrl && post.imgUrl.length > 0 ? post.imgUrl[0] : null,
      })),
      totalPages: response.data.result.totalPages,
    };
  } catch (error) {
    console.log('/community/solved/page/ 요청 실패:', error);
    console.log('에러 응답:', error.response?.data);
    console.log('에러 상태:', error.response?.status);
    throw error;
  }
};
// Api호출하는 함수 대체.. 나중에 연결하면 지울거임
export const getMockSharePosts = async (page = 0) => {
  const dummyPosts = Array.from({ length: 8 }, (_, i) => ({
    type: 'shared',
    postId: page * 8 + i + 1,
    title: `제목 ${page * 8 + i + 1}`,
    content: `본문 ${page * 8 + i + 1}`,
    likes: Math.floor(Math.random() * 10),
    comments: Math.floor(Math.random() * 5),
    time: `${Math.floor(Math.random() * 10 + 1)}분 전`,
    userId: 1,
    nickname: 'test',
    categoryName: '불안',
    imageUrl: [`https://via.placeholder.com/300x200.png?text=Image+${page * 8 + i + 1}`],
  }));

  return {
    posts: dummyPosts.map((post) => ({
      ...post,
      cardImage: post.imageUrl?.[0] ?? null,
    })),
    totalPages: 5, // 원하는 총 페이지 수
  };
};

export const getLatestSharePosts = async () => {
  try {
    const response = await apiInstance.get('/community/solved/latest');
    const data = response.data.result;

    return data.map((post) => ({
      type: 'shared', // 공유글
      title: post.solvedTitle,
      content: post.solvedContent,
      likes: post.likeCount,
      comments: post.commentCount,
      time: post.createdAt, // createdAt 사용
      nickname: post.nickname,
      categoryName: post.category || post.worry_category || '', // category 우선, 없으면 걱정글 category
      postId: post.solvedId,
      currentPage: 0, // 리스트 페이지가 없다면 기본값
      cardImage: post.imageUrls?.[0] ?? null,
    }));
  } catch (error) {
    throw error;
  }
};
