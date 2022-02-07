import React, { createContext, useState, useContext } from "react";
const AdoptionContext = createContext();

export default function AdoptionProvider({ children }) {
  const [genderFilter, setGenderFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <AdoptionContext.Provider value={{genderFilter, setGenderFilter, typeFilter, setTypeFilter}}>
      {children}
    </AdoptionContext.Provider>
  );
}

export function useAdoption() {
  const context = useContext(AdoptionContext);
  const { genderFilter, setGenderFilter, typeFilter, setTypeFilter } = context;
  return {
    genderFilter, setGenderFilter, typeFilter, setTypeFilter
  };
}
