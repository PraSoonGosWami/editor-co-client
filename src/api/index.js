import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userData")).token
    }`;
  }
  return req;
});

export const signinWithGoogle = (userData) => API.post("/auth", userData);
export const createNewDocument = () => API.get("");
