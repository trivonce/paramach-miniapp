import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationStore {
  location: Location | null;
  setLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location }),
    }),
    { name: "location-storage" }
  )
); 