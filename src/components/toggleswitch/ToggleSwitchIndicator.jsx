import React, { useEffect, useRef } from 'react'
import { drawToggleSwitchIndicator } from './toggle_switch_indicator_drawing';

const ToggleSwitchIndicator = ({value, type}) => {
    let ref = useRef();

    useEffect(() => {
        let canvas2 = ref.current;
        let ctx2 = canvas2.getContext('2d');
        let width = canvas2.width;
        let height = canvas2.height;
        ctx2.clearRect(0, 0, width, height);
        let radius = width / 2;
        
        drawToggleSwitchIndicator(ctx2, radius, value, type);
    })
    return (
        <canvas ref={ref} className="switchcanvas" id="switch-indicator" width='300px' height="300px">
        </canvas>
    )
}

export default ToggleSwitchIndicator
