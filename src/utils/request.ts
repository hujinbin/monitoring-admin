import axios, { AxiosRequestConfig } from 'axios';
import { ICommonResponse } from '../interfaces/common';
import { message } from 'ant-design-vue';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://monitor.leheavengame.com/api';

const instance = axios.create({
    baseURL: apiBaseURL,
    timeout: 5000,
});

instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
);

instance.interceptors.response.use(
    res => res,
    err => Promise.reject(err),
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<ICommonResponse<T>> => {
    try {
        const response = await instance(config);
        if (response.data.code !== 200) {
            message.error(response.data.msg);
        }
        return response.data;
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
