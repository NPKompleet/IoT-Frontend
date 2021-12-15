import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useInterval from '../../hooks/use-interval'
import SingleTimeSeries from './SingleTimeSeries'

/**
 * This is a component used to display a time series graph of the history of values for the
 * multiple-property items. It relies on {@link SingleTimeSeries} to display the time series
 * of each property measured by the sensor. And it uses the {@link useInterval} hook to switch 
 * the display among each time series at regular time intervals.
 * 
 * @category Time Series
 * @component
 */
const MultipleTimeSeries = ({dataSetList, xAxesLabelStringList, yAxesLabelStringList, typeList, isBinaryList, startTime, endTime}) => {

    const [index, setIndex] = useState(0)
    useInterval(() => {
        setIndex((index + 1) % dataSetList.length)
    }, 10000)
    return (
        <div className="w-100 h-100">
            <SingleTimeSeries 
                dataSet={dataSetList[index]}
                xAxesLabelString={xAxesLabelStringList[index]}
                yAxesLabelString={yAxesLabelStringList[index]}
                type={typeList[index]}
                isBinary={isBinaryList[index]}
                startTime={startTime}
                endTime={endTime}/>
        </div>
    )
}

MultipleTimeSeries.propTypes = {
    /**
     * The list of data of each of the properties to be visualized in the multiple
     * time series.
     */
    dataSetList: PropTypes.array.isRequired,
    /**
     * The list of titles of the x-axis of each of the graphs in the time series.
     */
    xAxesLabelStringList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list of titles of the y-axis of each of the graphs in the time series.
     */
    yAxesLabelStringList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list of types of sensor values whose history is being displayed.
     */
    typeList: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The list flags to check whether the value which the multiple-property sensor 
     * returns is a continuous value or a two-state value like true and false.
     */
    isBinaryList: PropTypes.PropTypes.arrayOf(PropTypes.bool).isRequired
}

export default MultipleTimeSeries