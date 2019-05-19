import { useEffect, useRef } from 'react'

export const usePreviousValue = (value, callback) => {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      callback(ref.current)
    }
    ref.current = value
  }, [value, callback])
}
