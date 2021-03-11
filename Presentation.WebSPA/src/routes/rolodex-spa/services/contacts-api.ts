import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ApiLoggerInterceptor } from "./api-logger-interceptor";
import { ResponseDTO, PersonDTO } from "../models/api-dto";
import { IPeopleApi } from "./i-people-api";


@autoinject()
export class ContactsApi implements IPeopleApi
{
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
        const rawResponse = await this._http.fetch(`user?limit=${limit}`);
        const response: ResponseDTO<PersonDTO> = await rawResponse.json();
        return response.data;
    }
}