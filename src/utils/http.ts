import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Message } from 'element-ui'
import { ElBreadcrumbItem } from 'element-ui/types/breadcrumb-item';
import router from '@/router';

/**
 *  http 请求类
 * 
 *  请求拦截器，负责将客服端token的标识存储并放置在头部提交给服务器
 * 
 *  拦截响应器 负责全局处理业务请求网络或者业务错误 
 */

 // 创建axios实例

 const service = axios.create({
     timeout: 10000  // 请求超时
 })

 // 请求拦截
 service.interceptors.request.use((config: AxiosRequestConfig) => {
     if(!!localStorage.token) {
         config.headers.Authorization = localStorage.getItem('token');
     }
     return config;
 }, (err :any) => {
     Promise.reject(err)
 })

 // 响应拦截
 service.interceptors.response.use((response: AxiosResponse) => {
     return response;
 },(err: any) => {
     let errMsg = '';
     console.log(err)
     if(err && err.response.status) {
        switch(err.response.status) {
            case 401: {
                errMsg = "登陆状态失效，请重新登陆"; 
                localStorage.removeItem('token');
                router.push('/login');
                break;
            } 
            case 403: {
                errMsg = "访问受限"; 
                break;
            } 
            case 408: {
                errMsg = "请求超时"; 
                break;
            } 
            case 500: {
                errMsg = "服务器内部错误"; 
                break;
            } 
            case 501: {
                errMsg = "服务器未实现"; 
                break;
            } 
            case 502: {
                errMsg = "网关错误"; 
                break;
            } 
            case 503: {
                errMsg = "服务器不可用"; 
                break;
            } 
            case 504: {
                errMsg = "网关超时"; 
                break;
            } 
            case 505: {
                errMsg = "http版本不支持"; 
                break;
            } 
            default: {
                errMsg = err.response.data.msg
                break;
            } 
        }
     } else {
         errMsg = err;
     }
     Message.error(errMsg);
     return Promise.reject(errMsg);
 })

export default service;