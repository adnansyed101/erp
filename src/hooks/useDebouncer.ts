import { useState, useEffect } from 'react'

function useDebounce(value: String, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timeout to update the debounced value after a delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function to cancel the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Only re-run the effect if value or delay changes

  return debouncedValue
}

export default useDebounce
