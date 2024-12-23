'use client';

import React, { useEffect, useState } from 'react';
import getCatMapInfo from 'features/CatMap/api/getCatMapInfo';
import { catMapInfos, catMapInfo } from 'features/Top/types';
import styles from './GoogleMapComponents.module.scss';
import { GoogleMapContextType, useGoogleMap } from './GoogleMapContext';

if (typeof document !== 'undefined') {
  // @ts-ignore
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,v: "weekly",});
}

const mapMarker = (imageURL: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<div class='${styles.price}' style='background-image: url(${imageURL});'></div>`,
    'text/html'
  );
  return doc.body.firstChild;
}

let lat = '';
let lng = '';

const initMap = async (catMapInfo:catMapInfos, googleMapContext: GoogleMapContextType): Promise<void> => {
  let longPressTimeout: any;
  const position = {
    lat: 35.75090315915706,
    lng: 139.78810085682267
  };
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  const map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 4,
    center: position,
    mapId: 'DEMO_MAP_ID',
    disableDefaultUI: true,
  });

  // マーカーを生成
  catMapInfo.map((catMap:catMapInfo) => {
    const markerElement = new AdvancedMarkerElement(
      {
        map: map,
        position: catMap.center,
        title: 'Uluru',
        content: mapMarker(catMap.image), // カスタムHTMLマーカーをセット
      }
    );

    markerElement.addListener('click', () => {
      console.log(catMap);
      alert(`タイトル：${catMap.title}, 説明文：${catMap.describe}`)
    })
  })

  // 地図上のイベントリスナー
  map.addListener("mousedown", (event: any) => {
    // 長押し開始
    longPressTimeout = setTimeout(() => {
      // 長押しが成功したら緯度経度を取得
      lat = event.latLng.lat();
      lng = event.latLng.lng();
      googleMapContext.setLat(lat);
      googleMapContext.setLng(lng);
    }, 500); // 長押し判定時間（ミリ秒）
  });

  map.addListener("mouseup", () => {
    // 長押し終了（タイマーをリセット）
    clearTimeout(longPressTimeout);
  });

  map.addListener("mouseout", () => {
    // 地図外にマウスが出た場合もタイマーをリセット
    clearTimeout(longPressTimeout);
  });
}

export const GoogleMapComponents: React.FC = () => {
  const [catMapInfo, setCatMapInfo] = useState<catMapInfos>([]);
  const googleMapContext = useGoogleMap();

  useEffect(() => {
    (async () => {
      const resultData = await getCatMapInfo();
      setCatMapInfo(resultData);
    })();
  }, []);

  useEffect(() => {
    if (catMapInfo.length === 0) return;
    if (typeof document !== 'undefined' && googleMapContext !== null) {
      initMap(catMapInfo, googleMapContext);
    }  
  }, [catMapInfo]);

  return <>
    <div className={styles.map} id='map'></div>
  </>
}

