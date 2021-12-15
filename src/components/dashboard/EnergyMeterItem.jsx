import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../hooks/use-fetch';
import useInterval from '../../hooks/use-interval';
import EnergyMeter from '../energymeter'
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';

/**
 * This component is just a container used to hold any {@link EnergyMeter} sensor item.
 * It is responsible for making periodic calls to fetch the current value of the sensor 
 * to be displayed in the dashboard. It relies on {@link useInterval} and {@link useFetch} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const EnergyMeterItem = ({url}) => {
    const [startTime, setStartTime] = useState(Date.now());
    const {isLoading, isError, data} = useFetch(url, 'GET', null, startTime);

    useInterval(() => {
        setStartTime(Date.now());
        }
    );

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
                        <EnergyMeter value={data['energy']}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

EnergyMeterItem.propTypes = {
    /**
     * The endpoint to fetch the current value from.
     */
    url: PropTypes.string.isRequired,
}

export default EnergyMeterItem
