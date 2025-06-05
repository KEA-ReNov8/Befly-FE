// 공유글 관련 api 함수
import { apiInstance } from '@shared/apis/instance';

export const getSolvedPostsByPage = async (page = 0) => {
  try {
    const response = await apiInstance.get(`/community/solved/page/${page}`);
    const result = response.data.result;

    const posts = result.content.map((post) => ({
      type: 'shared',
      title: post.solvedTitle,
      content: post.solvedContent,
      likes: post.likeCount,
      comments: post.commentCount,
      time: post.createdAt,
      nickname: post.nickname,
      categoryName: post.category,
      postId: post.solvedId,
      currentPage: result.number,
      cardImage: post.imageUrls?.[0] ?? null,
    }));

    return {
      posts,
      totalPages: result.totalPages,
      currentPage: result.number,
    };
  } catch (error) {
    throw error;
  }
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
