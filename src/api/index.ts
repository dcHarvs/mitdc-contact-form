import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})