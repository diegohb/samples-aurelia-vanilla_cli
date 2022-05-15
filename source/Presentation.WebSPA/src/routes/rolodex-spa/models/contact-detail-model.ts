import { PersonDTO } from "./api-dto";
import { LocationModel } from "./location-model";

export class ContactDetailModel {
    constructor(private readonly _id: string = Date.now().toString()) {

    }

    public get id() { return this._id; }

    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber?: string;
    public pictureUrl: URL;
    public gender?: GenderType;
    public dateOfBirth?: string;
    public location: LocationModel;

    public clone() {
        const contact = new ContactDetailModel(this.id);
        contact.firstName = this.firstName;
        contact.lastName = this.lastName;
        contact.email = this.email;
        contact.phoneNumber = this.phoneNumber;
        contact.dateOfBirth = this.dateOfBirth;
        contact.pictureUrl = this.pictureUrl;
        contact.gender = this.gender;
        contact.location = this.location;
        return contact;
    }

    public static fromDTO(dto: PersonDTO): ContactDetailModel {
        const contact = new ContactDetailModel(dto.id);
        contact.firstName = dto.name.firstname;
        contact.lastName = dto.name.lastname;
        contact.email = dto.email;
        contact.phoneNumber = dto.phone;
        contact.location = LocationModel.fromDTO(dto.address);
        return contact;
    }

}

export type GenderType = "male" | "female" | "other" | "";