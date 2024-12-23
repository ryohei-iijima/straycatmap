'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GoogleMapContextType = {
  lat: string | null,
  lng: string | null,
  setLat: (lat: string | null) => void,
  setLng: (lng: string | null) => void,
}

type GoogleMapProviderProps = {
  children: ReactNode;
};

const GoogleMapContext = createContext<GoogleMapContextType | null>(null);

export const GoogleMapProvider = ({ children }: GoogleMapProviderProps) => {
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);

  return (
    <GoogleMapContext.Provider value={{ lat, lng, setLat, setLng }}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export const useGoogleMap = () => useContext(GoogleMapContext);
