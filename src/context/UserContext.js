import { createContext, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { signinWithGoogle } from "../api";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants";

export const UserContext = createContext({
  profile: {},
  setProfile() {},
  isLoading: Boolean(),
  setIsLoading() {},
  signinUser() {},
  logoutUser() {},
  fakeSignIn() {},
});

export const UserContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useGoogleLogout({
    clientId:
      "32272026461-hpch5mbll357l8ksb5bvfi2v85p0togg.apps.googleusercontent.com",
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
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const fakeSignIn = () => {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiZjhhODRkM2VjZDc3ZTlmMmFkNWYwNmZmZDI2MDcwMWRkMDZkOTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzIyNzIwMjY0NjEtaHBjaDVtYmxsMzU3bDhrc2I1YnZmaTJ2ODVwMHRvZ2cuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMjI3MjAyNjQ2MS1ocGNoNW1ibGwzNTdsOGtzYjVidmZpMnY4NXAwdG9nZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMTY3MzA3MDU5NDYzMDI4NjkyNSIsImVtYWlsIjoicHJhc29vbmdhbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLaFZHY1llcjRyR19oek8ySVo1bWtnIiwibmFtZSI6IlByYVNvb24gR29zV2FtaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaFpscmhzUW1rdmVwZEQyWmd4cnBWaDBmWm9QQU95TEJDUTlaUHZUZHc9czk2LWMiLCJnaXZlbl9uYW1lIjoiUHJhU29vbiIsImZhbWlseV9uYW1lIjoiR29zV2FtaSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjI2MDAzMTM3LCJleHAiOjE2MjYwMDY3MzcsImp0aSI6Ijc5NGVkNzg4ZThiMTJjMTEyY2FmYjJkNGZkYzAwM2IzMzFiMjRiMjYifQ.b_fTGKxnkrRTnzo-6fykm69EZF4ZUZRaLPqq40hxNGm-pVaE3NRo0FDTJj8VqooE024qbwT3_r8ZIU23Eowc11sSiuXIUx1IFVrGEqLpghogbq6wCS_xhRLIfOifLm7Vv871k0GxrM646I5iqJiUeVPMZCyht2oEYs9EwJBqzISI6sWIMYGSPvVyILZy_q8C5PrLZ1U4H78qUfBJaHE7y6Ej9WncvIrHTw4o0WDCGN7SYiiUwu3IFhdd0A8JP5Is-EOMP-Al_zd_DXUeH2vKrf6EAPo-6CrM2BsNz7NILHPjM5Os4rV9eE0vg9WDPFGTZ7Ru1w80y-NQEVnkK02BvQ";
    const profile = {
      email: "prasoongama@gmail.com",
      familyName: "Gosami",
      givenName: "Kriti",
      googleId: "101673070594630286925",
      imageUrl:
        "https://lh3.googleusercontent.com/a-/AOh14GhZlrhsQmkvepdD2ZgxrpVh0fZoPAOyLBCQ9ZPvTdw=s96-c",
      name: "Kriti Goswami",
    };
    localStorage.setItem(
      LOCAL_STORAGE_USER_DATA_KEY,
      JSON.stringify({ token: token })
    );
    setProfile(profile);
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
    fakeSignIn,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
