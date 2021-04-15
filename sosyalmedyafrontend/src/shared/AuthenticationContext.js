import React, { Component } from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {
    state = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    onLoginSuccess = authState => {
        this.setState({
            ...authState,
            isLoggedIn: true
        });
    }

    onLogoutSuccess = () => {
        this.setState({
            username: undefined,
            isLoggedIn: false
        });
    }

    render() {
        return (
            <Authentication.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>
                {this.props.children}
            </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;