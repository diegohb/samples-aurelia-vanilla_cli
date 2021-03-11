import { PersonDTO } from "../models/ApiDTO";

export interface IPeopleApi{
    fetchPeople(): Promise<Array<PersonDTO>>
}