import mapboxgl from 'mapbox-gl';

// Define a type for the hospital data
interface Hospital {
  name: string;
  lat: number;
  lng: number;
  website: string;
}

export const addMarkers = (map: mapboxgl.Map, hospitals: Hospital[]) => {
  hospitals.forEach((hospital) => {
    console.log('Adding marker for:', hospital.name, hospital.lat, hospital.lng);

    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundColor = 'red';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';

    if (!isNaN(hospital.lng) && !isNaN(hospital.lat)) {
      new mapboxgl.Marker(el)
        .setLngLat([hospital.lng, hospital.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${hospital.name}</h3><a href='${hospital.website}' target='_blank'>View Details</a>`
          )
        )
        .addTo(map);
    } else {
      console.warn('Invalid coordinates for:', hospital.name);
    }
  });
};
