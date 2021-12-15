import useAnimationTimer from './use-animation-timer';

/**
 * This custom React hook is used to create animations and helps to animate from one value to another.
 * This is used together with the {@link useAnimationTimer} function to get the desired animation effect.
 * 
 * @category Custom Hooks
 * 
 * @example
 * // Creates an animation with an elastic easing function and a duration and delay of 200 and 10 millisecond
 * let animation = useAnimation('linear', 200, 10);
 * 
 * @param {string} [easingName = linear] The type of easing function to be used. Defaults to linear easing function.
 * @param {number} [duration = 500] The duration of the animation in milliseconds. Defaults to 500 milliseconds.
 * @param {number} [delay = 0] The delay before the animation is started in milliseconds. Defaults to 0 milliseconds.
 * @param {number|Object} [value = null] The value that will trigger restart of the animation if it changes.
 * @returns {number} The easing function value.
 */
const useAnimation = (easingName = 'linear', duration = 500, delay = 0,value = null) => {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay, value);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}

// Some easing functions that can be used with the animation
const easing = {
  linear: n => n,
  elastic: n =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: n => Math.pow(2, 10 * (n - 1)),
  delastic: n => {
        let x = 0.5;
        return Math.pow(2, 10 * (n - 1)) * Math.cos(20 * Math.PI * x / 3 * n);
  },
  elastic2: n => 1 - easing.delastic(1 - n)
};

export default useAnimation