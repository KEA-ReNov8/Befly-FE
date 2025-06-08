import { useState, useEffect } from 'react';
import { checkShareEmpathy, postShareEmpathy, deleteShareEmpathy } from '@shared/apis/post/empathy';

export const useShareEmpathy = (shareId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 좋아요 상태 확인
  useEffect(() => {
    if (!shareId) return;

    const checkInitialState = async () => {
      try {
        setIsLoading(true);
        const liked = await checkShareEmpathy(shareId);
        console.log('🎯 초기 공유글 좋아요 상태:', liked);
        setIsLiked(liked);
      } catch (error) {
        console.error('❌ 초기 공유글 좋아요 상태 확인 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialState();
  }, [shareId]);

  // 좋아요 토글 함수
  const toggleLike = async (onSuccess) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      console.log('🔄 공유글 좋아요 토글 시작, 현재 UI 상태:', isLiked);

      // 서버에서 실제 좋아요 상태를 먼저 확인
      const serverIsLiked = await checkShareEmpathy(shareId);
      console.log('🔍 공유글 서버 실제 상태:', serverIsLiked);

      if (serverIsLiked) {
        // 서버에서 좋아요 상태면 삭제
        console.log('🗑️ 공유글 서버에서 좋아요 있음 - 삭제 요청');
        await deleteShareEmpathy(shareId);
        setIsLiked(false);
        console.log('✅ 공유글 좋아요 삭제 완료');
      } else {
        // 서버에서 좋아요가 아니면 추가
        console.log('➕ 공유글 서버에서 좋아요 없음 - 추가 요청');
        await postShareEmpathy(shareId);
        setIsLiked(true);
        console.log('✅ 공유글 좋아요 추가 완료');
      }

      // 성공 시 게시글 데이터 새로고침
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('❌ 공유글 좋아요 토글 실패:', error);

      // 에러 발생시 서버 상태로 동기화
      try {
        console.log('🔄 공유글 에러 발생 - 서버 상태로 동기화 시작');
        const currentState = await checkShareEmpathy(shareId);
        console.log('🔄 공유글 에러 후 서버 실제 상태:', currentState);
        setIsLiked(currentState);
      } catch (syncError) {
        console.error('❌ 공유글 상태 동기화도 실패:', syncError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    isLoading,
    toggleLike,
  };
};
