import { apiInstance } from '@shared/apis/instance';

export const checkFreeEmpathy = async (freeId) => {
  const response = await apiInstance.get(`/community/free/${freeId}/empathy/check`);
  return response.data.result; // true or false
};

export const postFreeEmpathy = async (freeId) => {
  const response = await apiInstance.post(`/community/free/${freeId}/empathy`);
  return response.data.result;
};

export const deleteFreeEmpathy = async (freeId) => {
  const response = await apiInstance.delete(`/community/free/${freeId}/empathy`);
  return response.data.result;
};
