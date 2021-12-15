import React, { useContext, useState } from 'react'
import './profile.css'
import { useTranslation } from 'react-i18next'
import useLocalStorage from '../../hooks/use-local-storage'
import { AppContext } from '../../App'

const Profile = () => {
    const { t, } = useTranslation()

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">{t("profile")}</h1>
            <div className="row">
                <div className="d-flex flex-row align-items-start w-100">
                    <div className="tabsContainer card m-2">
                        <div className="card-body p-0">
                            <ProfilePictureArea/>
                        </div>
                    </div>
                    <div className="w-75 m-2">
                        <div className="contentsContainer card">
                            <div className="card-body">
                                <h5 className="border-bottom pb-2">Profile Settings</h5>
                                <ProfileInfoArea/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfilePictureArea = () => {
    const context = useContext(AppContext)
    const parsedProfile = context.profile

    return (
        <div className="h-50 pt-4">
            <img id="profileimage" className="d-block mx-auto" src="icons/profileicon.png" alt="Profile Image"/>
            <p className="small text-center mt-2 mb-0 font-weight-bold">{parsedProfile.name ?? "Name"}</p>
            <p className="small text-center">{parsedProfile.email ?? "email@email.com"}</p>
        </div>
    )
}

const ProfileInfoArea = () => {
    const context = useContext(AppContext)
    const profile = context.profile
    const profileUpdateHandler = context.profileUpdateHandler

    const [headers, setHeaders] = useLocalStorage("headers", "{}");
    const [parsedProfile, setParsedProfile] = useState(profile)
    const [parsedHeaders, setParsedHeaders] = useState(JSON.parse(headers))
    const [headerEntry, setHeaderEntry] = useState({key: "", value: ""})
    const [saved, setSaved] = useState(true)
    
    const onNameChange = e => {
        setParsedProfile({...parsedProfile, name: e.target.value})
        setSaved(false)
    }

    const onEmailChange = e => {
        setParsedProfile({...parsedProfile, email: e.target.value})
        setSaved(false)
    }

    const saveProfile = () => {
        profileUpdateHandler(parsedProfile)
        setSaved(true)
    }

    const onHeaderEntryKeyChange = e => {
        setHeaderEntry({...headerEntry, key: e.target.value})
    }

    const onHeaderEntryValueChange = e => {
        setHeaderEntry({...headerEntry, value: e.target.value})
    }

    const addHeader = () => {
        if (headerEntry.key !== "" && headerEntry.value !== "") {
            const newHeaders = {}
            newHeaders[headerEntry.key] = headerEntry.value
            setParsedHeaders({...parsedHeaders, ...newHeaders})
            setHeaders(JSON.stringify({...parsedHeaders, ...newHeaders}))
            setHeaderEntry({...headerEntry, key: "", value: ""})
        }
    }

    const removeHeader = (key) => {
        const newHeaders = {...parsedHeaders}
        delete newHeaders[key]
        
        setParsedHeaders({...newHeaders})
        setHeaders(JSON.stringify(newHeaders))
    }


    return (
        <div className="pt-2">
            <form>
                <div>
                    <label htmlFor="name" className="mr-2">Name: </label>
                    <input type="text" id="name" value={parsedProfile.name ?? ""} onChange={e => onNameChange(e)}/>
                </div>
                <div>
                    <label htmlFor="email" className="mr-2">Email: </label>
                    <input type="text" id="email" value={parsedProfile.email ?? ""} onChange={e => onEmailChange(e)}/>
                </div>
                <input className="btn btn-primary mt-2" type="button" value="Save" onClick={() => saveProfile()} disabled={saved}/>
            </form>
            <div>
                <h5 className="mt-4 border-bottom pb-2">Security Headers</h5>
                <div>
                    <div className="header-span font-weight-bold text-uppercase mr-2">Key</div>
                    <div className="header-span font-weight-bold text-uppercase">Value</div>
                    {
                        Object.entries(parsedHeaders).map((entry, index) => {
                            return (
                                <div key={index} className="mt-1">
                                    <input className="header-input mr-2" type="text" value={entry[0]} readOnly/>
                                    <input className="header-input mr-2" type="text" value={entry[1]} readOnly/>
                                    <button className="btn btn-dark header-remove" onClick={() => removeHeader(entry[0])}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            )
                        })
                    }
                    <div className="mt-1 mb-4">
                        <input className="header-input mr-2" type="text" placeholder="Key" value={headerEntry.key} onChange={e => onHeaderEntryKeyChange(e)}/>
                        <input className="header-input mr-2" type="text" placeholder="Value" value={headerEntry.value} onChange={e => onHeaderEntryValueChange(e)}/>
                        <button className="btn btn-primary header-remove" onClick={() => addHeader()}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
