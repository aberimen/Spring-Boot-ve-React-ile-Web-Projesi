import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {

        let requestInterceptor, responseInterceptor;

        const checkPath = (url, isProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(isProgress);
            }
        };

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                checkPath(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use(response => {
                checkPath(response.config.url, false);
                return response;
            }, error => {
                checkPath(error.config.url, false);
                throw error;
            });

        }
        registerInterceptors();

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
        return function unmount() {
            unregisterInterceptors();
        }

    });

    return pendingApiCall;
}
