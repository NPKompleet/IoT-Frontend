import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import useMultipleFetch from '../../hooks/use-multiple-fetch';
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';
import useInterval from '../../hooks/use-interval';
import MultipleTimeSeries from '../timeseries/MultipleTimeSeries';
import { useHistory } from 'react-router';

/**
 * This is a component used as container to hold the {@link MultipleTimeSeries} component
 * which is used to display a time series graph of the history of values for the
 * multiple-property items. It relies on {@link useMultipleFetch} to post the time interval of interest 
 * and {@link useInterval} for periodic posting of the data to get results.
 * 
 * @category Dashboard
 * @component
 */
const MultipleTimeSeriesItem = React.forwardRef(({description, urlList, xAxesLabelStringList, yAxesLabelStringList, typeList, isBinaryList}, ref) => {
    const history = useHistory()
    let now = parseInt(Date.now()/1000);
    const [time, setTime] = useState({endTime: now, startTime: now - 3600})
    
    let body = JSON.stringify({
            "start": time.startTime,
            "end": time.endTime
            });

    const refresh = () => {
        now = parseInt(Date.now()/1000);
        setTime({endTime: now, startTime: now - 3600});
    }

    useInterval(() => {
            refresh();
        }
    );

    const {isLoading, isError, data} = useMultipleFetch(urlList, 'POST', body, time.startTime, time.endTime);

    useImperativeHandle(ref, () => ({
        updateDisplay: () => {
            refresh();
        }
    }))

    if (isLoading){
        return <LoadingItem/>;
    }

    if (isError){
        return <ErrorItem url={urlList.join('...')}/>;
    }

    console.log("date:" + time.endTime);
    console.log("series:" + data);

    const handleTimeSeriesClick = () => {
        history.push({
            pathname: '/chart',
            state: { 
                description: description,
                urlList: urlList,
                xAxesLabelStringList: xAxesLabelStringList,
                yAxesLabelStringList: yAxesLabelStringList,
                typeList: typeList,
                isBinaryList: isBinaryList
            }
        });
    }


    return (
        <div onClick={() => handleTimeSeriesClick()}>
            <div className="card-body p-0">
                <div className="time-series">
                    <div className="time-series-wrapper">
                        <MultipleTimeSeries 
                            dataSetList = {data}
                            xAxesLabelStringList={xAxesLabelStringList} 
                            yAxesLabelStringList={yAxesLabelStringList}
                            typeList={typeList}
                            isBinaryList={isBinaryList}
                            startTime={time.startTime * 1000}
                            endTime={time.endTime * 1000}/>
                    </div>
                </div>
            </div>
        </div>
    )
})

MultipleTimeSeriesItem.propTypes = {
    /**
     * The name of the sensor element or item.
     */
    description: PropTypes.string.isRequired,
    /**
     * The list of endpoints to fetch the history of the different values from.
     */
    urlList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list of titles of the x-axis of each of the graphs in the time series.
     */
    xAxesLabelStringList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list of titles of the y-axis of each of the graphs in the time series.
     */
    yAxesLabelStringList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list of types of sensor values whose history is being displayed.
     */
    typeList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list flags to check whether the value which the multiple-property sensor 
     * returns is a continuous value or a two-state value like true and false.
     */
    isBinaryList: PropTypes.PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default MultipleTimeSeriesItem
