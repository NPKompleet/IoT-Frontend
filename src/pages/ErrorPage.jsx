import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * This page is displayed when a users navigates to a none existent path in the application or does not push the right parameters to an exisiting path.
 * 
 * @category Pages
 * @component
 */
const ErrorPage = () => {
    const { t, } = useTranslation();

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">{t("error")}</h1>
            <div className="row">
                <div>
                    {t("error_page_message")}
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
