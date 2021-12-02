import axios from "axios";
// import store from "@/store";
import Qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60000,
  withCredentials: true,
  // eslint-disable-next-line func-names
  transformRequest: [function(data) {
    return Qs.stringify(data); // 使用Qs将请求参数序列化
  }],
  // 设置请求头
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config;
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line no-console
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
    // const res = response;
    // console.log(res);

    // if the custom code is not 20000, it is judged as an error.
    // if (response.code !== 200) {
    // console.log(response);
    if (response.data.code !== 200) {
      // alert(response.data.message || "Error");
      // return Promise.reject(new Error(res.message || 'Error'))
      return response.data;
      // return Promise.reject("失败");
    } else {
      return response.data;
    }
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log(`err${error}`); // for debug
    // alert("服务器内部错误, 请联系开发人员. 错误提示:" + error);
    return Promise.reject(error);
  }
);

export default service;
