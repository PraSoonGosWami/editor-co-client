import { createContext, useEffect, useState } from "react";
import { signinWithGoogle } from "../api";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants";

export const UserContext = createContext({
  profile: {},
  setProfile() {},
  isLoading: true,
  setIsLoading() {},
  signinUser() {},
  logoutUser() {},
});

export const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
    userData && setProfile(userData.profile);
    setIsLoading(false);
  }, []);

  const signinUser = async (userData) => {
    try {
      setIsLoading(true);
      const res = await signinWithGoogle(userData);
      console.log(res);
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify({ ...userData })
      );
      setProfile(userData.profile);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
  };

  const contextValue = {
    profile,
    setProfile,
    isLoading,
    setIsLoading,
    signinUser,
    logoutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
