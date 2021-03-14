import { PokemonDTO } from "./api-dto";

export class PokemonSummaryModel {

    public id: number;
    public name: string;
    public type: string;

    public get displayName() {
        return `[${this.id}] ${this.name}`;
    }

    public static fromDTO(dto: PokemonDTO): PokemonSummaryModel {
        const model = new PokemonSummaryModel();
        model.id = dto.id;
        model.name = dto.name.english;
        model.type = dto.type.join(",");
        return model;
    }
}