import { createContext, useState } from "react";
import {
  getDocumentById,
  removeDocumentById,
  updateDocumentById,
} from "../api";
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
  doc: Object,
  setDoc() {},
  title: String,
  setTitle() {},
  error: Object,
  setError() {},
  fetchDocById(docId) {},
  updateDocInfo(docId, name) {},
  deleteDocById(docId) {},
  manageDocSharing(docId, users) {},
});

export const DocContextProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [doc, setDoc] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState({ have: false, message: "" });

  const fetchDocById = (docId) => {
    if (!docId) return;
    setIsFetching(true);
    getDocumentById({ docId })
      .then((res) => {
        setDoc(res?.data?.doc);
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

  const updateDocInfo = async (docId, name) => {
    if (!docId || !name) return;
    return await updateDocumentById({ docId, name });
  };

  const deleteDocById = async (docId) => {
    if (!docId) return;
    return await removeDocumentById({ docId });
  };

  const manageDocSharing = (docId, users) => {};

  const contextValue = {
    role,
    setRole,
    isFetching,
    setIsFetching,
    doc,
    setDoc,
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
