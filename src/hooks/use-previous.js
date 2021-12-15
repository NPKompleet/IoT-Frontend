import { useRef, useEffect } from "react";

/**
 * This custom react hook used to get the previous value of a react component in the last mount of the component. It is used to enable the animation of a components values from the previous value it had to the current values when it is being mounted. It is used together with {@link useAnimation} to achieve this effect.
 * 
 * @category Custom Hooks
 * 
 * @param {number|Object} value The current value which will be used as the previous value in the next render.
 * @returns {number|Object} The previous value saved in the last render.
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default usePrevious