export type MoveDTO = {
    accuracy: string;
    category: string;
    ename: string;
    id: number;
    power: number;
    pp: number;
    type: string;
};

export type PokemonDTO = {
    id: number;
    name: PokemonNameDTO;
    type: string[];
    base: PokemonBaseDTO;
};

type PokemonNameDTO = {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
};

type PokemonBaseDTO = {
    HP: number;
    Attack: number;
    Defence: number;
    "Sp. Attack": number;
    "Sp. Defence": number;
    Speed: number;
};