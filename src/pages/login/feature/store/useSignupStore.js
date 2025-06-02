import { create } from 'zustand';

export const useSignupStore = create((set) => ({
    clientId: '',
    setClientId: (clientId) => set(() => ({ clientId })),
    password: '',
    setPassword: (password) => set(() => ({ password })),
    nickName: '',
    setNickName: (nickName) => set(() => ({ nickName })),
    photoUrl: '',
    setPhotoUrl: (photoUrl) => set(() => ({ photoUrl })),
}));
