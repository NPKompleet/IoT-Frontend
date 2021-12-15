import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Space  from './Space'

/**
 * This component represents the floor or storey of the Smart Building.
 * It contains the rooms, {@link Space}, component which holds the Things.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const Floor = ({spaces}) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(0)
    }, [spaces]);

    return (
        <div className="tabcontent bg-primary p-4">
            <div className="d-flex h-100">
                <div className="d-flex flex-column">
                    {spaces.map((room, index) => {
                        return(
                            <button 
                                key={index}
                                onClick={() => setValue(index)}
                                className={`minitablink 
                                        ${value !== index && 'bg-primary'}
                                        ${value === index && 'bg-light text-gray-900'}  
                                        p-2 text-left`}>
                                <i className="fas fa-fw fa-bed mr-1"></i>
                                {room["schema:name"]}
                            </button>
                        )
                    })}
                </div>
                <Space elements={spaces[value]["bot:hasElement"]} spaceIndex={value}/>
            </div>
        </div>
    )
}

Floor.propTypes = {
    /**
     * An array of JSON objects representing {@link Space} that can be used to display 
     * the rooms in the floor.
     */
    spaces: PropTypes.array.isRequired
}

export default Floor
