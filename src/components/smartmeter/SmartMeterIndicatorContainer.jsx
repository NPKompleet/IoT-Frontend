import React, { useMemo } from 'react'
import useAnimation from '../../hooks/use-animation';
import SmartMeterIndicator from './SmartMeterIndicator'

const SmartMeterIndicatorContainer = ({
                energyValue, 
                previousEnergyValue,
                powerValue, 
                previousPowerValue,
                time}) => {
   
    const memoizedValueList = useMemo(() => {
        return [energyValue, powerValue]}, [energyValue, powerValue])
    let animation = useAnimation('linear', 1500, 0, memoizedValueList);
    
    return (
        <div>
            <SmartMeterIndicator 
                energyValue={previousEnergyValue + ((energyValue - previousEnergyValue) * animation)}
                powerValue={previousPowerValue + ((powerValue - previousPowerValue) * animation)}
                time={time}/>
        </div>
    )
}

export default SmartMeterIndicatorContainer
