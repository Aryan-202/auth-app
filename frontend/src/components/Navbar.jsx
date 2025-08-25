import React, { useContext } from "react";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const logout = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendUrl}/api/auth/logout`);
      data.success && setUserData(null);
      setIsLoggedin(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">SecureAuth</span>
        </div>
        <div>
          <button onClick={logout} className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
            Logout
          </button>
        </div>
        {userData ? (
          // This will be false when userData is null
          <div className="relative group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white relative group cursor-pointer hover:scale-105 transition-all duration-200">
              
              {userData.name[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 pointer-events-none">
                <ul className="list-none bg-white text-sm rounded p-2 m-0 space-y-2 w-40 pointer-events-auto">
                  {!userData.isVerified && (
                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                      Verify Email
                    </li>
                  )}
                  <li onClick={logout} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
