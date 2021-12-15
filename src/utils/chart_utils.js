const getChartData = (dataSet, type) => {
    const chartData = dataSet.map((data) => {
        return {
            x: data['time'],
            y: data[type] ?? data['value']
        }
    });
    return chartData;
}

const getBinaryValue = (value) => {
    switch (value) {
        case 0:
            return "False";
        case 1:
            return "True";
        default:
            return "";
    }
}

const getTypeSpecificAxesOptions = (type) => {
    let suggestedMinValue = undefined
    let suggestedMaxValue = undefined
    let minValue = undefined
    switch (type) {
        case "temperature":
        case "power":
        case "powerA":
        case "powerB":
        case "powerC":
            minValue = 0;
            break;
        case "onOff":
        case "openClose":
        case "motionDetected":
            suggestedMaxValue = 1;
            suggestedMinValue = 0;
            break;
        case "position":
        case "slatAngle":
            suggestedMaxValue = 100;
            suggestedMinValue = 0;
            break
        default:
            break;
    }
    return {suggestedMax: suggestedMaxValue, suggestedMin: suggestedMinValue, min: minValue}
}

const getTypeSpecificTickOptions = (type) => {
    let stepSizeValue = undefined;
    let callbackFunction = (value) => value
    switch (type) {
        case "onOff":
        case "openClose":
        case "motionDetected":
            stepSizeValue = 0.5
            callbackFunction = (value) => getBinaryValue(value)
            break;
        default:
            break;
    }
    return {stepSize: stepSizeValue, callback: callbackFunction}
}

export {getChartData, getTypeSpecificAxesOptions, getTypeSpecificTickOptions}