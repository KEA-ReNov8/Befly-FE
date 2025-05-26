import styled from 'styled-components';
import theme from '@app/styles/theme';

export const CommentInputBox = ({ value, onChange, onSubmit, inputRef }) => (
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

const CommentInputContainer = styled.div`
  width: 1044px;
  flex-shrink: 0;
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
const CommentInput = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  border: none;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  resize: none;
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  outline: none;
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`;
const CommentButton = styled.button`
  width: 50px;
  height: 40px;
  background-color: #fff;
  color: ${theme.colors.green.main};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  border: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.green.hover};
  }
`;
