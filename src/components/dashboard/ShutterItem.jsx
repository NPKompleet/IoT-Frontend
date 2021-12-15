import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import useMultipleFetch from '../../hooks/use-multiple-fetch';
import useInterval from '../../hooks/use-interval';
import Shutter from '../shutter';
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';

/**
 * This component is just a container used to hold any {@link Shutter} sensor item.
 * It is responsible for making periodic calls to fetch the current values of the sensor 
 * to be displayed in the dashboard. It relies on {@link useInterval} and {@link useMultipleFetch} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const ShutterItem = ({positionUrl, slatAngleUrl}) => {
    const [startTime, setStartTime] = useState(Date.now());
    const memoizedUrlList = useMemo(() => {
        return [positionUrl, slatAngleUrl]}, [positionUrl, slatAngleUrl])
    const {isLoading, isError, data} = useMultipleFetch(memoizedUrlList, 'GET', null, startTime);

    useInterval(() => {
        setStartTime(Date.now());
        }
    );

    if (isLoading){
        return <LoadingItem/>;
    }

    if (isError){
        return <ErrorItem url={positionUrl}/>;
    }

    console.log(data);

    return (
        <div>
            <div className="card-body">
                <div className="tachometer">
                    <div className="tachometercontainer">
                        <Shutter 
                            position={data[0]['position']}
                            slatAngle={data[1]['slatAngle']}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

ShutterItem.propTypes = {
    /**
     * The endpoint to fetch the current position value from.
     */
    positionUrl: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the current slat angle value from.
     */
    slatAngleUrl: PropTypes.string.isRequired,
}

export default ShutterItem
