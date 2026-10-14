import axios from "axios";

const API = axios.create({
  baseURL: "https://book-review-app-1-b9ch.onrender.com/api",
});

export default API;