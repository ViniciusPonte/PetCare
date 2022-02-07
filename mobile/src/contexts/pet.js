import React, { createContext, useState, useContext } from "react";
const PetContext = createContext();

export default function PetProvider({ children }) {
  const [selectedPet, setSelectedPet] = useState();
  const [newPhoto, setNewPhoto] = useState('');

  return (
    <PetContext.Provider value={{selectedPet, setSelectedPet, newPhoto, setNewPhoto}}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const context = useContext(PetContext);
  const { selectedPet, setSelectedPet, newPhoto, setNewPhoto } = context;
  return { selectedPet, setSelectedPet, newPhoto, setNewPhoto };
}
