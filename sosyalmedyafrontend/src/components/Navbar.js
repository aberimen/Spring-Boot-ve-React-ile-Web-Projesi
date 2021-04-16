import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { changeLanguage } from '../api/apiCall';
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';


class Navbar extends Component {

    //static contextType = Authentication;

    onChangeLanguage = (language) => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };


    render() {
        const { t, isLoggedIn, username , onLogoutSuccess} = this.props;

        let links = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">{t('Login')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">{t('Sign Up')}</Link>
                </li>
            </ul>
        );

        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/user/${username}`}>{username}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={onLogoutSuccess}>{t('Logout')}</Link>
                    </li>
                </ul>
            );
        }
        return (
            <div className="bg-dark mb-3 ">

                <nav className="navbar navbar-dark navbar-expand  container" >
                    <Link to="/" className="navbar-brand">App</Link>

                    {links}
                    <div className="navbar">

                        <img src="https://www.countryflags.io/tr/flat/24.png" style={{ cursor: "pointer" }} onClick={() => this.onChangeLanguage("tr")} />
                        <img src="https://www.countryflags.io/gb/flat/24.png" style={{ cursor: "pointer" }} onClick={() => this.onChangeLanguage("en")} />
                    </div>

                </nav>
            </div>
        );

    }
}


const mapStateToProps = (store) => {
    const { isLoggedIn, username } = store;
    return {
        isLoggedIn, username
    };
};

const mapDispatchToProps = dispatch => {
   return {
       onLogoutSuccess : () => dispatch(logoutSuccess())
   }
}

const NavbarWithTranslation = withTranslation()(Navbar);
export default connect(mapStateToProps, mapDispatchToProps)(NavbarWithTranslation);