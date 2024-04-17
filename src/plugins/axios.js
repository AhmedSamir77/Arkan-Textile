import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Set your API base URL here
  timeout: 5000, // Set your desired timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from your storage (localStorage, sessionStorage, etc.)
    const userToken = Cookies.get("userToken"); // Adjust this according to your setup

    // If userToken exists, add it to the Authorization header
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
export default axiosInstance;
