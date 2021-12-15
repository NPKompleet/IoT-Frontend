import React, { useEffect, useRef } from 'react'
import { drawThermometerIndicator } from './thermometer_indicator_drawing';

const ThermometerValueIndicator = ({value, minimum, maximum}) => {
    let ref2 = useRef();

    useEffect(() => {
        let canvas2 = ref2.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height)
        
        drawThermometerIndicator(ctx2, width, height, value, minimum, maximum);
    }, [value, minimum, maximum])

    
    return (
        <canvas ref={ref2} className="thermometercanvas" width='300px' height="300px">
        </canvas>
    )
}

export default ThermometerValueIndicator
