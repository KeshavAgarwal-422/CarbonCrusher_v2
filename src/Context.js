import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";


const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [transportMode, setTransportMode] = useState("Walking");



  return (
    <stateContext.Provider
      value={{
        transportMode,
        setTransportMode,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);