import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Battery from '../components/battery';
import SingleTimeSeries from '../components/timeseries/SingleTimeSeries';
import useFetch from '../hooks/use-fetch';
import useInterval from '../hooks/use-interval';


const ChartContainer = ({url}) => {
    let now = parseInt(Date.now()/1000);
    let start = now - 3600
    const [time, setTime] = useState({endTime: now, startTime: start})

    const refresh = () => {
        now = parseInt(Date.now()/1000);
        start = now - 3600
        setTime({endTime: now, startTime: start});
    }

    let body = JSON.stringify({
            "start": time.startTime,
            "end": time.endTime
            });

    useInterval(() => {
            refresh();
        }
    );
    const {isLoading, isError, data} = useFetch(url, 'POST', body, time.startTime, time.endTime);

    if (isLoading) {
        return (
            <SingleTimeSeries 
                isBinary={false} 
                xAxesLabelString={'Time'} 
                yAxesLabelString={'Power [W]'}
                dataSet={[]}
                type={'power'}
                startTime={time.startTime * 1000}
                endTime={time.endTime * 1000}/>
            )
    }

    if (isError) {
        return (
            <SingleTimeSeries 
                isBinary={false} 
                xAxesLabelString={'Time'} 
                yAxesLabelString={'Power [W]'}
                dataSet={[]}
                type={'power'}
                startTime={time.startTime * 1000}
                endTime={time.endTime * 1000}/>
            )
    }

    return (
            <SingleTimeSeries 
                isBinary={false} 
                xAxesLabelString={'Time'} 
                yAxesLabelString={'Power [W]'}
                dataSet={data}
                type={'power'}
                startTime={time.startTime * 1000}
                endTime={time.endTime * 1000}/>
            )
}

const InformationGrid = ({name, location, isStorage, value}) => {
    return (
        <div className="h-100 m-2">
            <div className="contentgrid">
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">Name</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{name}</p>
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">Location</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{location}</p>
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">
                {isStorage? "Capacity" : "Meter Reading"}
            </p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{value}</p>
            </div>
        </div>
        )
}


const InformationGridContainer = ({name, location, isStorage, url}) => {
    const [startTime, setStartTime] = useState(Date.now());
    const {isLoading, isError, data} = useFetch(url, 'GET', null, startTime);

    useInterval(() => {
        setStartTime(Date.now());
        }
    );

    if (!url){
        return <InformationGrid name={name} location={location} isStorage={isStorage} value={''}/>
    }

    if (isLoading){
        return <InformationGrid name={name} location={location} isStorage={isStorage} value={'Loading....'}/>
    }

    if (isError){
        return <InformationGrid name={name} location={location} isStorage={isStorage} value={'Error!!'}/>
    }

    return <InformationGrid name={name} location={location} isStorage={isStorage} value={`${data['power']} W`}/>
}

const TrendGrid = ({dayValue, weekValue, monthValue, yearValue}) => {
    return (
        <div className="h-100 m-2">
            <div className="contentgrid">
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">Today</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{dayValue}</p>
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">This Week</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{weekValue}</p>
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">This Month</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{monthValue}</p>
            <p className="font-weight-bold small text-nowrap text-truncate contentgridtext pl-1 bg-gray-400 m-0">This Year</p>
            <p className="small text-nowrap text-truncate contentgridtext pl-1 m-0">{yearValue}</p>
            </div>
        </div>
    )
}

const TrendGridContainer = ({url}) => {
    let end = parseInt(Date.now()/1000);
    let start = end - 3600
    const [now, setNow] = useState({endTime: end, startTime: start})
    const [today, setToday] = useState({endTime: end-82800, startTime: end-86400})
    const [week, setWeek] = useState({endTime: end-601200, startTime: end-604800})
    const [month, setMonth] = useState({endTime: end-2626143, startTime: end-2629743})
    const [year, setYear] = useState({endTime: end-31553326, startTime: end-31556926})

    const refresh = () => {
        end = parseInt(Date.now()/1000);
        start = end - 3600
        setNow({endTime: end, startTime: start});
        setToday({endTime: end-82800, startTime: end-86400});
        setWeek({endTime: end-601200, startTime: end-604800})
        setMonth({endTime: end-2626143, startTime: end-2629743})
        setYear({endTime: end-31553326, startTime: end-31556926})
    }

    let bodyNow = JSON.stringify({
            "start": now.startTime,
            "end": now.endTime
        });
    
    let bodyToday = JSON.stringify({
            "start": today.startTime,
            "end": today.endTime
        });

    let bodyWeek = JSON.stringify({
            "start": week.startTime,
            "end": week.endTime
        });

    let bodyMonth = JSON.stringify({
            "start": month.startTime,
            "end": month.endTime
        });

    let bodyYear = JSON.stringify({
            "start": year.startTime,
            "end": year.endTime
        });

    useInterval(() => {
            refresh();
        }
    );
    const {isLoading, isError, data: dataNow} = useFetch(url, 'POST', bodyNow, now.startTime, now.endTime);
    const {isLoading1, isError1, data: dataToday} = useFetch(url, 'POST', bodyToday, today.startTime, today.endTime);
    const {isLoading2, isError2, data: dataWeek} = useFetch(url, 'POST', bodyWeek, week.startTime, week.endTime);
    const {isLoading3, isError3, data: dataMonth} = useFetch(url, 'POST', bodyMonth, month.startTime, month.endTime);
    const {isLoading4, isError4, data: dataYear} = useFetch(url, 'POST', bodyYear, year.startTime, year.endTime);

    if(!url || isLoading || isError || isLoading1 || isError1 || isLoading2 || isError2 || isLoading3 || isError3 || isLoading4 || isError4 || JSON.stringify(dataNow) === '{}' || JSON.stringify(dataToday) === '{}' || JSON.stringify(dataWeek) === '{}' || JSON.stringify(dataMonth) === '{}' || JSON.stringify(dataYear) === '{}') {
       return <TrendGrid/>
    }

    // console.log(dataNow)
    // console.log('today')
    // console.log(dataToday)
    const latetestValue = dataNow.pop()['energy']
    return <TrendGrid 
                dayValue={`${latetestValue - dataToday[0]['energy']} Wh`}
                weekValue={`${latetestValue - dataWeek[0]['energy']} Wh`}
                monthValue={`${latetestValue - dataMonth[0]['energy']} Wh`}
                yearValue={`${latetestValue - dataYear[0]['energy']} Wh`}/>
}

const SquareContentItem = ({title, children, isRectangle}) => {
    return (
        <div className={isRectangle? "boardcontent40" : "boardcontent20"}>
            <div className="innerboardcontent">
                <div className="card shadow m-1 contentcard">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold small text-primary text-truncate">{title}</h6>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

const CircularContentItem = ({title}) => {
    return (
        <div className="boardcontent20">
            <div className="innerboardcontent">
                <div className="contentcircle">
                    <div className="circletitle font-weight-bold large text-primary">{title}</div>
                </div>
            </div>
        </div>
    )
}


const BoardContent = () => {
    const powerSeriesUrl = 'https://zuse.icas.fh-dortmund.de:2443/ict-gw/v1/things/b93a4bb4fef74949/actions/cff2defae60941aa/power/timeseries'
    const consumptionUrl = 'https://zuse.icas.fh-dortmund.de:2443/ict-gw/v1/things/b93a4bb4fef74949/actions/cee27b6db08347fc/energy/timeseries'
    const currentPowerUrl = 'https://zuse.icas.fh-dortmund.de:2443/ict-gw/v1/things/b93a4bb4fef74949/properties/cff2defae60941aa/power'
    return (
        <div>
            <div className="w-100 d-flex">
                <CircularContentItem title={"Consumption"}/>
                <SquareContentItem title={"Info"}>
                    <InformationGridContainer name={'Smart Meter'} location={'Stairwell'} url={currentPowerUrl}/>
                </SquareContentItem>
                <SquareContentItem title={"Current Power Chart"} isRectangle={true}>
                    <ChartContainer url={powerSeriesUrl}/>
                </SquareContentItem>
                <SquareContentItem title={"Trend"}>
                    <TrendGridContainer url={consumptionUrl}/>
                </SquareContentItem>
            </div>
            <div className="w-100 d-flex">
                <CircularContentItem title={"Production"}/>
                <SquareContentItem title={"Info"}>
                    <InformationGridContainer />
                </SquareContentItem>
                <SquareContentItem title={"Current Power Chart"} isRectangle={true}>
                    <ChartContainer/>
                </SquareContentItem>
                <SquareContentItem title={"Trend"}>
                    <TrendGridContainer/>
                </SquareContentItem>
            </div>
            <div className="w-100 d-flex">
                <CircularContentItem title={"Storage"}/>
                <SquareContentItem title={"Info"}>
                    <InformationGridContainer isStorage={true}/>
                </SquareContentItem>
                <SquareContentItem title={"Current Charging Status"} isRectangle={true}>
                    <div className="w-50 mx-auto"><Battery value={0} status={false}/></div>
                </SquareContentItem>
                <SquareContentItem title={"Trend"}>
                    <TrendGridContainer />
                </SquareContentItem>
            </div>
        </div>
    )
}


const Board = ({ url }) => {
    const { t, } = useTranslation();

    if (url === undefined) {
        return (
            <div className="minitabcontent bg-light flex-fill text-gray-900 p-0 m-0">
                <h3 className="m-auto p-4">{t("empty_space_message")}...</h3>
            </div>
        );
    }

    return (
        <div className="minitabcontent bg-light flex-fill text-gray-900 p-0 m-0">
            <BoardContent />
        </div>
    );
};

const Aspect = ({index}) => {
    const urls = [undefined, "url", undefined]

    return (
        <div className="tabcontent bg-primary p-4">
            <div className="d-flex h-100">
                <Board key={index} url={urls[index]}/>
            </div>
        </div>
    )
}

const EMSDashboard = () => {
    const [value, setValue] = useState(0)
    const aspects = ['Gas', 'Electricity', 'Heat']

    return (
        <div className="col-lg-12 mb-4">
            <div className="row ml-4">
                {aspects.map((aspect, index) => {
                    return(
                    <button 
                        key={index}
                        onClick={() => setValue(index)}
                        className={`tablink
                        ${value === index && 'bg-primary'} 
                        ${value !== index && 'bg-secondary'} 
                        ${value !== index && 'border'} 
                        rounded-top`}>{aspects[index]}</button>
                    );
                })}
            </div>
            <Aspect index={value}/>
        </div>
           
    )
}


const EMSPage = () => {
    return (
        <div>
            <EMSDashboard/>
        </div>
    )
}

export default EMSPage
