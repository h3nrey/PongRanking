import axios from "axios";

const BASEURL = process.env.API_URL || "http://localhost:8000/";

const api = axios.create({
  baseURL: BASEURL,
});

export default api;
