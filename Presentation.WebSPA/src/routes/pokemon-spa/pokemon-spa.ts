import { autoinject, LogManager } from "aurelia-framework";
import { PokemonSummaryModel } from "./models/pokemon-summary-model";
import { PokemonService } from "./services/pokemon-svc";

@autoinject()
export class PokemonSPAViewModel {
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    constructor(private readonly _service: PokemonService) {

    }

    public items: PokemonSummaryModel[];
    public types: string[];

    public async attached() {
        this.items = await this._service.fetchPokemonSummaries();
        this.types = await this._service.fetchTypes();
    }

    public getImageUrlForPokemon(id: number): string {
        if (!id)
            return "";

        let imageFileName = id.toString().padStart(3, "0");
        if (id === 662)
            imageFileName = "662r";
        else if (id === 740)
            imageFileName = "740le";

        const url = `https://github.com/fanzeyi/pokemon.json/raw/master/images/${imageFileName}.png`;
        return url;
    }
}