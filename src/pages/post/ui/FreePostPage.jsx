import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export const FreePostPage = () => {
  useEffect(() => {
    const savedTitle = localStorage.getItem('temp_free_post_title');
    const savedContent = localStorage.getItem('temp_free_post_content');

    if (savedTitle || savedContent) {
      const shouldRestore = window.confirm('이전에 임시 저장된 내용이 있습니다. 불러올까요?');
      if (shouldRestore) {
        if (savedTitle) setTitle(savedTitle);
        if (savedContent && editorRef.current) {
          editorRef.current.getInstance().setHTML(savedContent);
        }
      }
    }
  }, []);

  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState(''); // html state
  const [isSubmitting, setIsSubmitting] = useState(false); // 등록 중 상태 관리 - 중복 등록 방지

  const handleTempSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const html = editorInstance.getHTML();
    const markdown = editorInstance.getMarkdown();

    if (!title.trim() && !markdown.trim()) {
      alert('임시 저장할 내용이 없습니다.');
      return;
    }

    localStorage.setItem('temp_free_post_title', title);
    localStorage.setItem('temp_free_post_content', html);

    alert('임시 저장이 완료되었습니다!');
  };

  // 이미지 업로드 핸들러 (Mock)
  const handleImageUpload = async (blob, callback) => {
    const mockUrl = URL.createObjectURL(blob); // 로컬 Blob를 임시 URL로 변환
    callback(mockUrl, '업로드 이미지');
    // 실제 API가 준비되면 아래에 코드 추가
    // const formData = new FormData();
    // formData.append('image', blob);
    // const res =await axios.post('/api/upload', formData);
    // const imageUrl = res.data.url;
    // callback(imageUrl, '업로드 이미지');
  };

  const handleRegister = async () => {
    if (isSubmitting) return; // 중복 방지
    setIsSubmitting(true);

    const editorInstance = editorRef.current.getInstance();
    const html = editorInstance.getHTML();
    const markdown = editorInstance.getMarkdown(); // 마크다운 추출

    // 제목과 내용이 모두 입력되지 않았다면 경고 메시지 표시
    const isContentEmpty = !markdown.trim(); // 공백 포함 여부 제거
    if (!title.trim() || isContentEmpty) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      // 나중에 API 준비되면 아래 주석 제거
      // await createFreePost({ title, content: html });

      console.log('✅ 등록 완료. title:', title);
      console.log('✅ 등록 완료. content:', html);

      // 게시글 등록 후 목록 페이지로 이동 처리
      navigate('/free');
    } catch (err) {
      alert('등록 실패. 나중에 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false); // 등록 완료 후 상태 초기화
    }
  };

  return (
    <Container>
      <TopBar />
      <Line>자유함 글쓰기</Line>
      <EditorContainer>
        <Header>
          <ButtonContainer>
            <TempSaveButton onClick={handleTempSave}>임시저장</TempSaveButton>
            <WriteButton onClick={handleRegister} disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '등록'}
            </WriteButton>
          </ButtonContainer>
        </Header>
        <TitleInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: handleImageUpload, // 이미지 업로드 hook 등록
          }}
        />
      </EditorContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.other.white};
`;

const Line = styled.div`
  width: 100%;
  height: 66px;
  background-color: ${theme.colors.green.main};
  display: flex;
  align-items: center;
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  padding-left: 220px;
  color: ${theme.colors.other.white};
`;

const EditorContainer = styled.div`
  width: 1044px;
  height: 610px;
  border: 1px solid ${theme.colors.gray[400]};
  border-top: none;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 0 0 10px 10px;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
  width: 170px;
  height: 32px;
  display: flex;
  gap: 12px;
  margin-left: auto;
  align-items: center;
`;

const TempSaveButton = styled.button`
  width: 82px;
  height: 32px;
  paddding: 0 12px;
  border-radius: 6px;
  background-color: ${theme.colors.other.white};
  border: 1px solid ${theme.colors.gray[400]};
  color: black;
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[400]};
  }
`;

const WriteButton = styled.button`
  width: 82px;
  height: 32px;
  paddding: 0 12px;
  border-radius: 6px;
  background-color: ${theme.colors.green.main};
  color: ${theme.colors.other.white};
  font-size: ${theme.fontSize.smMd};
  font-weight: ${theme.fontWeight.regular};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.green.hover};
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 12px;
  font-size: 15px;
  margin-botton: 16px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[400]};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:focus {
    outline: 1px solid ${theme.colors.green.main};
  }
`;
