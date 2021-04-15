import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { changeLanguage } from '../api/apiCall';


class Navbar extends Component {

    onChangeLanguage = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    render() {
        const { t } = this.props;
        return (
            <div className="bg-dark mb-3 ">

                <nav className="navbar navbar-dark navbar-expand  container" >
                    <Link to="/" className="navbar-brand">App</Link>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">{t('Login')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">{t('Sign Up')}</Link>
                        </li>
                    </ul>

                    <div className="navbar">

                        <img src="https://www.countryflags.io/tr/flat/24.png" style={{ cursor: "pointer" }} onClick={() => this.onChangeLanguage("tr")} />
                        <img src="https://www.countryflags.io/gb/flat/24.png" style={{ cursor: "pointer" }} onClick={() => this.onChangeLanguage("en")} />
                    </div>

                </nav>

            </div>
        );
    }
}

export default withTranslation()(Navbar);