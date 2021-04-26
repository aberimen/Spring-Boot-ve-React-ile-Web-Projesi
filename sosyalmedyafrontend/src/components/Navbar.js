import React, { Component, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { changeLanguage } from '../api/apiCall';
import { logoutSuccess } from '../redux/authActions';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';


const Navbar = props => {

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const { isLoggedIn, username, firstName, image } = useSelector(store => {
        const { isLoggedIn, username, firstName, image } = store;
        return {
            isLoggedIn, username, firstName, image
        };
    });

    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click', menuClickListener); //mouse ile tıkladığımız elementleri dinlemek için
        return () => {
            document.removeEventListener('click', menuClickListener);
        }
    }, [isLoggedIn]);

    const menuArea = useRef(null);

    const menuClickListener = event => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) { //eğer tıkladığımız element menü alanı dışındaysa
            setDropdownVisible(false); //dropdown kapatılsın
        }
    };

    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

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
        let dropdownClass = "dropdown-menu dropdown-menu-dark";

        if (dropdownVisible) {
            dropdownClass += "  show";
        }

        links = (
            <ul className="navbar-nav ml-5" ref={menuArea}>
                <li className="nav-item dropdown">
                    <div className="d-flex">
                        <span className="nav-link dropdown-toggle" role="button" onClick={() => setDropdownVisible(!dropdownVisible)}>
                            <ProfileImage user={{ username, image }} className="rounded-circle mr-2" style={{ width: "30px", height: "30px" }} />
                            {firstName}
                        </span>
                    </div>
                    <div className={dropdownClass}>

                        <Link className="dropdown-item d-flex" to={`/user/${username}`} onClick={() => setDropdownVisible(false)}><span className="material-icons mr-2">person_outline</span>Profile</Link>

                        <Link className="dropdown-item d-flex" to="/" onClick={onLogoutSuccess}><span className="material-icons mr-2">logout</span>{t('Logout')}</Link>

                    </div>
                </li>
            </ul>
        );
    }
    return (
        <div className="bg-dark mb-3 ">

            <nav className="navbar navbar-dark navbar-expand  container" >
                <Link to="/" className="navbar-brand">App</Link>


                <div className="navbar ml-auto">

                    <img src="https://flagcdn.com/w20/tr.png" style={{ cursor: "pointer" }} onClick={() => onChangeLanguage("tr")} />
                    <img src="https://flagcdn.com/w20/gb.png" style={{ cursor: "pointer" }} onClick={() => onChangeLanguage("en")} />
                    {links}
                </div>

            </nav>
        </div>
    );
}


export default Navbar;