import React, { useEffect, useRef, useState } from 'react';
import {fetchHospitalData} from './getHospitals'; 

// Function to load the Google Maps script
const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`; // Replace YOUR_API_KEY with your actual API key
    script.id = 'googleMaps';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => callback();
  } else {
    callback();
  }
};

interface Hospital {
    id: number;
    name: string;
    lat: number;
    lng: number;
    size: number; 
    wifi: number;
    time: Date; 
}

const GoogleMap: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = () => {
    if (!mapRef.current || hospitals.length === 0) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: hospitals[0].lat, lng: hospitals[0].lng },
      zoom: 5,
    });

    hospitals.forEach((hospital) => {
      new google.maps.Marker({
        position: { lat: hospital.lat, lng: hospital.lng },
        map,
        title: hospital.name,
      });
    });
  };

  useEffect(() => {
    loadGoogleMapsScript(() => {
      fetchHospitalData()
        .then(data => {
          setHospitals(data);
          initializeMap();
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Failed to fetch hospital data:', error.message);
          } else {
            console.error('An unknown error occurred:', error);
          }
        });
    });
  }, []);

  return (
    <div>
      <h1>Hospital Map</h1>
      <div
        id="map"
        ref={mapRef}
        style={{ height: '500px', width: '100%' }}
      ></div>
    </div>
  );
};

export default GoogleMap;
