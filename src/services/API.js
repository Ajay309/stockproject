import axios from "axios";

export const BASEURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BACKEND_URI
    : import.meta.env.VITE_PROD_BACKEND_URI;

export const API = BASEURL;

export const axiosInstance = axios.create({
  baseURL: `${BASEURL}/`,
});
