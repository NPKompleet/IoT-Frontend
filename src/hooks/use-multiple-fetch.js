import { useEffect, useState } from 'react'
import useLocalStorage from './use-local-storage'

/**
 * This is a custom React Hook that is used to fetch and post data to multiple REST endpoints simultaneously.
 * For the equivalent hook for making requests to single URL, see {@link useFetch}
 * 
 * @category Custom Hooks
 * 
 * @example
 * // Makes a GET request to defined list of URLs
 * const URL_LIST= ['www.example.com','www.anotherexample.com']
 * useMultipleFetch(URL_LIST)
 * 
 * @example
 * // Makes a POST request to lsit of URLs
 * useMultipleFetch(URL_LIST, 'POST')
 * 
 * @param {string[]} urlList The list of REST endpoints data should be fetched from or posted to.
 * @param {string} [method = GET] The HTTP method to be used in the request. Defaults to a GET request.
 * @param {Object} [body = null] The body of the HTTP request.
 * @param {number} [startTime] The start time for a request given in UTC epoch time. It is also used in refreshing requests at intervals.
 * @param {number} [endTime] The end time for a request given in UTC epoch time.
 * @param {string} [type] The type of the sensor making the request.
 * @returns {Object} returns the data object along with whether there is an error or not.
 */
const useMultipleFetch = (urlList, method = 'GET', body = null, startTime, endTime) => {
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

        Promise.all(urlList.map(url => fetch(url, requestOptions)))
            .then((responses) => {
                return Promise.all(responses.map((resp) => {
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
                        return resp.json();
                    }
                    else {
                        setstate({ isLoading: false, isError: true, data: {} })
                        throw new Error(resp.statusText);
                    }
                }))
            })
            .then((resultsObj) => {
                console.log(resultsObj);
                setstate({ isLoading: false, isError: false, data: resultsObj })
            })
            .catch((error) => {
                console.log("MULTIPLE FETCH ERROR> " + error);
                setstate({ isLoading: false, isError: true, data: {} })
            });
        return () => {
        };
    }, [urlList, method, body, startTime, endTime, savedHeaders])

    return { ...state }
}

export default useMultipleFetch
