import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { fetchMyInfo } from '@shared/apis/user/user';

export const useGetProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchMyInfo(),
        select: (data) => {
            const { setMyInfo } = useMyInfoStore.getState();
            setMyInfo(data.result);
            return data.result;
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('내 정보 가져오기 실패:', status);
        },
        enabled: false,
    });
};
