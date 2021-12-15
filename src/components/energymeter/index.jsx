import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../../hooks/use-previous';
import EnergyMeterFace from './EnergyMeterFace';
import EnergyMeterIndicatorContainer from './EnergyMeterIndicatorContainer';
import './energymeter.css'

/**
 * These are single-property sensors which display the energy values in the dashboard application.
 * The energy value unit is in Watt-hours (Wh).
 * @category Things
 * 
 * @component
 * 
 */
const EnergyMeter = ({value}) => {
    const [previous, setPrevious] = useState(0);
    const previousValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(value)
    }, [value])

    return (
        <div className="energymeter">
            <EnergyMeterFace/>
            <EnergyMeterIndicatorContainer value={value} previousValue={previousValue}/>
        </div>
    )
}

EnergyMeter.propTypes = {
    /**
     * The measured energy value.
     */
    value: PropTypes.number.isRequired
}

export default EnergyMeter
