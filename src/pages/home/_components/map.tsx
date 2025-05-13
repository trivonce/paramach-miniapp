import { YMaps, Map } from "react-yandex-maps";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";
import { MapPinPlusInside } from "lucide-react";
import { useLocationStore } from "@/lib/store/location-store";

interface YandexMapProps {
  onSelectLocation?: (location: { latitude: number; longitude: number; address: string }) => void;
}

const YandexMap = ({ onSelectLocation }: YandexMapProps) => {
  const location = useLocationStore((state) => state.location);
  const getCurrentLocation = useLocationStore((state) => state.getCurrentLocation);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>("Fetching location...");

  // Set initial map center from store location
  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      setMapCenter([location.latitude, location.longitude]);
      setCoords([location.latitude, location.longitude]);
      setLocationName(location.address);
    } else {
      setMapCenter([41.2995, 69.2401]);
      setCoords([41.2995, 69.2401]);
      setLocationName("Fetching location...");
    }
  }, [location]);

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
      setLocationName("Location not found");
    }
  };

  const handleMapDrag = (e: any) => {
    const newCenter = e.originalEvent.map.getCenter();
    setCoords([newCenter[0], newCenter[1]]);
    fetchLocationName([newCenter[0], newCenter[1]]);
  };

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
              <span className="icon icon-pin !w-8 !h-8 !bg-red-600" />
            </div>
            {/* Get Current Location Button */}
            <Button
              className="absolute top-4 right-4 z-10 bg-white text-black border border-gray-300 hover:bg-gray-100"
              variant="outline"
              onClick={getCurrentLocation}
            >
              <MapPinPlusInside size={18} className="mr-2" />
              Get Current Location
            </Button>
          </div>
        ) : (
          <Skeleton className="h-[400px] w-full" />
        )}
      </YMaps>

      {/* Bottom Section */}
      <div className="dark:bg-gray-900 bg-white px-4 rounded-t-2xl fixed bottom-0 left-0 w-full py-3 z-[1] font-medium">
        <h1 className="text-center mb-3 text-sm leading-5">{locationName}</h1>
        <Button
          className="w-full h-12"
          disabled={locationName === "Fetching location..." || locationName === "Location not found"}
          onClick={() => {
            if (coords && locationName && onSelectLocation) {
              onSelectLocation({
                latitude: coords[0],
                longitude: coords[1],
                address: locationName,
              });
            }
          }}
        >
          <MapPinPlusInside size={20} className="shrink-0" />
          Qo'shish
        </Button>
      </div>
    </motion.div>
  );
};

export default YandexMap;