import React from "react";
import { GoogleMapComponents } from "features/GoogleMapComponents/GoogleMapComponents";

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

const getCurrentPosition = async () => {
    let currentPosition = {
        lat: 35.75090315915706,
        lng: 139.78810085682267
    };
    let zoom = 6;
    if (!navigator.geolocation) {
        return {
        currentPosition: currentPosition,
        zoom: zoom
        }
    }

    const fetchCurrentPosition = (): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };
    
    try {
        const position = await fetchCurrentPosition();
        currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        zoom = 15;
    } catch (error) {
        // エラーハンドリングを行う
        console.error('Error fetching current position:', error);
    }

    return await {
        currentPosition: currentPosition,
        zoom: zoom
    }
}


export const createMap = (catMapInfo:catMapInfoType, isCurrentPosition:Boolean, center:object, modalOpen:Function, setIsCurrentPosition: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (catMapInfo?.length === 0) {
        return <div style={{margin: "100px"}}>まだ登録されている猫はいません</div>
    } else {
        getCurrentPosition().then(data => {
            setIsCurrentPosition(true)
        });
      
        return <GoogleMapComponents />
    }
}