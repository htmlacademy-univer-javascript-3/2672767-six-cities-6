import {useRef, useEffect, FC, useMemo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';


import useMap from '../hooks/use-map.ts';
import {OfferFull, OfferShort} from '../../types/offer.ts';
import {MapLocation} from '../../types/map-location.ts';
import {CITY_DATA, CITY_NAMES} from '../../const/city.ts';

type MapProps = {
  offers: Array<OfferShort | OfferFull>;
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
  const mapCenter: MapLocation = useMemo(() => offers[0]?.city?.location || CITY_DATA[CITY_NAMES[0]].location, [offers]);

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
