import React from 'react'
import AlertDropDown from './AlertDropDown'
import NotificationIcon from './NotificationIcon'
import UserID from './UserID'
import UserInfoDropDown from './UserInfoDropDown'

const TopBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          {/* Sidebar Toggle (Topbar) */}
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>

          {/* Topbar Navbar */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow mx-1">
                <NotificationIcon icon={"fa-bell"} count={"0"}/>
                <AlertDropDown/>
            </li>

            {/* <li className="nav-item dropdown no-arrow mx-1">
                <NotificationIcon icon={"fa-envelope"} count={"7"}/>
                <MessageDropDown/>
            </li> */}

            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
              <UserID/>
              <UserInfoDropDown/>
            </li>

          </ul>

        </nav>
    )
}

export default TopBar
