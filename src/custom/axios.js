import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8000",
});

instance.defaults.withCredentials = true;
// headers: {
//   "Content-Type": "application/json",
// },
// withCredentials: true,
// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN 12345";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },

  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;

    // console.log(errorData);
    try {
      switch (status) {
        // authentication (token related issues)
        case 401: {
          toast.error("Unauthorized the user. Please login...");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return status;
        }

        // forbidden (permission related issues)
        case 403: {
          // toast.error("You don't permission to access this resource...");
          // return Promise.reject(error);
          return status;
        }

        // bad request
        case 400: {
          return status;
        }

        // not found
        case 404: {
          return status;
        }

        // conflict
        case 409: {
          return status;
        }

        // unprocessable
        case 422: {
          return status;
        }

        // generic api error (server related) unexpected
        default: {
          return status;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default instance;
