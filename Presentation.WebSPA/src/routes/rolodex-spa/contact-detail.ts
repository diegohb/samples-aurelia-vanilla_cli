import { autoinject } from "aurelia-framework";
import { Api } from "./services/api";
import { areEqual } from "./services/utility";
import { Contact } from "./models/contact-model";

@autoinject()
export class ContactDetail {
    public routeConfig;
    public contact: Contact;
    public originalContact: Contact;

    constructor(private api: Api) { }

    public async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        const fetchedContact = await this.api.getContactDetails(params.id);
        this.contact = fetchedContact;
        this.routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact;
    }

    public get canSave() {
        return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
    }

    public async save() {
        this.api.saveContact(this.contact).then((contact: Contact) => {
            this.contact = contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = this.contact;
        });
    }

    public async canDeactivate() {
        if (!areEqual(this.originalContact, this.contact)) {
            return confirm("You have unsaved changes. Are you sure you wish to leave?");
        }

        return true;
    }
}