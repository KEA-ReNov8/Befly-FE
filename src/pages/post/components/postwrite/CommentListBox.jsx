import styled from 'styled-components';
import theme from '@app/styles/theme';
import Arrow from '@shared/assets/icons/arrow.svg';
import DeleteModal from '@pages/my/components/DeleteModal';
import { useState } from 'react';
import { formatDate } from '@shared/utils/date';

//삭제 안될 경우 삭제 모달 복제해서 새로 만들기
export const CommentListBox = ({
  comments,
  replyInput,
  replyingTo,
  onReplyToggle,
  onReplyInputChange,
  onReplySubmit,
  userId,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <CommentListSection>
        {comments.map((comment) => (
          <CommentBlock key={comment.id}>
            <CommentRow>
              <ProfileCircle />
              <CommentRight>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentContent>
                  {comment.isDeleted ? '(삭제된 댓글입니다)' : comment.content}
                </CommentContent>
                <CommentInfoRow>
                  <CommentDate>{formatDate(comment.date)}</CommentDate>
                  <ReplyButton type="button" onClick={() => onReplyToggle(comment.id)}>
                    답글쓰기
                  </ReplyButton>
                  {userId === comment.authorId && (
                    <EditDeleteGroup>
                      <EditButton type="button">수정</EditButton>
                      <Divider>|</Divider>
                      <DeleteButton type="button" onClick={handleDelete}>
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
                        <ReplyProfileCircle />
                      </Replybox>
                      <ReplyRight>
                        <ReplyAuthor>{reply.author}</ReplyAuthor>
                        <ReplyContent>{reply.content}</ReplyContent>
                        <ReplyInfoRow>
                          <ReplyDate>{formatDate(reply.date)}</ReplyDate>
                          {userId === reply.authorId && (
                            <EditDeleteGroup>
                              <EditButton type="button">수정</EditButton>
                              <Divider>|</Divider>
                              <DeleteButton type="button" onClick={handleDelete}>
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
      {isDeleteModalOpen && <DeleteModal onClose={() => setIsDeleteModalOpen(false)} />}
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
const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.gray[400]};
  border: 2px solid ${theme.colors.green.main};
  margin-top: 2px;
`;
const CommentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
const CommentAuthor = styled.div`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.md};
  margin-bottom: 4px;
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
const ReplyProfileCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.gray[400]};
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
