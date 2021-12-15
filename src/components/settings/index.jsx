import React, { useState } from 'react'
import GeneralSettings from './GeneralSettings';
import './settings.css'
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const { t, } = useTranslation();
    const settings = [t("general"), t("user"), t("security"), t("others")]
    const [current, setCurrent] = useState(0);
    
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">{t("settings")}</h1>
            <div className="row">
                <div className="d-flex flex-row align-items-start w-100">
                    <div className="tabsContainer card m-2">
                        <div className="card-body p-0">
                            {settings.map((setting, index)=>{
                                    return (
                                        <div key={index} 
                                            className={`tab border-bottom p-2 ${current === index && 'bg-secondary text-white'}`} onClick={() => setCurrent(index)}>
                                            {setting}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-75 m-2">
                        <div className="contentsContainer card">
                            <div className="card-body">
                                <h5 className="border-bottom pb-2">{settings[current]}</h5>
                                <SettingsContainer index={current}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SettingsContainer = ({index}) => {
    switch (index) {
        case 0:
            return <GeneralSettings/>;
    
        default:
            return <div></div>;
    }
}


export default Settings
