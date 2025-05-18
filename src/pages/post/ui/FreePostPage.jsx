// src/pages/post/ui/FreePostPage.jsx
import { useRef } from 'react';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export const FreePostPage = () => {
  const editorRef = useRef();
  return (
    <Container>
      <TopBar />
      <EditorContainer>
        <Header>
          <HeaderTitle>자유함 글쓰기</HeaderTitle>
          <ButtonContainer>
            <TempSaveButton>임시저장</TempSaveButton>
            <WriteButton>등록</WriteButton>
          </ButtonContainer>
        </Header>
        <TitleInput placeholder="제목" />
        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      </EditorContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  height: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const EditorContainer = styled.div`
  width: 1044px;
  height: 610px;
  margin-top: 40px;
  border: 1px solid ${theme.colors.gray[200]};
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HeaderTitle = styled.div`
  width: 110px;
  height: 24px;
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.green.main};
`;

const ButtonContainer = styled.div`
  width: 170px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TempSaveButton = styled.button`
  width: 82px;
  height: 32px;
  paddding: 0 12px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid ${theme.colors.gray[200]};
  color: black;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
`;

const WriteButton = styled.button`
  width: 82px;
  height: 32px;
  paddding: 0 12px;
  border-radius: 6px;
  background-color: ${theme.colors.green.main};
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 15px;
  margin-botton: 16px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[200]};
  &::placeholder {
    color: ${theme.colors.gray[300]};
  }
`;
