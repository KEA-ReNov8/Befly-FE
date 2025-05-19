import styled from 'styled-components';
import theme from '@app/styles/theme';

const FreeCommentList = ({
  comments,
  replyInput,
  replyingTo,
  onReplyToggle,
  onReplyInputChange,
  onReplySubmit,
  userId,
}) => (
  <CommentListSection>
    {comments.map((comment) => (
      <CommentBlock key={comment.id}>
        <CommentRow>
          <ProfileCircle />
          <CommentRight>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
            <CommentInfoRow>
              <CommentDate>{comment.date}</CommentDate>
              <ReplyButton type="button" onClick={() => onReplyToggle(comment.id)}>
                답글쓰기
              </ReplyButton>
              {userId === comment.authorId && (
                <EditDeleteGroup>
                  <EditButton type="button">수정</EditButton>
                  <Divider>|</Divider>
                  <DeleteButton type="button">삭제</DeleteButton>
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
                  <ReplyProfileCircle />
                  <ReplyRight>
                    <ReplyAuthor>{reply.author}</ReplyAuthor>
                    <ReplyContent>{reply.content}</ReplyContent>
                    <ReplyInfoRow>
                      <ReplyDate>{reply.date}</ReplyDate>
                      {userId === reply.authorId && (
                        <EditDeleteGroup>
                          <EditButton type="button">수정</EditButton>
                          <Divider>|</Divider>
                          <DeleteButton type="button">삭제</DeleteButton>
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
);

export default FreeCommentList;

const CommentListSection = styled.div`
  width: 1044px;
  flex-shrink: 0;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray[200]};
`;
const CommentBlock = styled.div`
  margin-bottom: 24px;
  position: relative;
  border-bottom: 1px solid ${theme.colors.gray[200]};
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
  background: #e6f2ef;
  margin-top: 2px;
`;
const CommentRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const CommentAuthor = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
`;
const CommentContent = styled.div`
  font-size: 15px;
  margin-bottom: 6px;
`;
const CommentInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #b0b0b0;
`;
const CommentDate = styled.div`
  color: #b0b0b0;
  font-size: 13px;
`;
const ReplyButton = styled.button`
  color: ${theme.colors.gray[500]};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
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
  color: ${theme.colors.gray[500]};
  font-size: 13px;
  cursor: pointer;
  padding: 0 2px;
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[500]};
  font-size: 13px;
  cursor: pointer;
  padding: 0 2px;
`;
const Divider = styled.span`
  color: ${theme.colors.gray[400]};
  font-size: 13px;
`;
const ReplyInputRow = styled.div`
  margin-left: 56px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 15px;
`;
const ReplyInput = styled.textarea`
  flex: 1;
  min-height: 32px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  padding: 6px;
  resize: none;
  outline: none;
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;
const ReplyList = styled.div`
  margin-left: 56px;
  margin-top: 4px;
`;
const ReplyBlock = styled.div`
  margin-bottom: 10px;
`;
const ReplyRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
`;
const ReplyProfileCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6f2ef;
  margin-top: 2px;
`;
const ReplyRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const ReplyAuthor = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 2px;
`;
const ReplyContent = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;
const ReplyInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #b0b0b0;
`;
const ReplyDate = styled.div`
  color: #b0b0b0;
  font-size: 12px;
`;
const ReplyRegisterButton = styled.button`
  width: 50px;
  height: 32px;
  background-color: #fff;
  color: ${theme.colors.green.main};
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
