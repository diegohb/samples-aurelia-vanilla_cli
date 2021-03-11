import { autoinject, customElement } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DataContext as Api } from "./services/data-context";
import { Contact } from "./models/contact-model";
import { ContactViewedEvent, ContactUpdatedEvent } from "./models/events";

@autoinject()
@customElement("contact-list")
export class ContactListViewModel {
    public contacts: Array<Contact>;
    public selectedId: number = 0;

    constructor(private _api: Api, private _eventBus: EventAggregator) {
        this._eventBus.subscribe(ContactViewedEvent, (eventData: ContactViewedEvent) => this.select(eventData.contact));
        this._eventBus.subscribe(ContactUpdatedEvent, (eventData: ContactUpdatedEvent) => {

            //update list's instance of contact
            const id = eventData.contact.id;
            const found = this.contacts.find(foundContact => foundContact.id === id);
            Object.assign(found, eventData.contact);
        });
    }

    public async created() {
        this.contacts = await this._api.getContactList();
    }

    public async select(contact): Promise<boolean> {
        this.selectedId = contact.id;
        return true;
    }
}