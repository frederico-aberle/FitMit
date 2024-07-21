"use client";

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const Map = ({ markers, onClick, selectedPosition }) => {
  const onLoad = map => {
    map.setOptions({
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onClick={onClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.latitude, lng: marker.longitude }} />
        ))}
        {selectedPosition && (
          <Marker
            position={{ lat: selectedPosition.latitude, lng: selectedPosition.longitude }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
