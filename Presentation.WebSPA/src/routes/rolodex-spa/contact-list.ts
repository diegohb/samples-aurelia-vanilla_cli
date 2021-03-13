import { autoinject, customElement } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DataContext } from "./services/data-context";
import { ListContactModel } from "./models/list-contact-model";
import { ContactViewedEvent, ContactUpdatedEvent } from "./models/events";

@autoinject()
@customElement("contact-list")
export class ContactListViewModel {
    public contacts: Array<ListContactModel>;
    public selectedId: number = 0;

    constructor(private _dataContext: DataContext, private _eventBus: EventAggregator) {
        this._eventBus.subscribe(ContactViewedEvent, (eventData: ContactViewedEvent) => this.select(eventData.contact));
        this._eventBus.subscribe(ContactUpdatedEvent, (eventData: ContactUpdatedEvent) => {

            //update list's instance of contact
            const id = eventData.contact.id;
            const found = this.contacts.find(foundContact => foundContact.id === id);
            var model = ListContactModel.fromDetail(eventData.contact);
            Object.assign(found, model);
        });
    }

    public async created() {
        this.contacts = await this._dataContext.getContactList();
    }

    public async select(contact): Promise<boolean> {
        this.selectedId = contact.id;
        return true;
    }
}