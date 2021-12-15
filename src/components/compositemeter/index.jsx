import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../../hooks/use-previous';
import CompositeMeterFace from './CompositeMeterFace';
import CompositeMeterIndicatorContainer from './CompositeMeterIndicatorContainer';
import './compositemeter.css'

/**
 * This component is a multiple-property sensor which that can provide 
 * the temperature, power, energy and switch state of any measured device at the same time.
 * 
 * @category Things
 * 
 * @component
 * 
 */
const CompositeMeter = ({energyValue, powerValue, temperatureValue, switchValue}) => {

    const [previous, setPrevious] = useState({
        energy: -1,
        power: -1,
        temperature: -40
    });

    
    let previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious({
            energy: energyValue,
            power: powerValue,
            temperature: temperatureValue
        })
    }, [energyValue, powerValue, temperatureValue])

    if(previousValue === undefined) {
        previousValue = {
            energy: -1,
            power: -1,
            temperature: -40
        }
    }

    return (
        <div className="compositemeter">
            <CompositeMeterFace/>
            <CompositeMeterIndicatorContainer 
                energyValue={energyValue} 
                previousEnergyValue={previousValue.energy}
                powerValue={powerValue} 
                previousPowerValue={previousValue.power}
                temperatureValue={temperatureValue} 
                previousTemperatureValue={previousValue.temperature}
                switchValue={switchValue}/>
        </div>
    )
}

CompositeMeter.propTypes = {
    /**
     * The measured energy value Watt-hours
     */
    energyValue: PropTypes.number.isRequired,
    /**
     * The measured power value in Watts
     */
    powerValue: PropTypes.number.isRequired,
    /**
     * The measured temperature value in °C.
     */
    temperatureValue: PropTypes.number.isRequired,
    /**
     * The measured switch state (true or false)
     */
    switchValue: PropTypes.bool.isRequired
}

export default CompositeMeter
