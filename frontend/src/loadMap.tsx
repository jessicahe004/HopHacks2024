import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchHospitalData } from './getHospitals';
import { addMarkers } from './addMarkers';

mapboxgl.accessToken = process.env.REACT_APP_MAPS_API as string;

interface Hospital {
    id: number;
    name: string;
    lat: number;
    lng: number;
    link: string; 
    size: number; 
    wifi: number;
    time: Date;  
}

const LoadMap: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const data = await fetchHospitalData();
        setHospitals(data);
      } catch (error) {
        console.error("Error loading hospitals:", error);
      }
    };

    loadHospitals();
  }, []);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.35, 39.50],  
        zoom: 3,
      });

      if (hospitals.length) {
        addMarkers(map, hospitals);
      }

      return () => map.remove(); 
    }
  }, [hospitals]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default LoadMap;

