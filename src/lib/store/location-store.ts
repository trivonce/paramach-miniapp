import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationStore {
  location: Location | null;
  setLocation: (location: Location) => void;
  getCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set, _get) => ({
      location: null,
      setLocation: (location) => set({ location }),
      getCurrentLocation: async () => {
        // if (get().location) return; // Always get location on app load
        if (!navigator.geolocation) {
          set({
            location: {
              address: "Geolocation is not supported by your browser.",
              latitude: 41.2995,
              longitude: 69.2401,
            },
          });
          return;
        }
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Fetch address from Yandex
            try {
              const response = await fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}&geocode=${longitude},${latitude}&format=json&lang=uz_UZ`
              );
              const data = await response.json();
              const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
              const address = geoObject?.metaDataProperty?.GeocoderMetaData?.text || "Unknown location";
              set({
                location: {
                  address,
                  latitude,
                  longitude,
                },
              });
            } catch {
              set({
                location: {
                  address: "Location not found",
                  latitude,
                  longitude,
                },
              });
            }
          },
          () => {
            set({
              location: {
                address: "Toshkent, O'zbekiston",
                latitude: 41.2995,
                longitude: 69.2401,
              },
            });
            toast.error("Geolocation not allowed. Using default location.");
          }
        );
      },
    }),
    { name: "location-storage" }
  )
); 