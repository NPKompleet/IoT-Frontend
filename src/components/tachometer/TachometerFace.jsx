import React, { useEffect, useRef } from 'react'
import { drawFace, drawColorArcs, drawTicks, drawLCD } from './tachometer_face_drawing'

const TachometerFace = () => {
    let ref1 = useRef();

    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d')
        let radius = canvas1.width / 2

        ctx1.save();
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
        ctx1.translate(radius, radius)
        radius = radius * 0.8

        drawFace(ctx1, radius);
        drawColorArcs(ctx1, radius);
        drawTicks(ctx1, radius);
        drawLCD(ctx1, radius);

        ctx1.restore();
    }, [])

    return (
        <canvas ref={ref1} className="guagecanvas" width= '300px' height="300px">
        </canvas>
    )
}

export default TachometerFace
