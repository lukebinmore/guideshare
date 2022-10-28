import axios from "axios";

/* Setting the default headers for the axios request. */
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

/* Creating two instances of axios. */
export const axiosRes = axios.create();
export const axiosReq = axios.create();
