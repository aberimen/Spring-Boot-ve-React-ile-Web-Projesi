import React from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from "../api/ApiProgress";
import { withTranslation } from "react-i18next";
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { loginHandler } from '../redux/authActions';


class LogInPage extends React.Component {
    // static contextType = Authentication;

    state = {
        username: null,
        password: null,
        error: null,
    }

    onChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            error: null
        });
    }

    onClickLogin = async event => {
        event.preventDefault();

        const { username, password } = this.state;
        //const { onLoginSuccess } = this.context;

        this.setState({ error: null });

        const { push } = this.props.history;
        console.log(this.props);
        const creds = {
            username,
            password
        }

        try {
            const response = await this.props.dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            this.setState({ error: apiError.response.data.message });
        }

    }

    render() {
        const { pendingApiCall } = this.props;
        const { error } = this.state;

        return (
            <div className="container">
                <form>
                    <Input label="Username" name="username" onChange={this.onChange} />
                    <Input label="Password" name="password" type="password" onChange={this.onChange} />
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <ButtonWithProgress pendingApiCall={pendingApiCall} disabled={pendingApiCall} onClick={this.onClickLogin}></ButtonWithProgress>
                </form>
            </div>

        );
    }
}

const LoginPageWithTranslation = withTranslation()(LogInPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/auth');
export default connect()(LoginPageWithApiProgress);