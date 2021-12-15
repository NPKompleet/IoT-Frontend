import React, { useEffect, useRef } from 'react'
import { drawBatteryWrapper } from './battery_wrapper_drawing'

const BatteryWrapper = () => {
    
    let ref3 = useRef();

    useEffect(() => {
        let canvas3 = ref3.current;
        let ctx3 = canvas3.getContext('2d')
        let width = canvas3.width
        let height = canvas3.height

        ctx3.clearRect(0, 0, canvas3.width, canvas3.height)
        drawBatteryWrapper(ctx3, width, height)
    }, [])

    return (
        <canvas ref={ref3} className="batterycanvas" width='600px' height="400px">
        </canvas>
    )
}

export default BatteryWrapper
