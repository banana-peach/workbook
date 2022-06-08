import axios from "axios";
// import store from "@/store";
import Qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: "http://127.0.0.1/tp5/public/", // url = base url + request url
  timeout: 60000,
  withCredentials: false,
  transformRequest: [function (data) {
    return Qs.stringify(data); // 使用Qs将请求参数序列化
  }],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    if (response.data.code !== 200) {
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log(`err${error}`); // for debug
    return Promise.reject(error);
  }
);

export default service;
