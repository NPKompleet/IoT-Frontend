import React from 'react'
import useAnimation from '../../hooks/use-animation';
import ThermometerValueIndicator from './ThermometerValueIndicator';

const ThermometerValueContainer = ({value, previousValue, minimum, maximum}) => {
    let animation = useAnimation('linear', 1500, 0, value);

    return (
        <div>
            <ThermometerValueIndicator 
                value={previousValue + ((value - previousValue) * animation)}
                minimum={minimum} 
                maximum={maximum}/>
        </div>
    )
}

export default ThermometerValueContainer
