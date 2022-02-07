import React, { createContext, useState, useContext } from "react";
const MapContext = createContext();

export default function MapProvider({ children }) {
  const [isModalMapVisible, setIsModalMapVisible] = useState(false);
  const [clickedPetshop, setClickedPetshop] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <MapContext.Provider value={{
        isModalMapVisible, setIsModalMapVisible, 
        clickedPetshop, setClickedPetshop, 
        destination, setDestination,
        distance, setDistance,
        time, setTime
    }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  const { 
    isModalMapVisible, setIsModalMapVisible, 
    clickedPetshop, setClickedPetshop, 
    destination, setDestination,
    distance, setDistance,
    time, setTime
  } = context;
  return {
    isModalMapVisible, setIsModalMapVisible, 
    clickedPetshop, setClickedPetshop, 
    destination, setDestination,
    distance, setDistance,
    time, setTime
  };
}
