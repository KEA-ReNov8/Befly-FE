// 공유글 관련 api 함수
import { apiInstance } from '@shared/apis/instance';

export const getSharePosts = async (page = 0) => {
  try {
    console.log('/community/solved/page/ 요청 전송 중');
    const response = await apiInstance.get(`community/solved/page/${page}`);
    console.log('/communityshare/page/ 요청 응답:', response);
    console.log('응답 데이터: ', response.data);

    return {
      posts: response.data.result.content.map((post) => ({
        ...post,
        cardImage: post.imgUrl && post.imgUrl.length > 0 ? post.imgUrl[0] : null,
      })),
      totalPages: response.data.result.totalPages,
    };
  } catch (error) {
    console.log('/community/solved/page/ 요청 실패:', error);
    console.log('에러 응답:', error.response?.data);
    console.log('에러 상태:', error.response?.status);
    throw error;
  }
};
