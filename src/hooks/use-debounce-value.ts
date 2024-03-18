import { useEffect, useState } from "react";
/* 
a hook function Debounce is used to create a delay, or execute another actions.
For example: When you have a input and the user is typing so you need take an action with the information that's being typed, but only after the user stop to typing
So Debounce stay watching and when the user STOP to typing, he execute the action inside his function, in this case is a Delay.
*/
export default function useDebounceValue<T = unknown>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
