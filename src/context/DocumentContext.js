import { createContext, useState, useEffect } from "react";
import { getAllDocuments, createNewDocument } from "../api";
export const DocumentContext = createContext({
  documents: [],
  setDocuments() {},
  currentDoc: {},
  setCurrentDoc() {},
  docLoading: Boolean(),
  setDocLoading() {},
  frameElement() {},
  createDocument() {},
  fetchCurrentDocumet() {},
});

export const DocumentContextProvider = ({ children }) => {
  const [documents, setDocuments] = useState(null);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [docLoading, setDocLoading] = useState(false);

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const fetchAllDocuments = async () => {
    setDocLoading(true);
    try {
      const res = await getAllDocuments();
      setDocuments(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setDocLoading(false);
    }
  };

  const fetchCurrentDocumet = async (docId) => {};

  const createDocument = async (docData) => {
    setDocLoading(true);
    try {
      const res = await createNewDocument(docData);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setDocLoading(false);
    }
  };

  const contextValue = {
    documents,
    setDocuments,
    currentDoc,
    setCurrentDoc,
    docLoading,
    setDocLoading,
    fetchAllDocuments,
    createDocument,
    fetchCurrentDocumet,
  };
  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};
