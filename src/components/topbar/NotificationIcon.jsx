import React from 'react'

const NotificationIcon = (props) => {
    const {icon, count} = props;
    
    return (
        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className={`fas ${icon} fa-fw`}></i>
            <span className="badge badge-danger badge-counter">{count}</span>
        </a>
    )
}

export default NotificationIcon
