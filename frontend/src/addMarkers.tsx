import mapboxgl from 'mapbox-gl';

interface Hospital {
  id: number;
  name: string;
  lat: number;  
  lng: number;  
  link: string;
}

export const addMarkers = (map: mapboxgl.Map, hospitals: Hospital[]) => {
  hospitals.forEach((hospital) => {
    new mapboxgl.Marker()
      .setLngLat([hospital.lng, hospital.lat]) 
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${hospital.name}</h3><a href='${hospital.link}' target='_blank'>View Details</a>`
        )
      )
      .addTo(map);
  });
};
