export const testMockStations = [
  {
    id: "EST-TratamentodeErros",
    name: "Estação Tratamento de Erros",
    river: "Rio Tratamento de Erros",
    municipality: "Vila Tratamento de Erros"
  }
]

export const testSummary = 
{
  "data_mode": "simulation",
  "message": "Amostra simulada. Não representa condições reais.",
  "station": {
    "id": "EST-TratamentodeErros",
    "name": "Estação Tratamento de Erros",
    "river": "Rio Tratamento de Erros",
    "municipality": "Vila Tratamento de Erros"
  },
  "latest": {
    "level_observed_at": "",
    "level_m": null,
    "rain_observed_at": null,
    "rain_mm_h": null
  }
};

export const testLevelObservationSeries = 
{
  "data_mode": "simulation",
  "station_id": "EST-TratamentodeErros",
  "metric": "level",
  "unit": "m",
  "interval_minutes": 60,
  "from": "2026-09-27T12:00:00Z",
  "to": "2026-09-28T12:00:00Z",
  "points": [
    {"timestamp": "2026-09-27T12:00:00Z", "value": null},
    {"timestamp": "2026-09-27T13:00:00Z", "value": -1.7}
  ]
};

export const testRainObservationSeries =

{
  "data_mode": "simulation",
  "station_id": "EST-TratamentodeErros",
  "metric": "rain",
  "unit": "mm/h",
  "interval_minutes": 60,
  "from": "2026-09-27T12:00:00Z",
  "to": "2026-09-28T12:00:00Z",
  "points": [
    {"timestamp": "2026-09-27T12:00:00Z", "value": 0.0},
    {"timestamp": "2026-09-27T13:00:00Z", "value": 1.37}
  ]
};

export const testStationNotFound =
{
  "error": {
    "code": "station_not_found",
    "message": "Estação não encontrada."
  }
};

export default {
  testMockStations,
  testSummary,
  testLevelObservationSeries,
  testRainObservationSeries,
  testStationNotFound,
}

