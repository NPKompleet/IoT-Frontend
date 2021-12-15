import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ThermometerFace from './ThermometerFace'
import ThermometerValueContainer from './ThermometerValueContainer'
import usePrevious from '../../hooks/use-previous'
import './thermometer.css'

/**
 * These are single-property sensors just used to measure the temperature in the environment. 
 * This include thermometers and any other temperature device.
 * 
 * @category Things
 * 
 * @component
 * 
 */
const Thermometer = ({value, minimum, maximum}) => {
    // let the tachometer animate from minimum - 1 on start
    const [previous, setPrevious] = useState(minimum - 1);
    const previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(value)
    }, [value])

    return (
        <div className="thermometer">
            <ThermometerFace minimum={minimum} maximum={maximum}/>
            <ThermometerValueContainer value={value} previousValue={previousValue} minimum={minimum} maximum={maximum}/>
        </div>
    )
}

Thermometer.propTypes = {
    /**
     * The value of temperature measured in °C.
     */
    value: PropTypes.number.isRequired,
    /**
     * The minimum value of temperature than can be measured by the sensor.
     */
    minimum: PropTypes.number.isRequired,
    /**
     * The maximum value of temperature than can be measured by the sensor.
     */
    maximum: PropTypes.number.isRequired
}

export default Thermometer
