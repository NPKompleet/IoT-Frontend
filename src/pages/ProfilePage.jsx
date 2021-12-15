import React from 'react'
import { useTranslation } from 'react-i18next';
import Profile from '../components/profile';

const ProfilePage = () => {
    const { t, } = useTranslation();
    
    return (
        <Profile/>
    )
}

export default ProfilePage
