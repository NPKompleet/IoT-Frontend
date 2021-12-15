import { useEffect, useRef } from 'react'

/**
 * This custom React hook is used to make periodic calls to a function. This relies on {@link setInterval}.
 * 
 * @category Custom Hooks
 * 
 * @example
 * // This will print "Hello" to the console every minute
 * const printHello = () => console.log('Hello');
 * useInterval(printHello, 120000);
 * 
 * @param {Function} callback The function to be invoked preriodically.
 * @param {number} [delay = 180000] The period or delay between invocations in milliseconds. Defaults to 180 milliseconds or 3 minutes.
 */
const useInterval = (callback, delay = 180000) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default useInterval;
