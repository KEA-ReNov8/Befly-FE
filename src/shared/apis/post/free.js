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

// 자유함 게시글 목록을 가져오는 API 함수
// 각 게시글에 cardImage(대표 이미지) 필드를 추가하여 반환
export const getFreePosts = async (page = 0) => {
  try {
    console.log('/community/free/page/ 요청 전송 중...');
    const response = await apiInstance.get(`/community/free/page/${page}`);
    console.log('/community/free/page/ 요청 응답:', response);
    console.log('응답 데이터:', response.data);
    // 각 게시글에 cardImage(대표 이미지) 필드 추가
    return {
      posts: response.data.result.content.map((post) => ({
        ...post,
        cardImage: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : null,
      })),
      totalPages: response.data.result.totalPages,
    };
  } catch (error) {
    console.error('/community/free 요청 실패:', error);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태:', error.response?.status);
    throw error; // 에러를 다시 throw해서 호출하는 곳에서 catch할 수 있도록 한다.
  }
};

export const getMockFreePosts = async (page = 0) => {
  const dummyPosts = Array.from({ length: 8 }, (_, i) => ({
    type: 'free',
    postId: page * 8 + i + 1,
    title: `제목 ${page * 8 + i + 1}`,
    content: `본문 ${page * 8 + i + 1}`,
    likes: Math.floor(Math.random() * 10),
    comments: Math.floor(Math.random() * 5),
    time: `${Math.floor(Math.random() * 10 + 1)}분 전`,
    userId: 1,
    nickname: 'test',
    imageUrl: [`https://via.placeholder.com/300x200.png?text=Image+${page * 8 + i + 1}`],
  }));

  return {
    posts: dummyPosts.map((post) => ({
      ...post,
      cardImage: post.imageUrl?.[0] ?? null,
    })),
    totalPages: 5, // 원하는 총 페이지 수
  };
};

// 최신 자유함 게시글을 가져오는 API 함수
export const getLatestFreePosts = async () => {
  try {
    console.log('/community/free/latest 요청 전송 중...');
    const response = await apiInstance.get('/community/free/latest');
    console.log('/community/free/latest 요청 응답:', response);
    console.log('응답 데이터:', response.data);

    // 각 게시글에 cardImage(대표 이미지) 필드 추가
    return {
      posts: response.data.result.map((post) => ({
        ...post,
        cardImage: post.imageUrl && post.imageUrl.length > 0 ? post.imageUrl[0] : null,
      })),
    };
  } catch (error) {
    console.error('/community/free/latest 요청 실패:', error);
    console.error('에러 응답:', error.response?.data);
    console.error('에러 상태:', error.response?.status);
    throw error;
  }
};

// 최신 자유함 게시글을 가져오는 임시 목 함수
export const getMockLatestFreePosts = async () => {
  const dummyPosts = Array.from({ length: 4 }, (_, i) => ({
    type: 'free',
    postId: i + 1,
    title: `최신 자유함 제목 ${i + 1}`,
    content: `최신 자유함 본문 ${i + 1}`,
    likes: Math.floor(Math.random() * 10),
    comments: Math.floor(Math.random() * 5),
    time: `${Math.floor(Math.random() * 10 + 1)}분 전`,
    userId: 1,
    nickname: 'test',
    imageUrl: [`https://via.placeholder.com/300x200.png?text=Free+Image+${i + 1}`],
  }));

  return {
    posts: dummyPosts.map((post) => ({
      ...post,
      cardImage: post.imageUrl?.[0] ?? null,
    })),
  };
};
