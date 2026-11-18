import { expect } from 'storybook/test'
import StationControls from '../src/components/StationControls.jsx'
import { testMockStations } from './mock_data.js'

const meta = {
  component: StationControls,
  tags: ['control'],
}

export default meta

export const Default = {
  args: {
    stations: testMockStations,
    selectedStationId: testMockStations[0].id,
    showTimeRange: true,
    timeRange: '24h',
    refreshing: false,
    onStationChange: () => {},
    onTimeRangeChange: () => {},
    onRefresh: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(new RegExp(testMockStations[0].name))).toBeVisible()
  },
}

export const Empty = {
  args: {
    stations: [],
    selectedStationId: null,
    showTimeRange: true,
    timeRange: '24h',
    refreshing: false,
    onStationChange: () => {},
    onTimeRangeChange: () => {},
    onRefresh: () => {},
  },
}

export const Refreshing = {
  args: {
    stations: testMockStations,
    selectedStationId: testMockStations[0].id,
    showTimeRange: true,
    timeRange: '24h',
    refreshing: true,
    onStationChange: () => {},
    onTimeRangeChange: () => {},
    onRefresh: () => {},
  },
}
