import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

export const GoogleMapComponents = (props:any) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-visualization',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
  })
  

  // map
    const containerStyle = {
      width: '100vw',
      height: 'calc(100vh - 49px)'
    };

    if (isLoaded && props.catMapInfo) {
      return <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={5}
      >
        {
          props.catMapInfo.map((catMap, index) => {
            return <MarkerF
              icon={{
                url: catMap.image,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(100, 100)
              }}
              position={catMap.center}
              onClick={() => {
                props.modalOpen(catMap);
              }}
              key={index}
            />
          })
        }
      </GoogleMap>
    } else {
      return <div style={{margin: "100px"}}>Loading...</div>
    };
}

