import { LocationDTO } from "./api-dto";

export class LocationModel {
    public street: string;
    public city: string;
    public state: string;
    public country: string;
    public timezone: string;

    public toDisplay(): string {
        return `${this.street}, ${this.city}, ${this.state}, ${this.country}`;
    }

    public static fromDTO(dto: LocationDTO) {
        const model = new LocationModel();
        model.street = dto.street;
        model.city = dto.city;
        model.state = dto.state;
        model.country = dto.country;
        model.timezone = dto.timezone;
        return model;
    }

}