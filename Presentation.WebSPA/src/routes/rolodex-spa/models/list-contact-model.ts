import { PersonDTO } from "./api-dto";

export class ListContactModel {
    constructor(private readonly _id: string = Date.now().toString()) {

    }

    public get id() { return this._id; }

    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber?: string;

    public static fromDTO(dto: PersonDTO): ListContactModel {
        const contact = new ListContactModel(dto.id);
        contact.firstName = dto.firstName;
        contact.lastName = dto.lastName;
        contact.email = dto.email;
        return contact;
    }
}