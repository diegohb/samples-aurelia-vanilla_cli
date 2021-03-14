import { autoinject, LogManager } from "aurelia-framework";
import { PokemonSummaryModel } from "./models/pokemon-summary-model";
import { PokemonService } from "./services/pokemon-svc";

@autoinject()
export class PokemonSPAViewModel {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    constructor(private readonly _service: PokemonService) {

    }

    public items: PokemonSummaryModel[];

    public async attached() {
        this.items = await this._service.fetchPokemonSummaries();
    }
}