import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { changeLanguage } from '../api/apiCall';
import { logoutSuccess } from '../redux/authActions';
import { useDispatch, useSelector } from 'react-redux';


const Navbar = props => {

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const { isLoggedIn, username } = useSelector(store => {
        const { isLoggedIn, username } = store;
        return {
            isLoggedIn, username
        };
    })


    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

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

                    <img src="https://www.countryflags.io/tr/flat/24.png" style={{ cursor: "pointer" }} onClick={() => onChangeLanguage("tr")} />
                    <img src="https://www.countryflags.io/gb/flat/24.png" style={{ cursor: "pointer" }} onClick={() => onChangeLanguage("en")} />
                </div>

            </nav>
        </div>
    );
}


export default Navbar;