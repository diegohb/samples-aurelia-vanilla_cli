import { autoinject, LogManager } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { ApiLoggerInterceptor } from "common/api-logger-interceptor";
import { PersonDTO } from "../models/api-dto";
import { IPeopleApi } from "./i-people-api";
// ReSharper disable once UnusedLocalImport
import Config from "../config.json";


@autoinject()
export class ContactsApi implements IPeopleApi
{
    private readonly _logger = LogManager.getLogger(this.constructor.name);

    constructor(private _http: HttpClient) {
        // ReSharper disable TsResolvedFromInaccessibleModule
        const dataApiUrl:string = Config.api.host;
        const appId: string = Config.api["app-id"];
        // ReSharper restore TsResolvedFromInaccessibleModule
        _http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(dataApiUrl)
                .withDefaults({
                    credentials: "same-origin",
                    headers: {
                        "app-id": appId,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .withInterceptor(new ApiLoggerInterceptor());
        });
        this._logger.info("Configured fake data api.", { baseUrl: dataApiUrl });
    }

    public async fetchPeople(limit:number=5): Promise<PersonDTO[]> {
        try {
            const rawResponse = await this._http.fetch(`users`);
            const response: Array<PersonDTO> = await rawResponse.json();
            return response;
        } catch (e) {
            this._logger.error(e);
            return <PersonDTO[]>[
                {
                    id: "101",
                    name: {},
                    email: "fake@user.com"
                }
            ];
        }
    }

    public async fetchPerson(id: string): Promise<PersonDTO> {
        if (!id || id === "") {
            throw new Error("Must provide an id.");
        }

        try {
            const rawResponse = await this._http.fetch(`users/${id}`);
            const dto: PersonDTO = await rawResponse.json() as PersonDTO;
            return dto;
        } catch (e) {
            return <PersonDTO>{
                id: "101",
                name: {},
                email: "fake@user.com"
            }
        }
    }
}