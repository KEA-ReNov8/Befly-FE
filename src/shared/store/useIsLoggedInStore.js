import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useIsLoggedInStore = create(
    persist(
        (set) => ({
            isFirstMount: true,
            isLoggedIn: false,
            setIsFirstMount: (isFirstMount) => set({ isFirstMount }),
            setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
            logout: () => {
                set({ isLoggedIn: false, isFirstMount: true});
                localStorage.removeItem('is-logged-in-store');
                localStorage.removeItem('myInfoStore');
            }
        }),
        {
            name: 'is-logged-in-store',
            storage: createJSONStorage(() => localStorage), //또는 sessionStorage
        },
    ),
);

export default useIsLoggedInStore;
