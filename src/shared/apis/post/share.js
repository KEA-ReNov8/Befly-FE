// 공유글 관련 api 함수
import { apiInstance } from '@shared/apis/instance';
import { formatTimeAgo } from '@shared/utils/date';

export const getSharePostDetail = async (shareId) => {
  try {
    const response = await apiInstance.get(`/community/solved/${shareId}`);
    const result = response.data.result;

    return {
      userId: result.userId,
      postId: result.solvedId,
      nickname: result.nickname,
      title: result.solvedTitle,
      content: result.solvedContent,
      imageUrls: result.imageUrls,
      likes: result.likeCount,
      comments: result.commentCount,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      category: result.category,
      reportData: {
        analytics: result.analytics,
        totalComment: result.totalComment,
        suggest: result.suggest,
        userNickname: result.nickname,
      },
    };
  } catch (error) {
    throw error;
  }
};

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
      cardImage: post.imageUrls ?? null,
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
      cardImage: post.imageUrls ?? null,
    }));
  } catch (error) {
    console.error('최신 공유글 조회 실패:', error);
    throw error;
  }
};

export const createSharePost = async ({
  solvedTitle,
  solvedContent,
  imageKeys,
  sessionId,
  category,
}) => {
  try {
    const response = await apiInstance.post('/community/solved', {
      solvedTitle,
      solvedContent,
      imageKeys,
      sessionId,
      category,
    });

    return response.data.result;
  } catch (error) {
    console.error('공유글 생성 실패:', error);
    throw error;
  }
};

export const updateSharePost = async (solvedId, { title, content, imageKeys }) => {
  try {
    const response = await apiInstance.patch(`/community/solved/${solvedId}`, {
      solvedTitle: title,
      solvedContent: content,
      imageKeys: imageKeys,
    });
    return response.data.result;
  } catch (error) {
    console.error('공유글 수정 실패:', error);
    throw error;
  }
};

export const deleteSharePost = async (solvedId) => {
  try {
    const response = await apiInstance.delete(`/community/solved/${solvedId}`);
    return response.data.result;
  } catch (error) {
    console.error('공유글 삭제 실패:', error);
    throw error;
  }
};
