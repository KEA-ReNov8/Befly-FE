import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '@app/styles/theme';
import TopBar from '@shared/ui/TopBar/TopBar';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useCreateFreePostMutation } from '@post/feature/hooks/useCreateFreePostMutation';
import { useUpdateFreePostMutation } from '@post/feature/hooks/useUpdateFreePostMutation';
import { useFreePostDetailQuery } from '@post/feature/hooks/useFreePostDetailQuery';
import { useUploadImageMutation } from '@shared/hooks/useUploadImageMutation';

export const FreePostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 추출
  const editorRef = useRef(null);
  const imageUrlsRef = useRef([]);

  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 편집 모드인지 확인 (URL에 postId가 있으면 편집 모드)
  const isEditMode = !!postId;

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutate: createFreePost } = useCreateFreePostMutation();
  const { mutate: updateFreePost } = useUpdateFreePostMutation();

  // 편집 모드일 때 기존 게시글 데이터 로드
  const { data: existingPost, isLoading: isLoadingPost } = useFreePostDetailQuery(postId, {
    enabled: isEditMode,
  });

  // 폼 초기화 (새 글 작성 시 임시저장 복원, 편집 시 기존 데이터 로드)
  useEffect(() => {
    if (isEditMode && existingPost) {
      // 편집 모드: 기존 게시글 데이터로 폼 초기화
      setTitle(existingPost.title);
      if (editorRef.current) {
        editorRef.current.getInstance().setHTML(existingPost.content);
      }
      // 기존 이미지 정보도 설정 (필요시)
      imageUrlsRef.current = existingPost.imageUrls || [];
    } else if (!isEditMode) {
      // 새 글 작성 모드: 임시저장된 내용 복원
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
    }
  }, [isEditMode, existingPost]);

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

  const handleImageUpload = async (blob, callback) => {
    const imageKey = `${Date.now()}-${blob.name || 'image'}`;

    try {
      const result = await uploadImage({ image: blob, imageKey });

      if (result && result.imageUrl) {
        // 쿼리 파라미터(? 이후)를 제거하여 깔끔한 URL로 만들기
        const cleanImageUrl = result.imageUrl.split('?')[0];
        imageUrlsRef.current.push(result.imageUrl);
        callback(cleanImageUrl, '업로드 이미지');
      } else {
        throw new Error('업로드 결과가 올바르지 않습니다.');
      }
    } catch (error) {
      alert(`이미지 업로드에 실패했습니다: ${error.message}`);
      callback('', '업로드 실패');
    }
  };

  const handleRegister = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const editorInstance = editorRef.current.getInstance();
    const html = editorInstance.getHTML();
    const markdown = editorInstance.getMarkdown();

    if (!title.trim() || !markdown.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    // HTML 내용에서 첫 번째 이미지만 추출 (대표이미지용)
    const imgTagRegex = /<img[^>]+src="([^"]+)"/g;
    const firstImageMatch = imgTagRegex.exec(html);

    let representativeImage = [];
    if (firstImageMatch) {
      const firstImageSrc = firstImageMatch[1];
      // HTML에서 추출한 첫 번째 이미지 URL을 직접 사용
      representativeImage = [firstImageSrc];
    }

    if (isEditMode) {
      // 편집 모드: 게시글 수정
      updateFreePost(
        {
          freeId: postId,
          title: title,
          content: html,
          imageKeys: representativeImage,
        },
        {
          onSuccess: () => {
            alert('게시글이 수정되었습니다.');
            navigate(`/free/${postId}`); // 수정된 게시글로 이동
          },
          onError: () => {
            alert('게시글 수정에 실패했습니다.');
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        },
      );
    } else {
      // 새 글 작성 모드: 게시글 생성
      createFreePost(
        {
          title: title,
          content: html,
          imageKeys: representativeImage,
        },
        {
          onSuccess: () => {
            localStorage.removeItem('temp_free_post_title');
            localStorage.removeItem('temp_free_post_content');
            navigate('/free/page/1');
          },
          onError: () => {
            alert('게시글 등록에 실패했습니다.');
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        },
      );
    }
  };

  // 편집 모드에서 데이터 로딩 중일 때 로딩 표시
  if (isEditMode && isLoadingPost) {
    return (
      <Container>
        <TopBar />
        <Line>게시글 로딩 중...</Line>
      </Container>
    );
  }

  return (
    <Container>
      <TopBar />
      <Line>{isEditMode ? '자유함 글수정' : '자유함 글쓰기'}</Line>
      <EditorContainer>
        <Header>
          <ButtonContainer>
            {!isEditMode && <TempSaveButton onClick={handleTempSave}>임시저장</TempSaveButton>}
            <WriteButton onClick={handleRegister} disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? '수정 중...'
                  : '등록 중...'
                : isEditMode
                  ? '수정'
                  : '등록'}
            </WriteButton>
          </ButtonContainer>
        </Header>
        <TitleInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
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
  height: 32px;
  display: flex;
  gap: 12px;
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;
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
