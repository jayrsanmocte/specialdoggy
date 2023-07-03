//     import React, { useState, useEffect } from 'react';
//     import L from "leaflet";
//     import "leaflet/dist/leaflet.css";
//     import "leaflet-routing-machine";
//     import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

//     let map;
//     let routingControl;

//     function DoggyMap() {
//     const [startRoute, setStartRoute] = useState('');
//     const [endRoute, setEndRoute] = useState('Taguig Second District​​ Western Bicutan');
//     const [showRoutes, setShowRoutes] = useState(false);
    
//     useEffect(() => {
//         if (!map) {
//         map = L.map('map').setView([14.5995, 121.0365], 13);
        
//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//         }).addTo(map);
//         }
        
//         if (routingControl) {
//         map.removeControl(routingControl);
//         }
         
//         if (showRoutes && startRoute.length > 0 && endRoute.length > 0) {
//         routingControl = L.Routing.control({
//             waypoints: [
//             L.latLng(startRoute[0], startRoute[1]),
//             L.latLng(endRoute[0], endRoute[1]),
//             ],
//             routeWhileDragging: true,
//             lineOptions: {
//             styles: [{ color: 'purple', opacity: 0.6, weight: 4 }],
//             },
//         }).addTo(map);
//         }
//     }, [startRoute, endRoute, showRoutes]);
    
//     const handleShowRoutes = async () => {
//         try {
//         const startCoordinates = await geocodePlace(startRoute);
//         const endCoordinates = await geocodePlace(endRoute);
//         setStartRoute(startCoordinates);
//         setEndRoute(endCoordinates);
//         setShowRoutes(true);
//         } catch (error) {
//         console.log('Error:', error);
//         }
//     };
    
//     const geocodePlace = async (place) => {
//         const apiKey = '9545dc4d8e704bcd907dfd5b83fd5258';
//         const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${apiKey}`;
        
//         try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.results.length > 0) {
//             const { lat, lng } = data.results[0].geometry;
//             return [lat, lng];
//         } else {
//             throw new Error('Place not found');
//         }
//         } catch (error) {
//         throw new Error('Geocoding failed');
//         }
//     };
    
  



//     return (
//       <div className="container my-5">

// <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//   <div>
//     <div className="mb-3 ml-3">
//       <div className="imgBoxFooter">
//       <div className="imgBoxFooter1">
//       <img className="specialDog1 pt-1" src="/Images/special-dogloc.png"></img>
//       </div>
//       </div>
      
//       <div className='tag mb-1 '>
//         <input className='default text-center'
//           type="text"
//           id="endRoute"
//           value={endRoute}
//           onChange={(e) => setEndRoute(e.target.value)}
//           disabled
//         />
//         <label htmlFor="endRoute"></label>
//       </div>
//     </div>
//     <div  className='locatee'>
//       <input className='default1 text-center'
//         type="text"
//         id="startRoute"
//         placeholder='Type Your Location'
//         value={startRoute}
//         onChange={(e) => setStartRoute(e.target.value)}
//       />
//     </div>
    
//   </div>
//   <div className='d-flex mb-3'>
//   <button
//     type="button"
//     className="btn btn-warning btn-rounded mt-2 mb-2 d-flex navibut "
//     onClick={handleShowRoutes}
//   >
//     <i className="fas fa-car-rear px-1"></i>
//     Navigate
//   </button>
//   </div>
  

//   <div id="map" style={{ height: '500px', width: '1500px' }}></div>
// </div>
      
//       </div>
        


//     );
//     }
    
//     export default DoggyMap;


import React, { useState, useEffect } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

let map;
let routingControl;

function DoggyMap() {
  const [startRoute, setStartRoute] = useState('');
  const [endRoute, setEndRoute] = useState('Taguig Second District​​ Western Bicutan');
  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    if (!map) {
      map = L.map('map').setView([14.5995, 121.0365], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    }

    if (routingControl) {
      map.removeControl(routingControl);
    }

    if (showRoutes && startRoute.length > 0 && endRoute.length > 0) {
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startRoute[0], startRoute[1]),
          L.latLng(endRoute[0], endRoute[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'purple', opacity: 0.6, weight: 4 }],
        },
      }).addTo(map);
    }
  }, [startRoute, endRoute, showRoutes]);

  const handleShowRoutes = async () => {
    try {
      const startCoordinates = await geocodePlace(startRoute);
      const endCoordinates = await geocodePlace(endRoute);
      setStartRoute(startCoordinates);
      setEndRoute(endCoordinates);
      setShowRoutes(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const geocodePlace = async (place) => {
    const apiKey = '9545dc4d8e704bcd907dfd5b83fd5258';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return [lat, lng];
      } else {
        throw new Error('Place not found');
      }
    } catch (error) {
      throw new Error('Geocoding failed');
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3 ml-3">
            <div className="imgBoxFooter">
              <div className="imgBoxFooter1">
                <img className="specialDog1 pt-1" src="/Images/special-dogloc.png" alt="Special Dog" />
              </div>
            </div>

            <div className="tag mb-1">
              <input
                className="default text-center"
                type="text"
                id="endRoute"
                value={endRoute}
                onChange={(e) => setEndRoute(e.target.value)}
                disabled
              />
              <label htmlFor="endRoute"></label>
            </div>
          </div>

          <div className="locatee">
            <input
              className="default1 text-center"
              type="text" 
              id="startRoute"
              placeholder="Type Your Location"
              value={startRoute}
              onChange={(e) => setStartRoute(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button
              type="button"
              className="btn btn-warning btn-rounded mt-2 mb-2 d-flex navibut"
              onClick={handleShowRoutes}
            >
              <i className="fas fa-car-rear px-1"> Navigate</i>
             
            </button>
          </div>
        </div>

        <div className="col-lg-6">
          <div id="map" style={{ height: '350px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default DoggyMap;


