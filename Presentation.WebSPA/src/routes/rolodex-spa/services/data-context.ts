import { inject } from "aurelia-framework";
import { delay } from "./utility";
import { ListContactModel as Contact } from "../models/list-contact-model";
import { IPeopleApi } from "./i-people-api";
import { ContactsApi } from "./contacts-api";

let latency = 600;

@inject(ContactsApi)
export class DataContext {
    private _contacts: Array<Contact>;

    constructor(private _api: IPeopleApi) {
        
    }

    public isRequesting = false;

    public async getContactList(): Promise<Array<Contact>> {
        this.isRequesting = true;

        if (!this._contacts || !this._contacts.length) {
            await this._loadData();
        } else {
            await delay(latency);
        }
        this.isRequesting = false;

        return this._contacts;
    }

    public async getContactDetails(id:string): Promise<Contact> {
        this.isRequesting = true;
        await delay(latency);
        const found = this._contacts.filter(x => x.id === id)[0];
        this.isRequesting = false;
        return found;
    }

    public async saveContact(contact: Contact): Promise<Contact> {
        this.isRequesting = true;
        await delay(latency);
        const instance: Contact = contact;
        const found: Contact = this._contacts.filter(x => x.id === contact.id)[0];

        if (found) {
            const index = this._contacts.indexOf(found);
            this._contacts[index] = instance;
        } else {
            //TODO: fix.
            //instance.id = Date.now().toString();
            this._contacts.push(instance);
        }

        this.isRequesting = false;
        return instance;
    }

    private async _loadData() {
        let people = await this._api.fetchPeople();
        this._contacts = people.map(dto => Contact.fromDTO(dto));
    }
}