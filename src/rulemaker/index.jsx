import React, { useEffect, useRef, useState } from 'react'
import { RuleTree } from './RuleTree'
import { Condition } from './Condition'
import { Combine } from './Combine'
import { RuleContext, RuleRunner } from "./RuleHelper"
import './rulemaker.css'

const RuleMaker = ({deviceId, isBinary, properties}) => {
    const baseUrl = "http://localhost:3004/rules/"
    const url = baseUrl + deviceId
    console.log(url)
    const propertyOptions = ["", ...properties]
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [tree, setTree] = useState(undefined)
    const [saved, setSaved] = useState(true)
    const postFlagRef = useRef()

    const makeRequestWithMethod = (url, method, body) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json; charset=UTF-8");

        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                    return resp.json();
                }else if (resp.status === 404 && method !== 'DELETE'){
                    return undefined // This will determine if the next submit action will be a POST or a PUT
                }
                else {
                    if (method === 'GET') {
                        setIsLoading(false)
                        setIsError(true)
                    }else if (method === 'PUT') {
                        setSaved(false)
                    }
                    throw new Error(resp.statusText);
                }
            })
            .then((resultsObj) => {
                postFlagRef.current = resultsObj
                if (method === 'GET') {
                    setIsLoading(false)
                    setIsError(false)
                    setTree(resultsObj === undefined? undefined : resultsObj.ruletree)
                } else if (method === 'PUT'){
                    setSaved(true)
                } else if (method === 'DELETE'){
                    setTree(undefined)
                    postFlagRef.current = undefined
                }
                
            })
            .catch((error) => {
                console.log("ERROR> " + error);
                if (method === 'GET'){
                    setIsLoading(false)
                    setIsError(true)
                }else if (method === 'PUT'){
                    setSaved(false)
                }     
            });
    }

    useEffect(() => {
        makeRequestWithMethod(url, 'GET')
    }, [url])

    if (isLoading) {
        return "Loading"
    }

    if (isError) {
        return "Error"
    }

    const onNodeValueChanged = (nodeQualifiedId, type, newValue) => {
        if (nodeQualifiedId === 'rootNode'){
            setTree({...tree, value: newValue})
            setSaved(false)
            return;
        }
        
        const newTree = { ...tree }
        let node = findNodeQualifiedById(nodeQualifiedId, newTree.children)
        if (!node) {
            alert("Node not found")
            return
        }
        if (node.name === 'combine'){
            node.value = newValue
        }else{
            switch (type) {
                case 'fact':
                    node.value.fact = newValue
                    break;
                case 'operator':
                    node.value.operator = newValue
                    break;
                case 'value':
                    node.value.value = newValue
                    break;
                default:
                    break;
            }
        }
        setTree(newTree)
        setSaved(false)
    }

    const findNodeQualifiedById = (nodeQualifiedId, nodeArray) => {
        let node = null
        let currentArray = nodeArray
        let idArray = nodeQualifiedId.split('.')
        for (let index = 0; index < idArray.length; index++) {
            let foundNode = currentArray.find(node => node.id === idArray[index])
            
            if (index !== idArray.length - 1) {
                currentArray = foundNode.children
            }else{
                node = foundNode
            }
        }
        return node
    }

    const onNewNodeAdded = (parentNodeQualifiedId, nodeType) => {
        let newTree = { ...tree }
        let node = undefined
        let newId = Date.now().toString()
        if (nodeType === 'combine') {
            node = {
                id: newId,
                name: "combine",
                value: "",
                children: []
            }
        }else{
            node = {
                id: newId,
                name: "condition",
                value: {
                    fact: "",
                    operator: "",
                    value: ""
                }
            }
        }
        if (parentNodeQualifiedId === 'rootNode') {
            newTree.children.push(node)
        }else{
            let parentNode = findNodeQualifiedById(parentNodeQualifiedId, newTree.children)
            parentNode.children.push(node)
        }
        setTree(newTree)
        setSaved(false)
    }

    const onItemDeleteClicked = (parentQualifiedId, nodeQualifiedId) => {
        let newTree = undefined
        if (nodeQualifiedId === 'rootNode') {
          if (postFlagRef.current === undefined) {
              setTree(undefined)
          } else {
              makeRequestWithMethod(url, 'DELETE')
          } 
        }else{
            console.log(nodeQualifiedId)
            newTree = { ...tree }
            let idArray = nodeQualifiedId.split('.')
            if (idArray.length === 1) {
                newTree.children = newTree.children.filter(node => node.id !== nodeQualifiedId)
            }else{
                let nodeId = idArray.pop()
                let parentNode = findNodeQualifiedById(parentQualifiedId, newTree.children)
                parentNode.children = parentNode.children.filter(node => node.id !== nodeId)
            }
            setTree(newTree)
            setSaved(false)
        }
    }

    const onCreateRuleTree = () => {
        setTree({
            id: "rootNode",
            name: "combine",
            value: "",
            decision: "",
            children: []
        })
        setSaved(false)
    }

    const onDecisionValueChanged = (newValue) => {
        if (newValue === 'true' || newValue === 'false' || newValue === '') {
            setTree({ ...tree, decision: newValue === 'true'})
        }else{
            setTree({ ...tree, decision: parseFloat(newValue)})
        }
        setSaved(false)
    }

    const onSubmit = () => {
        let body = JSON.stringify({
            id: deviceId,
            ruletree: tree
        })
        let requestUrl = postFlagRef.current === undefined ? baseUrl : url
        let method = postFlagRef.current === undefined ? 'POST' : 'PUT'
        makeRequestWithMethod(requestUrl, method, body)
    }

    if (tree === undefined) {
        return (
            <div className="treecontainer position-relative p-2">
                <div>
                    <h5>No rule tree saved for this devices</h5>
                    <p>Click on the <strong><em>Create Rule Tree</em></strong> icon on the right to start.</p>
                </div>
                <div className="m-2 position-absolute main-buttons">
                    <button className="btn btn-dark mr-1" type="button" title="Create Rule Tree" onClick={()=>onCreateRuleTree()}>
                        <i className="fas fa-sitemap"></i>
                    </button>
                    <button className="btn btn-primary" type="submit" title="Save Rule Tree" disabled>
                        <i className="fas fa-save"></i>
                    </button>
                    <button className="btn btn-danger ml-1" type="button" title="Delete Rule Tree" disabled>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="treecontainer position-relative">
        <RuleContext.Provider 
        value={
            {propertyOptions: propertyOptions, 
            nodeValueChangeHandler: onNodeValueChanged, 
            nodeAddedHandler: onNewNodeAdded, 
            itemDeleteHandler: onItemDeleteClicked, 
            createRuleTreeHandler: onCreateRuleTree,
            decisionChangeHandler: onDecisionValueChanged,
            submitHandler: onSubmit}}>
            <RuleTree id={tree.id} value={tree.value} decision={tree.decision} isBinaryDecision={isBinary} isSaved={saved}>
                {
                    tree.children.map((child) => {
                        switch (child.name) {
                            case 'condition':
                                return <Condition key={child.id} qualifiedId={child.id} parentQualifiedId={'rootNode'} value={child.value}/>
                            case 'combine':
                                return <Combine key={child.id} id={child.id} qualifiedId={child.id} parentQualifiedId={'rootNode'} subtree={child.children} value={child.value}/>
                            default:
                                return null
                        }
                    })
                }
            </RuleTree>
        </RuleContext.Provider>
        </div>
    )
}

export { RuleRunner }
export default RuleMaker