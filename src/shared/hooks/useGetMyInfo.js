import { useQuery } from '@tanstack/react-query'
import { fetchMyInfo } from '@shared/apis/user/user'
import { useMyInfoStore } from '@shared/store/useMyInfoStore'

export const useGetMyInfo = () => {
    const { setMyInfo } = useMyInfoStore();

    return useQuery({
        queryKey: ['myInfo'],
        queryFn: () =>
            fetchMyInfo().then((res) => {
                if (!res?.result) return res;
                setMyInfo(res.result);
                return res;
            }),
    });
};
