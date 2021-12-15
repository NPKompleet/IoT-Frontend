import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import TachometerFace from './TachometerFace'
import TachometerIndicatorContainer from './TachometerIndicatorContainer'
import TachometerCenter from './TachometerCenter'
import './tachometer.css'
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
 *   <Tachometer value={value}/>
 * )
 * 
 */
const Tachometer = ({value}) => {
    // let the tachometer animate from -5 on initial start
    const [previous, setPrevious] = useState(-5);
    const previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(value)
    }, [value])

    return (
        <div className="guage">
            <TachometerFace/>
            <TachometerIndicatorContainer value={value} previousValue={previousValue}/>
            <TachometerCenter/>
        </div>
    )
}

Tachometer.propTypes = {
    /**
     * The current value of the power device.
     */
    value: PropTypes.number.isRequired
}

export default Tachometer
