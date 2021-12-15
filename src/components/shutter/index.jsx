import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../../hooks/use-previous';
import './shutter.css'
import ShutterFace from './ShutterFace';
import ShutterIndicatorContainer from './ShutterIndicatorContainer';

/**
 * This component is a multiple-property sensor which display the position 
 * and slat angle of a window shutter. They tell whether the shutters are up or down 
 * and to what percentage as well as the value of the angle of the slat at any particular time.
 * The position and slatAngle values range from 0% to 100%.
 * 
 * @category Things
 * 
 * @component
 * @example
 * const position = 56
 * const slatAngle = 0
 * return (
 *   <Shutter position={position} slatAngle={slatAngle}/>
 * )
 * 
 */
const Shutter = ({position, slatAngle}) => {
    // Initial position animation will start from 101
    const [previous, setPrevious] = useState(101);
    const previousPositionValue = usePrevious(previous);

    useEffect(() => {
        setPrevious(position)
    }, [position, slatAngle])

    return (
        <div className="shutter">
            <ShutterFace slatAngle={slatAngle}/>
            <ShutterIndicatorContainer 
                position={position} 
                previousPositionValue={previousPositionValue}/>
        </div>
    )
}

Shutter.propTypes = {
    /**
     * The position of the shutter from 0 to 100
     */
    position: PropTypes.number.isRequired,
    /**
     * The angle of the shuter slats from 0 to 100
     */
    slatAngle: PropTypes.number.isRequired
}

export default Shutter
