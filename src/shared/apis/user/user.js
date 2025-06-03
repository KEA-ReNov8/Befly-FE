import { apiInstance } from '@shared/apis/instance'

export const fetchMyInfo = async () => {
    try {
        console.log('/user/profile 요청 전송 중...');
        console.log('현재 쿠키:', document.cookie);
        const response = await apiInstance.get('/user/profile');
        console.log('/user/profile 응답:', response);
        console.log('응답 데이터:', response.data);
        return response.data;
    } catch (error) {
        console.error('/user/profile 요청 실패:', error);
        console.error('에러 응답:', error.response?.data);
        console.error('에러 상태:', error.response?.status);
        throw error; // 에러를 다시 throw해서 호출하는 곳에서 catch할 수 있도록
    }
}
