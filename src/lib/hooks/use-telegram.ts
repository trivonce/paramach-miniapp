import { useEffect } from "react";
import { useUserStore } from "../store/user-store";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

export function useTelegram() {
  const { setUser, setInitialized } = useUserStore();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const { WebApp } = window.Telegram;
      WebApp.ready();
      WebApp.expand();
      const user = WebApp.initDataUnsafe.user;
      console.log("Telegram user from context:", user);
      if (user) {
        setUser(user);
      }
      setInitialized(true);
    } else {
      // Fallback for local development
      if (import.meta.env.DEV) {
        const mockUser = {
          id: 123456,
          first_name: "Dev",
          last_name: "User",
          username: "devuser",
          language_code: "en",
          photo_url: "",
        };
        setUser(mockUser);
        setInitialized(true);
      }
    }
  }, [setUser, setInitialized]);

  return {
    closeApp: () => window.Telegram?.WebApp?.close(),
  };
} 