import { PersonDTO } from "./ApiDTO";

export class Contact {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber?: string;

    public static fromDTO(id:number, dto: PersonDTO) : Contact {
        const contact = new Contact();
        contact.id = id;
        contact.firstName = dto.firstName;
        contact.lastName = dto.lastName;
        contact.email = dto.email;
        return contact;
    }
}