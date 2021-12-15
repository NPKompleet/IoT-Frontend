import React, {useImperativeHandle, useRef, useState} from 'react'
import { useHistory, useLocation} from 'react-router'
import useFetch from '../hooks/use-fetch'
import { useTranslation } from 'react-i18next'
import { Line } from 'react-chartjs-2'
import './pages.css'
import { getChartData, getTypeSpecificAxesOptions, getTypeSpecificTickOptions } from '../utils/chart_utils'
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-zoom'
import 'chartjs-adapter-date-fns'
import { exportCSVFile } from '../utils/download_utils'

Chart.register(zoomPlugin);

/**
 * This is the page used to display more details of the history of values of a particular sensor or Thing. 
 * It is shown when a {@link SingleTimeSeries} in any {@link ThingTile} is clicked.
 * It contains buttons for selecting how much interval of history should be shown. Either for
 * one day, one month or one year and retrieves the value history for the thing that corresponds to the
 * selected time interval.
 * It can only be viewed by clicking on a {@link MultipleTimeSeries} otherwise the page 
 * redirects to an {@link ErrorPage} instead.
 * 
 * @category Pages
 * @component
 */
const SingleChartPage = () => {
    const { t, } = useTranslation();
    const location = useLocation();
    const history = useHistory();
    const startInputRef = useRef(null)
    const endInputRef = useRef(null)
    const childRef = useRef(null)

    if (location.state === undefined) {
        history.push('/error');
    }
    const datetimeFormat = t("datetime_format")
    const intervals = [t("hour"), t("day"), t("week")]
    const intervalValues = [3600, 86400, 604800]
    let now = parseInt(Date.now()/1000);
    const [state, setState] = useState({intervalIndex: 0, endTime: now, startTime: now - intervalValues[0]})
    
    let body = JSON.stringify({
        "start": state.startTime,
        "end": state.endTime
    });
    
    const {isLoading, isError, data} = useFetch(location.state.url, 'POST', body, state.startTime, state.endTime);

    const handleIntervalChange = (index) => {
        let now = parseInt(Date.now()/1000)
        setState({
            intervalIndex: index, 
            endTime: now, 
            startTime: now - intervalValues[index]
        })
    }

    const goBack = () => {
        history.goBack()
    }

    const handleDateTimeIntervalSubmitted = (event) => {
        event.preventDefault()
        let start = parseInt(Date.parse(startInputRef.current.value) / 1000)
        let end = parseInt(Date.parse(endInputRef.current.value) / 1000)
        if (end < start) {
            alert("end time cannot be earlier than start time")
            return;
        }
        setState({
            intervalIndex: -1,
            endTime: end,
            startTime: start
        })
    }

    const exportChartData = () => {
        childRef.current.downloadChartData()
    } 

    if (isLoading){
        return <div className="ml-3">{t("loading")}...</div>;
    }

    if (isError){
        return <div className="ml-3">{t("error")}...</div>;
    }

    console.log("data: " + data)

    return (
        <div className="detailChart p-2">
            {
                intervals.map((interval, index) => {
                    return <button key={index}
                                className={`btn btn-primary text-white rounded-0 border border-primary
                                            ${index === state.intervalIndex && 'bg-white text-primary'}`}
                                onClick={() => handleIntervalChange(index)}>
                                1 {interval}
                           </button>
                })
            }
            <button className="btn btn-primary text-white rounded-0 border border-primary float-right" onClick={() => goBack()}>
                <i className="fas fa-arrow-alt-circle-left mr-2"></i>
                {t("go_back")}
            </button>
            <SingleChartPanel
                ref={childRef}
                description={location.state.description}
                isBinary={location.state.isBinary}
                xAxesLabelString={location.state.xAxesLabelString}
                yAxesLabelString={location.state.yAxesLabelString}
                type={location.state.type}
                dataSet={data}
                startTime={state.startTime * 1000}
                endTime = {state.endTime * 1000}
                datetimeFormat={datetimeFormat}/>
            <form className="float-right" onSubmit={handleDateTimeIntervalSubmitted}>
                Start:
                <input ref={startInputRef} className="form-control bg-light small" type="datetime-local" name="start" id="start" max={`${new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().substr(0, 16)}`} required/>
                End:
                <input ref={endInputRef} className="form-control bg-light small" type="datetime-local" name="end" id="end" max={`${new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().substr(0, 16)}`} required/>
                <button className="btn btn-white text-primary border border-primary rounded-0 mt-1 float-right" type="submit">Submit</button>
                <button className="btn btn-white text-primary border border-primary rounded-0 mt-1 mr-1 float-right"
                    type="button"
                    onClick={() => exportChartData()}>
                    <i class="fas fa-download"></i>
                </button>
            </form>
        </div>
    );
}

const SingleChartPanel = React.forwardRef(({description, isBinary, xAxesLabelString, yAxesLabelString, dataSet, type, 
    startTime, endTime, datetimeFormat}, ref) => {
    const singleChartRef = useRef(null)
    const [showResetZoom, setShowResetZoom] = useState(false)

    const resetZoom = () => {
        singleChartRef.current.resetZoom()
        setShowResetZoom(false)
    }

    const downloadChartData = () => {
        let a = document.createElement('a');
        a.href = singleChartRef.current.toBase64Image();
        let time = Date.now()
        a.download = `${time}_${type}.png`;
        a.click();

        const headers = {
            time: "Time",
            value: type
        }
        exportCSVFile(headers, dataSet, `${time}_${type}`)
    }

    useImperativeHandle(ref, () => ({
        downloadChartData: () => {
            downloadChartData();
        }
    }))

    const data = {
        datasets: [
            {
                type: isBinary? 'scatter': 'line',
                backgroundColor: "#C96D4288", // Options: 00555588 C96D4288 8E9D4DBB
                borderColor: "#4e73df",
                fill: !isBinary,
                borderWidth: 2,
                data: Array.isArray(dataSet) ? getChartData(dataSet, type): null,
                pointRadius: isBinary? 3 : 0
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
                    minUnit: 'minute',
                    displayFormats: {
                        minute: datetimeFormat,
                        hour: datetimeFormat,
                        day: datetimeFormat,
                        week: datetimeFormat,
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
                display:true,
                text: description
            },
            legend:{
                display:false,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                    onZoomStart: () => setShowResetZoom(true)
                },
                limits: {
                    x: {min: startTime, max: endTime},
                    y: {min: 'original', max: 'original'}
                }
            }
        }

    }
    return (
        <div className="w-100 h-100 p-2">
            <Line ref={singleChartRef} data={data} options={options}/>
            {
                showResetZoom ?
                    <button className="btn btn-primary text-white rounded-0 border border-primary" onClick={() => resetZoom()}>
                        Reset Zoom
                    </button>
                : null
            }
        </div>
    )
})

export {SingleChartPanel}
export default SingleChartPage
