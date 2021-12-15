import React, { useEffect, useRef } from 'react'
import { drawCompositeMeterIndicator } from './composite_meter_indicator_drawing';

const CompositeMeterIndicator = ({energyValue, powerValue, temperatureValue, switchValue}) => {
    let ref = useRef();

    useEffect(() => {
        let canvas2 = ref.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height);
        
        drawCompositeMeterIndicator(ctx2, width, height, energyValue, powerValue, temperatureValue, switchValue);
    },[energyValue, powerValue, temperatureValue, switchValue])
    return (
        <canvas ref={ref} className="compositemetercanvas"  width='300px' height="300px">
        </canvas>
    )
}

export default CompositeMeterIndicator
