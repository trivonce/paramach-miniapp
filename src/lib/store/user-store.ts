import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface UserStore {
  user: TelegramUser | null;
  setUser: (user: TelegramUser | null) => void;
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isInitialized: false,
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: "user-storage",
    }
  )
); 