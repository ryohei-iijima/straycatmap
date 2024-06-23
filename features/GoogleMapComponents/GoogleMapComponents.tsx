'use client';

import React, { FC, useEffect, useState } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import getCatMapInfo from 'features/CatMap/api/getCatMapInfo';
import { catMapInfos, catMapInfo } from 'features/Top/types';
import './GoogleMapComponents.module.scss'


type Props = {
  catMap: catMapInfo;
  index: number;
}

type catMapInfoType = 
{
  title: string,
  describe: string,
  image: string,
  center: {
    lat: number,
    lng: number
  }
}[] | []

const MapMarker = ({catMap, index}: Props) => {
  return (<MarkerF
    icon={{
      url: catMap.image,
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 15),
      scaledSize: new window.google.maps.Size(100, 100)
    }}
    position={catMap.center}
    onClick={() => {
      alert('クリックされました。')
    }}
    key={index}
  />);
};


export const GoogleMapComponents: FC = () => {
  const [catMapInfo, setCatMapInfo] = useState<catMapInfos>([]);
  const center = {
    lat: 35.75090315915706,
    lng: 139.78810085682267
  };

  useEffect(() => {
    (async () => {
      const resultData = await getCatMapInfo();
      setCatMapInfo(resultData);
    })();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-visualization',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
  })

  if (!isLoaded || !catMapInfo) {
    return <div style={{margin: "100px"}}>Loading...</div>
  }
  

  // map
  const containerStyle = {
    width: '100vw',
    height: 'calc(100vh - 49px)'
  };

  return <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={5}
  >
    {
      catMapInfo.map((catMap:catMapInfo, index:number) => {
        return <MapMarker catMap={catMap} index={index} />
      })
    }
  </GoogleMap>
}

