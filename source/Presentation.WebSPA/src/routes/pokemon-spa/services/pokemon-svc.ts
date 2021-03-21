import { autoinject, LogManager } from "aurelia-framework";
import { ApiLoggerInterceptor } from "common/api-logger-interceptor";
import { HttpClient } from "aurelia-fetch-client";
import { PokemonSummaryModel } from "../models/pokemon-summary-model";
import { PokemonDTO } from "../models/api-dto";

@autoinject()
export class PokemonService {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    constructor(private _http: HttpClient) {
        _http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("/api/")
                .withInterceptor(new ApiLoggerInterceptor());
        });
    }

    public async fetchPokemonSummaries(): Promise<PokemonSummaryModel[]> {
        const dtos = await this.getFromCacheOrFetch();
        const models = dtos.map(dto => PokemonSummaryModel.fromDTO(dto));
        return models;
    }

    public async fetchTypes(): Promise<string[]> {
        const dtos = await this.getFromCacheOrFetch();
        const data = new Set(dtos.reduce((arr: string[], item: PokemonDTO) => arr.concat(item.type), []));
        return Array.from(data);
    }

    private async getFromCacheOrFetch(): Promise<PokemonDTO[]> {
        let data: PokemonDTO[];
        let raw: string = window.localStorage.getItem("pokedex.pokemons");
        if (!raw) {
            const rawResponse = await this._http.fetch("pokemon");
            raw = await rawResponse.text();
            window.localStorage.setItem("pokedex.pokemons", raw);
            this._logger.info("Cached to local storage.");
        } else {
            this._logger.info("Fetched from cache in local storage.");
        }
        data = JSON.parse(raw);
        return data;
    }

}