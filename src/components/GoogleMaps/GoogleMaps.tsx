import React, { useEffect, useState } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import "./GoogleMaps.css";
import { Geolocation } from "@capacitor/core";

interface GoogleMapsProps {
  google: any
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ google }) => {
  const [center, setCenter] = useState({
    lat: -6.219518,
    lng: 106.833593
  }); //gran rubina

  useEffect(() => {
    async function getCurrentLocation() {
      const pos = await Geolocation.getCurrentPosition();
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    }
    getCurrentLocation();
  }, []);

  return (
    <Map
      center={center}
      google={google}
      zoom={18}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: ""
})(GoogleMaps);