import axios, { AxiosRequestConfig, Method } from 'axios';

const useConfig = (config: AxiosRequestConfig) => ({ 
    withCredentials: true, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', ...config,
    headers: { ...config.headers, 'x-use-sessions': 'true'}});

export default (method: Method, url: any, config = {}) => axios['request'](useConfig({method: method, url: url, ...config}));

export const Put = (url: any, data = {}, config = {}) => axios['put'](url, data, useConfig(config));
export const Post = (url: any, data = {}, config = {}) => axios['post'](url, data, useConfig(config));
