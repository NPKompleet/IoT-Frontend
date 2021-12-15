import React, {useEffect, useState} from 'react'
import { useHistory, useLocation} from 'react-router';
import DashboardTab from '../components/dashboard'
import useFetch from '../hooks/use-fetch';
import { useTranslation } from 'react-i18next';

/**
 * This is the main page of the application. It displays all the {@link Floor}, {@link Space} and Things in a building. It receives the URL to the building from the {@link HomePage} and does fetches the data for that specific building. It can only be viewed by submitting the URL in the {@link HomePage} otherwise the url will be null and the page redirects to an {@link ErrorPage} instead.
 *
 * @category Pages
 * @component
 */
const DashboardPage = () => {
    const [url, setUrl] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state === undefined) {
            history.push('/error');
        }else{
            setUrl(location.state.url);
        }
    }, [location, url, history]);

    if (url === ""){
        return <div className="ml-3">Loading...</div>;
    }
    return (
            <DashboardPanel url={url}/>
    )
}

const DashboardPanel = ({url}) => {
    const {t, } = useTranslation();
    const {isLoading, isError, data} = useFetch(url);

    if (isLoading){
        return <div className="ml-3">{t("loading")}...</div>;
    }
    if (isError){
        return <div className="ml-3">{t("error")}. {t("invalid_url_message")}: {url}</div>;
    }

    if(data["bot:hasBuilding"] !== undefined){
        return (
            <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">{data["bot:hasBuilding"][0]["schema:name"]}</h1>
                <div className="row">
                    <DashboardTab floors={data["bot:hasBuilding"][0]["bot:hasStorey"]}/>
                </div>
            </div>
        )
    } else {
        return <div className="ml-3">{t("invalid_url_message")}: {url}</div>;
    }
}

export default DashboardPage
