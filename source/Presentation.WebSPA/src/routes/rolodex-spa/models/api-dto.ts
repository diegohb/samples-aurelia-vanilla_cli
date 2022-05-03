export type PersonDTO =
{
        id: string;
        address: LocationDTO;
        name: NameDTO;
        email: string;
        phone?: string;
        username: string;
        password: string;
        "__v": string;

};

export type LocationDTO = {
    number: string;
    street: string;
    city: string;
    zipcode: string;
    geolocation: any;
};

export type NameDTO = {
    firstname: string;
    lastname: string;
}