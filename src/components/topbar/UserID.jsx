import React, { useContext } from 'react'
import { AppContext } from '../../App'

const UserID = () => {
    const context = useContext(AppContext)
    const parsedProfile = context.profile

    return (
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{parsedProfile.name ?? "name"}</span>
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
        </a>
    )
}


export default UserID
