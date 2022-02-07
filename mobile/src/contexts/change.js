import React, { createContext, useState, useContext } from "react";
const ChangeContext = createContext();

export default function ChangeProvider({ children }) {
  const [change, setChange] = useState();

  return (
    <ChangeContext.Provider value={{change, setChange}}>
      {children}
    </ChangeContext.Provider>
  );
}

export function useChange() {
  const context = useContext(ChangeContext);
  const { change, setChange } = context;
  return {
    change, setChange
  };
}
