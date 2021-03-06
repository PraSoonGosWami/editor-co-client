import axios from "axios";
import { LOCAL_STORAGE_USER_DATA_KEY, SERVER_URL } from "../constants";

const API = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)).token
    }`;
  }
  return req;
});

export const signinWithGoogle = (userData) => API.post("/auth", userData);
export const createNewDocument = (data) => API.post("/doc/create", data);
export const getAllDocuments = (token) =>
  API.get("/doc/get/user", { cancelToken: token });
export const getAllSharedDocuments = (token) =>
  API.get("/doc/get/shared", { ancelToken: token });
export const getDocumentById = (docId) => API.post("/doc/get/byId", docId);
export const removeDocumentById = (docId) =>
  API.post("/doc/delete/byId", docId);
export const updateDocumentById = (data) => API.post("/doc/update/byId", data);
export const updateSharingSettingsById = (data) =>
  API.post("/doc/sharing/byId", data);
