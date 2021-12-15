import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { drawBatteryIndicator } from './battery_indicator_drawing'
import './battery.css'

/*
 * This component displays the current value.
 */
const BatteryIndicator = ({value, status}) => {
    let ref2 = useRef();

    useEffect(() => {
        let canvas2 = ref2.current;
        let ctx2 = canvas2.getContext('2d')
        let width = canvas2.width
        let height = canvas2.height
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        drawBatteryIndicator(ctx2, width, height, value, status)
        
    })

    return (
        <canvas ref={ref2} className="batterycanvas" width='600px' height="400px">
        </canvas>
    )
}

BatteryIndicator.propTypes = {
    /**
     * The scaled value between 0 and 100.
     */
    scaledValue: PropTypes.number.isRequired,

    /**
     * The multiplier value.
     */
    multiplier: PropTypes.number.isRequired,

    /**
     * The actual value displayed in the LCD.
     */
    actualValue: PropTypes.number.isRequired
}

export default BatteryIndicator
