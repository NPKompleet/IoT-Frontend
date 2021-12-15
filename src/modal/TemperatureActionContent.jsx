import React, { useContext, useState } from 'react'
import { ThingActionContext } from '../components/dashboard/ThingTile'
import { postSendAction } from '../utils/send_action_utils'

export const TemperatureActionContent = ({actionUrl, value, min, max, closeModalHandler}) => {
    const [targetTemp, setTargetTemp] = useState(value)
    const [actionState, setActionState] = useState({spinner: false, success: false, error: false})
    const updateThingDisplay = useContext(ThingActionContext)

    const onSuccess = () => {
        setActionState({spinner: false, success: true, error: false})
        setTimeout(() => {
           closeModalHandler()
           setTimeout(() => {
               updateThingDisplay()
           }, 2000); 
        }, 2000);
    }

    const onError = () => {
        setActionState({spinner: false, success: false, error: true})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setActionState({...actionState, spinner: true})
        let body = JSON.stringify({"temperature": targetTemp})
        postSendAction(actionUrl, body, onSuccess, onError)
    }

    if (actionState.spinner) {
        return <TempActionContainer>
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        </TempActionContainer>
    }

    if (actionState.success) {
        return <TempActionContainer>
            <div className="spinner-container">
                <i className="fas fa-check fa-2x d-inline-block text-info"></i>
            </div>
        </TempActionContainer>
    }

    if (actionState.error) {
        return <TempActionContainer>
            <div className="spinner-container">
                <i class="fas fa-exclamation-triangle fa-2x d-inline-block text-danger"></i>
            </div>
        </TempActionContainer>
    }

    return (
        <TempActionContainer>
            <form onSubmit={handleSubmit}>
                <label htmlFor="temp">Temperature (°C):</label>
                <input className="mx-2" type="number" name="temp" id="temp" value={targetTemp} min={`${min}`} max={`${max}`} onChange={(event) => setTargetTemp(event.target.value)} required/>
                <input className="btn-primary" type="submit" value="Send" />
            </form>
        </TempActionContainer>
    )
}

const TempActionContainer = ({children}) => {
    return (
        <div className="action-content">
            <h5 className="text-dark">Select Target Temperature</h5>
            {children}
        </div>
    )
}

