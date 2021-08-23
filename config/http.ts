import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: "https://www.omdbapi.com/",
    params: {
        apikey: 'ab65a745'
    }
});

export const doFetch = (url: string, params: any, callback: Function, errCallback?: Function) => {
    
    return http.request({url, ...params})
    .then((response: AxiosResponse) => {
        if (response.status === 200) {
            callback(response.data);
        }
    })
    .catch((error: AxiosError) => {
        if (errCallback) errCallback(error);
        console.error(error);
    });
}