import { autoinject } from "aurelia-framework";
import { delay } from "../services/utility";
import { Contact } from "../models/contact-model";
import { HttpClient } from "aurelia-fetch-client";
import { ApiLoggerInterceptor } from "./ApiLoggerInterceptor";

let latency = 600;
let id = 0;

function getId() {
    return ++id;
}

/*let contacts: Array<Contact> = [
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
];*/

type ResponseDTO<TDataType> = {
    data: Array<TDataType>;
    limit: number;
    offset: number;
    page: number;
    total: number;
};

type PersonDTO =
{
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string; //uri
    gender?: "male" | "female" | "other" | "";
    dateOfBirth?: string;
    phone?: string;
    location?: LocationDTO;
};

type LocationDTO = {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
};



@autoinject()
export class Api {
    private contacts: Array<Contact>;

    constructor(private _http: HttpClient) {
        _http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl("https://dummyapi.io/data/api/")
                .withDefaults({
                    credentials: "same-origin",
                    headers: {
                        "app-id": "6046baa083c2165d2b23ff80"
                    }
                })
                .withInterceptor(new ApiLoggerInterceptor());
        });

        this._loadData();
    }

    public isRequesting = false;

    public async getContactList(): Promise<Array<Contact>> {
        this.isRequesting = true;

        if (!this.contacts || !this.contacts.length) {
            await this._loadData();
        }

        await delay(latency);
        const results = this.contacts.map(x => {
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
        const found = this.contacts.filter(x => x.id === Number.parseInt(id))[0];
        this.isRequesting = false;
        return found;
    }

    public async saveContact(contact: Contact): Promise<Contact> {
        this.isRequesting = true;
        await delay(latency);
        const instance: Contact = contact;
        const found: Contact = this.contacts.filter(x => x.id === contact.id)[0];

        if (found) {
            const index = this.contacts.indexOf(found);
            this.contacts[index] = instance;
        } else {
            instance.id = getId();
            this.contacts.push(instance);
        }

        this.isRequesting = false;
        return instance;
    }

    private async _loadData() {
        const rawResponse = await this._http.fetch("user?limit=5");
        const response: ResponseDTO<PersonDTO> = await rawResponse.json();
        this.contacts = response.data.map((dto: PersonDTO) => {
            const contact = <Contact>{
                id: getId(),
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email
            };
            return contact;
        });
    }
}