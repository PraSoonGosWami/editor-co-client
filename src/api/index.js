import axios from "axios";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../constants";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
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
export const createNewDocument = () => API.get("");
