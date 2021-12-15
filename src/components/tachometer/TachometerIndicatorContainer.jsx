import React from 'react'
import PropTypes from 'prop-types'
import TachometerIndicator from './TachometerIndicator'
import useAnimation from '../../hooks/use-animation'

/*
 * This is just a component made specifically to hold the tachometer indicator
 * for animation.
 * 
 */
const TachometerIndicatorContainer = ({value, previousValue}) => {
    let valueAndMultiplier = getScaledValueAndMultiplier(value);
    // The scaled value will be used for the animation and needle display
    // The actual value will be printed for reading.
    let scaledValue = valueAndMultiplier[0];
    let multiplier = valueAndMultiplier[1];
    let scaledPrevious = getScaledValueAndMultiplier(previousValue)[0];
    let animation = useAnimation('elastic', 1500, 0, scaledValue);


    return (
        <div>
            <TachometerIndicator 
                scaledValue={scaledPrevious + ((scaledValue - scaledPrevious) * animation)} 
                multiplier={multiplier}
                actualValue={previousValue + ((value - previousValue) * animation)}/>
        </div>
    )
}

TachometerIndicatorContainer.propTypes = {
    /**
     * The present value to animate to.
     */
    value: PropTypes.number.isRequired,

    /**
     * The previous value to animate from.
     */
    previousValue: PropTypes.number.isRequired
}



const getScaledValueAndMultiplier = (value) => {
    let exp = 0;
    while (value > 100){
        value /= 100;
        exp++;
    }
    let scaledValue = value;
    let multiplier = Math.pow(10, exp);
    return [scaledValue, multiplier];
}

export default TachometerIndicatorContainer
