import React, { useEffect, useRef } from 'react'
import { drawCompositeMeterFace } from './composite_meter_face_drawing';

const CompositeMeterFace = () => {
    let ref1 = useRef();
    
    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.width;
        ctx1.clearRect(0, 0, width, height);
        
        drawCompositeMeterFace(ctx1, width, height);
    }, [])
    return (
        <canvas ref={ref1} className="compositemetercanvas"  width='300px' height="300px">
        </canvas>
    )
}
export default CompositeMeterFace
