export default class Station {
    #id
    #name
    #river
    #municipality
    #updatedAt

    constructor({ id, name, river, municipality, updatedAt = null }) {
        this.#id = id
        this.#name = name
        this.#river = river
        this.#municipality = municipality
        this.#updatedAt = updatedAt
    }

    static fromApi(station) {
        return new Station({
            id: station.id,
            name: station.name,
            river: station.river,
            municipality: station.municipality,
            updatedAt: station.updated_at ?? null,
        })
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get river() {
        return this.#river
    }

    get municipality() {
        return this.#municipality
    }

    get updatedAt() {
        return this.#updatedAt
    }
}
