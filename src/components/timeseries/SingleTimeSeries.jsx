import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Line} from 'react-chartjs-2'
import { getChartData, getTypeSpecificAxesOptions, getTypeSpecificTickOptions } from '../../utils/chart_utils'
import 'chartjs-adapter-date-fns'
import { useTranslation } from 'react-i18next'

/**
 * This is a component used to display a time series graph of the history of values for the
 * single-property items. 
 * 
 * @category Time Series
 * @component
 */
const SingleTimeSeries = ({isBinary, xAxesLabelString, yAxesLabelString, dataSet, type, startTime, endTime}) => {
    const { t, } = useTranslation()
    const chartRef = useRef(null);
    const timeformat = t("time_format")

    const data = {
        datasets: [
            {
                type: isBinary? 'scatter': 'line',
                backgroundColor: "#C96D4288", // Options: 00555588 C96D4288 8E9D4DBB
                borderColor: "#4e73df",
                fill: !isBinary,
                borderWidth: 2,
                data: Array.isArray(dataSet) ? getChartData(dataSet, type): null,
                pointRadius: isBinary? 2 : 0
            }
        ]
    }

    const options = {
        animation: false,
        responsive : true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
		    y: {
                title : {
                    display: true,
                    text: yAxesLabelString
                },
                ticks: {
                    font: {
                        size: 8
                    },
                    ...getTypeSpecificTickOptions(type)
                },
                ...getTypeSpecificAxesOptions(type)
            },
		    x: {
                type: 'time',
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: timeformat
                    }
                },
                title : {
                    display: true,
                    text: xAxesLabelString
                },
                ticks: {
                    font: {
                        size: 8
                    }
                },
                min: startTime,
                max: endTime
            }
		},
        plugins: {
            title:{
                display:false,
            },
            legend:{
                display:false,
            }
        }

    }

    useEffect(() => {
        if(chartRef.current) chartRef.current.update();
    })

    return (
        <div className="w-100 h-100 p-2">
            <Line ref={chartRef} data={data} options={options}/>
        </div>
    )
}

SingleTimeSeries.propTypes = {
    /**
     * A flag to check whether the values are continuous values or
     * a two-state values like true and false.
     */
    isBinary: PropTypes.bool.isRequired,
    /**
     * The title of the x-axis of the time series.
     */
    xAxesLabelString: PropTypes.string.isRequired,
    /**
     * The title of the y-axis of the time series.
     */
    yAxesLabelString: PropTypes.string.isRequired,
    /**
     * The array of values to be displayed in the time series.
     */
    dataSet: PropTypes.array.isRequired,
    /**
     * The type of sensor value whose history is being displayed.
     */
    type: PropTypes.string.isRequired
}

export default SingleTimeSeries