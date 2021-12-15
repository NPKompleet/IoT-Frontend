import React from 'react'
import useAnimation from '../../hooks/use-animation';
import ShutterIndicator from './ShutterIndicator';

const ShutterIndicatorContainer = ({position, previousPositionValue}) => {
    let animation = useAnimation('linear', 1000, 0, position);
    
    return (
        <div>
            <ShutterIndicator 
                position={previousPositionValue + ((position - previousPositionValue) * animation)}/>
        </div>
    )
}

export default ShutterIndicatorContainer
