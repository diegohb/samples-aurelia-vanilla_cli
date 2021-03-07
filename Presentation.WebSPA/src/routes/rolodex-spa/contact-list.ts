import { Api } from "./services/api";
import { inject } from "aurelia-framework";
import { Contact } from "./models/contact-model";

@inject(Api)
export class ContactList {
    public contacts: Array<Contact>;
    public selectedId = 0;

    constructor(private api: Api) { }

    public async created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    public async select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}