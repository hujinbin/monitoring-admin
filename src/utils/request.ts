import axios, { AxiosRequestConfig } from 'axios';
import { ICommonResponse } from "../interfaces/common";


const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

instance.interceptors.request.use(config => {
    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(res => res, err => Promise.reject(err));

const request = async <T = any>(config: AxiosRequestConfig): Promise<ICommonResponse<T>> => {
    try {
        const response = await instance(config);
        return response.data;
    } catch (err) {
        // @ts-ignore
        const msg = err.message || '请求失败';
        return {
            code: -1000,
            msg,
            data: null as any,
        };
    }
};

export default request;