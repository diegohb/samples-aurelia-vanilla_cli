import { PersonDTO } from "../models/api-dto";

export interface IPeopleApi{
    fetchPeople(limit?: number): Promise<Array<PersonDTO>>;
    fetchPerson(id: string): Promise<PersonDTO>;
}