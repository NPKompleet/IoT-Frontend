import { useEffect, useState } from 'react'
import useLocalStorage from './use-local-storage'

/**
 * This is a custom React Hook that is used to fetch and post data to a REST endpoint.
 * For the equivalent hook for making requests to multiple URL, see {@link useMultipleFetch}.
 * 
 * @category Custom Hooks
 * 
 * @example
 * // Makes a GET request to defined URL
 * const URL= 'www.example.com'
 * useFetch(URL)
 * 
 * @example
 * // Makes a POST request to URL
 * useFetch(URL, 'POST')
 * 
 * @param {string} url The REST endpoint data should be fetched from or posted to.
 * @param {string} [method = GET] The HTTP method to be used in the request. Defaults to a GET request.
 * @param {Object} [body = null] The body of the HTTP request.
 * @param {number} [startTime] The start time for a request given in UTC epoch time. It is also used in refreshing requests at intervals.
 * @param {number} [endTime] The end time for a request given in UTC epoch time.
 * @returns {Object} returns the data object along with whether there is an error or not.
 */
const useFetch = (url, method = 'GET', body = null, startTime, endTime) => {
    const [state, setstate] = useState({ isLoading: true, isError: false, data: {} })
    const [savedHeaders,] = useLocalStorage("headers", "{}");

    useEffect(() => {
        const myHeaders = new Headers();
        Object.entries(JSON.parse(savedHeaders)).forEach(entry => {
            myHeaders.append(entry[0], entry[1])
        })

        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299 && resp.status !== 204) {
                    return resp.json();
                }
                else if (resp.status === 204) {
                    if (method === 'POST') {
                        return [
                            { time: new Date(startTime * 1000).toISOString(), value: null },
                            { time: new Date(endTime * 1000).toISOString(), value: null }
                        ]
                    }
                }
                else {
                    setstate({ isLoading: false, isError: true, data: {} })
                    throw new Error(resp.statusText);
                }
            })
            .then((resultsObj) => {
                // console.log(resultsObj);
                // if(method === 'POST'){
                //     if (!resultsObj[0].hasOwnProperty('value')){
                //         if(type === 'onOff' || type === 'openClose' || type === 'motionDetected'){
                // let firstValue = !resultsObj[0][type]
                // let lastValue = resultsObj[resultsObj.length - 1][type]
                // let firstValue = null
                // let lastValue = null
                // let firstItem = {time: new Date(startTime * 1000).toISOString(), value :firstValue}
                // let lastItem = {time: new Date(endTime * 1000).toISOString(), value:lastValue}
                // resultsObj = [firstItem, ...resultsObj, lastItem];
                //         }
                //     }
                //     console.log('resultsObj: ' + resultsObj)
                // }
                setstate({ isLoading: false, isError: false, data: resultsObj })
            })
            .catch((error) => {
                console.log("ERROR> " + error);
                setstate({ isLoading: false, isError: true, data: {} })
            });

        return () => {
        };
    }, [url, method, body, startTime, endTime, savedHeaders])

    return { ...state }
}

export default useFetch
