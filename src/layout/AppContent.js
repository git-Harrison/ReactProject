import {useLocation} from "react-router-dom";
import Header from "../components/nav/Header";
import SideMenu from "../components/nav/SideMenu";
import Router from "../router/Router";
import CatCanvas from "../hidden/Test1";
import React from "react";

function AppContent({hideOnPages, active, setActive}) {
    const location = useLocation();
    const showHeaderAndSideMenu = hideOnPages.includes(location.pathname);
    const isActive = active || showHeaderAndSideMenu;

    function handleMenuBgClick() {
        setActive(false);
    }

    return (
        <>
            <div className={`wrap_toggle ${isActive ? 'active' : ''}`}>
                {!showHeaderAndSideMenu && <Header/>}
                {!showHeaderAndSideMenu && <SideMenu onMenuBgClick={handleMenuBgClick}/>}

                <div className="page_wrapper">
                    <div className={`page_contents ${showHeaderAndSideMenu ? 'none' : ''}`}>
                        <Router/>
                    </div>
                </div>
            </div>

            {location.pathname === "/hidden" && <CatCanvas/>}
        </>
    );
}

export default AppContent;