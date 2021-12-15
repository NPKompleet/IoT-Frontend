import React, { useContext, useEffect } from 'react'
import { RuleContext, setNodeValidity } from "./RuleHelper"

const RuleTree = ({id, value, decision, isBinaryDecision, isSaved, children}) => {
    const options = ["", "all", "any"]
    const context = useContext(RuleContext)
    const nodeValueChangeHandler = context.nodeValueChangeHandler
    const nodeAddedHandler = context.nodeAddedHandler
    const itemDeleteHandler = context.itemDeleteHandler
    const createRuleTreeHandler = context.createRuleTreeHandler
    const decisionChangeHandler = context.decisionChangeHandler
    const submitHandler = context.submitHandler

    useEffect(() => {
        if (children.length === 0) {
            setNodeValidity(id, false) 
        }else{
            setNodeValidity(id, true)
        }    
    }, [id, children.length])

    const handleValueChanged = (event) => {
        nodeValueChangeHandler(id, "combine", event.target.value)
    }

    const handleCreateTreeAction = () => {
        createRuleTreeHandler()
    }

    const handleNodeAddition = (nodeType) => {
        const element = document.getElementById('rootNode')
        element.setCustomValidity('')
        element.reportValidity()
        nodeAddedHandler(id, nodeType)
    }
    
    const handleDeleteAction = () => {
        itemDeleteHandler('', 'rootNode')
    }

    const handleDecisionValueChange = (event) => {
        decisionChangeHandler(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        submitHandler()
    }

    return (
        <form onSubmit={(e) => handleSubmit(e) }>
            <div className="tree p-4">
                <div>
                    <select id="rootNode" className="combine" value={value} onChange={(e) => handleValueChanged(e)} required>
                        {
                            options.map((option, index) => {
                                return <option key={index} value={`${option}`}>{`${option.charAt(0).toUpperCase() + option.slice(1)}`}</option>
                            })
                        }
                    </select>
                    <i className="treeaction fas fa-plus-circle text-primary  ml-1" onClick={()=>handleNodeAddition('condition')} title="Add Child Condition"></i>
                    <i className="treeaction fas fa-plus-square text-info ml-1" onClick={()=>handleNodeAddition('combine')} title="Add Child Combine"></i>
                    <i className="fas fa-equals ml-3 mr-3 text-dark"></i>
                    {
                        isBinaryDecision ? 
                        <select className="decision" value={`${decision}`} title="Choose Target Value" onChange={(e) => handleDecisionValueChange(e)} required>
                            <option value=""></option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        : 
                        <input className="decision" value={decision} type="number" title="Choose Target Value" onChange={(e) => handleDecisionValueChange(e)} required/>
                    }
                    
                </div>
                <ul>
                    { children }
                </ul>
            </div>
            <div className="m-2 position-absolute main-buttons">
                <button className="btn btn-dark mr-1" type="button" title="Create Rule Tree" onClick={()=>handleCreateTreeAction()} disabled>
                    <i className="fas fa-sitemap"></i>
                </button>
                <button className="btn btn-primary" type="submit" title="Save Rule Tree" disabled={isSaved}>
                    <i className="fas fa-save"></i>
                </button>
                <button className="btn btn-danger ml-1" type="button" title="Delete Rule Tree" onClick={()=>handleDeleteAction()}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </form>
    )
}

export { RuleTree }