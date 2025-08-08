import { create } from "zustand";
import type { User } from "firebase/auth";
import { persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    isAuth: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => {
                set({ user: null, isAuth: false });
                useAuthStore.persist.clearStorage();
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
