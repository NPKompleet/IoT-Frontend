import React, { useEffect, useRef } from 'react'
import { drawSmartMeterFace } from './smart_meter_face_drawing';

const SmartMeterFace = () => {
    let ref1 = useRef();
    
    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.width;
        ctx1.clearRect(0, 0, width, height);
        
        drawSmartMeterFace(ctx1, width, height);
    }, [])
    return (
        <canvas ref={ref1} className="smartmetercanvas"  width='300px' height="300px">
        </canvas>
    )
}
export default SmartMeterFace
