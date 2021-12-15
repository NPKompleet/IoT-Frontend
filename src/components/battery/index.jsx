import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import BatteryFace from './BatteryFace'
import BatteryIndicatorContainer from './BatteryIndicatorContainer'
import BatteryWrapper from './BatteryWrapper'
import './battery.css'
import usePrevious from '../../hooks/use-previous'

/**
 * This component is a single-properperty sensor used to represent the Power sensors and power measuring
 * devices in the application. It takes a singular value which indicates the current power 
 * value of the device whose data is to be displayed.
 * 
 * @category Things
 * 
 * @component
 * @example
 * const value = 56
 * return (
 *   <Battery value={value, status}/>
 * )
 * 
 */
const Battery = ({value, status}) => {
    // let the tachometer animate from -5 on initial start
    const [previous, setPrevious] = useState(-5);
    const previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(value)
    }, [value])

    return (
        <div className="battery">
            <BatteryFace/>
            <BatteryIndicatorContainer value={value} previousValue={previousValue} status={status}/>
            <BatteryWrapper/>
        </div>
    )
}

Battery.propTypes = {
    /**
     * The current value of the power device.
     */
    value: PropTypes.number.isRequired
}

export default Battery
