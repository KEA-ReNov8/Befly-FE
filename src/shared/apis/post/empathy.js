import { apiInstance } from '@shared/apis/instance';

export const checkFreeEmpathy = async (freeId) => {
  console.log('🔍 checkFreeEmpathy 호출:', freeId);
  const response = await apiInstance.get(`/community/free/${freeId}/empathy/check`);
  console.log('🔍 checkFreeEmpathy 응답:', response.data);
  return response.data.result; // true or false
};

export const postFreeEmpathy = async (freeId) => {
  console.log('➕ postFreeEmpathy 호출:', freeId);
  const response = await apiInstance.post(`/community/free/${freeId}/empathy`);
  console.log('➕ postFreeEmpathy 응답:', response.data);
  return response.data.result;
};

export const deleteFreeEmpathy = async (freeId) => {
  console.log('➖ deleteFreeEmpathy 호출:', freeId);
  const response = await apiInstance.delete(`/community/free/${freeId}/empathy`);
  console.log('➖ deleteFreeEmpathy 응답:', response.data);
  return response.data.result;
};

export const checkShareEmpathy = async (shareId) => {
  const response = await apiInstance.get(`/community/solved/${shareId}/empathy/check`);
  return response.data.result;
};

export const postShareEmpathy = async (shareId) => {
  console.log('➕ postShareEmpathy 호출:', shareId);
  const response = await apiInstance.post(`/community/solved/${shareId}/empathy`);
  console.log('➕ postShareEmpathy 응답:', response.data);
  return response.data.result;
};

export const deleteShareEmpathy = async (shareId) => {
  console.log('➖ deleteShareEmpathy 호출:', shareId);
  const response = await apiInstance.delete(`/community/solved/${shareId}/empathy`);
  console.log('➖ deleteShareEmpathy 응답:', response.data);
  return response.data.result;
};
