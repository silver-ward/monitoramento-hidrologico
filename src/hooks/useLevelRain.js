import { useMemo } from 'react'

export default function useLevelRain(levelObservations, rainObservations, timePresentation) {
  return useMemo(() => {
    const readingsByTimestamp = new Map()

    const addObservations = (observations, metric) => {
      observations.forEach((observation, index) => {
        const timestamp = observation.observedAt
        const timestampMs = Date.parse(timestamp ?? '')
        const key = Number.isFinite(timestampMs)
          ? String(timestampMs)
          : `${metric}-invalid-${index}`
        const reading = readingsByTimestamp.get(key) ?? {
          timestamp,
          level: '',
          rainfall: '',
        }

        if (metric === 'level') {
          reading.level = observation.value
        } else {
          reading.rainfall = observation.value
        }
        readingsByTimestamp.set(key, reading)
      })
    }

    addObservations(levelObservations, 'level')
    addObservations(rainObservations, 'rain')

    return [...readingsByTimestamp.values()]
      .toSorted((left, right) => {
        const leftTimestamp = Date.parse(left.timestamp ?? '')
        const rightTimestamp = Date.parse(right.timestamp ?? '')
        if (!Number.isFinite(leftTimestamp)) return Number.isFinite(rightTimestamp) ? 1 : 0
        if (!Number.isFinite(rightTimestamp)) return -1
        return leftTimestamp - rightTimestamp
      })
      .map((reading, index) => ({
        ...reading,
        ...timePresentation.formatReading(reading.timestamp),
        tableKey: `${reading.timestamp ?? 'missing'}-${index}`,
      }))
  }, [levelObservations, rainObservations, timePresentation])
}