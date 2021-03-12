import { PersonDTO } from "../models/api-dto";

export interface IPeopleApi{
    fetchPeople(): Promise<Array<PersonDTO>>;
    fetchPerson(id: string): Promise<PersonDTO>;
}