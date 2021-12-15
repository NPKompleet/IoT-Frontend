import React, { useState } from 'react'
import {ActionModal, RuleModal, SwitchActionContent, TemperatureActionContent } from '../../modal'
import RuleMaker, { RuleRunner } from '../../rulemaker'

const ActionItem = ({actionUrl, type, value, min, max, properties, facts}) => {
    const [showEditIcons, setShowEditIcons] = useState(false)
    const [actionModalOpened, setActionModalOpened] = useState(false)
    const [ruleModalOpened, setRuleModalOpened] = useState(false)

    const handleMouseEnter = () => {
        setShowEditIcons(true)
    }

    const handleMouseLeave = () => {
        setShowEditIcons(false)
    }

    const handleActionIconClick = () => {
        console.log(actionUrl)
        setActionModalOpened(true)
    }

    const handleRuleIconClick = () => {
        console.log('rule')
        setRuleModalOpened(true)
    }

    const getModalContent = (type) => {
        switch (type) {
            case 'temperature':
                return <TemperatureActionContent 
                            actionUrl={actionUrl}
                            value={value}
                            min ={min}
                            max ={max} 
                            closeModalHandler={() => setActionModalOpened(false)}/>
            case 'onOff':
            case 'composite':
                return <SwitchActionContent 
                            actionUrl={actionUrl} 
                            value={value}
                            closeModalHandler={() => setActionModalOpened(false)}/>
            default:
                return null;
        }
    }

    const getToolTip = (type) => {
        switch (type) {
            case 'temperature':
                return "Set target temperature"
            case 'onOff':
            case 'composite':
                return "Set Switch State"
            default:
                return null;
        }
    }

    const getActionIcon = (type) => {
        switch (type) {
            case 'temperature':
                return "fa-temperature-high"
            case 'onOff':
            case 'composite':
                return "fa-toggle-on"
            default:
                return "";
        }
    }

    const deviceId = actionUrl.split('/')[6]

    return (
        <>
            <div className="action-item" onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
                {
                    showEditIcons ? 
                    <div className="action-item-icon-div m-2">
                        <i className={`fas ${getActionIcon(type)} action-item-icon mx-2`} title={getToolTip(type)} onClick={() => handleActionIconClick()}></i>
                        <i className="fas fa-edit action-item-icon" title={"Create Rule"} onClick={() => handleRuleIconClick()}></i>
                    </div>
                    : null
                }
            </div>

            <ActionModal opened={actionModalOpened} onClose={() => setActionModalOpened(false)}>
                { getModalContent(type) }
            </ActionModal>
            <RuleModal opened={ruleModalOpened} onClose={() => setRuleModalOpened(false)}>
                <RuleMaker 
                    deviceId={deviceId} // Get the device id from the url
                    isBinary={type === 'onOff' || type === 'composite'}
                    properties={properties}/>
            </RuleModal>
            <RuleRunner deviceId={deviceId} facts={facts} actionUrl={actionUrl} type={type}/>
        </>
    )
}

export default ActionItem
