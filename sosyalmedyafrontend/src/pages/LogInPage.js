import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from "../api/ApiProgress";
import { withTranslation } from "react-i18next";
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { loginHandler } from '../redux/authActions';


const LogInPage = props => {
    // static contextType = Authentication;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setError(undefined);
    }, [username, password]);

    const onClickLogin = async event => {
        event.preventDefault();

        //const { onLoginSuccess } = this.context;

        setError(undefined);

        const { push } = props.history;
        console.log(props);
        const creds = {
            username,
            password
        }

        try {
            const response = await props.dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message);
        }

    }

    const { pendingApiCall } = props;

    return (
        <div className="container">
            <form>
                <Input label="Username" name="username" onChange={event => setUsername(event.target.value)} />
                <Input label="Password" name="password" type="password" onChange={event => setPassword(event.target.value)} />
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <ButtonWithProgress pendingApiCall={pendingApiCall} disabled={pendingApiCall} onClick={onClickLogin}></ButtonWithProgress>
            </form>
        </div>

    );

}

const LoginPageWithTranslation = withTranslation()(LogInPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/auth');
export default connect()(LoginPageWithApiProgress);