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
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
        replies: [], // 나중에 추가
      }));
    // 2. parent가 있는 경우 대댓글로 분류
    const replyComments = rawComments
      .filter((c) => c.parentCommentId !== null)
      .map((c) => ({
        id: c.commentId,
        parentId: c.parentCommentId.freeCommentId,
        author: c.nickname,
        content: c.comment,
        date: c.createdAt,
        isDeleted: c.isDeleted,
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
        author: c.userId ? `사용자${c.userId}` : '익명', // nickname이 없어서 userId 기반으로 생성
        // author: c.nickname
        content: c.comment,
        date: new Date().toISOString(), // createdAt이 없어서 현재 시간 사용
        // date: c.createdAt,
        isDeleted: c.isDeleted,
        replies: [], // 나중에 추가
      }));

    // 2. parent가 있는 경우 대댓글로 분류
    const replyComments = rawComments
      .filter((c) => c.parentCommentId !== null)
      .map((c) => ({
        id: c.commentId,
        parentId: c.parentCommentId.solvedCommentId, // 구조가 다름
        // author: c.nickname, // 백엔드에서 nickname 필드 추가 예정
        author: c.userId ? `사용자${c.userId}` : '익명', // 임시값: userId 기반으로 생성
        content: c.comment,
        // date: c.createdAt, // 백엔드에서 createdAt 필드 추가 예정
        date: new Date().toISOString(), // 임시값: 현재 시간 사용
        isDeleted: c.isDeleted,
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
    notificationType: 'FREELIKE', // 백엔드 개발자가 알려줄거임 지금은 임시로 넣음
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
    notificationType: 'FREELIKE',
    pcommentId,
    comment,
  });
  return response.data.result;
};
