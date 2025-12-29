import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';

import {MapLocation} from '../../types/map-location.ts';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  mapCenter: MapLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapCenter.latitude,
          lng: mapCenter.longitude
        },
        zoom: mapCenter.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapCenter, mapRef]);

  useEffect(() => {
    if (map !== null) {
      map.setView(
        {
          lat: mapCenter.latitude,
          lng: mapCenter.longitude
        },
        mapCenter.zoom
      );
    }
  }, [map, mapCenter]);

  return map;
}

export default useMap;
