import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api", // chỉnh đúng port backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
