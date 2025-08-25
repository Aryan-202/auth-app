import { createContext, use, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/-s-auth`, { withCredentials: true });
            setIsLoggedin(data.isLoggedin);
            setUserData(data.user || false);
        } catch (error) {
            toast.error(error.message || 'Failed to fetch auth state');
        }
    }


    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
    
    }



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};