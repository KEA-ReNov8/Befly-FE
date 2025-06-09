export const formatDate = (isoString) => {
  const date = new Date(isoString);
  // UTC → KST (+9시간 보정)
  const offsetDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = offsetDate.getFullYear();
  const month = String(offsetDate.getMonth() + 1).padStart(2, '0');
  const day = String(offsetDate.getDate()).padStart(2, '0');

  let hour = offsetDate.getHours();
  const minute = String(offsetDate.getMinutes()).padStart(2, '0');

  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';
  if (!isAM) hour -= 12;
  if (hour === 0) hour = 12;

  return `${year}. ${month}. ${day}. ${ampm} ${String(hour).padStart(2, '0')}:${minute}`;
};

/**
 * 생성일시를 기준으로 "방금 전", "분 전", "시간 전" 등의 형태로 변환하는 함수
 * 백엔드 formatTimeAgo 로직과 동일하게 구현
 * @param {string|Date} createdAt - 생성일시 (ISO string 또는 Date 객체)
 * @returns {string} - "방금 전", "5분 전", "2시간 전" 등의 형태
 */
export const formatTimeAgo = (createdAt) => {
  try {
    const now = new Date();
    const created = new Date(createdAt);

    // 유효하지 않은 날짜인 경우 원본 반환
    if (isNaN(created.getTime())) {
      return createdAt;
    }

    // 서버에서 받은 시간이 UTC인 경우를 대비하여 KST로 변환
    // formatDate 함수와 동일한 방식으로 9시간 보정
    const createdKST = new Date(created.getTime() + 9 * 60 * 60 * 1000);

    const diffMs = now.getTime() - createdKST.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return '방금 전';
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days === 1) {
      return '어제';
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      // 7일 이상인 경우 YYYY-MM-DD 형태로 반환
      const year = createdKST.getFullYear();
      const month = String(createdKST.getMonth() + 1).padStart(2, '0');
      const day = String(createdKST.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    console.error('시간 형식 변환 오류:', error);
    return createdAt; // 오류 시 원본 반환
  }
};
