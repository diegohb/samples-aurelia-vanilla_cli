import { ContactDetailModel } from "./contact-detail-model";

export class ContactUpdatedEvent {
    constructor(public contact: ContactDetailModel) { }
}

export class ContactViewedEvent {
    constructor(public contact: ContactDetailModel) { }
}