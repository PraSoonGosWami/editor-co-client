import axios from "axios";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants";

const API = axios.create({
  baseURL: "http://192.168.29.109:5000/api/v1",
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
export const getAllDocuments = () => API.get("/doc/get/user");
export const getAllSharedDocuments = () => API.get("/doc/get/shared");
export const getDocumentsById = (docId) => API.post("/doc/get/byId", docId);
export const removeDocumentsById = (docId) =>
  API.delete("/doc/delete/byId", docId);
