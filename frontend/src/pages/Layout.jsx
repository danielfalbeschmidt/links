import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";

const Layout = () => {

    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => {
        setMenuState(!menuState);
    };

    let menuContent = (
        <div className="sidenav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </div>
    );
  return (
    <>
        <div className="main">
        {menuState && menuContent}

        <div className="container">
            <header>
                <img src="./src/assets/Hamburger_icon.svg" alt="Hamburger" onClick={toggleMenu}/>
                <img src="./src/assets/Home_icon.png" alt="Home" onClick={() => {<Link to="/"/>}}/>
            </header>
            <Outlet />
            </div>
        </div>
    </>
  )
};

export default Layout;