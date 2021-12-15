import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {drawNeedle, drawNeedleValueMultiplier, drawValueIndicator } from './tachometer_indicator_drawing'
import './tachometer.css'

/*
 * This component displays the current value.
 */
const TachometerIndicator = ({scaledValue, multiplier, actualValue}) => {
    let ref2 = useRef();

    useEffect(() => {
        let canvas2 = ref2.current;
        let ctx2 = canvas2.getContext('2d')
        let radius = canvas2.width / 2
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        ctx2.save()
        ctx2.translate(radius, radius)
        radius = radius * 0.8

        let rotAngle = ((scaledValue - 50.00)/100) * 1.5 * Math.PI;

        drawNeedle(ctx2, radius, rotAngle);
        if (multiplier > 1) drawNeedleValueMultiplier(ctx2, radius, multiplier);
        drawValueIndicator(ctx2, radius, actualValue);
        
        ctx2.restore();
    })

    return (
        <canvas ref={ref2} className="guagecanvas" width='300px' height="300px">
        </canvas>
    )
}

TachometerIndicator.propTypes = {
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

export default TachometerIndicator
