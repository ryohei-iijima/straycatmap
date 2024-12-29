'use client';

import React, { useEffect, useRef } from 'react';
import styles from './GoogleMap.module.scss';

type GoogleMapProps = {
  addClass?: string;
  onMapLoad?: (map: google.maps.Map) => void;
};

const DEFAULT_LAT = 35.75090315915706;
const DEFAULT_LNG = 139.78810085682267;
const DEFAULT_ZOOM = 4;

if (typeof document !== 'undefined') {
  // @ts-ignore
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,v: "weekly",});
}

export let googleMapInstance: google.maps.Map | null = null;

export const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async (): Promise<void> => {
      const position = {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG
      };
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const map = new Map(mapRef.current as HTMLDivElement, {
        zoom: DEFAULT_ZOOM,
        center: position,
        mapId: 'DEFAULT_MAP',
        disableDefaultUI: true,
      });

      if(props.onMapLoad) {
        props.onMapLoad(map);
      }
    }
    
    initMap();
  }, []);

  return <>
    <div ref={mapRef} className={`${styles.map} ${props.addClass ? styles[props.addClass] : ''}`} id='map'></div>
  </>
}

