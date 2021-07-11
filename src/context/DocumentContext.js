import { createContext, useState } from "react";
import {
  getDocumentById,
  removeDocumentById,
  updateDocumentById,
  updateSharingSettingsById,
} from "../api";
import {
  USER_ROLE_EDITOR,
  USER_ROLE_OWNER,
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
  manageDocSharing(docId, editors, viewers, isPrivate) {},
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
        if (roleData === "owner") setRole(USER_ROLE_OWNER);
        if (roleData === "editor") setRole(USER_ROLE_EDITOR);
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

  const manageDocSharing = async (docId, editors, viewers, isPrivate) => {
    if (!docId || !editors || !viewers || isPrivate === null) return;
    return await updateSharingSettingsById({
      docId,
      shared: { private: isPrivate, editors, viewers },
    });
  };

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
