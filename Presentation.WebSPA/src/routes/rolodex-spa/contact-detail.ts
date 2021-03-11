import { autoinject, observable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DataContext } from "./services/data-context";
import { areEqual } from "./services/utility";
import { Contact } from "./models/contact-model";
import { ContactViewedEvent, ContactUpdatedEvent } from "./models/events";

@autoinject()
export class ContactDetailViewModel {
    private _routeConfig;

    @observable public contact: Contact;
    public originalContact: Contact;

    constructor(private _api: DataContext, private _eventBus: EventAggregator) {}

    public async activate(params, routeConfig) {
        this._routeConfig = routeConfig;
        const fetchedContact = await this._api.getContactDetails(params.id);
        this.contact = JSON.parse(JSON.stringify(fetchedContact));
        this._routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = JSON.parse(JSON.stringify(this.contact)); //deep copy hack
        this._eventBus.publish(new ContactViewedEvent(this.contact));
    }

    public get canSave() {
        return this.contact.firstName && this.contact.lastName && !this._api.isRequesting;
    }

    public async save() {
        const updatedContact = await this._api.saveContact(this.contact);
        this.contact = updatedContact;
        this._routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact;
        this._eventBus.publish(new ContactUpdatedEvent(this.contact));
    }

    public async reset() {
        if (!areEqual(this.originalContact, this.contact)) {
            const result = confirm("Click 'Ok' to loose all changes, otherwise click 'Cancel'.");

            if (result) {
                this.contact = JSON.parse(JSON.stringify(this.originalContact));
            }
        }
    }

    private contactChanged(newValue: Contact, oldValue: Contact) {
        console.log("contact updated.", { new: newValue, old: oldValue });
    }
}