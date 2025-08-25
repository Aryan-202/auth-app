import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async ()=>{
      try {
        const {data} = await axios.get(`${backendUrl}/api/auth/get-user`);
        data.success ? setUserData(data.userData) : toast.error(data.message || 'Failed to fetch user data');
      } catch (error) {
        toast.error(error.message || 'Failed to fetch user data');
      }
    }

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (data?.success) {
                setIsLoggedin(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to fetch auth state');
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};