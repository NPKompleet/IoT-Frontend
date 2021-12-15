const ENERGY_PROPERTY = "Energy"
const POWER_PROPERTY = "Power"

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

const convertTreeToRuleParams = tree => {
    let conditions = { ...parseRuleTree(tree.value, tree.children) }
    conditions = {
        ...conditions,
        ...{
            event:
            {
                type: 'trigger',
                params: { message: tree.decision }
            }
        }
    }
}

const parseConditionValue = value => {
    let newValue = { ...value }
    if (value.fact === 'date') {
        // Get date integer value in seconds
        newValue.value = parseInt(Date.parse(new Date(value.value)) / 1000)
    } else if (value.fact === 'time') {
        // Get the time value as integer in seconds by using 1, January 1970 as date
        // This helps to compare 2 different times accordingly
        newValue.value = parseInt(Date.parse('1970-01-01T' + value.value) / 1000)
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

export { convertTreeToRuleParams }