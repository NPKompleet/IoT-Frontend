import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../hooks/use-fetch';
import useInterval from '../../hooks/use-interval';
import Tachometer from '../tachometer'
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';

/**
 * This component is just a container used to hold any {@link Tachometer} sensor item.
 * It is responsible for making periodic calls to fetch the current value of the sensor 
 * to be displayed in the dashboard. It relies on {@link useFetch} and {@link useInterval} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const TachometerItem = ({url, type}) => {
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
                        <Tachometer value={data[type]}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

TachometerItem.propTypes = {
    /**
     * The endpoint to fetch the current power value from.
     */
    url: PropTypes.string.isRequired,
    /**
     * The type of power device. It must be one of <em>powerA</em>, <em>powerB</em>, 
     * <em>powerC</em>, <em>power</em>.
     */
    type: PropTypes.oneOf(['powerA', 'powerB', 'powerC', 'power']).isRequired
}

export default TachometerItem
