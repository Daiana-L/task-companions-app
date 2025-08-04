import { create } from "zustand";
import type { User } from "firebase/auth";

interface AuthState {
    user: User | null;
    isAuth: boolean;
    setUser: (user: User | null) => void;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuth: false,
    setUser: (user) => set({ user, isAuth: !!user }),
    login: (user) => set({ user, isAuth: true }),
    logout: () => set({ user: null, isAuth: false }),
}));
