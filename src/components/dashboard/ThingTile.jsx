import React, { createContext, useRef } from 'react'
import PropTypes from 'prop-types'
import useFetch from '../../hooks/use-fetch'
import ToggleSwitchItem from './ToggleSwitchItem';
import TachometerItem from './TachometerItem';
import ThermometerItem from './ThermometerItem';
import EnergyMeterItem from './EnergyMeterItem';
import { useTranslation } from 'react-i18next';
import ShutterItem from './ShutterItem';
import CompositeMeterItem from './CompositeMeterItem';
import SmartMeterItem from './SmartMeterItem';
import SingleTimeSeriesItem from './SingleTimeSeriesItem';
import MultipleTimeSeriesItem from './MultipleTimeSeriesItem';

const ThingActionContext = createContext(null)

const ThingContainer = ({description, children}) => {

    return (
        <div className="card shadow m-1" title={description}>
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold small text-primary text-truncate">{description}</h6>
            </div>
            <div className="thingtile">
                <div className="bg-gray-400">
                    {children[0]}
                </div>
                {children[1]}
            </div>
        </div>
    )
}

/**
 * This component is just a container used to hold any sensor item with a {@link SingleTimeSeriesItem}.
 * or with a {@link MultipleTimeSeriesItem}.
 * It is responsible for retrieving the Thing desription of the elements within a {@link Space} using the URI supplied for that element by the parent {@link Space}. As a component, it helps in displaying the current value of any element as well as the history of the element as a time series.
 * 
 * It helps to display a {@link SingleTimeSeries} for single-property Things as well or a {@link MultipleTimeSeries} for multiple-property Things.
 * 
 * @see {@link TachometerItem} for an example of a sensor item that can be held inside the ThingTile.
 * 
 * @category Dashboard
 * 
 * @component
 * 
 */
const ThingTile = ({url, tileIndex}) => {
    const { t, } = useTranslation();
    const {isLoading, isError, data} = useFetch(url);
    const thingRef = useRef()
    const historyRef = useRef()
    
    const updateThingDisplay = () => {
        thingRef.current.updateDisplay()
        historyRef.current.updateDisplay()
    }

    if (isLoading){
        return <div className="ml-3">{t("loading")}...</div>;
    }

    if (isError){
        return (
            <div className="card-body">
                <div className="error" title={`${url}`}>
                    <div className="errorcontainer">
                        <p className="w-100">{t("error")}... {url}</p>
                    </div>
                </div>
            </div>
        )
    }

    const properties = data["properties"];
    const actions = data["actions"];

    // Check if it is a 4 property device
    if (properties && properties.hasOwnProperty('temperature') && properties.hasOwnProperty('power')
        && properties.hasOwnProperty('energy') && properties.hasOwnProperty('onOff')){
        return (
            <ThingActionContext.Provider value={updateThingDisplay}>
                <ThingContainer description={data["description"]}>
                    <CompositeMeterItem
                        ref={thingRef}
                        key={tileIndex} 
                        energyUrl={properties['energy']['forms'][0]['href']}
                        powerUrl={properties['power']['forms'][0]['href']} 
                        temperatureUrl={properties['temperature']['forms'][0]['href']} 
                        switchUrl={properties['onOff']['forms'][0]['href']}
                        actionUrl={actions['onOff']['forms'][0]['href']}/>
                    <MultipleTimeSeriesItem
                        ref={historyRef}
                        key={tileIndex}
                        description={data["description"]}
                        urlList={[
                            actions['energyHistory']['forms'][0]['href'],
                            actions['powerHistory']['forms'][0]['href'],
                            actions['temperatureHistory']['forms'][0]['href'],
                            actions['onOffHistory']['forms'][0]['href']
                        ]} 
                        xAxesLabelStringList={[
                            t("time"),
                            t("time"),
                            t("time"),
                            t("time")
                        ]} 
                        yAxesLabelStringList={[
                            `${t("energy")} (kWh)`,
                            `${t("power")} (W)`,
                            t("temperature"),
                            t("state")
                        ]}
                        typeList={[
                            'energy',
                            'power',
                            'temperature',
                            'onOff'
                        ]}
                        isBinaryList={[
                            false,
                            false,
                            false,
                            true
                        ]}/>
                </ThingContainer>
            </ThingActionContext.Provider>
        )
    }

    // Check if it is a 2 property device
    if (properties && properties.hasOwnProperty('power') && properties.hasOwnProperty('energy')){
        return (
            <ThingContainer description={data["description"]}>
                <SmartMeterItem 
                    energyUrl={properties['energy']['forms'][0]['href']}
                    powerUrl={properties['power']['forms'][0]['href']}/>
                <MultipleTimeSeriesItem
                    description={data["description"]}
                    urlList={[
                        actions['energyHistory']['forms'][0]['href'],
                        actions['powerHistory']['forms'][0]['href']
                    ]} 
                    xAxesLabelStringList={[
                        t("time"),
                        t("time"),
                    ]} 
                    yAxesLabelStringList={[
                        `${t("energy")} (kWh)`,
                        `${t("power")} (W)`
                    ]}
                    typeList={[
                        'energy',
                        'power'
                    ]}
                    isBinaryList={[
                        false,
                        false
                    ]}/>
            </ThingContainer>
        )
    }

    // Check if it is a binary switch with OpenClose Property
    if (properties && properties.hasOwnProperty('openClose')){
        return (
            <ThingContainer description={data["description"]}>
                <ToggleSwitchItem 
                    url={properties['openClose']['forms'][0]['href']} 
                    type={'openClose'}/>
                <SingleTimeSeriesItem
                    description={data["description"]}
                    url={actions['openCloseHistory']['forms'][0]['href']} 
                    isBinary={true} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={t("state")}
                    type={'openClose'}/>
            </ThingContainer>
        )
    }

    // Check if it is a binary switch with OnOff property
    if (properties && properties.hasOwnProperty('onOff')){
        return (
            <ThingActionContext.Provider value={updateThingDisplay}>
                <ThingContainer description={data["description"]}>
                    <ToggleSwitchItem
                        ref={thingRef} 
                        key={tileIndex}
                        url={properties['onOff']['forms'][0]['href']} 
                        type={'onOff'}
                        actionUrl={actions['onOff']['forms'][0]['href']}/>
                    <SingleTimeSeriesItem
                        ref={historyRef}
                        key={tileIndex}
                        description={data["description"]}
                        url={actions['onOffHistory']['forms'][0]['href']} 
                        isBinary={true} 
                        xAxesLabelString={t("time")} 
                        yAxesLabelString={t("state")}
                        type={'onOff'}/>
                </ThingContainer>
            </ThingActionContext.Provider>
        )
    }

    // Check if it is a binary switch with motionDetected property
    if (properties && properties.hasOwnProperty('motionDetected')){
        return (
            <ThingContainer description={data["description"]}>
                <ToggleSwitchItem 
                    url={properties['motionDetected']['forms'][0]['href']} 
                    type={'motionDetected'}/>
                <SingleTimeSeriesItem
                    description={data["description"]}
                    url={actions['motionDetectedHistory']['forms'][0]['href']} 
                    isBinary={true} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={t("state")}
                    type={'motionDetected'}/>
            </ThingContainer>
        )
    }

    // Check if it is a shutter with position property
    if (properties && properties.hasOwnProperty('position') && properties.hasOwnProperty('slatAngle')){
        return (
            <ThingContainer description={data["description"]}>
                <ShutterItem 
                    positionUrl={properties['position']['forms'][0]['href']}
                    slatAngleUrl={properties['slatAngle']['forms'][0]['href']}/>
                <MultipleTimeSeriesItem
                    description={data["description"]}
                    urlList={[
                        actions['positionHistory']['forms'][0]['href'],
                        actions['slatAngleHistory']['forms'][0]['href']
                    ]} 
                    xAxesLabelStringList={[
                        t("time"),
                        t("time"),
                    ]} 
                    yAxesLabelStringList={[
                        `${t("position")} (%)`,
                        `${t("slat_angle")} (%)`
                    ]}
                    typeList={[
                        'position',
                        'slatAngle'
                    ]}
                    isBinaryList={[
                        false,
                        false
                    ]}/>
            </ThingContainer>
        )
    }

    // Check if it is a temperature device
    if (properties && properties.hasOwnProperty('temperature')){
        return (
            <ThingActionContext.Provider value={updateThingDisplay}>
                <ThingContainer description={data["description"]}>
                    <ThermometerItem
                        ref={thingRef}
                        key={tileIndex} 
                        url={properties['temperature']['forms'][0]['href']}
                        min={properties['temperature']['properties']['temperature']['minimum']}
                        max={properties['temperature']['properties']['temperature']['maximum']}
                        actionUrl={actions['targetTemperature']['forms'][0]['href']}/>
                    <SingleTimeSeriesItem
                        ref={historyRef}
                        key={tileIndex}
                        description={data["description"]}
                        url={actions['temperatureHistory']['forms'][0]['href']} 
                        isBinary={false} 
                        xAxesLabelString={t("time")} 
                        yAxesLabelString={`${t("temperature")} (°C)`}
                        type={'temperature'}/>
                </ThingContainer>
            </ThingActionContext.Provider>
        )
    }

    // Check if it is an enery meter
    if (properties && properties.hasOwnProperty('energy')){
        return (
            <ThingContainer description={data["description"]}>
                <EnergyMeterItem url={properties['energy']['forms'][0]['href']}/>
                <SingleTimeSeriesItem
                    description={data["description"]} 
                    url={actions['energyHistory']['forms'][0]['href']} 
                    isBinary={false} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={`${t("energy")} (kWh)`}
                    type={'energy'}/>
            </ThingContainer>
        )
    }

    // Check if it is a power sensor on Phase A
    if (properties && properties.hasOwnProperty('powerA')){
        return (
            <ThingContainer description={data["description"]}>
                <TachometerItem 
                    url={properties['powerA']['forms'][0]['href']}
                    type={'powerA'}/>
                <SingleTimeSeriesItem
                    description={data["description"]} 
                    url={actions['powerAHistory']['forms'][0]['href']}
                    isBinary={false} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={`${t("power")} (W)`}
                    type={'powerA'}/>
            </ThingContainer>
        )
    }

    // Check if it is a power sensor on Phase B
    if (properties && properties.hasOwnProperty('powerB')){
        return (
            <ThingContainer description={data["description"]}>
                <TachometerItem 
                    url={properties['powerB']['forms'][0]['href']}
                    type={'powerB'}/>
                <SingleTimeSeriesItem
                    description={data["description"]} 
                    url={actions['powerBHistory']['forms'][0]['href']}
                    isBinary={false} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={`${t("power")} (W)`}
                    type={'powerB'}/>
            </ThingContainer>    
        )
    }

    // Check if it is a power sensor on Phase C
    if (properties && properties.hasOwnProperty('powerC')){
        return (
            <ThingContainer description={data["description"]}>
                <TachometerItem 
                    url={properties['powerC']['forms'][0]['href']}
                    type={'powerC'}/>
                <SingleTimeSeriesItem
                    description={data["description"]} 
                    url={actions['powerCHistory']['forms'][0]['href']}
                    isBinary={false} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={`${t("power")} (W)`}
                    type={'powerC'}/>
            </ThingContainer>
        )
    }

    // Check if it is a power sensor with no phase specified
    if (properties && properties.hasOwnProperty('power')){
        return (
            <ThingContainer description={data["description"]}>
                <TachometerItem 
                    url={properties['power']['forms'][0]['href']}
                    type={'power'}/>
                <SingleTimeSeriesItem
                    description={data["description"]} 
                    url={actions['powerHistory']['forms'][0]['href']}
                    isBinary={false} 
                    xAxesLabelString={t("time")} 
                    yAxesLabelString={`${t("power")} (W)`}
                    type={'power'}/>
            </ThingContainer>
        )
    }

    return (
        <div>Empty Not Mactched</div>
    )
}

ThingTile.propTypes = {
    /**
     * The endpoint to fetch the Thind description from. This is used to fetch the URI for the current value of  each property of a Thing or sensor as well as the time series or history of each property of the Thing.
     */
    url: PropTypes.string.isRequired,
}

export { ThingActionContext }
export default ThingTile
