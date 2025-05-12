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
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const { WebApp } = window.Telegram;
        
        // Initialize the Telegram WebApp
        WebApp.ready();
        
        // Expand the WebApp to full height
        WebApp.expand();
        
        // Get user data from Telegram
        const user = WebApp.initDataUnsafe.user;
        if (user) {
          setUser(user);
        }
        
        setInitialized(true);
      }
    };

    // Load Telegram WebApp script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = initTelegram;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [setUser, setInitialized]);

  return {
    closeApp: () => window.Telegram?.WebApp?.close(),
  };
} 