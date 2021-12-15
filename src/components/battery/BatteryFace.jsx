import React, { useEffect, useRef } from 'react'
import { drawBatteryFace } from './battery_face_drawing'

const BatteryFace = () => {
    let ref1 = useRef();

    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d')
        let width = canvas1.width
        let height = canvas1.height

        ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
        drawBatteryFace(ctx1, width, height)
        
    }, [])

    return (
        <canvas ref={ref1} className="batterycanvas" width= '600px' height="400px">
        </canvas>
    )
}

export default BatteryFace
