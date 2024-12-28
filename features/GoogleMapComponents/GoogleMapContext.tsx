'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GoogleMapContextType = {
  lat: number | null,
  lng: number | null,
  setLat: (lat: number | null) => void,
  setLng: (lng: number | null) => void,
}

type GoogleMapProviderProps = {
  children: ReactNode;
};

const GoogleMapContext = createContext<GoogleMapContextType | null>(null);

export const GoogleMapProvider = ({ children }: GoogleMapProviderProps) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  return (
    <GoogleMapContext.Provider value={{ lat, lng, setLat, setLng }}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export const useGoogleMap = () => useContext(GoogleMapContext);
