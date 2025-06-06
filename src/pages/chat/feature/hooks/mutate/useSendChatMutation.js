import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';


export const useSendChatMutation = ( onSuccess, onError) => {

    const sendChatMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiInstance.post('/consult/chat/', data);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅 전송 성공:', data);

            const chatResponse = data?.result;

            if (onSuccess && chatResponse) {
                onSuccess(chatResponse, data);
            }
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('채팅 전송 실패:', status);

            if (status === 401 && axiosError.response?.data) {
                alert(axiosError.response.data.message);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
            if (onError) {
                onError(error);
            }
        },
    });
    return sendChatMutation;
};
