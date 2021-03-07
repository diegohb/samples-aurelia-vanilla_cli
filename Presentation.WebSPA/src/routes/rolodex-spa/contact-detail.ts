import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Api } from "./services/api";
import { areEqual } from "./services/utility";
import { Contact } from "./models/contact-model";
import { ContactViewedEvent, ContactUpdatedEvent } from "./models/events";

@autoinject()
export class ContactDetailViewModel {
    public routeConfig;
    public contact: Contact;
    public originalContact: Contact;

    constructor(private _api: Api, private _eventBus:EventAggregator) { }

    public async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        const fetchedContact = await this._api.getContactDetails(params.id);
        this.contact = fetchedContact;
        this.routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact;
        this._eventBus.publish(new ContactViewedEvent(this.contact));
    }

    public get canSave() {
        return this.contact.firstName && this.contact.lastName && !this._api.isRequesting;
    }

    public async save() {
        const updatedContact = await this._api.saveContact(this.contact);
        this.contact = updatedContact;
        this.routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact;
        this._eventBus.publish((new ContactUpdatedEvent(this.contact)));
    }

    public async canDeactivate() {
        if (!areEqual(this.originalContact, this.contact)) {
            const result = confirm("You have unsaved changes. Are you sure you wish to leave?");

            if (!result) {
                this._eventBus.publish(new ContactViewedEvent(this.contact));
            }

            return result;
        }

        return true;
    }
}