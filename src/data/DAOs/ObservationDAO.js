import Observation from '../entities/Observation.js'

async function requestJson(path) {
    const response = await fetch(path, {
        headers: { Accept: 'application/json' },
    })

    let payload
    try {
        payload = await response.json()
    } catch (error) {
        if (response.ok) {
            throw new Error('A API retornou uma resposta JSON inválida.', { cause: error })
        }

        throw new Error(`A solicitação falhou com status ${response.status}.`, { cause: error })
    }

    if (!response.ok) {
        const apiError = payload?.error
        const requestError = new Error(
            apiError?.message ?? `A solicitação falhou com status ${response.status}.`,
        )
        requestError.code = apiError?.code ?? 'request_failed'
        requestError.status = response.status
        throw requestError
    }

    return payload
}

export default class ObservationDAO {
    async listSeries(stationId, metric = 'level', hours = 24) {
        if (metric !== 'level' && metric !== 'rain') {
            throw new RangeError('A métrica deve ser "level" ou "rain".')
        }

        if (!Number.isInteger(hours) || hours < 1 || hours > 72) {
            throw new RangeError('A janela deve ser um número inteiro entre 1 e 72 horas.')
        }

        const query = new URLSearchParams({
            metric,
            hours: String(hours),
        })
        const response = await requestJson(
            `/api/stations/${encodeURIComponent(stationId)}/series?${query}`,
        )

        return {
            dataMode: response.data_mode,
            stationId: response.station_id,
            metric: response.metric,
            unit: response.unit,
            intervalMinutes: response.interval_minutes,
            from: response.from,
            to: response.to,
            points: response.points.map((point) => new Observation({
                stationId: response.station_id,
                metric: response.metric,
                observedAt: point.timestamp,
                value: point.value,
                unit: response.unit,
                source: response.data_mode,
            })),
        }
    }
}
