import styled from 'styled-components';
import theme from '@app/styles/theme';
import Arrow from '@shared/assets/icons/arrow.svg';
import CommentDeleteModal from '@pages/post/components/CommentDeleteModal';
import { useState } from 'react';
import { formatDate } from '@shared/utils/date';
import { useDeleteFreeCommentMutation } from '@post/feature/hooks/useDeleteFreeCommentMutation';
import { useUpdateFreeCommentMutation } from '@post/feature/hooks/useUpdateFreeCommentMutation';
import { useDeleteShareCommentMutation } from '@post/feature/hooks/useDeleteShareCommentMutation';
import { useUpdateShareCommentMutation } from '@post/feature/hooks/useUpdateShareCommentMutation';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { badgeSystem } from '@pages/my/util/badgeSystem';
import defaultProfile from '@shared/assets/icons/defaultUser.svg';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';

export const CommentListBox = ({
  comments,
  replyInput,
  replyingTo,
  onReplyToggle,
  onReplyInputChange,
  onReplySubmit,
  userNickname,
  commentType = 'free',
}) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  console.log(comments);
  const { myInfo } = useMyInfoStore();
  const userId = myInfo?.userId;
  console.log(userId, comments); //로그인한 유저 아이디

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    commentId: null,
    isReply: false,
  });
  const [editingComment, setEditingComment] = useState({
    id: null,
    content: '',
    isReply: false,
    originalContent: '',
  });

  const { mutate: deleteFreeComment } = useDeleteFreeCommentMutation(postId);
  const { mutate: updateFreeComment } = useUpdateFreeCommentMutation(postId);
  const { mutate: deleteShareComment } = useDeleteShareCommentMutation(postId);
  const { mutate: updateShareComment } = useUpdateShareCommentMutation(postId);

  const deleteComment = commentType === 'share' ? deleteShareComment : deleteFreeComment;
  const updateComment = commentType === 'share' ? updateShareComment : updateFreeComment;

  const handleDeleteClick = (commentId, isReply = false) => {
    setDeleteModalState({
      isOpen: true,
      commentId,
      isReply,
    });
  };

  const handleDeleteConfirm = (commentId) => {
    deleteComment(commentId, {
      onSuccess: () => {
        setDeleteModalState({ isOpen: false, commentId: null, isReply: false });
        alert('댓글이 삭제되었습니다.');
      },
      onError: () => {
        alert('댓글 삭제에 실패했습니다.');
      },
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModalState({ isOpen: false, commentId: null, isReply: false });
  };

  const handleEditClick = (comment, isReply = false) => {
    setEditingComment({
      id: comment.id,
      content: comment.content,
      isReply,
      originalContent: comment.content,
    });
  };

  const handleEditSave = () => {
    if (!editingComment.content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    const comment = comments.find(
      (c) => c.id === editingComment.id || c.replies?.some((r) => r.id === editingComment.id),
    );

    let parentCommentId = null;
    if (editingComment.isReply) {
      const parentComment = comments.find((c) =>
        c.replies?.some((r) => r.id === editingComment.id),
      );
      parentCommentId = parentComment?.id || null;
    }

    updateComment(
      {
        commentId: editingComment.id,
        postId: Number(postId),
        pcommentId: parentCommentId,
        comment: editingComment.content,
      },
      {
        onSuccess: () => {
          setEditingComment({ id: null, content: '', isReply: false, originalContent: '' });
          alert('댓글이 수정되었습니다.');
        },
        onError: () => {
          alert('댓글 수정에 실패했습니다.');
        },
      },
    );
  };

  const handleEditCancel = () => {
    setEditingComment({ id: null, content: '', isReply: false, originalContent: '' });
  };

  const handleClickCommenterProfile = (commentId) => {
    //navigate(`/profile/${comment.userId}`, { state: { comment } });
    navigate(`/profile/${commentId}`);
  };

  return (
    <>
      <CommentListSection>
        {comments.map((comment) => (
          <CommentBlock key={comment.id}>
            <CommentRow>
              <ProfileCircle
                onClick={() => handleClickCommenterProfile(comment.userId)}
                src={comment.profileImage}
              />
              <CommentRight>
                <CommentTop>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentBadge src={badgeSystem(comment.badge)} />
                </CommentTop>
                {editingComment.id === comment.id ? (
                  <EditInputContainer>
                    <EditInput
                      value={editingComment.content}
                      onChange={(e) =>
                        setEditingComment({ ...editingComment, content: e.target.value })
                      }
                      placeholder="댓글을 수정하세요"
                    />
                    <EditButtonGroup>
                      <SaveButton onClick={handleEditSave}>저장</SaveButton>
                      <CancelButton onClick={handleEditCancel}>취소</CancelButton>
                    </EditButtonGroup>
                  </EditInputContainer>
                ) : (
                  <CommentContent>
                    {comment.isDeleted ? '(삭제된 댓글입니다)' : comment.content}
                  </CommentContent>
                )}
                <CommentInfoRow>
                  <CommentDate>{formatDate(comment.date)}</CommentDate>
                  {!comment.isDeleted && (
                    <ReplyButton type="button" onClick={() => onReplyToggle(comment.id)}>
                      답글쓰기
                    </ReplyButton>
                  )}
                  {userId === comment.userId &&
                    !comment.isDeleted &&
                    editingComment.id !== comment.id && (
                      <EditDeleteGroup>
                        <EditButton type="button" onClick={() => handleEditClick(comment)}>
                          수정
                        </EditButton>
                        <Divider>|</Divider>
                        <DeleteButton type="button" onClick={() => handleDeleteClick(comment.id)}>
                          삭제
                        </DeleteButton>
                      </EditDeleteGroup>
                    )}
                </CommentInfoRow>
              </CommentRight>
            </CommentRow>
            {/* 답글 입력창 */}
            {replyingTo === comment.id && (
              <ReplyInputRow>
                <ReplyInput
                  placeholder="답글을 입력하세요"
                  value={replyInput[comment.id] || ''}
                  onChange={(e) => onReplyInputChange(e, comment.id)}
                />
                <ReplyRegisterButton type="button" onClick={() => onReplySubmit(comment.id)}>
                  등록
                </ReplyRegisterButton>
              </ReplyInputRow>
            )}
            {/* 답글 리스트 */}
            {comment.replies && comment.replies.length > 0 && (
              <ReplyList>
                {comment.replies.map((reply) => (
                  <ReplyBlock key={reply.id}>
                    <ReplyRow>
                      <Replybox>
                        <img src={Arrow} alt="arrow" />
                        <ReplyProfileCircle
                          onClick={() => handleClickCommenterProfile(reply.userId)}
                          src={reply.profileImage}
                        />
                      </Replybox>
                      <ReplyRight>
                        <ReplyAuthor>
                          {reply.author}
                          <img src={badgeSystem(reply.badge)} alt="badge" />
                        </ReplyAuthor>
                        {editingComment.id === reply.id ? (
                          <EditInputContainer>
                            <EditInput
                              value={editingComment.content}
                              onChange={(e) =>
                                setEditingComment({ ...editingComment, content: e.target.value })
                              }
                              placeholder="답글을 수정하세요"
                            />
                            <EditButtonGroup>
                              <SaveButton onClick={handleEditSave}>저장</SaveButton>
                              <CancelButton onClick={handleEditCancel}>취소</CancelButton>
                            </EditButtonGroup>
                          </EditInputContainer>
                        ) : (
                          <ReplyContent>
                            {reply.isDeleted ? '(삭제된 댓글입니다)' : reply.content}
                          </ReplyContent>
                        )}
                        <ReplyInfoRow>
                          <ReplyDate>{formatDate(reply.date)}</ReplyDate>
                          {userId === reply.userId &&
                            !reply.isDeleted &&
                            editingComment.id !== reply.id && (
                              <EditDeleteGroup>
                                <EditButton
                                  type="button"
                                  onClick={() => handleEditClick(reply, true)}
                                >
                                  수정
                                </EditButton>
                                <Divider>|</Divider>
                                <DeleteButton
                                  type="button"
                                  onClick={() => handleDeleteClick(reply.id, true)}
                                >
                                  삭제
                                </DeleteButton>
                              </EditDeleteGroup>
                            )}
                        </ReplyInfoRow>
                      </ReplyRight>
                    </ReplyRow>
                  </ReplyBlock>
                ))}
              </ReplyList>
            )}
          </CommentBlock>
        ))}
      </CommentListSection>
      {deleteModalState.isOpen && (
        <CommentDeleteModal
          commentId={deleteModalState.commentId}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteCancel}
        />
      )}
    </>
  );
};

const CommentListSection = styled.div`
  width: 1044px;
  flex-shrink: 0;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[400]};
  margin-top: 30px;
`;
const CommentBlock = styled.div`
  margin-bottom: 20px;
  position: relative;
  border-bottom: 1px solid ${theme.colors.gray[400]};
  &:last-child {
    border-bottom: none;
  }
`;
const CommentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 10px;
`;
const ProfileCircle = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.gray[200]};
  border: 2px solid ${theme.colors.green.main};
  margin-top: 2px;
  cursor: pointer;
`;
const CommentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const CommentTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;
const CommentBadge = styled.img`
  width: 18px;
  height: 18px;
`;
const CommentAuthor = styled.div`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.md};
`;
const CommentContent = styled.div`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: 6px;
`;
const CommentInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[400]};
  margin-bottom: 4px;
`;
const CommentDate = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
`;
const ReplyButton = styled.button`
  color: ${theme.colors.gray[600]};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  padding: 0 4px;
`;
const EditDeleteGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const EditButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  cursor: pointer;
  padding: 0 2px;

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  cursor: pointer;
  padding: 0 2px;

  &:hover {
    color: ${theme.colors.gray[700]};
  }
`;
const Divider = styled.span`
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
`;
const ReplyInputRow = styled.div`
  margin-left: 56px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  padding: 8px 12px;

  ::-webkit-scrollbar {
    display: none;
  } //스크롤바 여부
`;
const ReplyInput = styled.textarea`
  flex: 1;
  min-height: 32px;
  border-radius: 6px;
  border: none;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  padding: 6px;
  resize: none;
  outline: none;
  &::placeholder {
    color: ${theme.colors.gray[600]};
  }
`;
const ReplyList = styled.div`
  margin-left: 20px;
  margin-top: 4px;
`;
const ReplyBlock = styled.div`
  margin-bottom: 10px;
`;
const ReplyRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-top: 1px solid ${theme.colors.gray[400]};
  padding-top: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Replybox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ReplyProfileCircle = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.gray[200]};
  border: 2px solid ${theme.colors.green.main};
  margin-top: 2px;
`;
const ReplyRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
const ReplyAuthor = styled.div`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.md};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    width: 18px;
    height: 18px;
  }
`;
const ReplyContent = styled.div`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: 4px;
`;
const ReplyInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray[400]};
`;
const ReplyDate = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
`;
const ReplyRegisterButton = styled.button`
  width: 50px;
  height: 32px;
  background-color: ${theme.colors.other.white};
  color: ${theme.colors.green.main};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const EditInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

const EditInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.regular};
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${theme.colors.green.main};
  }

  &::placeholder {
    color: ${theme.colors.gray[600]};
  }
`;

const EditButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 6px 16px;
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.other.white};
  border: none;
  border-radius: 6px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.green.dark};
  }
`;

const CancelButton = styled.button`
  padding: 6px 16px;
  background-color: ${theme.colors.other.white};
  color: ${theme.colors.gray[600]};
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;
