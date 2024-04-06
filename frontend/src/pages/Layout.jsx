import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";

const Layout = () => {

    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        setMenuState(!menuState);
    };

    let menuContent = (
        <div className={`sidenav ${menuState ? 'open' : ''}`}>
            <ul>
                <li>
                    <Link to="/" className="menu-link">Home</Link>
                </li>
                <li>
                    <Link to="/settings" className="menu-link">Settings</Link>
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