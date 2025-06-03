import { create } from "zustand";

const useAuthStore = create((set) => ({
    accessToken: '',
    setAccessToken: (token) => set( {accessToken: token}),
    logOut: () => set( { accessToken: ''}),
}));

export default useAuthStore;
