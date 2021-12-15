import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import ToggleSwitch from '../toggleswitch'
import useFetch from '../../hooks/use-fetch'
import ErrorItem from './ErrorItem';
import useInterval from '../../hooks/use-interval';
import LoadingItem from './LoadingItem';
import ActionItem from './ActionItem';

/**
 * This component is just a container used to hold any {@link ToggleSwitch} sensor item.
 * It is responsible for making periodic calls to fetch the current state of the sensor 
 * to be displayed in the dashboard. It relies on {@link useFetch} and {@link useInterval} hooks.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const ToggleSwitchItem = React.forwardRef(({url, type, actionUrl}, ref) => {
    const [startTime, setStartTime] = useState(Date.now());
    const {isLoading, isError, data} = useFetch(url, 'GET', null, startTime);
    const properties = ["onOff", "date", "time"]

    const refresh = () => setStartTime(Date.now());
    
    useInterval(() => {
            refresh();
        }
    );

    useImperativeHandle(ref, () => ({
            updateDisplay: () => {
                refresh();
            }
    }))

    if (isLoading){
        return <LoadingItem/>;
    }

    if (isError){
        return <ErrorItem url={url}/>;
    }

    console.log(data);

    let checked = false;
    switch (type) {
        case 'motionDetected':
            checked = data['motionDetected'] === true;
            break;
        case 'openClose':
            checked = data['openClose'] === true;
            break;
        case 'onOff':
            checked = data['onOff'] === true;
            break;
        default:
            break;
    }

    const getFactsObject = type => {
        let facts = {}
        // let now = Date.now()
        
        const dateObj = new Date(Date.now())
        facts.date = parseInt(Date.parse(dateObj.toLocaleDateString())/1000)
        // Always using 1, January 1970 for time comparison
        facts.time = parseInt(Date.parse('1970-01-01T' + dateObj.getHours() + ':' + dateObj.getMinutes()) / 1000)
        switch (type) {
            case 'onOff':
                facts.onOff = checked? 1 : 0
                break;
            default:
                break;
        }
        return facts
    }

    return (
        <div>
            <div className="card-body">
                <div className="tachometer">
                    <div className="tachometercontainer">
                        <ToggleSwitch checked={checked} type={type}/>
                    </div>
                    {
                        actionUrl ? <ActionItem actionUrl={actionUrl} type={type} value={checked} properties={properties} facts={getFactsObject(type)}/> : null
                    }
                </div>
            </div>
        </div>
    )
})

ToggleSwitchItem.propTypes = {
    /**
     * The endpoint to fetch the current switch state from.
     */
    url: PropTypes.string.isRequired,
    /**
     * The type of switch it is. It must be one of <em>onOff</em>, <em>openClose</em> or <em>motionDetected</em>.
     */
    type: PropTypes.oneOf(['onOff', 'openClose', 'motionDetected']).isRequired
}

export default ToggleSwitchItem
