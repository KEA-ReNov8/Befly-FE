import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMyInfoStore = create(
    persist(
        (set) => ({
            myInfo: null,
            setMyInfo: (myInfo) => set({ myInfo }),
        }),
        {
            name: 'myInfoStore', //localstorage 키 이름
        }
    )
);
