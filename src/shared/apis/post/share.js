// 공유글 관련 api 함수
import { apiInstance } from '@shared/apis/instance';
import { formatTimeAgo } from '@shared/utils/date';

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
      time: formatTimeAgo(post.createdAt),
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
      time: formatTimeAgo(post.createdAt),
      nickname: post.nickname,
      categoryName: post.category || '', // API 명세에 맞춰 수정
      postId: post.solvedId,
      currentPage: 0, // 메인페이지용이므로 0
      cardImage: post.imageUrls?.[0] ?? null,
    }));
  } catch (error) {
    console.error('최신 공유글 조회 실패:', error);
    throw error;
  }
};
