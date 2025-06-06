import { create } from 'zustand';

export const useChatStore = create((set) => ({
    currentSessionId: null,
    setCurrentSessionId: (sessionId) => set({ currentSessionId: sessionId }),

    // 프로그레스 관리
    progress: 0,
    setProgress: (progress) => set({ progress }),
    incrementProgress: () => set((state) => ({ 
        progress: Math.min(state.progress + 10, 100) 
    })),
    
}));
