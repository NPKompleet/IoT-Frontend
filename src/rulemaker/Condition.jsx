import React, { useContext } from 'react'
import { RuleContext } from "./RuleHelper"

export const Condition = ({qualifiedId, parentQualifiedId, value}) => {
    const context = useContext(RuleContext)
    const propertyOptions = context.propertyOptions
    const nodeValueChangeHandler = context.nodeValueChangeHandler
    const itemDeleteHandler = context.itemDeleteHandler
    const operatorOptions = ["", "lessThan", "greaterThan", "equal", "notEqual"]

    const handlePropertyChanged = (event) => {
        nodeValueChangeHandler(qualifiedId, "fact", event.target.value)
    }

    const handleOperatorChanged = (event) => {
        nodeValueChangeHandler(qualifiedId, "operator", event.target.value)
    }

    const handleValueChanged = (event) => {
        nodeValueChangeHandler(qualifiedId, "value", event.target.value)
    }

    const handleDeleteAction = () => {
        itemDeleteHandler(parentQualifiedId, qualifiedId)
    }

    const getValueInputType = (fact) => {
        switch (fact) {
            case 'time':
                return 'time';
            case 'date':
                return 'date';
            default:
                return 'number';
        }
    }

    const getMinValue = (fact) => {
        switch (fact) {
            case 'temperature':
                return -30;
            case 'time':
                return null;
            case 'date':
                return null;
            default:
                return 0;
        }
    }

    const getMaxValue = (fact) => {
        switch (fact) {
            case 'temperature':
                return 50;
            case 'onOff':
                return 1;
            case 'time':
                return null;
            case 'date':
                return null;
            default:
                return null;
        }
    }

    return (
        <li>
            <select value={value.fact} className="property" onChange={(e) => handlePropertyChanged(e)} required>
                {
                    propertyOptions.map((property, index) => {
                        return <option key={index} value={`${property}`}>{property}</option>
                    })
                }
            </select>
            <i className="fas fa-long-arrow-alt-right"></i>
            <select className="operator" value={value.operator} onChange={(e) => handleOperatorChanged(e)} title="Choose operator" required>
                {
                    operatorOptions.map((option, index) => {
                        return <option key={index} value={`${option}`}>{option}</option>
                    })
                }
            </select>
            <i className="fas fa-long-arrow-alt-right"></i>
            <input 
                type={getValueInputType(value.fact)} 
                value={value.value} 
                onChange={(e) => handleValueChanged(e)}
                min={getMinValue(value.fact)}
                max={getMaxValue(value.fact)} 
                required/>
            <i className="treeaction fas fa-times-circle text-black ml-1" title="Delete" onClick={()=>handleDeleteAction()}></i>
        </li>
    )
}