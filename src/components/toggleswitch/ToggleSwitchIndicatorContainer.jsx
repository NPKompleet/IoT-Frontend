import React from 'react'
import useAnimation from '../../hooks/use-animation';
import ToggleSwitchIndicator from './ToggleSwitchIndicator'

const ToggleSwitchIndicatorContainer = ({value, previousValue, type}) => {
    let animation = useAnimation('linear', 750, 0, value);
    
    return (
        <div>
            <ToggleSwitchIndicator 
                value={previousValue + ((value - previousValue) * animation)}
                type={type}/>
        </div>
    )
}

export default ToggleSwitchIndicatorContainer
