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
    console.error('댓글 패칭 실패', error);
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
