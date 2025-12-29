import {FC, useEffect, useMemo, useRef} from 'react';
import {Icon, layerGroup, LayerGroup, Marker} from 'leaflet';
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
  const markerLayerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Record<OfferShort['id'], Marker>>({});

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);
    markerLayerRef.current = markerLayer;

    return () => {
      markerLayerRef.current = null;
      markerLayer.removeFrom(map);
      markersRef.current = {};
    };
  }, [map]);

  useEffect(() => {
    if (!map || !markerLayerRef.current) {
      return;
    }

    const markerLayer = markerLayerRef.current;
    markerLayer.clearLayers();
    markersRef.current = {};

    offers.forEach((offer) => {
      markersRef.current[offer.id] = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      }).setIcon(defaultCustomIcon)
        .addTo(markerLayer);
    });
  }, [map, offers]);

  useEffect(() => {
    const markers = markersRef.current;

    Object.values(markers).forEach((marker) => marker.setIcon(defaultCustomIcon));

    if (activeOfferId && markers[activeOfferId]) {
      markers[activeOfferId].setIcon(currentCustomIcon);
    }
  }, [activeOfferId]);

  return <div id="cities__map" className="cities__map" ref={mapRef}/>;
};

export default Map;
