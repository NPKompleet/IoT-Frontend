import React from 'react'
import ReactDom from 'react-dom'
import './modal.css'
import { SwitchActionContent } from './SwitchActionContent'
import { TemperatureActionContent } from './TemperatureActionContent'

const ActionModal = ({opened, children, onClose}) => {
    if (!opened) return null
    return ReactDom.createPortal(
        <>
            <div className="overlay">
                <div className="modal-container">
                    <div className="mb-4">
                        <i id="closeModal" className="fas fa-times float-right" onClick={onClose}></i>
                    </div>
                    <hr />
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
        </>, document.getElementById('modal')
    )
}

const RuleModal = ({opened, children, onClose}) => {
    if (!opened) return null
    return ReactDom.createPortal(
        <>
            <div className="overlay">
                <div className="rule-modal-container">
                    <div className="mb-4">
                        <i id="closeModal" className="fas fa-times float-right" onClick={onClose}></i>
                    </div>
                    <hr />
                    <div className="rule-content-holder">
                        {children}
                    </div>
                </div>
            </div>
        </>, document.getElementById('modal')
    )
}

export {SwitchActionContent, TemperatureActionContent, ActionModal, RuleModal}
