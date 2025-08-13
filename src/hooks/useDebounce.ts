// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const handler = (global as any).setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       (global as any).clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// not used
