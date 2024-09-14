import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoidmlyc2dhbmRoaSIsImEiOiJjbTEya21wNnAwZm4xMnFvaTAwemZxcDFrIn0.DSEyJcbaSyOpg29_UZeYoQ';

const TestMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  <div>Printing the map now</div>

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.35, 39.50],  
        zoom: 3,
      });

      return () => map.remove(); 
    }
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default TestMap;
