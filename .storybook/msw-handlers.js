import { http, HttpResponse } from 'msw'
import { testMockStations, testSummary, testLevelObservationSeries, testRainObservationSeries } from '../tests/mock_data.js'

export const mswHandlers = [
  http.get('https://n8n.incluc0de.com.br/webhook/cogmo/api/stations', () =>
    HttpResponse.json({
      data_mode: 'simulation',
      stations: testMockStations,
    }),
  ),
  http.get('*/cogmo/api/stations/:id/summary', () =>
    HttpResponse.json(testSummary),
  ),
  http.get('*/cogmo/api/stations/:id/series', ({ request }) => {
    const metric = new URL(request.url).searchParams.get('metric')
    return HttpResponse.json(metric === 'rain' ? testRainObservationSeries : testLevelObservationSeries)
  }),
]
