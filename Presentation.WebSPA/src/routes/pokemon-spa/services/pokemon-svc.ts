import { autoinject, LogManager } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { PokemonSummaryModel } from "../models/pokemon-summary-model";

@autoinject()
export class PokemonService {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    constructor(private _http: HttpClient) {
        _http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("/api/");
        });
    }

    public async fetchPokemonSummaries(): Promise<PokemonSummaryModel[]> {
        const rawResponse = await this._http.fetch("pokemon");
        const dtos = await rawResponse.json();
        let models = dtos.map(dto => PokemonSummaryModel.fromDTO(dto));
        return models;
    }

}