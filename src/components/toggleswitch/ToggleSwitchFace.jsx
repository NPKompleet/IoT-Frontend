import React, { useEffect, useRef } from 'react'
import { drawToggleSwitchFace } from './toggle_switch_face_drawing';

const ToggleSwitchFace = ({type}) => {
    let ref1 = useRef();
    
    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.width;
        ctx1.clearRect(0, 0, width, height);
        
        drawToggleSwitchFace(ctx1, width, height, type);
    }, [type])
    return (
        <canvas ref={ref1} className="switchcanvas" id="switch-indicator" width='300px' height="300px">
        </canvas>
    )
}
export default ToggleSwitchFace
