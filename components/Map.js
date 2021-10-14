import { useState } from "react";

import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const Map = ({ searchResults }) => {

  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results object into the
  // getCenter param object. 
  // [
  //   { latitude: 52.516272, longitude: 13.377722 },
  //   { latitude: 51.515, longitude: 7.453619 },
  //   { latitude: 51.503333, longitude: -0.119722 }
  // ]

  const coordinates = searchResults?.map(result => ({
    longitude: result.long,
    latitude: result.lat
  }));

  const centralizedCoordinates = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: centralizedCoordinates.latitude,
    longitude: centralizedCoordinates.longitude,
    zoom: 11,
  });


  return (
    <ReactMapGL
      mapStyle="mapbox://styles/roberttmello/ckuqyo4l10eps14niq6kjzn35"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
    >

      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p 
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              >
                📌
            </p>
          </Marker>
          {/* The popup that should show if we click on a Marker. */}

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              longitude={result.long}
              latitude={result.lat}
            >{result.title}</Popup>
          ) : (
            false
          )}

        </div>
      ))}


    </ReactMapGL>
  );
};

export default Map;
