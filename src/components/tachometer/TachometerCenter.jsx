import React, { useEffect, useRef } from 'react'
import { drawCenter } from './tachometer_center_drawing'

const TachometerCenter = () => {
    
    let ref3 = useRef();

    useEffect(() => {
        let canvas3 = ref3.current;
        let ctx3 = canvas3.getContext('2d')
        let radius = canvas3.width / 2

        ctx3.save();
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height)
        ctx3.translate(radius, radius)
        radius = radius * 0.8

        drawCenter(ctx3, radius);

        ctx3.restore();
    }, [])

    return (
        <canvas ref={ref3} className="guagecanvas" width='300px' height="300px">
        </canvas>
    )
}

export default TachometerCenter
