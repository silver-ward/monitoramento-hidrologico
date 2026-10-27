function createReadings({ count, base, amplitude, frequency, offset = 0, rainStart, rainEnd, rainSeed }) {
  return Array.from({ length: count }, (_, index) => {
    const timestamp = new Date(Date.now() - (count - 1 - index) * 60 * 60 * 1000)
    const level = Number((base + Math.sin(index * frequency) * amplitude + (index > 30 ? offset : 0)).toFixed(2))
    const raining = index >= rainStart && index <= rainEnd
    const rainfall = raining
      ? Number((((index * rainSeed) % 97) / 10 + 1.5).toFixed(1))
      : 0

    return {
      timestamp: timestamp.toISOString(),
      level,
      rainfall,
    }
  })
}

export const stations = [
  {
    id: 'foz-do-vale',
    name: 'Estação Foz do Vale',
    code: 'EST-01',
    river: 'Rio das Almas',
    city: 'São Bento do Sul',
    state: 'SC',
    alertLevel: 3.8,
    status: 'Operando',
    readings: createReadings({
      count: 48,
      base: 2.5,
      amplitude: 0.85,
      frequency: 0.25,
      offset: 0.6,
      rainStart: 20,
      rainEnd: 32,
      rainSeed: 17,
    }),
  },
  {
    id: 'ponte-alta',
    name: 'Estação Ponte Alta',
    code: 'EST-02',
    river: 'Rio Tijucas',
    city: 'Major Gercino',
    state: 'SC',
    alertLevel: 4.5,
    status: 'Operando',
    readings: createReadings({
      count: 48,
      base: 3.1,
      amplitude: 0.7,
      frequency: 0.18,
      rainStart: 10,
      rainEnd: 18,
      rainSeed: 23,
    }),
  },
  {
    id: 'serra-verde',
    name: 'Estação Serra Verde',
    code: 'EST-03',
    river: 'Rio Canoas',
    city: 'Urubici',
    state: 'SC',
    alertLevel: 2.9,
    status: 'Sem Sinal',
    readings: [],
  },
]
