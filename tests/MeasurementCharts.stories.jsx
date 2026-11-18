import MeasurementCharts from '../src/components/MeasurementCharts.jsx'
import { timePresentation } from '../src/utils/timePresentation.js'
import { testLevelObservationSeries, testRainObservationSeries, testSummary } from './mock_data.js'

const levelObservations = testLevelObservationSeries.points.map((point) => ({
  observedAt: point.timestamp,
  value: point.value,
}))
const rainObservations = testRainObservationSeries.points.map((point) => ({
  observedAt: point.timestamp,
  value: point.value,
}))

const meta = {
  component: MeasurementCharts,
  tags: ['graph'],
}

export default meta

export const Default = {
  args: {
    station: testSummary.station,
    levelObservations,
    rainObservations,
    levelIntervalMinutes: testLevelObservationSeries.interval_minutes,
    rainIntervalMinutes: testRainObservationSeries.interval_minutes,
    timePresentation,
    timeRange: '24h',
  },
}

export const Empty = {
  args: {
    station: testSummary.station,
    levelObservations: [],
    rainObservations: [],
    levelIntervalMinutes: testLevelObservationSeries.interval_minutes,
    rainIntervalMinutes: testRainObservationSeries.interval_minutes,
    timePresentation,
    timeRange: '24h',
  },
}

