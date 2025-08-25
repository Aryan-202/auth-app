import { createContext, use, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);


    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData
    }



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};