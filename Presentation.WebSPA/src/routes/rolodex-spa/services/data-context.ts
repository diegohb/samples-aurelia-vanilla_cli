import { inject } from "aurelia-framework";
import { delay } from "./utility";
import { ListContactModel } from "../models/list-contact-model";
import { IPeopleApi } from "./i-people-api";
import { ContactsApi } from "./contacts-api";
import { ContactDetailModel } from "../models/contact-detail-model";

let latency = 600;

@inject(ContactsApi)
export class DataContext {
    private _listing: Array<ListContactModel>;
    private _contactDetails: Array<ContactDetailModel> = [];

    constructor(private _api: IPeopleApi) {
        
    }

    public isRequesting = false;

    public async getContactList(): Promise<Array<ListContactModel>> {
        this.isRequesting = true;

        if (!this._listing || !this._listing.length) {
            await this._loadListing();
        } else {
            await delay(latency);
        }
        this.isRequesting = false;

        return this._listing;
    }

    public async getContactDetails(id: string): Promise<ContactDetailModel> {
        this.isRequesting = true;
        await delay(latency);
        const model = this._loadContact(id);
        this.isRequesting = false;
        return model;
    }

    public async saveContact(updatedContact: ContactDetailModel): Promise<ContactDetailModel> {
        this.isRequesting = true;
        await delay(latency);
        const index = this._contactDetails.indexOf(updatedContact);
        this._contactDetails[index] = updatedContact;
        this.isRequesting = false;
        return updatedContact;
    }

    public async createContact(firstName: string, lastName: string, emailAddress: string): Promise<ContactDetailModel> {
        this.isRequesting = true;
        await delay(latency);
        let model = new ContactDetailModel();
        model.firstName = firstName;
        model.lastName = lastName;
        model.email = emailAddress;
        this._contactDetails.push(model);
        this.isRequesting = false;
        return model;
    }

    private async _loadListing() {
        let people = await this._api.fetchPeople(7);
        this._listing = people.map(dto => ListContactModel.fromDTO(dto));
    }

    private async _loadContact(id: string, forceFetch: boolean = false): Promise<ContactDetailModel> {
        let model: ContactDetailModel = this._contactDetails.filter(x => x.id === id)[0];
        if (forceFetch || !model) {
            const dto = await this._api.fetchPerson(id);
            model = ContactDetailModel.fromDTO(dto);
            if (this._contactDetails.filter(x => x.id === id).length === 0) {
                this._contactDetails.push(model);
            } else {
                await this.saveContact(model);
            }
            return model;
        } else {
            return model;
        }
    }
}