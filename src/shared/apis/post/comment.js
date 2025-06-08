import { apiInstance } from '@shared/apis/instance';

export const getFreeComments = async (freeId) => {
  try {
    const response = await apiInstance.get(`/community/free/${freeId}/comment`);
    const rawComments = response.data.result;

    // 1. parrentCommentId가 null인 댓글은 부모댓글
    const parentComments = rawComments
      .filter((c) => c.parentCommentId === null)
      .map((c) => ({
        id: c.commentId,
        userId: c.userId,
        badge: c.badge,
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
        profileImage: c.profileImage,
        replies: [], // 나중에 추가
      }));
    // 2. parent가 있는 경우 대댓글로 분류
    const replyComments = rawComments
      .filter((c) => c.parentCommentId !== null)
      .map((c) => ({
        id: c.commentId,
        parentId: c.parentCommentId.freeCommentId,
        userId: c.userId,
        badge: c.badge,
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
        profileImage: c.profileImage,
      }));

    // 3. 대댓글을 부모 댓글의 replies에 추가
    parentComments.forEach((parent) => {
      parent.replies = replyComments.filter((reply) => reply.parentId === parent.id);
    });
    // 4. 반환
    return parentComments;
  } catch (error) {
    console.error('자유댓글 패칭 실패', error);
    throw error;
  }
};

export const postFreeComment = async ({ freeId, postId, pcommentId, comment }) => {
  const response = await apiInstance.post(`/community/free/${freeId}/comment`, {
    postId,
    notificationType: 'FREELIKE',
    pcommentId,
    comment,
  });
  return response.data.result;
};

export const deleteFreeComment = async (freeId, commentId) => {
  const response = await apiInstance.delete(`/community/free/${freeId}/comment/${commentId}`);
  return response.data.result;
};

export const updateFreeComment = async (freeId, commentId, { postId, pcommentId, comment }) => {
  const response = await apiInstance.patch(`/community/free/${freeId}/comment/${commentId}`, {
    postId,
    notificationType: 'FREELIKE',
    pcommentId,
    comment,
  });
  return response.data.result;
};

export const getShareComments = async (shareId) => {
  try {
    const response = await apiInstance.get(`/community/solved/${shareId}/comment`);
    const rawComments = response.data.result;

    // 1. parentCommentId가 null인 댓글은 부모댓글
    const parentComments = rawComments
      .filter((c) => c.parentCommentId === null)
      .map((c) => ({
        id: c.commentId,
        userId: c.userId,
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
        profileImage: c.profileImage,
        badge: c.badge,
        replies: [], // 나중에 추가
      }));

    // 2. parent가 있는 경우 대댓글로 분류
    const replyComments = rawComments
      .filter((c) => c.parentCommentId !== null)
      .map((c) => ({
        id: c.commentId,
        parentId: c.parentCommentId.solvedCommentId, // 구조가 다름
        userId: c.userId,
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
        profileImage: c.profileImage,
        badge: c.badge,
      }));

    // 3. 대댓글을 부모 댓글의 replies에 추가
    parentComments.forEach((parent) => {
      parent.replies = replyComments.filter((reply) => reply.parentId === parent.id);
    });

    // 4. 반환
    return parentComments;
  } catch (error) {
    console.error('공유댓글 패칭 실패', error);
    throw error;
  }
};

export const postShareComment = async ({ shareId, postId, pcommentId, comment }) => {
  const response = await apiInstance.post(`/community/solved/${shareId}/comment`, {
    postId,
    notificationType: 'SOLVEDLIKE',
    pcommentId,
    comment,
  });
  return response.data.result;
};

export const deleteShareComment = async (shareId, commentId) => {
  const response = await apiInstance.delete(`/community/solved/${shareId}/comment/${commentId}`);
  return response.data.result;
};

export const updateShareComment = async (shareId, commentId, { postId, pcommentId, comment }) => {
  const response = await apiInstance.patch(`/community/solved/${shareId}/comment/${commentId}`, {
    postId,
    notificationType: 'SOLVEDLIKE',
    pcommentId,
    comment,
  });
  return response.data.result;
};
