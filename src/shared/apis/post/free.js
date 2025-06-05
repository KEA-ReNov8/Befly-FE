import { apiInstance } from '@shared/apis/instance';

export const getFreePostDetail = async (freeId) => {
  try {
    const response = await apiInstance.get(`/community/free/${freeId}`);
    return response.data;
  } catch (error) {
    console.error(`/community/free/${freeId} 요청 실패:`, error);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태:', error.response?.status);
    throw error;
  }
};

// // 자유함 게시글 목록을 가져오는 API 함수
// // 각 게시글에 cardImage(대표 이미지) 필드를 추가하여 반환
// export const getFreePosts = async (page = 0) => {
//   try {
//     console.log('/community/free/page/ 요청 전송 중...');
//     const response = await apiInstance.get(`/community/free/page/${page}`);
//     console.log('/community/free/page/ 요청 응답:', response);
//     console.log('응답 데이터:', response.data);
//     // 각 게시글에 cardImage(대표 이미지) 필드 추가
//     return {
//       posts: response.data.result.content.map((post) => ({
//         ...post,
//         cardImage: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : null,
//       })),
//       totalPages: response.data.result.totalPages,
//     };
//   } catch (error) {
//     console.error('/community/free 요청 실패:', error);
//     console.error('에러 응답:', error.response?.data);
//     console.error('에러 상태:', error.response?.status);
//     throw error; // 에러를 다시 throw해서 호출하는 곳에서 catch할 수 있도록 한다.
//   }
// };

export const getFreePostsByPage = async (page = 0) => {
  try {
    const response = await apiInstance.get(`/community/free/page/${page}`);
    const result = response.data.result;

    const posts = result.content.map((post) => ({
      type: 'free',
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      time: post.time,
      nickname: post.nickname,
      categoryName: '', // 자유함은 없음
      postId: post.postId,
      currentPage: result.number, // 현재 페이지 번호 포함
      cardImage: post.imageUrl?.[0] ?? null,
    }));

    return {
      posts,
      totalPages: result.totalPages,
      currentPage: result.number,
    };
  } catch (error) {
    throw error;
  }
};

export const getLatestFreePosts = async () => {
  try {
    const response = await apiInstance.get('/community/free/latest');
    const data = response.data.result;
    return data.map((post) => ({
      type: 'free',
      title: post.title,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      time: post.time,
      nickname: post.nickname,
      categoryName: '', // 자유글엔 없음
      postId: post.postId,
      currentPage: 0, // 리스트 페이지 개념이 없으므로 0으로 설정
      cardImage: post.imageUrl?.[0] || null,
    }));
  } catch (error) {
    throw error;
  }
};
