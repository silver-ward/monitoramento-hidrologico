export default class Observation {
    #id
    #stationId
    #metric
    #observedAt
    #value
    #unit
    #source

    constructor({
        id = null,
        stationId,
        metric,
        observedAt = null,
        value = null,
        unit,
        source = null,
    }) {
        this.#id = id
        this.#stationId = stationId
        this.#metric = metric
        this.#observedAt = observedAt
        this.#value = value
        this.#unit = unit
        this.#source = source
    }

    get id() {
        return this.#id
    }

    get stationId() {
        return this.#stationId
    }

    get metric() {
        return this.#metric
    }

    get observedAt() {
        return this.#observedAt
    }

    get value() {
        return this.#value
    }

    get unit() {
        return this.#unit
    }

    get source() {
        return this.#source
    }
}
