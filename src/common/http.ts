import axios from 'axios';
import QueryString from 'query-string';

import { BASE_URL } from './env';
import { IDelete, IGet, IPatch, IPost, IPut } from './types';

const httpConfig = () => {
    const options = {
        baseURL: BASE_URL,
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': true },
        withCredentials: true,
        withXSRFToken: true,
    };
    const http = axios.create(options);

    const httpMultipart = axios.create({
        ...options,
        headers: { ...options.headers, 'Content-Type': 'multipart/form-data' },
    });

    // http.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if (error?.response?.status === 401 && window.location.pathname !== '/auth/login') {
    //             window.location.href = '/auth/logout';
    //         }
    //         if (error?.response?.status !== 500) {
    //             return Promise.reject(error.response);
    //         }
    //     }
    // );

    // httpMultipart.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         if (error?.response?.status === 401 && window.location.pathname !== '/auth/login') {
    //             window.location.href = '/auth/logout';
    //         }
    //         return Promise.reject(error.response);
    //     }
    // );

    return {
        post: async <T>({ url, body }: IPost<T>) => {
            const response = await http.post(url, JSON.stringify(body));
            return response.data;
        },

        patch: async <T>({ url, body }: IPatch<T>) => {
            const response = await http.patch(url, JSON.stringify(body));
            return response.data;
        },

        get: async <T>({ url, query }: IGet<T>) => {
            const queryString = `?${QueryString.stringify(query ?? {})}`;
            const Url = QueryString.stringify(query ?? {}) ? `${url + queryString}` : `${url}`;
            const response = await http.get(Url);
            return response.data;
        },

        delete: async ({ url }: IDelete) => {
            const response = await http.delete(url);
            return response.data;
        },

        put: async <T>({ url, body }: IPut<T>) => {
            const response = await http.put(url, JSON.stringify(body));
            return response.data;
        },

        upload: async <T>({ url, body }: IPost<T>) => {
            const response = await httpMultipart.post(url, JSON.stringify(body));
            return response.data;
        },
    };
};

export default httpConfig();
