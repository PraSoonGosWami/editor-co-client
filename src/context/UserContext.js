import { createContext, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { signinWithGoogle } from "../api";
import { LOCAL_STORAGE_USER_DATA_KEY, GOOGLE_CLIENT_ID } from "../constants";

export const UserContext = createContext({
  profile: {},
  setProfile() {},
  isLoading: Boolean(),
  setIsLoading() {},
  signinUser() {},
  logoutUser() {},
});

export const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      setProfile(null);
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
    },
    onFailure: (err) => {
      console.log(err);
    },
  });

  const signinUser = async (userData) => {
    setIsLoading(true);
    try {
      await signinWithGoogle(userData);
      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA_KEY,
        JSON.stringify({ token: userData.token })
      );
      setProfile(userData.profile);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const logoutUser = () => {
    signOut();
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
