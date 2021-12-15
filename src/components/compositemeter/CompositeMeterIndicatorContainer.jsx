import React, { useMemo } from 'react'
import useAnimation from '../../hooks/use-animation';
import CompositeMeterIndicator from './CompositeMeterIndicator'

const CompositeMeterIndicatorContainer = ({
                energyValue, 
                previousEnergyValue,
                powerValue, 
                previousPowerValue,
                temperatureValue,
                previousTemperatureValue,
                switchValue}) => {
    const memoizedValueList = useMemo(() => {
        return [energyValue, powerValue, temperatureValue]}, [energyValue, powerValue, temperatureValue])
    let animation = useAnimation('linear', 1500, 0, memoizedValueList);
    
    return (
        <div>
            <CompositeMeterIndicator 
                energyValue={previousEnergyValue + ((energyValue - previousEnergyValue) * animation)}
                powerValue={previousPowerValue + ((powerValue - previousPowerValue) * animation)}
                temperatureValue={previousTemperatureValue + ((temperatureValue - previousTemperatureValue) * animation)}
                switchValue={switchValue}/>
        </div>
    )
}

export default CompositeMeterIndicatorContainer
