import { YMaps, Map } from "react-yandex-maps";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MapPinPlusInside } from "lucide-react";

const YandexMap = () => {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [_coords, setCoords] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>("Fetching location...");
  const [_error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      toast.error("Geolocation is not supported by your browser.");
      setDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setMapCenter(newCoords);
        setCoords(newCoords);
        fetchLocationName(newCoords);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Geolocation not allowed. Using default location.");
        toast.error("Geolocation not allowed. Using default location.");
        setDefaultLocation();
      }
    );
  };

  const setDefaultLocation = () => {
    const defaultCoords: [number, number] = [41.2995, 69.2401]; 
    setMapCenter(defaultCoords);
    setCoords(defaultCoords);
    fetchLocationName(defaultCoords);
  };

  const fetchLocationName = async ([lat, lon]: [number, number]) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}&geocode=${lon},${lat}&format=json&lang=uz_UZ`
      );
      const data = await response.json();
      const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
      const name = geoObject?.metaDataProperty?.GeocoderMetaData?.text || "Unknown location";
      setLocationName(name);
    } catch (error) {
      console.error("Failed to fetch location name", error);
      setLocationName("Location not found");
    }
  };

  const handleMapDrag = (e: any) => {
    const newCenter = e.originalEvent.map.getCenter();
    setCoords([newCenter[0], newCenter[1]]);
    fetchLocationName([newCenter[0], newCenter[1]]);
  };

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          getCurrentLocation();
        } else if (result.state === "prompt") {
          getCurrentLocation();
        } else if (result.state === "denied") {
          setError("Geolocation not allowed. Using default location.");
          toast.error("Geolocation not allowed. Using default location.");
          setDefaultLocation();
        }
      });
    } else {
      getCurrentLocation();
    }
  }, []);

  return (
    <motion.div
      initial={{ height: "auto" }}
      animate={{ height: "480px" }}
      exit={{ height: "auto" }}
      className="pb-16"
    >
      <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY }}>
        {mapCenter ? (
          <div className="relative">
            <Map
              state={{ center: mapCenter, zoom: 15 }}
              width="100%"
              height="400px"
              onBoundsChange={handleMapDrag}
              options={{
                suppressMapOpenBlock: true,
                yandexMapDisablePoiInteractivity: true,
              }}
            />
            {/* Fixed Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin color="red" size={30} />
            </div>
          </div>
        ) : (
          <Skeleton className="h-[400px] w-full" />
        )}
      </YMaps>

      {/* Bottom Section */}
      <div className="dark:bg-gray-900 bg-white px-4 rounded-t-2xl fixed bottom-0 left-0 w-full py-3 z-[1] font-medium">
        <h1 className="text-center mb-3 text-sm leading-5">{locationName}</h1>
        <Button className="w-full h-12">
          <MapPinPlusInside size={20} className="shrink-0" />
          Qo'shish
        </Button>
      </div>
    </motion.div>
  );
};

export default YandexMap;