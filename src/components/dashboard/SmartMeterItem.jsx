import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import useMultipleFetch from '../../hooks/use-multiple-fetch';
import useInterval from '../../hooks/use-interval';
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';
import SmartMeter from '../smartmeter';

/**
 * This component is just a container used to hold any {@link SmartMeter} sensor item.
 * It is responsible for making periodic calls to fetch the current value of the sensor 
 * to be displayed in the dashboard. It relies on {@link useMultipleFetch} and {@link useInterval} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const SmartMeterItem = ({energyUrl, powerUrl}) => {

    const [startTime, setStartTime] = useState(Date.now());
    const memoizedUrlList = useMemo(() => {
        return [energyUrl, powerUrl]}, [energyUrl, powerUrl])
    const {isLoading, isError, data} = useMultipleFetch(memoizedUrlList, 'GET', null, startTime);

    useInterval(() => {
        setStartTime(Date.now());
        }
    );

    if (isLoading){
        return <LoadingItem/>;
    }

    if (isError){
        return <ErrorItem url={`${energyUrl}..${powerUrl}`}/>;
    }

    console.log(data);
    let currentDate = new Date()
    let timeArray = currentDate.toLocaleTimeString().split(' ')[0].split(':')
    let time = `${currentDate.getHours()}:${timeArray[1]}`

    return (
        <div>
            <div className="card-body">
                <div className="tachometer">
                    <div className="tachometercontainer">
                        <SmartMeter 
                            energyValue={data[0]['energy']}
                            powerValue={data[1]['power']}
                            time={time}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

SmartMeterItem.propTypes = {
    /**
     * The endpoint to fetch the current energy value from.
     */
    energyUrl: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the current power value from.
     */
    powerUrl: PropTypes.string.isRequired,
}

export default SmartMeterItem
