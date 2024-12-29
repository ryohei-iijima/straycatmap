'use client'

import React from 'react';
import { FC } from 'react';
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation';
import { GoogleMap } from 'features/GoogleMapComponents/GoogleMap';
import getCatMapInfo from 'features/CatMap/api/getCatMapInfo';
import { catMapInfo } from '../types';
import styles from 'features/GoogleMapComponents/GoogleMap.module.scss';

const mapMarker = (imageURL: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<div class='${styles.price}' style='background-image: url(${imageURL});'></div>`,
    'text/html'
  );
  return doc.body.firstChild;
}

const Top:FC = () => {
  const handleCallback = async (map: google.maps.Map) => {
    const catMapInfo = await getCatMapInfo();
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // マーカーを生成
    catMapInfo.map((catMap:catMapInfo) => {
      const markerElement = new AdvancedMarkerElement(
        {
          map: map,
          position: catMap.center,
          content: mapMarker(catMap.image)
        }
      );

      markerElement.addListener('click', () => {
        alert(`タイトル：${catMap.title}, 説明文：${catMap.describe}`)
      })
    })
  }
    
  return (
    <>
      <GoogleMap onMapLoad={handleCallback} />
      <GrobalNavigation/>
    </>
  )
};

export default Top;
