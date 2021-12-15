import React from 'react'
import PropTypes from 'prop-types'
import BatteryIndicator from './BatteryIndicator'
import useAnimation from '../../hooks/use-animation'

/*
 * This is just a component made specifically to hold the tachometer indicator
 * for animation.
 * 
 */
const BatteryIndicatorContainer = ({value, previousValue, status}) => {
    
    let animation = useAnimation('elastic', 1500, 0, value);


    return (
        <div>
            <BatteryIndicator 
                value={previousValue + ((value - previousValue) * animation)}
                status={status}/>
        </div>
    )
}

BatteryIndicatorContainer.propTypes = {
    /**
     * The present value to animate to.
     */
    value: PropTypes.number.isRequired,

    /**
     * The previous value to animate from.
     */
    previousValue: PropTypes.number.isRequired
}

export default BatteryIndicatorContainer
