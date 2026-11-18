import Overview from '../src/components/Overview.jsx'
import { timePresentation } from '../src/utils/timePresentation.js'
import { testLevelObservationSeries, testRainObservationSeries } from './mock_data.js'

const latestLevel = testLevelObservationSeries.points.at(-1)
const latestRain = testRainObservationSeries.points.at(-1)

const meta = {
  component: Overview,
  tags: ['card'],
}

export default meta

export const Default = {
  args: {
    latest: {
      level: latestLevel ? { value: latestLevel.value, observedAt: latestLevel.timestamp } : null,
      rain: latestRain ? { value: latestRain.value, observedAt: latestRain.timestamp } : null,
    },
    timePresentation,
  },
}

export const Empty = {
  args: {
    latest: { level: null, rain: null },
    timePresentation,
  },
}
