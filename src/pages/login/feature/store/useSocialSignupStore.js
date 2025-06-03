import { create } from 'zustand';

export const useSocialSignupStore = create((set) => ({
    clientId: '',
    setClientId: (clientId) => set(() => ({ clientId })),
    nickname: '',
    setNickname: (nickname) => set(() => ({ nickname })),
    photoUrl: '',
    setPhotoUrl: (photoUrl) => set(() => ({ photoUrl })),
})); //단일 페이지나 form 으로 보낼 수 있다면 store가 없어도 괜찮을 수 있음.
