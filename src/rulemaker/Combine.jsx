import React, { useContext, useEffect } from 'react'
import { Condition } from './Condition'
import { RuleContext, setNodeValidity } from "./RuleHelper"

export const Combine = ({id, qualifiedId, parentQualifiedId, value, subtree}) => {
    const options = ["", "all", "any"]
    const context = useContext(RuleContext)
    const nodeValueChangeHandler = context.nodeValueChangeHandler
    const nodeAddedHandler = context.nodeAddedHandler
    const itemDeleteHandler = context.itemDeleteHandler

    useEffect(() => {
        if (subtree.length === 0) {
            setNodeValidity(id, false) 
        }else{
            setNodeValidity(id, true)
        }    
    }, [id, subtree.length])

    const handleValueChanged = (event) => {
        nodeValueChangeHandler(qualifiedId, "combine", event.target.value)
    }

    const handleNodeAddition = (nodeType) => {
        nodeAddedHandler(qualifiedId, nodeType)
    }

    const handleDeleteAction = () => {
        itemDeleteHandler(parentQualifiedId, qualifiedId)
        if (subtree.length === 0) {
            const element = document.getElementById(id)
            element.setCustomValidity('')
            element.reportValidity(); 
        }
    }

    return (
        <li>
            <div>
            <select id={id} className="combine" value={value} onChange={(e) => handleValueChanged(e)} required>
                {
                    options.map((option, index) => {
                        return <option key={index} value={`${option}`}>{`${option.charAt(0).toUpperCase() + option.slice(1)}`}</option>
                    })
                }
            </select>
            <i className="treeaction fas fa-plus-circle text-primary  ml-1" onClick={()=>handleNodeAddition('condition')} title="Add Child Condition"></i>
            <i className="treeaction fas fa-plus-square text-info ml-1" onClick={()=>handleNodeAddition('combine')} title="Add Child Combine"></i>
            <i className="treeaction fas fa-times-circle text-black ml-1" onClick={()=>handleDeleteAction()} title="Delete"></i>
            </div>
            <ul className="">
                {
                    subtree.map((child) => {
                        switch (child.name) {
                            case 'condition':
                                return <Condition key={child.id} qualifiedId={qualifiedId+'.'+child.id} parentQualifiedId={qualifiedId} value={child.value}/>
                            case 'combine':
                                return <Combine key={child.id} id={child.id} qualifiedId={qualifiedId+'.'+child.id} parentQualifiedId={qualifiedId} subtree={child.children} value={child.value}/>
                            default:
                                return null
                        }
                    })
                }
            </ul>
        </li>
    )
}