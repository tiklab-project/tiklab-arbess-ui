import {Axios as serviceLoc} from "tiklab-core-ui";
import axios from "axios";

const BASE_URL = "http://192.168.10.15:8080"
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});
// 请求拦截

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 响应拦截
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})

export {service,serviceLoc};
