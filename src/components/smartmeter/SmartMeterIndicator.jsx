import React, { useEffect, useRef } from 'react'
import { drawSmartMeterIndicator } from './smart_meter_indicator_drawing';

const SmartMeterIndicator = ({energyValue, powerValue, time}) => {
    let ref = useRef();

    useEffect(() => {
        let canvas2 = ref.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height);
        
        drawSmartMeterIndicator(ctx2, width, height, energyValue, powerValue, time);
    },[energyValue, powerValue, time])
    return (
        <canvas ref={ref} className="smartmetercanvas"  width='300px' height="300px">
        </canvas>
    )
}

export default SmartMeterIndicator
