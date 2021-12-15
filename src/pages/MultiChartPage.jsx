import React, { useState } from 'react'
import { useHistory, useLocation} from 'react-router';
import useMultipleFetch from '../hooks/use-multiple-fetch';
import { useTranslation } from 'react-i18next';
import './pages.css'
import useInterval from '../hooks/use-interval';
import { SingleChartPanel } from './SingleChartPage';

/**
 * This is the page used to display more details of the history of values of a particular sensor or Thing. 
 * It is shown when a {@link MultipleTimeSeries} in any {@link ThingTile} is clicked.
 * It contains buttons for selecting how much interval of history should be shown. Either for
 * one day, one month or one year and retrieves the value history for the thing that corresponds to the
 * selected time interval. 
 * It can only be viewed by clicking on a {@link MultipleTimeSeries} otherwise the page 
 * redirects to an {@link ErrorPage} instead.
 * 
 * @category Pages
 * @component
 */
const MultiChartPage = () => {
    const { t, } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    if (location.state === undefined) {
        history.push('/error');
    }
    const datetimeFormat = t("datetime_format")
    const intervals = [t("hour"), t("day"), t("week")]
    const intervalValues = [3600, 86400, 604800]
    let now = parseInt(Date.now()/1000);
    const [state, setState] = useState({intervalIndex: 0, endTime: now, startTime: now - intervalValues[0], propertyIndex: 0})
    
    let body = JSON.stringify({
            "start": state.startTime,
            "end": state.endTime
            });
    
    const {isLoading, isError, data} = useMultipleFetch(location.state.urlList, 'POST', body, null, state.startTime, state.endTime);
    

    const handleIntervalChange = (index) => {
        let now = parseInt(Date.now()/1000)
        setState({
            intervalIndex: index, 
            endTime: now, 
            startTime: now - intervalValues[index],
            propertyIndex: 0
        })
    }

    const goBack = () => {
        history.goBack()
    }

    if (isLoading){
        return <div className="ml-3">{t("loading")}...</div>;
    }

    if (isError){
        return <div className="ml-3">{t("error")}...</div>;
    }

    console.log("data: " + data)

    return (
        <div className="detailChart p-2">
            {
                intervals.map((interval, index) => {
                    return <button key={index}
                                className={`btn btn-primary text-white rounded-0 border border-primary
                                            ${index === state.intervalIndex && 'bg-white text-primary'}`}
                                onClick={() => handleIntervalChange(index)}>
                                1 {interval}
                           </button>
                })
            }
            <button className="btn btn-primary text-white rounded-0 border border-primary right" onClick={() => goBack()}>
                <i class="fas fa-arrow-alt-circle-left mr-2"></i>
                {t("go_back")}
            </button>
            <MultiChartPanel
                description={location.state.description}
                isBinaryList={location.state.isBinaryList}
                xAxesLabelStringList={location.state.xAxesLabelStringList}
                yAxesLabelStringList={location.state.yAxesLabelStringList}
                typeList={location.state.typeList}
                dataSetList={data}
                startTime={state.startTime * 1000}
                endTime = {state.endTime * 1000}
                datetimeFormat={datetimeFormat}/>
        </div>
    );
}

const MultiChartPanel = ({description, isBinaryList, xAxesLabelStringList, yAxesLabelStringList, dataSetList, typeList, startTime, endTime, datetimeFormat}) => {
    const [propertyIndex, setPropertyIndex] = useState(0)
    
    const isBinary = isBinaryList[propertyIndex]
    const xAxesLabelString = xAxesLabelStringList[propertyIndex]
    const yAxesLabelString = yAxesLabelStringList[propertyIndex]
    const dataSet = dataSetList[propertyIndex]
    const type = typeList[propertyIndex]

    useInterval(() => {
        setPropertyIndex((propertyIndex + 1) % dataSetList.length)
    }, 10000)

    return <SingleChartPanel
                description={description}
                isBinary={isBinary}
                xAxesLabelString={xAxesLabelString}
                yAxesLabelString={yAxesLabelString}
                type={type}
                dataSet={dataSet}
                startTime={startTime}
                endTime = {endTime}
                datetimeFormat={datetimeFormat}/>
}

export default MultiChartPage
