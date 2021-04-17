import React, { Component } from 'react';
import axios from 'axios';

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        static displayName = "ApiProgress";
        state = {
            pendingApiCall: false
        }
        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.checkPath(request.url, true);
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(response => {
                this.checkPath(response.config.url, false);
                return response;
            }, error => {
                this.checkPath(error.config.url, false);
                throw error;
            });
        }

        componentWillUnmount() { // component kapandığında istekleri temizlemek için
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        checkPath = (url, isProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: isProgress });
            }
        };

        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;

            return (
                // <div>{React.cloneElement(this.props.children, { pendingApiCall })}</div>
                <WrappedComponent {...this.props} pendingApiCall={pendingApiCall} />
            )
        }
    }
}

