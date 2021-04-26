import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {

        let requestInterceptor, responseInterceptor;

        const checkPath = (method, url, isProgress) => {
            if (method !== apiMethod) {
                return;
            }
            else if (strictPath && url === apiPath) {
                setPendingApiCall(isProgress);
            }
            else if (!strictPath && url.startsWith(apiPath)) {
                setPendingApiCall(isProgress);
            }
        };

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                const { method, url } = request;
                checkPath(method, url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use(response => {
                const { method, url } = response.config;
                checkPath(method, url, false);
                return response;
            }, error => {
                const { method, url } = error.config;
                checkPath(method, url, false);
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

    }, [apiPath, apiMethod, strictPath]);

    return pendingApiCall;
}
