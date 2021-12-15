import { useState, useEffect } from 'react';

/**
 * This custom React hook makes a timer that is used to calculate the present elapsed time of the animation. 
 * It is not used directly by any component but is used by the {@link useAnimation} hook to create the animation effect.
 * 
 * @category Custom Hooks
 * 
 * @see{@link useAnimation}
 * 
 * @param {Number} duration The duration of the animation in milliseconds.
 * @param {Number} delay The delay before the animation is started in milliseconds.
 * @param {Number} value The value that will trigger restart of the animation if it changes.
 * @returns - the elapsed time since animation started.
 */
const useAnimationTimer = (duration = 1000, delay = 0, value) => {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      // Clear out elapsed time from any previous animation
      setTime(0)

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [value, duration, delay] // Only re-run effect if value, duration or delay changes
  );

  return elapsed;
}

export default useAnimationTimer