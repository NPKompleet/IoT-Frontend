import React, { useContext, useState } from 'react'
import { ThingActionContext } from '../components/dashboard/ThingTile'
import { postSendAction } from '../utils/send_action_utils'

export const SwitchActionContent = ({actionUrl, value, closeModalHandler}) => {
    const [switchState, setSwitchState] = useState(value)
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
        let body = JSON.stringify({"onOff": switchState})
        postSendAction(actionUrl, body, onSuccess, onError)
    }

    if (actionState.spinner) {
        return <SwitchActionContainer>
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        </SwitchActionContainer>
    }

    if (actionState.success) {
        return <SwitchActionContainer>
            <div className="spinner-container">
                <i className="fas fa-check fa-2x d-inline-block text-info"></i>
            </div>
        </SwitchActionContainer>
    }

    if (actionState.error) {
        return <SwitchActionContainer>
            <div className="spinner-container">
                <i class="fas fa-exclamation-triangle fa-2x d-inline-block text-danger"></i>
            </div>
        </SwitchActionContainer>
    }

    return (
        <SwitchActionContainer>
            <form className="v-center" onSubmit={handleSubmit}>
                <label htmlFor="switch">Switch State:</label>
                <label className="action-switch mx-2 mb-0">
                    <input type="checkbox" checked={switchState} onChange={() => setSwitchState(!switchState)}/>
                    <span className="slider round"></span>
                </label>
                <input className="btn-primary" type="submit" value="Send" />
            </form>
        </SwitchActionContainer>
    )
}

const SwitchActionContainer = ({children}) => {
    return (
        <div className="action-content">
            <h5 className="text-dark">Select Switch State</h5>
            {children}
        </div>
    )
}

