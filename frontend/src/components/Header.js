import { useState } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import logo from "../images/header/logo.svg";

function Header({ onSignOut, email, isLoggedIn, loginLinkText, registerLinkText }) {
    const [isClickedBurger, setIsClickedBurger] = useState(false);
    function handleClickBurgerMenu() {
        setIsClickedBurger(!isClickedBurger)
    }
    return (
        <header className={`header ${isLoggedIn ? 'header_mobile' : ''}`}>
            <a href="/" className="header__logo" target="_blank"
            ><img
                    className="header__logo-img"
                    src={logo}
                    alt="Логотип Место"
                /></a>
            {email ? (
                <>
                    <button className="burger" onClick={handleClickBurgerMenu}>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                        <span className={`${isClickedBurger ? 'burger__bar' +
                            ' burger__bar_cross' : 'burger__bar'}`}></span>
                    </button>
                    <div className={`${isClickedBurger ? 'header__container' : 'header__container' +
                        ' header__container_inactive'}`}>
                        <p className="header__email">{email}</p>
                        <Link onClick={onSignOut} className="header__link" to="signin">
                            Выйти
                        </Link>
                    </div>
                </>
            ) : (
                <Switch>
                    <Route path='/signup'>
                        <Link className="header__link" to='/signin'>{loginLinkText}</Link>
                    </Route>
                    <Route path='/signin'>
                        <Link className="header__link" to='/signup'>{registerLinkText}</Link>
                    </Route>
                </Switch>
            )}
        </header>
    );
}

export default Header;