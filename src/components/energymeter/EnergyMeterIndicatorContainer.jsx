import React from 'react'
import useAnimation from '../../hooks/use-animation';
import EnergyMeterIndicator from './EnergyMeterIndicator'

const EnergyMeterIndicatorContainer = ({value, previousValue}) => {
    let animation = useAnimation('linear', 1500, 0, value);
    
    return (
        <div>
            <EnergyMeterIndicator value={previousValue + ((value - previousValue) * animation)}/>
        </div>
    )
}

export default EnergyMeterIndicatorContainer
