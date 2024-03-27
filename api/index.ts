import axios from "axios";
import {getCookie} from "@/utils/cookieUtils";

export const API = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 35000,
    timeoutErrorMessage: 'time out!'
})

API.defaults.withCredentials = true;

API.interceptors.request.use(function (config) {
    const accessToken = getCookie('access_token')

    if (accessToken) {
        config.headers!['meerkat-x-header'] = accessToken
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});