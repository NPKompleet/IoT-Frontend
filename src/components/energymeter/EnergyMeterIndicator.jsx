import React, { useEffect, useRef } from 'react'
import { drawEnergyMeterIndicator } from './energy_meter_indicator_drawing';

const EnergyMeterIndicator = ({value}) => {
    let ref = useRef();

    useEffect(() => {
        let canvas2 = ref.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height);
        
        drawEnergyMeterIndicator(ctx2, width, height, value);
    },[value])
    return (
        <canvas ref={ref} className="energymetercanvas"  width='300px' height="300px">
        </canvas>
    )
}

export default EnergyMeterIndicator
