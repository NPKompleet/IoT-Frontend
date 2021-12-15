import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * This component is just used to display data loading within
 * the {@link ThingTile} when the first network fetch is being done.
 * 
 * @category Dashboard
 * @component
 */
const LoadingItem = ({url}) => {
    const { t, } = useTranslation();

    return (
        <div className="card-body">
            <div className="loading" title={`${url}`}>
                <div className="loadingcontainer" style={{fontSize :'18px'}}>{t("loading")}... {url}</div>
            </div>
        </div>
    )
}

export default LoadingItem
