import React, { useEffect, useRef } from 'react'
import { drawShutterFace } from './shutter_face_drawing';

const ShutterFace = ({slatAngle}) => {
    let ref1 = useRef();
    
    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.width;
        ctx1.clearRect(0, 0, width, height);
        
        drawShutterFace(ctx1, width, height, slatAngle);
    }, [slatAngle])
    return (
        <canvas ref={ref1} className="shuttercanvas"  width='300px' height="300px">
        </canvas>
    )
}
export default ShutterFace
