import Station from '../entities/Station.js'
import Observation from '../entities/Observation.js'

async function requestJson(path) {

    const response = await fetch(path, {
        headers: { Accept: 'application/json' }
    });

    let payload;
    try {
        payload = await response.json();
    } catch (error) {
        if (response.ok) {
            throw new Error('A API retornou uma resposta JSON inválida.', { cause: error });
        }

        throw new Error(`A solicitação falhou com status ${response.status}.`, { cause: error });
    }

    if (!response.ok) {
        const apiError = payload?.error;
        const requestError = new Error(
            apiError?.message ?? `A solicitação falhou com status ${response.status}.`,
        );
        requestError.code = apiError?.code ?? 'request_failed';
        requestError.status = response.status;
        throw requestError;
    }

    return payload
}

export default class StationDAO {
    
    async listStations() {
        const response = await requestJson('/api/stations');

        return {
            dataMode: response.data_mode,
            stations: response.stations.map((station) => Station.fromApi(station))
        }
    }

    async getSummary(id) {
        const response = await requestJson(
            `/api/stations/${encodeURIComponent(id)}/summary`,
        )
        const { latest, station } = response
        const source = response.data_mode

        return {
            dataMode: source,
            message: response.message,
            station: Station.fromApi(station),
            latest: {
                level: new Observation({
                    stationId: station.id,
                    metric: 'level',
                    observedAt: latest.level_observed_at,
                    value: latest.level_m,
                    unit: 'm',
                    source,
                }),
                rain: new Observation({
                    stationId: station.id,
                    metric: 'rain',
                    observedAt: latest.rain_observed_at,
                    value: latest.rain_mm_h,
                    unit: 'mm/h',
                    source,
                }),
            },
        }
    }
}
