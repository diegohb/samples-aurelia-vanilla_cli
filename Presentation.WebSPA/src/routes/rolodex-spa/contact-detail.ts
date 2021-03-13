import { autoinject, observable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DataContext } from "./services/data-context";
import { areEqual, deepExtend } from "./services/utility";
import { ContactDetailModel } from "./models/contact-detail-model";
import { ContactViewedEvent, ContactUpdatedEvent } from "./models/events";

@autoinject()
export class ContactDetailViewModel {
    private _routeConfig;

    @observable public contact: ContactDetailModel;
    public originalContact: ContactDetailModel;

    constructor(private _dataContext: DataContext, private _eventBus: EventAggregator) {}

    public async activate(params, routeConfig) {
        this._routeConfig = routeConfig;
        this.contact = await this._dataContext.getContactDetails(params.id);
        this._routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact.clone();
        this._eventBus.publish(new ContactViewedEvent(this.contact));
    }

    public get canSave() {
        return this.contact.firstName && this.contact.lastName && !this._dataContext.isRequesting;
    }

    public async save() {
        const updatedContact = await this._dataContext.saveContact(this.contact);
        this.contact = updatedContact;
        this._routeConfig.navModel.setTitle(this.contact.firstName);
        this.originalContact = this.contact;
        this._eventBus.publish(new ContactUpdatedEvent(this.contact));
    }

    public async reset() {
        if (!areEqual(this.originalContact, this.contact)) {
            const result = confirm("Click 'Ok' to loose all changes, otherwise click 'Cancel'.");

            if (result) {
                this.contact = this.originalContact.clone();
            }
        }
    }

    private contactChanged(newValue: ContactDetailModel, oldValue: ContactDetailModel) {
        console.log("contact updated.", { new: newValue, old: oldValue });
    }
}