import React from "react";
import { GoogleMapComponents } from "features/GoogleMapComponents/GoogleMapComponents";

const modalOpen = (catMap:object, setIsModal, setSelectCatInfo) => {
    setIsModal(true);
    setSelectCatInfo(catMap)
}

const modalClose = (setIsModal) => {
    setIsModal(false);
}

const addCatMapModalOpen = (setIsAddCatMapModal) => {
    setIsAddCatMapModal(true);
}

const addCatMapModalClose = (setIsAddCatMapModal) => {
    setIsAddCatMapModal(false);
}


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

    const fetchCurrentPosition = () =>{
        return new Promise((resolve, rejects) => {
        navigator.geolocation.getCurrentPosition(resolve,rejects)
        })
    } 
    await fetchCurrentPosition().then(position => {
        currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        }
        zoom = 15
    })

    return await {
        currentPosition: currentPosition,
        zoom: zoom
    }
}


export const createMap = (catMapInfo, isCurrentPosition, center, modalOpen, setIsCurrentPosition) => {
    if (catMapInfo?.length === 0) {
        return <div style={{margin: "100px"}}>まだ登録されている猫はいません</div>
    } else {
        getCurrentPosition().then(data => {
            setIsCurrentPosition(true)
        });
      
        return <GoogleMapComponents catMapInfo={catMapInfo} isCurrentPosition={isCurrentPosition} center={center} modalOpen={modalOpen}></GoogleMapComponents>
    }
}