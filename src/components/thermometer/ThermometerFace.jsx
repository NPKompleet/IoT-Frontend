import React, { useEffect, useRef }  from 'react'
import { drawThermometerFace } from './thermometer_face_drawing';

const ThermometerFace = ({minimum, maximum}) => {
    let ref1 = useRef();

    useEffect(() => {
        let canvas1 = ref1.current;
        let ctx1 = canvas1.getContext('2d');
        let width = canvas1.width;
        let height = canvas1.height;
        
        drawThermometerFace(ctx1, width, height, minimum, maximum);
    }, [minimum, maximum])

    return (
        <canvas ref={ref1} className="thermometercanvas" width='300px' height="300px">
        </canvas>
    )
}

export default ThermometerFace
