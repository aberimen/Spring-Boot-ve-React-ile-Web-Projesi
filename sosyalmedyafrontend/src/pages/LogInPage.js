import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from "../api/ApiProgress";
import { useTranslation } from "react-i18next";
//import { Authentication } from '../shared/AuthenticationContext';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';


const LogInPage = props => {
    // static contextType = Authentication;
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setError(undefined);
    }, [username, password]);

    const onClickLogin = async event => {
        event.preventDefault();

        setError(undefined);

        const { push } = props.history;
     
        const creds = {
            username,
            password
        }

        try {
            const response = await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message);
        }

    }

    const { pendingApiCall } = props;

    return (
        <div className="container">
            <form>
                <Input label={t("Username")} name="username" onChange={event => setUsername(event.target.value)} />
                <Input label={t("Password")} name="password" type="password" onChange={event => setPassword(event.target.value)} />
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <ButtonWithProgress pendingApiCall={pendingApiCall} disabled={pendingApiCall} onClick={onClickLogin}></ButtonWithProgress>
            </form>
        </div>

    );

}


export default withApiProgress(LogInPage, '/api/auth');