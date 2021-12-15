import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../../hooks/use-previous';
import SmartMeterFace from './SmartMeterFace';
import SmartMeterIndicatorContainer from './SmartMeterIndicatorContainer';
import './smartmeter.css'

/**
 * This component is a multiple-property sensor which that can provide 
 * the power and energy of any measured device at the same time.
 * 
 * @category Things
 * 
 * @component
 * 
 */
const SmartMeter = ({energyValue, powerValue, time}) => {
    const [previous, setPrevious] = useState({
        energy: -1,
        power: -1,
    });
    let previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious({
            energy: energyValue,
            power: powerValue,
        })
    }, [energyValue, powerValue, time])

    if(previousValue === undefined) {
        previousValue = {
            energy: -1,
            power: -1,
        }
    }

    return (
        <div className="smartmeter">
            <SmartMeterFace/>
            <SmartMeterIndicatorContainer 
                energyValue={energyValue} 
                previousEnergyValue={previousValue.energy}
                powerValue={powerValue} 
                previousPowerValue={previousValue.power}
                time={time}/>
        </div>
    )
}

SmartMeter.propTypes = {
    /**
     * The measured energy value Watt-hours.
     */
    energyValue: PropTypes.number.isRequired,
    /**
     * The measured power value in Watts.
     */
    powerValue: PropTypes.number.isRequired,

    /**
     * The time at which the reading displayed on the meter was taken.
     * It is just provided for aesthetic reasons and not required for
     * the proper functioning of the component.
     */
    time: PropTypes.string
}

export default SmartMeter
