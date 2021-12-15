import React, { useEffect, useRef } from 'react'
import { drawShutterIndicator } from './shutter_indicator_drawing';

const ShutterIndicator = ({position, slatAngle}) => {
    let ref = useRef();

    useEffect(() => {
        let canvas2 = ref.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height);
        
        drawShutterIndicator(ctx2, width, height, position, slatAngle);
    },[position, slatAngle])
    return (
        <canvas ref={ref} className="shuttercanvas"  width='300px' height="300px">
        </canvas>
    )
}

export default ShutterIndicator
