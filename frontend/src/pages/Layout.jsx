import { Outlet, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import "./Layout.css";

const Layout = () => {
    const { t } = useTranslation();
    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        setMenuState(!menuState);
    };

    let menuContent = (
        <div className={`sidenav ${menuState ? 'open' : ''}`}>
            <ul>
                <li>
                    <Link to="/" className="menu-link">{t('layout.homeTitle')}</Link>
                </li>
                <li>
                    <Link to="/links" className="menu-link">{t('layout.linksTitle')}</Link>
                </li>
                <li>
                    <Link to="/settings" className="menu-link">{t('layout.settingsTitle')}</Link>
                </li>
            </ul>
        </div>
    );
  return (
    <>
        <div className="main">
        {menuContent}

        <div className="container">
            <header>
                <img src="./src/assets/Hamburger_icon.svg" alt="Hamburger" onClick={toggleMenu} className={menuState ? 'img open' : 'img'}/>
                <Link to="/">
                    <img src="./src/assets/Home_icon.png" alt="Home" className="img"/>
                </Link>
            </header>
            <div className="content">
                <Outlet />
            </div>
            </div>
        </div>
    </>
  )
};

export default Layout;