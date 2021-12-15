import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * This component is just used to display network fetch errors within
 * the {@link ThingTile}. It is just a caution sign shown whenever
 * the network call returns an error. 
 * 
 * @category Dashboard
 * @component
 */
const ErrorItem = ({url}) => {
    const { t, } = useTranslation();

    return (
        <div className="card-body">
            <div className="error" title={`${url}`}>
                <div className="errorcontainer" style={{fontSize :'12px'}}>
                    <div className="w-100 h-100 text-center">
                        <img className="warning" src="icons/warning.png" alt={t("error")}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorItem
