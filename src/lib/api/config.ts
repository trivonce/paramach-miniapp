import axios from "axios";

export const API_BASE_URL = "http://185.217.131.199";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}); 