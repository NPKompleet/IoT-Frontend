import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../../hooks/use-previous';
import ToggleSwitchFace from './ToggleSwitchFace';
import ToggleSwitchIndicatorContainer from './ToggleSwitchIndicatorContainer';
import './toggleswitch.css'

/**
 * These are single-property sensors that have two states and toggle between those 
 * states. The states can either be true or false. During the development of this 
 * application 3 types of such switches were identified. They include <b>onOff</b> 
 * switches which are usually used to indicate a lamp somewhere is either on or 
 * off, <b>openClose</b> switches which are usually used to indicate if a door or 
 * window contact is open or closed and are usually true when the door or window 
 * contact is open and, last but not the least, there are the <b>motionDetected</b> 
 * sensors which are just motion detectors which returns a true value when there is 
 * a motion within the area the sensor covers.
 * 
 * @category Things
 * 
 * @component
 * 
 */
const ToggleSwitch = ({checked, type}) => {
    let checkValue = checked ? 1 : 0;
    // 0.5 is not a valid value but needed for initial animation.
    const [previous, setPrevious] = useState(0.5);
    const previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(checkValue)
    }, [checkValue, type])

    return (
        <div className="switch">
            <ToggleSwitchIndicatorContainer value={checkValue} previousValue={previousValue}/>
            <ToggleSwitchFace type={type}/>
        </div>
    )
}

ToggleSwitch.propTypes = {
    /**
     * The state of the swtich. Whether it is true of false.
     */
    checked: PropTypes.bool.isRequired,
    /**
     * The type of switch it is. It must be one of <em>onOff</em>, <em>openClose</em> or <em>motionDetected</em>.
     */
    type: PropTypes.oneOf(['onOff', 'openClose', 'motionDetected']).isRequired
}

export default ToggleSwitch
