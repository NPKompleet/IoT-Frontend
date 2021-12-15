import React, { useEffect } from 'react'
import CollapsibleNavItem from './CollapsibleNavItem'
import NavItem from './NavItem'
import { useTranslation } from 'react-i18next';
import { loadPageScript } from '../../utils/pagescript';

const Sidebar = () => {
    const { t, } = useTranslation();

    useEffect(() => {
        loadPageScript();
    })
    return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">IoT DashBoard</div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <NavItem 
                    icon={"fa-home"}
                    link={"/"}
                    text={t("home")}
                />

                <NavItem 
                    icon={"fa-user"}
                    link={"/profile"}
                    text={t("profile")}
                />

                <NavItem 
                    icon={"fa-cogs"}
                    link={"/settings"}
                    text={t("settings")}
                />

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Interface
                </div>

                <CollapsibleNavItem 
                    id = {"collapseTwo"}
                    icon={"fa-cog"} 
                    text={"Components"} 
                    subtext={"Custom Components:"}
                    items ={[["Buttons", "buttons.html"], ["Cards","cards.html"]]}
                />

                <CollapsibleNavItem 
                    id = {"collapseUtilities"}
                    icon={"fa-wrench"} 
                    text={"Utilities"} 
                    subtext={"Custom Utilities:"}
                    items ={[["Colors", "utilities-color.html"], ["Borders","utilities-border.html"], ["Animations","utilities-animation.html"], ["Other","utilities-other.html"]]}
                />

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    {t("navigation")}
                </div>

                <CollapsibleNavItem 
                    id = {"collapsePages"}
                    icon={"fa-folder"} 
                    text={t("pages")} 
                    subtext={"Screens:"}
                    items ={[["Login", "login.html"], ["Register","register.html"], ["Blank Page","blank.html"]]}
                />

                <hr className="sidebar-divider d-none d-md-block"/>

                {/* Sidebar Toggler (Sidebar) */}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
    )
}

export default Sidebar
