﻿import { PersonDTO } from "./api-dto";
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

    public static fromDTO(dto: PersonDTO): ContactDetailModel {
        const contact = new ContactDetailModel(dto.id);
        contact.firstName = dto.firstName;
        contact.lastName = dto.lastName;
        contact.email = dto.email;
        contact.phoneNumber = dto.phone;
        contact.dateOfBirth = dto.dateOfBirth;
        contact.pictureUrl = new URL(dto.picture);
        contact.gender = dto.gender as GenderType;
        contact.location = LocationModel.fromDTO(dto.location);
        return contact;
    }
}

export type GenderType = "male" | "female" | "other" | "";