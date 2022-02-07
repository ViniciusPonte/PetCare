import React, { createContext, useState, useContext } from "react";
const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        isVisible, setIsVisible, content, setContent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  const { isVisible, setIsVisible, content, setContent } = context;
  return {
    isVisible, setIsVisible, content, setContent
  };
}