import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../hooks/use-fetch';
import useInterval from '../../hooks/use-interval';
import Thermometer from '../thermometer'
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';
import ActionItem from './ActionItem';

/**
 * This component is just a container used to hold any {@link Thermometer} sensor item.
 * It is responsible for making periodic calls to fetch the current value of the sensor 
 * to be displayed in the dashboard. It relies on {@link useFetch} and {@link useInterval} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const ThermometerItem = React.forwardRef(({url, min, max, actionUrl}, ref) => {
    const [startTime, setStartTime] = useState(Date.now());
    const {isLoading, isError, data} = useFetch(url, 'GET', null, startTime);
    const properties = ["temperature", "date", "time"]

    const refresh = () => setStartTime(Date.now());

    useInterval(() => {
        refresh();
        }
    );

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

    console.log(data);

    return (
        <div>
            <div className="card-body">
                <div className="tachometer">
                    <div className="tachometercontainer">
                    <Thermometer 
                        value={data['temperature']}
                        minimum ={min}
                        maximum ={max}/>
                    </div>
                    {
                        actionUrl ? <ActionItem actionUrl={actionUrl} type={'temperature'} value={data['temperature']} min={min}
                        max={max} properties={properties}/> : null
                    }
                </div>
            </div>
        </div>
    )
})

ThermometerItem.propTypes = {
    /**
     * The endpoint to fetch the current power value from.
     */
    url: PropTypes.string.isRequired,
    /**
     * The minimum value of temperature than can be measured by the sensor.
     */
    minimum: PropTypes.number.isRequired,
    /**
     * The maximum value of temperature than can be measured by the sensor.
     */
    maximum: PropTypes.number.isRequired
}

export default ThermometerItem
