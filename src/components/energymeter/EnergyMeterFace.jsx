import React, { useEffect, useRef } from 'react'
import { drawEnergyMeterFace } from './energy_meter_face_drawing';

const EnergyMeterFace = () => {
    let ref1 = useRef();
    
    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.width;
        ctx1.clearRect(0, 0, width, height);
        
        drawEnergyMeterFace(ctx1, width, height);
    }, [])
    return (
        <canvas ref={ref1} className="energymetercanvas"  width='300px' height="300px">
        </canvas>
    )
}
export default EnergyMeterFace
