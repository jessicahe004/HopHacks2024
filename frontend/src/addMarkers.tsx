import mapboxgl from 'mapbox-gl';

// Define a type for the hospital data
interface Hospital {
  name: string;
  lat: number;
  lng: number;
  link: string;
}

// Function to add custom styled markers to the map
export const addMarkers = (map: mapboxgl.Map, hospitals: Hospital[]) => {
  hospitals.forEach((hospital) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';

    // Style the marker element (very large, red circle)
    el.style.backgroundColor = 'red';
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';

    // Create the marker and add it to the map
    new mapboxgl.Marker(el)
      .setLngLat([hospital.lng, hospital.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${hospital.name}</h3><a href="${hospital.link}" target="_blank">View Details</a>`
        )
      )
      .addTo(map);
  });
};
