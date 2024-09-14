import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { addMarkers } from './addMarkers';  // Marker function

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoidmlyc2dhbmRoaSIsImEiOiJjbTEya21wNnAwZm4xMnFvaTAwemZxcDFrIn0.DSEyJcbaSyOpg29_UZeYoQ';

// Define a type for the hospital data
interface Hospital {
  name: string;
  lat: number;
  lng: number;
  website: string;
}

const LoadMap: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null); // Reference for map container

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        // Fetch hospital data from the FastAPI backend
        const response = await fetch('http://localhost:8000/api/hospitals');
        const data = await response.json();

        if (response.ok) {
          // Extract and set hospital data from the API response
          const hospitalData = data.hospitals.map((hospital: any) => ({
            name: hospital.NAME,
            lat: parseFloat(hospital.LATITUDE),  // Ensure lat is a number
            lng: parseFloat(hospital.LONGITUDE),  // Ensure lng is a number
            website: hospital.WEBSITE || '',  // Provide empty string if website is missing
          }));

          setHospitals(hospitalData);
        } else {
          console.error("Error fetching hospitals:", data.error);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();  // Fetch hospital data on component mount
  }, []);

  // Initialize the map once hospitals are loaded
  <div>Printing the map now</div>
  useEffect(() => {
    if (mapContainerRef.current && hospitals.length > 0) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.35, 39.50],  // Center the map over the US
        zoom: 15,  // Set the initial zoom level
      });

      // Add markers for each hospital
      addMarkers(map, hospitals);

      return () => map.remove(); // Cleanup map on component unmount
    }
  }, [hospitals]);  // Re-run if hospitals data changes

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default LoadMap;