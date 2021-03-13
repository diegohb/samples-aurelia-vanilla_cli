import { PersonDTO } from "./api-dto";
import { ContactDetailModel } from "./contact-detail-model";

export class ListContactModel {
    constructor(private readonly _id: string = Date.now().toString()) {

    }

    public get id() { return this._id; }

    public displayName: string;
    public email: string;

    public static fromDTO(dto: PersonDTO): ListContactModel {
        const contact = new ListContactModel(dto.id);
        contact.displayName = `${dto.lastName}, ${dto.firstName}`;
        contact.email = dto.email;
        return contact;
    }

    public static fromDetail(model: ContactDetailModel): ListContactModel {
        const contact = new ListContactModel(model.id);
        contact.displayName = `${model.lastName}, ${model.firstName}`;
        contact.email = model.email;
        return contact;
    }
}