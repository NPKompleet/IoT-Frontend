import React, { useState } from 'react';
import Floor from './Floor';
import './dashboard.css';
import { useHistory } from 'react-router';

const Dashboard = ({floors}) => {
    const [value, setValue] = useState(0)
    const history = useHistory();

    const onEMSClicked = () => {
        // event.preventDefault();
        history.push({
            pathname: '/ems',
        });
    }

    return (
        <div className="col-lg-12 mb-4">
            <button className="btn btn-secondary position-absolute ems-button mr-2" onClick={() => onEMSClicked()}>EMS</button>
            <div className="row ml-4">
                {floors.map((floor, index) => {
                    return(
                    <button 
                        key={index}
                        onClick={() => setValue(index)}
                        className={`tablink
                        ${value === index && 'bg-primary'} 
                        ${value !== index && 'bg-secondary'} 
                        ${value !== index && 'border'} 
                        rounded-top`}>{floor["schema:name"]}</button>
                    );
                })}
            </div>
            <Floor spaces={floors[value]["bot:hasSpace"]}/>
        </div>
           
    )
}

export default Dashboard
