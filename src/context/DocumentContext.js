import { createContext, useEffect, useState } from "react";
import { getDocumentsById, removeDocumentsById } from "../api";
import {
  USER_ROLE_EDITOR_OWNERR,
  USER_ROLE_UNDEFINDED,
  USER_ROLE_VIEWER,
} from "../constants";
export const DocContext = createContext({
  role: String,
  setRole() {},
  isFetching: Boolean,
  setIsFetching() {},
  data: Object,
  setData() {},
  title: String,
  setTitle() {},
  error: Object,
  setError() {},
  fetchDocById() {},
  updateDocInfo() {},
  deleteDocById() {},
  manageDocSharing() {},
});

export const DocContextProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("Loading...");
  const [error, setError] = useState({ have: false, message: "" });

  const fetchDocById = (docId) => {
    if (!docId) return;
    setIsFetching(true);
    getDocumentsById({ docId })
      .then((res) => {
        setData(res?.data?.doc?.data);
        setTitle(res?.data?.doc?.name);
        const roleData = res?.data?.role;
        if (!roleData) setRole(USER_ROLE_UNDEFINDED);
        if (roleData === "editor" || roleData === "owner")
          setRole(USER_ROLE_EDITOR_OWNERR);
        if (roleData === "viewer") setRole(USER_ROLE_VIEWER);
      })
      .catch((err) => {
        const { status, data } = err?.response;
        //redirect to 404 page
        if (status === 404) {
          setError({ have: true, message: data?.message || "" });
        }
        //alert with no permissions
        if (status === 401) {
          setError({ have: true, message: data?.message || "" });
        }
        console.error(err?.response);
      })
      .finally(() => setIsFetching(false));
  };

  const updateDocInfo = (docId, updatedData) => {};

  const deleteDocById = (docId) => {};

  const manageDocSharing = (docId, users) => {};

  const contextValue = {
    role,
    setRole,
    isFetching,
    setIsFetching,
    data,
    setData,
    title,
    setTitle,
    error,
    setError,
    fetchDocById,
    updateDocInfo,
    deleteDocById,
    manageDocSharing,
  };

  return (
    <DocContext.Provider value={contextValue}>{children}</DocContext.Provider>
  );
};
