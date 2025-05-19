import styled from 'styled-components';
import theme from '@app/styles/theme';

const FreeCommentInput = ({ value, onChange, onSubmit, inputRef }) => (
  <CommentInputContainer>
    <CommentInput
      ref={inputRef}
      placeholder="댓글을 남겨보아요"
      value={value}
      onChange={onChange}
    />
    <CommentButton onClick={onSubmit}>등록</CommentButton>
  </CommentInputContainer>
);

export default FreeCommentInput;

const CommentInputContainer = styled.div`
  width: 1044px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
  padding: 8px 12px;
`;
const CommentInput = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  border: none;
  font-size: 14px;
  resize: none;
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  outline: none;
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;
const CommentButton = styled.button`
  width: 50px;
  height: 40px;
  background-color: #fff;
  color: ${theme.colors.green.main};
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
