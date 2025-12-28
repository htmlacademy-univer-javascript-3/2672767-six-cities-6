import {useRef, useEffect, FC, useMemo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';


import useMap from '../hooks/use-map.ts';
import {OfferShort} from '../../types/offer.tsx';
import {MapLocation} from '../../types/map-location.ts';

type MapProps = {
  offers: OfferShort[];
  activeOfferId?: OfferShort['id'] | null;

};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const Map: FC<MapProps> = ({offers, activeOfferId}) => {

  const mapRef = useRef(null);
  const mapCenter: MapLocation = useMemo(() => offers?.[0].city?.location || {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 1
  }, [offers]);

  const map = useMap(mapRef, mapCenter);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            activeOfferId === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);

  return <div id="cities__map" className="cities__map" ref={mapRef}/>;
};

export default Map;
