import React, { createContext, useContext, useEffect } from 'react'
import { Engine } from 'json-rules-engine'
import { ThingActionContext } from '../components/dashboard/ThingTile'
import { postSendAction } from '../utils/send_action_utils'

const RuleContext = createContext(null)

const setNodeValidity = (id, isValid) => {
    const text = isValid ? '' : 'This node must have a child'
    const element = document.getElementById(id)
    element.setCustomValidity(text)
}

const RuleRunner = ({deviceId, facts, actionUrl, type}) => {
    const engine = new Engine()
    const updateThingDisplay = useContext(ThingActionContext)
    const url = "http://localhost:3004/rules/" + deviceId

    const creatHTTPBody = (message, type) => {
        console.log("type: " + type)
        switch (type) {
            case 'onOff':
            case 'composite':
                const payload = JSON.stringify({"onOff": message})
                console.log("message is: " + typeof message)
                return payload
            case 'temperature':
                return JSON.stringify({"temperature": message})
            default:
                return;
        }
    }

    const onSuccess = () => {
        setTimeout(() => {
            engine.stop()
            updateThingDisplay()
        }, 2000);
    }

    const onError = () => {
        console.log("Posting action failed")
    }

    const parseFactValue = (value, type) => {
        switch (type) {
            case 'onOff':
            case 'composite':
                return value === 1
            default:
                return value;
        }
    }

    const runRuleForDevice = async() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json; charset=UTF-8");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const resp = await fetch(url, requestOptions)
            const data = await resp.json()

            const tree =  data.ruletree
            if (tree) {
                const ruleParams = convertTreeToRuleParams(tree)
                console.log(ruleParams)
                if(ruleParams) console.log(facts)

                if(ruleParams) console.log('engine started')
                engine.addRule(ruleParams)
                    .on('trigger', (params) => {
                        console.log(params.message)
                        // Only post decision if current value is different from rule decision
                        if (parseFactValue(facts[type], type) !== params.message) {
                            postSendAction(actionUrl, creatHTTPBody(params.message, type), onSuccess, onError)
                        }
                    })
                    .run(facts)
                    .catch((error) => console.log('engine error' + error))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        runRuleForDevice()
    })

    return <></>
}

const convertTreeToRuleParams = tree => {
    let ruleParams = {
        conditions: parseRuleTree(tree.value, tree.children),
        event: {
            type: 'trigger',
            params: { message: tree.decision }
        }
    }
    return ruleParams
}

const parseConditionValue = value => {
    let newValue = { ...value }
    switch (value.fact) {
        case 'date':
            // Get date integer value in seconds
            newValue.value = parseInt(Date.parse(new Date(value.value).toLocaleDateString()) / 1000)
            break;
        case 'time':
            // Get the time value as integer in seconds by using 1, January 1970 as date
            // This helps to compare 2 different times accordingly
            newValue.value = parseInt(Date.parse('1970-01-01T' + value.value) / 1000)
            break;
        case 'onOff':
            newValue.value = value.value === '1'? 1 : 0
            break;
        default:
            newValue.value = parseFloat(value.value)
            break;
    }
    return newValue
}

const parseRuleTree = (value, subtree) => {
    const listObj = {}
    let list = undefined
    if (value === 'any') {
        listObj.any = []
        list = listObj.any
    } else if (value === 'all') {
        listObj.all = []
        list = listObj.all
    }

    for (let index = 0; index < subtree.length; index++) {
        if (subtree[index].name === 'condition') {
            const valObj = parseConditionValue(subtree[index].value)
            list.push(valObj)
        } else if (subtree[index].name === 'combine') {
            let childValue = subtree[index].value
            let childSubtree = subtree[index].children
            list.push(parseRuleTree(childValue, childSubtree))
        }
    }
    return listObj
}


export { RuleContext, RuleRunner, setNodeValidity }