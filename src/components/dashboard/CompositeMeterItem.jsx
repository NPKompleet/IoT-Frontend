import React, { useImperativeHandle, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import useMultipleFetch from '../../hooks/use-multiple-fetch';
import useInterval from '../../hooks/use-interval';
import CompositeMeter from '../compositemeter'
import ErrorItem from './ErrorItem';
import LoadingItem from './LoadingItem';
import ActionItem from './ActionItem';

/**
 * This component is just a container used to hold any {@link CompositeMeter} sensor item.
 * It is responsible for making periodic calls to fetch the current value of the sensor 
 * to be displayed in the dashboard. It relies on {@link useInterval} and {@link useMultipleFetch} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const CompositeMeterItem = React.forwardRef(({energyUrl, powerUrl, temperatureUrl, switchUrl, actionUrl}, ref) => {

    const [startTime, setStartTime] = useState(Date.now());
    const memoizedUrlList = useMemo(() => {
        return [energyUrl, powerUrl, temperatureUrl, switchUrl]}, [energyUrl, powerUrl, temperatureUrl, switchUrl])
    const {isLoading, isError, data} = useMultipleFetch(memoizedUrlList, 'GET', null, startTime);
    const refresh = () => setStartTime(Date.now());
    const properties = ["energy", "power", "temperature", "onOff", "date", "time"]

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
        return <ErrorItem url={`${energyUrl}..${powerUrl}..${temperatureUrl}..${switchUrl}`}/>;
    }

    console.log(data);

    return (
        <div>
            <div className="card-body">
                <div className="tachometer">
                    <div className="tachometercontainer">
                        <CompositeMeter 
                            energyValue={data[0]['energy']}
                            powerValue={data[1]['power']}
                            temperatureValue={data[2]['temperature']}
                            switchValue={data[3]['onOff']}/>
                    </div>
                    {
                        actionUrl ? <ActionItem actionUrl={actionUrl} type={'composite'} value={data[3]['onOff']} properties={properties}/> : null
                    }
                </div>
            </div>
        </div>
    )
})

CompositeMeterItem.propTypes = {
    /**
     * The endpoint to fetch the current energy value from.
     */
    energyUrl: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the current power value from.
     */
    powerUrl: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the current temperature value from.
     */
    temperatureUrl: PropTypes.string.isRequired,
    /**
     * The endpoint to fetch the current switch state from.
     */
    switchUrl: PropTypes.string.isRequired,
}

export default CompositeMeterItem
