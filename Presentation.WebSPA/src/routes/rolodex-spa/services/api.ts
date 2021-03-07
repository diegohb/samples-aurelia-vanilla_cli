import { delay } from "../services/utility";
import { Contact } from "../models/contact-model";

let latency = 600;
let id = 0;

function getId() {
    return ++id;
}

let contacts: Array<Contact> = [
    {
        id: getId(),
        firstName: "John",
        lastName: "Tolkien",
        email: "tolkien@inklings.com",
        phoneNumber: "867-5309"
    },
    {
        id: getId(),
        firstName: "Clive",
        lastName: "Lewis",
        email: "lewis@inklings.com",
        phoneNumber: "867-5309"
    },
    {
        id: getId(),
        firstName: "Owen",
        lastName: "Barfield",
        email: "barfield@inklings.com",
        phoneNumber: "867-5309"
    },
    {
        id: getId(),
        firstName: "Charles",
        lastName: "Williams",
        email: "williams@inklings.com",
        phoneNumber: "867-5309"
    },
    {
        id: getId(),
        firstName: "Roger",
        lastName: "Green",
        email: "green@inklings.com",
        phoneNumber: "867-5309"
    }
];

export class Api {
    public isRequesting = false;

    public async getContactList(): Promise<Array<Contact>> {
        this.isRequesting = true;
        await delay(latency);
        const results = contacts.map(x => {
            return {
                id: x.id,
                firstName: x.firstName,
                lastName: x.lastName,
                email: x.email
            }
        });
        this.isRequesting = false;
        return results;
    }

    public async getContactDetails(id:string): Promise<Contact> {
        this.isRequesting = true;
        await delay(latency);
        const found = contacts.filter(x => x.id === Number.parseInt(id))[0];
        this.isRequesting = false;
        return found;
    }

    public async saveContact(contact: Contact): Promise<Contact> {
        this.isRequesting = true;
        await delay(latency);
        const instance: Contact = contact;
        const found: Contact = contacts.filter(x => x.id === contact.id)[0];

        if (found) {
            const index = contacts.indexOf(found);
            contacts[index] = instance;
        } else {
            instance.id = getId();
            contacts.push(instance);
        }

        this.isRequesting = false;
        return instance;
    }
}