import { apiInstance } from '@shared/apis/instance';

export const searchFreePosts = async ({ page = 0, keyword = '' }) => {
  console.log('자유글 검색 API 호출:', { page, keyword });

  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (keyword.trim()) {
    params.append('keyword', keyword.trim());
  }

  const response = await apiInstance.get(`/community/search/free?${params.toString()}`);
  console.log('자유글 검색 응답:', response.data);

  return response.data.result;
};

export const searchSharePosts = async ({ page = 0, keyword = '', category = '전체' }) => {
  console.log('공유글 검색 API 호출:', { page, keyword, category });

  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (category && category !== '전체') {
    params.append('category', category);
  }
  if (keyword.trim()) {
    params.append('keyword', keyword.trim());
  }

  const response = await apiInstance.get(`/community/search/solved?${params.toString()}`);
  console.log('공유글 검색 응답:', response.data);

  return response.data.result;
};
