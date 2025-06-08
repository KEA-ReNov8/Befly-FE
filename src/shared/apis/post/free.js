import { apiInstance } from '@shared/apis/instance';

export const getFreePostDetail = async (freeId) => {
  try {
    const response = await apiInstance.get(`/community/free/${freeId}`);
    const result = response.data.result;

    return {
      userId: result.userId,
      postId: result.freeId,
      title: result.freeTitle,
      content: result.freeContent,
      nickname: result.nickname,
      imageUrls: result.imageUrl ?? [], // null이면 빈 배열로 처리
      likes: result.likes,
      comments: result.comments,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  } catch (error) {
    throw error;
  }
};

export const getFreePostsByPage = async (page = 0) => {
  try {
    const response = await apiInstance.get(`/community/free/page/${page}`);
    const result = response.data.result;

    const posts = result.content.map((post) => ({
      type: 'free',
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      time: post.time,
      nickname: post.nickname,
      categoryName: '', // 자유함은 없음
      postId: post.postId,
      currentPage: result.number, // 현재 페이지 번호 포함
      cardImage: post.imageUrl?.[0] ?? null,
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

export const getLatestFreePosts = async () => {
  try {
    const response = await apiInstance.get('/community/free/latest');
    const data = response.data.result;
    return data.map((post) => ({
      type: 'free',
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      time: post.time,
      nickname: post.nickname,
      categoryName: '', // 자유글엔 없음
      postId: post.postId,
      currentPage: 0, // 리스트 페이지 개념이 없으므로 0으로 설정
      cardImage: post.imageUrl?.[0] || null,
    }));
  } catch (error) {
    throw error;
  }
};

export const createFreePost = async ({ title, content, imageKeys }) => {
  const response = await apiInstance.post('/community/free', {
    freeTitle: title,
    freeContent: content,
    imageKeys: imageKeys,
  });

  return response.data.result;
};

export const updateFreePost = async (freeId, { title, content, imageKeys }) => {
  const response = await apiInstance.patch(`/community/free/${freeId}`, {
    freeTitle: title,
    freeContent: content,
    imageKeys: imageKeys,
  });
  return response.data.result;
};

export const deleteFreePost = async (freeId) => {
  const response = await apiInstance.delete(`/community/free/${freeId}`);
  return response.data.result;
};
