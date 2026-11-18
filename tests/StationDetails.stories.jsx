import StationDetails from '../src/components/StationDetails.jsx'
import { timePresentation } from '../src/utils/timePresentation.js'
import { testMockStations } from './mock_data.js'

const station = testMockStations[0]

const meta = {
  component: StationDetails,
  tags: ['description'],
}

export default meta

export const Default = {
  args: {
    station,
    dataMode: 'simulation',
    timePresentation,
  },
}

export const Empty = {
  args: {
    station,
    dataMode: null,
    timePresentation,
  },
}
