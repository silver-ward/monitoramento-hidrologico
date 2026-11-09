import records from './readings.json' with { type: 'json' }

const stationsById = new Map()

for (const record of records) {
  const { id, name, river, municipality } = record.station
  let station = stationsById.get(id)

  if (!station) {
    station = {
      id,
      name,
      river,
      municipality,
      dataMode: record.data_mode,
      readings: [],
    }
    stationsById.set(id, station)
  }

  const readings = [
    ...(record.latest ? [record.latest] : []),
    ...(record.history ?? []),
  ]

  station.readings.push(...readings.map((reading) => ({
    timestamp: reading.level_observed_at ?? reading.rain_observed_at,
    level: reading.level_m,
    rainfall: reading.rain_mm_h,
  })))
}

export const stations = [...stationsById.values()].map((station) => ({
  ...station,
  readings: station.readings.toSorted(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  ),
}))
