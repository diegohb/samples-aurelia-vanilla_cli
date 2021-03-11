import { ListContactModel as Contact } from "./list-contact-model";

export class ContactUpdatedEvent {
    constructor(public contact: Contact) { }
}

export class ContactViewedEvent {
    constructor(public contact: Contact) { }
}