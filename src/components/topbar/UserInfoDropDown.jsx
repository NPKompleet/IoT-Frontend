import React from 'react'
import { useTranslation } from 'react-i18next'

const UserInfoItem = props => {
    const {icon, text, link} = props;
    return (
        <a className="dropdown-item" href={link}>
            <i className={`fas ${icon} fa-sm fa-fw mr-2 text-gray-400`}></i>
            {text}
        </a>
    )
}

const UserInfoDropDown = () => {
    const { t, } = useTranslation();
    return (
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <UserInfoItem icon={"fa-user"} text = {t("profile")} link={"/profile"}/> 
            <UserInfoItem icon={"fa-cogs"} text = {t("settings")} link={"/settings"}/>
            <div className="dropdown-divider"></div>
            <UserInfoItem icon={"fa-sign-out-alt"} text = {t("logout")} link={"/logout"}/>
        </div>
    )
}

export default UserInfoDropDown
