import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export const queryString = data => {
  const keys = Object.keys(data);
  let qs = "";

  // eslint-disable-next-line array-callback-return
  keys.map((key, index) => {
    qs += `&${key}=${data[key]}`;
  });

  return qs;
};

export const getToken = () => {
  return cookies.get("elToken");
};

axios.interceptors.request.use(config => {
  const originalRequest = config;

  if (
    !(config.url.includes("login") ||
    config.url.includes("logout") ||
    config.url.includes("refresh-token") ||
    config.url.includes("initilize-org"))
  ) {
    if (originalRequest.headers.Authorization) {
      return config;
    } else {
      let token = getToken();
      const interval = setInterval(() => {
        if (token) {
          clearInterval(interval);
        } else {
          token = getToken();
        }
      }, 1);

      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return Promise.resolve(originalRequest);
      }
    }
    return Promise.resolve(originalRequest);
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});
