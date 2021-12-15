import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../hooks/use-fetch';
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';
import SingleTimeSeries from '../timeseries/SingleTimeSeries';
import useInterval from '../../hooks/use-interval';
import { useHistory } from 'react-router';

/**
 * This is a component used as container to hold the {@link SingleTimeSeries} component
 * which is used to display a time series graph of the history of values for the
 * single-property items. It relies on {@link useFetch} to post the time interval of interest 
 * and {@link useInterval} for periodic posting of the data to get results.
 * 
 * @category Dashboard
 * @component
 */
const SingleTimeSeriesItem = React.forwardRef(({description, url, isBinary, xAxesLabelString, yAxesLabelString, type}, ref) => {
    const history = useHistory()
    let now = parseInt(Date.now()/1000);
    let start = isBinary ? now - 86400 : now - 3600
    const [time, setTime] = useState({endTime: now, startTime: start})

    const refresh = () => {
        now = parseInt(Date.now()/1000);
        start = isBinary ? now - 86400 : now - 3600
        setTime({endTime: now, startTime: start});
    }

    let body = JSON.stringify({
            "start": time.startTime,
            "end": time.endTime
            });

    useInterval(() => {
            refresh();
        }
    );
    const {isLoading, isError, data} = useFetch(url, 'POST', body, time.startTime, time.endTime);
    
    useImperativeHandle(ref, () => ({
        updateDisplay: () => {
            refresh();
        }
    }))

    if (isLoading){
        return <LoadingItem/>;
    }

    if (isError){
        return <ErrorItem url={url}/>;
    }

    console.log("date:" + time.endTime);
    console.log("series:" + data);

    const handleTimeSeriesClick = () => {
        history.push({
            pathname: '/single-chart',
            state: {
                description: description, 
                url: url,
                xAxesLabelString: xAxesLabelString,
                yAxesLabelString: yAxesLabelString,
                type: type,
                isBinary: isBinary
            }
        });
    }

    return (
        <div onClick={() => handleTimeSeriesClick()}>
            <div className="card-body p-0">
                <div className="time-series">
                    <div className="time-series-wrapper">
                        <SingleTimeSeries 
                            isBinary={isBinary} 
                            xAxesLabelString={xAxesLabelString} 
                            yAxesLabelString={yAxesLabelString}
                            dataSet={data}
                            type={type}
                            startTime={time.startTime * 1000}
                            endTime={time.endTime * 1000}/>
                    </div>
                </div>
            </div>
        </div>
    )
})

SingleTimeSeriesItem.propTypes = {
    /**
     * The name of the sensor element or item.
     */
    description: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the value history from.
     */
    url: PropTypes.string.isRequired,
    /**
     * A flag to check whether the value the sensor returns is a continuous value or
     * a two-state value like true and false.
     */
    isBinary: PropTypes.bool.isRequired,
    /**
     * The title of the x-axis of the time series.
     */
    xAxesLabelString: PropTypes.string.isRequired,
    /**
     * The title of the y-axis of the time series.
     */
    yAxesLabelString: PropTypes.string.isRequired,
    /**
     * The type of sensor value whose history is being displayed.
     */
    type: PropTypes.string.isRequired
}

export default SingleTimeSeriesItem
