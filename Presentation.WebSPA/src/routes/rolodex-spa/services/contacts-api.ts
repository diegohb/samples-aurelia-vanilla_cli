import { autoinject, LogManager } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ApiLoggerInterceptor } from "./api-logger-interceptor";
import { ResponseDTO, PersonDTO } from "../models/api-dto";
import { IPeopleApi } from "./i-people-api";


@autoinject()
export class ContactsApi implements IPeopleApi
{
    private readonly _logger = LogManager.getLogger(this.constructor.name);

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
    }

    public async fetchPeople(limit:number=5): Promise<PersonDTO[]> {
        try {
            const rawResponse = await this._http.fetch(`user?limit=${limit}`);
            const response: ResponseDTO<PersonDTO> = await rawResponse.json();
            return response.data;
        } catch (e) {
            return <PersonDTO[]>[
                {
                    id: "101",
                    firstName: "Fake",
                    lastName: "User",
                    email: "fake@user.com",
                    title: "nobody"
                }
            ];
        }
    }

    public async fetchPerson(id: string): Promise<PersonDTO> {
        if (!id || id === "") {
            throw new Error("Must provide an id.");
        }

        try {
            const rawResponse = await this._http.fetch(`user/${id}`);
            const dto: PersonDTO = await rawResponse.json() as PersonDTO;
            return dto;
        } catch (e) {
            return <PersonDTO>{
                id: "101",
                firstName: "Fake",
                lastName: "User",
                email: "fake@user.com",
                title: "nobody"
            }
        }
    }
}